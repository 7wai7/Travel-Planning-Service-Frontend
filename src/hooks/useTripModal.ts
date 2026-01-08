import { useEffect, useMemo, useState } from "react";
import { useCreateTrip, useEditTrip } from "../hooks/trips.hooks";
import useTripsStore from "../stores/TripsStore";
import { toDateInputValue } from "../utils/date";

export type UiState = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

const EMPTY: UiState = {
  title: "",
  startDate: "",
  endDate: "",
  description: "",
};

export function useTripModal() {
  const { isOpenModal, editingTrip, setTripsStore } = useTripsStore();

  const initialUi = useMemo<UiState>(() => {
    if (!editingTrip) return EMPTY;

    return {
      title: editingTrip.title ?? "",
      startDate: toDateInputValue(editingTrip.startDate),
      endDate: toDateInputValue(editingTrip.endDate),
      description: editingTrip.description ?? "",
    };
  }, [editingTrip]);

  const [ui, setUi] = useState<UiState>(initialUi);

  useEffect(() => {
    setUi(initialUi);
  }, [initialUi]);

  const createMutation = useCreateTrip();
  const editMutation = useEditTrip();

  const isSubmitting = createMutation.isPending || editMutation.isPending;
  const error = createMutation.error || editMutation.error;

  const close = () => {
    setTripsStore({ isOpenModal: false, editingTrip: null });
    setUi(EMPTY);
  };

  const submit = async () => {
    const payloadBase = {
      title: ui.title.trim(),
      startDate: ui.startDate || undefined,
      endDate: ui.endDate || undefined,
      description: ui.description || undefined,
    };

    if (editingTrip) {
      await editMutation.mutateAsync({
        ...payloadBase,
        id: editingTrip.id,
      });
    } else {
      await createMutation.mutateAsync(payloadBase);
    }

    close();
  };

  return {
    isOpen: isOpenModal,
    isEditing: Boolean(editingTrip),
    ui,
    setUi,
    submit,
    close,
    isSubmitting,
    error,
  };
}
