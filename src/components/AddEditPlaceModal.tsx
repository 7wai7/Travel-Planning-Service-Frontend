import { useState } from "react";
import type { Place } from "../services/api/places/places.types";
import css from "../styles/TripPage.module.css";
import AutoResizeTextarea from "./AutoResizeTextarea";

type Props = {
  initialPlace?: Place;
  onClose: () => void;
  onSubmit: (values: {
    locationName: string;
    dayNumber: number;
    notes?: string;
  }) => Promise<void>;
};

export default function AddEditPlaceModal({
  initialPlace,
  onClose,
  onSubmit,
}: Props) {
  const [locationName, setLocationName] = useState(
    initialPlace?.locationName ?? ""
  );
  const [dayNumber, setDayNumber] = useState(initialPlace?.dayNumber ?? "");
  const [notes, setNotes] = useState(initialPlace?.notes ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(initialPlace);

  const submit = async () => {
    if (!locationName.trim()) {
      setError("Location name is required");
      return;
    }
    if (!dayNumber || isNaN(Number(dayNumber))) {
      setError("Day number must be a number");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({
        locationName: locationName.trim(),
        dayNumber: Number(dayNumber),
        notes,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.modal_overlay} role="dialog" aria-modal="true">
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
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className={css.form_input}
              placeholder="e.g. Old Town"
            />
          </label>

          <label className={css.form_label}>
            Day number
            <input
              value={dayNumber}
              onChange={(e) => setDayNumber(e.target.value)}
              className={css.form_input}
              type="number"
              min={1}
            />
          </label>

          <label className={css.form_label}>
            Notes (optional)
            <AutoResizeTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
