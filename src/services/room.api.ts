import type {
  MeetingRoom,
  MeetingRoomInput,
  UpdateMeetingRoomInput,
} from "../types/MeetingRoom";
import { delay } from "../utils/delay";
import { LS, read, write } from "../utils/storage";

export const createRoomApi = async (input: MeetingRoomInput) => {
  await delay();
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);

  const newRoom: MeetingRoom = {
    id: crypto.randomUUID(),
    ...input,
  };

  write(LS.ROOMS, [...rooms, newRoom]);
  return newRoom;
};

export const getAllRoomsApi = async (): Promise<MeetingRoom[]> => {
  await delay();
  return read(LS.ROOMS, []);
};

export const updateRoomApi = async ({
  id,
  input,
}: {
  id: string;
  input: UpdateMeetingRoomInput;
}) => {
  await delay();
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Room not found");

  const room = rooms[index];
  const newRoom = { ...room, ...input };
  rooms[index] = newRoom;

  write(LS.ROOMS, rooms);
  return newRoom;
};
