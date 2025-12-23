import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createBookingApi, getAllRoomsApi } from "../services/api";
import css from "../styles/Modal.module.css";
import type { Booking, BookingInput } from "../types/Booking";
import { combineDateAndTimeToTimestamp } from "../utils/date";
import GenericModal from "./GenericModal";
import { Select } from "./Select";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type UiState = {
  roomId?: string;
  date?: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  description?: string;
};

export default function CreateBookingModal({ isOpen, setIsOpen }: Props) {
  const [ui, setUi] = useState<UiState>({});
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery({
    queryKey: ["select-rooms", isOpen],
    queryFn: getAllRoomsApi,
    enabled: isOpen,
  });

  const onSuccess = (data: Booking) => {
    console.log(data)
    queryClient.setQueryData<Booking[]>(["bookings-list"], (prev = []) => [
      ...prev,
      data,
    ]);
    setIsOpen(false);
    setUi({});
  };

  if (!isOpen) return;

  const roomOptions = rooms.map((room) => ({
    label: room.title,
    value: room.id,
  }));

  const canSubmit =
    ui.roomId && ui.date && ui.startTime && ui.endTime && ui.description;

  return (
    <GenericModal<BookingInput, Booking>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      mutationFn={createBookingApi}
      getInput={() => {
        if (!canSubmit) throw new Error("Invalid input");
        const startAt = combineDateAndTimeToTimestamp(ui.date!, ui.startTime!);
        const endAt = combineDateAndTimeToTimestamp(ui.date!, ui.endTime!);

        return {
          roomId: ui.roomId!,
          startAt,
          endAt,
          description: ui.description!,
        };
      }}
    >
      {/* Room */}
      <Select
        value={ui.roomId}
        options={roomOptions}
        placeholder="Choose room"
        onChange={(roomId) => setUi((prev) => ({ ...prev, roomId }))}
      />

      {/* Date (only date) */}
      <input
        type="date"
        required
        value={ui.date || ""}
        onChange={(e) => setUi((prev) => ({ ...prev, date: e.target.value }))}
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
      />

      {/* Start time (only time) */}
      <input
        type="time"
        required
        value={ui.startTime || ""}
        onChange={(e) =>
          setUi((prev) => ({ ...prev, startTime: e.target.value }))
        }
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
      />

      {/* End time (only time) */}
      <input
        type="time"
        required
        value={ui.endTime || ""}
        onChange={(e) =>
          setUi((prev) => ({ ...prev, endTime: e.target.value }))
        }
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
      />

      {/* Description */}
      <textarea
        id="description"
        name="description"
        required
        placeholder="description"
        className="textarea-autosize"
        maxLength={5000}
        value={ui.description || ""}
        onChange={(e) =>
          setUi((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <button type="submit" className={css.submit_btn} disabled={!canSubmit}>
        Create
      </button>
    </GenericModal>
  );
}
