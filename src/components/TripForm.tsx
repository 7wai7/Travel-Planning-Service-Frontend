import React from "react";
import css from "../styles/Modal.module.css";
import AutoResizeTextarea from "./AutoResizeTextarea";
import type { UiState } from "../hooks/useTripModal";

type Props = {
  ui: UiState;
  onChange: React.Dispatch<React.SetStateAction<UiState>>;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
  error?: Error | null;
};

export default function TripForm({
  ui,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  error,
}: Props) {
  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        maxLength={64}
        value={ui.title}
        onChange={(e) =>
          onChange((p) => ({ ...p, title: e.target.value }))
        }
        required
        placeholder="Trip title"
      />

      <input
        type="date"
        value={ui.startDate}
        onChange={(e) =>
          onChange((p) => ({ ...p, startDate: e.target.value }))
        }
        onClick={(e) => e.currentTarget.showPicker?.()}
      />

      <input
        type="date"
        value={ui.endDate}
        onChange={(e) =>
          onChange((p) => ({ ...p, endDate: e.target.value }))
        }
        onClick={(e) => e.currentTarget.showPicker?.()}
      />

      <AutoResizeTextarea
        className={`${css.form_textarea} textarea-autosize`}
        maxLength={5000}
        rows={4}
        value={ui.description}
        onChange={(e) =>
          onChange((p) => ({ ...p, description: e.target.value }))
        }
        placeholder="Optional description"
      />

      {error && <p className="error_message">{error.message}</p>}

      <div className={css.modal_actions}>
        <button
          type="button"
          className={css.cancel_btn}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submit_btn}
          disabled={isSubmitting || !ui.title.trim()}
        >
          {isEditing ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
