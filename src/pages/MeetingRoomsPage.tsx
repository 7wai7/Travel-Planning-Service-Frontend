import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import { RoomsList } from "../components/RoomsList";
import { useInlineEdit } from "../hooks/useInlineEdit";
import { updateRoomApi } from "../services/room.api";
import css from "../styles/MeetingRoomsPage.module.css";
import type { MeetingRoom } from "../types/MeetingRoom";
import AutoResizeTextarea from "../components/AutoResizeTextarea";

export default function MeetingRoomsPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null);

  const onSelectRoom = useCallback((r: MeetingRoom) => setSelectedRoom(r), []);

  return (
    <>
      <h1 className={css.header}>Meeting rooms</h1>
      <button
        className={css.create_room_btn}
        onClick={() => setIsOpenModal(true)}
      >
        Create room
      </button>
      <div className={css.rooms_list_section}>
        <RoomsList onSelectRoom={onSelectRoom} />
        <section className={css.about_room}>
          {selectedRoom ? (
            <RoomDetails r={selectedRoom} />
          ) : (
            <p className={css.placeholder}>Select room to view details.</p>
          )}
        </section>
      </div>
      <CreateRoomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
}

interface RoomDetailsProps {
  r: MeetingRoom;
}

function RoomDetails({ r }: RoomDetailsProps) {
  const queryClient = useQueryClient();

  const { mutate: updateRoom, error } = useMutation({
    mutationFn: updateRoomApi,
    onSuccess: (updatedRoom) => {
      queryClient.setQueryData<MeetingRoom[]>(["rooms-list"], (rooms = []) =>
        rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
      );
    },
  });

  const titleEdit = useInlineEdit({
    value: r.title,
    onSave: (title) => updateRoom({ id: r.id, input: { title } }),
  });

  const descriptionEdit = useInlineEdit({
    value: r.description,
    onSave: (description) => updateRoom({ id: r.id, input: { description } }),
  });

  return (
    <dl className={css.details}>
      <dt>Title</dt>
      <input
        maxLength={32}
        value={titleEdit.value}
        onChange={(e) => titleEdit.onChange(e.target.value)}
        onBlur={titleEdit.onBlur}
        onKeyDown={titleEdit.onKeyDown}
      />

      <dt>Description</dt>
      <AutoResizeTextarea
        maxLength={5000}
        value={descriptionEdit.value}
        onChange={(e) => descriptionEdit.onChange(e.target.value)}
        onBlur={descriptionEdit.onBlur}
        onKeyDown={descriptionEdit.onKeyDown}
      />

      {error && <p>{error.message}</p>}

      <hr />

      <dt>Owner</dt>
      <dd className={css.owner}>-</dd>

      <dt>Bookings</dt>
      <dd className={css.bookings}>-</dd>
    </dl>
  );
}
