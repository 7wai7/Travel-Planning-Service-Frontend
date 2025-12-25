import { useEffect, useState } from "react";
import usePlaceStore from "../stores/PlaceStore";
import css from "../styles/TripPage.module.css";
import AutoResizeTextarea from "./AutoResizeTextarea";

type OnSubmitValues = {
  locationName: string;
  dayNumber: number;
  notes?: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (values: OnSubmitValues) => Promise<void>;
};

const EMPTY_VALUES: OnSubmitValues = {
  locationName: "",
  dayNumber: 1,
  notes: undefined,
};

export default function AddEditPlaceModal({ onClose, onSubmit }: Props) {
  const { isOpenModal, editingPlace } = usePlaceStore();

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
      await onSubmit({
        locationName: values.locationName,
        dayNumber: values.dayNumber,
        notes: values.notes,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.modal_overlay}>
      <div className={css.modal}>
        <div className={css.modal_header}>
          <h3>{isEdit ? "Edit place" : "Add place"}</h3>
          <button
            className={css.close_btn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className={css.modal_body}>
          {error && <div className={css.form_error}>{error}</div>}
          <label className={css.form_label}>
            Location name
            <input
              value={values.locationName}
              onChange={(e) =>
                setValues({ ...values, locationName: e.target.value })
              }
              className={css.form_input}
              placeholder="e.g. Old Town"
            />
          </label>

          <label className={css.form_label}>
            Day number
            <input
              value={values.dayNumber}
              onChange={(e) =>
                setValues({ ...values, dayNumber: Number(e.target.value) })
              }
              className={css.form_input}
              type="number"
              min={1}
            />
          </label>

          <label className={css.form_label}>
            Notes (optional)
            <AutoResizeTextarea
              value={values.notes}
              onChange={(e) => setValues({ ...values, notes: e.target.value })}
              className={css.form_textarea}
              rows={3}
            />
          </label>
        </div>

        <div className={css.modal_footer}>
          <button className={css.secondary_btn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={css.primary_btn}
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
