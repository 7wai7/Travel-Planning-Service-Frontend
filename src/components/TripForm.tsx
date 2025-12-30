import React from "react";
import AutoResizeTextarea from "./ui/AutoResizeTextarea";
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
      className="flex flex-col justify-between h-full gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="form-element p-1 text-black"
        type="text"
        maxLength={64}
        value={ui.title}
        onChange={(e) => onChange((p) => ({ ...p, title: e.target.value }))}
        required
        placeholder="Trip title"
      />

      <input
        className="form-element p-1 text-black"
        type="date"
        value={ui.startDate}
        onChange={(e) => onChange((p) => ({ ...p, startDate: e.target.value }))}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />

      <input
        className="form-element p-1 text-black"
        type="date"
        value={ui.endDate}
        onChange={(e) => onChange((p) => ({ ...p, endDate: e.target.value }))}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />

      <AutoResizeTextarea
        className={`form-element p-1 text-black max-h-72`}
        maxLength={5000}
        rows={4}
        value={ui.description}
        onChange={(e) =>
          onChange((p) => ({ ...p, description: e.target.value }))
        }
        placeholder="Optional description"
      />

      {error && (
        <p className="text-red-500 text-sm text-center">{error.message}</p>
      )}

      <div className="flex flex-row gap-4 h-10 justify-end">
        <button
          type="button"
          className="bg-gray-500 cursor-pointer text-white px-2 rounded-xl"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-(--blue) cursor-pointer text-white px-2 rounded-xl"
          disabled={isSubmitting || !ui.title.trim()}
        >
          {isEditing ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
