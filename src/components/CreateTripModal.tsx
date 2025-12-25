import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import css from "../styles/Modal.module.css";
import GenericModal from "./GenericModal";
import useTripsStore from "../stores/TripsStore";
import type { Trip } from "../services/api/trips/trips.types";
import { createTripApi } from "../services/api/trips/trips.api";

type UiState = {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export default function CreateRoomModal() {
  const { isOpenModal: isOpen, setIsOpenModal: setIsOpen } = useTripsStore();
  const [ui, setUi] = useState<UiState>({});
  const queryClient = useQueryClient();

  const onSuccess = (data: Trip) => {
    queryClient.setQueryData<Trip[]>(["my-trips-list"], (prev = []) => [
      data,
      ...prev,
    ]);
    setIsOpen(false);
    setUi({});
  };

  if (!isOpen) return;

  const canSubmit = ui.title?.trim();

  return (
    <GenericModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      mutationFn={createTripApi}
      getInput={() => {
        if (!canSubmit) throw new Error("Invalid input");

        return {
          ...ui,
          title: ui.title!,
        };
      }}
    >
      <input
        type="text"
        id="title"
        name="title"
        required
        placeholder="title"
        maxLength={32}
        value={ui.title || ""}
        onChange={(e) => setUi({ ...ui, title: e.target.value })}
      />
      <input
        type="date"
        value={ui.startDate || ""}
        onChange={(e) =>
          setUi((prev) => ({ ...prev, startDate: e.target.value }))
        }
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
      />
      <input
        type="date"
        value={ui.endDate || ""}
        onChange={(e) =>
          setUi((prev) => ({ ...prev, endDate: e.target.value }))
        }
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
      />
      <textarea
        id="description"
        name="description"
        placeholder="description"
        className="textarea-autosize"
        maxLength={5000}
        value={ui.description || ""}
        onChange={(e) => setUi({ ...ui, description: e.target.value })}
      />
      <button type="submit" className={css.submit_btn} disabled={!canSubmit}>
        Create
      </button>
    </GenericModal>
  );
}
