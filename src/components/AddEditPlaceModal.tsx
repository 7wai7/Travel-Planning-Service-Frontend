import { useEffect, useState } from "react";
import usePlaceStore from "../stores/PlaceStore";
import AutoResizeTextarea from "./ui/AutoResizeTextarea";

type OnSubmitValues = {
  locationName: string;
  dayNumber: number;
  notes?: string;
};

type Props = {
  onClose?: () => void;
  onSubmit?: (values: OnSubmitValues) => Promise<void>;
};

const EMPTY_VALUES: OnSubmitValues = {
  locationName: "",
  dayNumber: 1,
  notes: undefined,
};

export default function AddEditPlaceModal({ onClose, onSubmit }: Props) {
  const { isOpenModal, editingPlace, set: setPlaceStore } = usePlaceStore();

  const [values, setValues] = useState<OnSubmitValues>(EMPTY_VALUES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingPlace) {
      setValues({
        locationName: editingPlace.locationName,
        dayNumber: editingPlace.dayNumber,
        notes: editingPlace.notes ?? "",
      });
    } else {
      setValues(EMPTY_VALUES);
    }
  }, [editingPlace]);

  const isEdit = Boolean(editingPlace);

  if (!isOpenModal) return;

  const submit = async () => {
    if (!values.locationName?.trim()) {
      setError("Location name is required");
      return;
    }
    if (!values.dayNumber || isNaN(values.dayNumber)) {
      setError("Day number must be a number");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await onSubmit?.({
        locationName: values.locationName,
        dayNumber: values.dayNumber,
        notes: values.notes,
      });
      setPlaceStore({ editingPlace: null, isOpenModal: false });
      setValues(EMPTY_VALUES);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal p-4 w-[50%]">
        <h3 className="text-black text-2xl">
          {isEdit ? "Edit place" : "Add place"}
        </h3>
        <div className="mt-3">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <label className="text-gray-500 text-sm">Location name</label>
          <input
            className="form-element w-full py-1 px-2.5 mt-1.5 mb-4 text-black"
            value={values.locationName}
            onChange={(e) =>
              setValues({ ...values, locationName: e.target.value })
            }
            placeholder="e.g. Old Town"
          />

          <label className="text-gray-500 text-sm">Day number</label>
          <input
            className="form-element w-full py-1 px-2.5 mt-1.5 mb-4 text-black"
            value={values.dayNumber}
            onChange={(e) =>
              setValues({ ...values, dayNumber: Number(e.target.value) })
            }
            type="number"
            min={1}
          />

          <label className="text-gray-500 text-sm">Notes (optional)</label>
          <AutoResizeTextarea
            className="form-element w-full py-1 px-2.5 mt-1.5 mb-4 text-black max-h-72"
            value={values.notes}
            onChange={(e) => setValues({ ...values, notes: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="interact border-gray-300 hover:border-gray-700 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2"
            onClick={() => {
              onClose?.();
              setPlaceStore({ editingPlace: null, isOpenModal: false });
            }}
          >
            Cancel
          </button>
          <button
            className="interact border-blue-300 hover:border-blue-700 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Saving..." : isEdit ? "Save changes" : "Create place"}
          </button>
        </div>
      </div>
    </div>
  );
}
