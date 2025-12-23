import type { Booking, BookingInput, BookingFull } from "../types/Booking";
import type { MeetingRoom } from "../types/MeetingRoom";
import { LS, read, write } from "../utils/storage";
import type { Session, User } from "../types/User";

export const createBookingRaw = (input: BookingInput) => {
  const session = read<Session | null>(LS.SESSION, null);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const bookings: Booking[] = read(LS.BOOKINGS, []);

  const room = rooms.find((r) => r.id === input.roomId);
  if (!room) {
    throw new Error("Room not found");
  }

  const { startAt, endAt } = input;

  // Базова валідація
  if (!Number.isFinite(startAt) || !Number.isFinite(endAt)) {
    throw new Error("Invalid time values");
  }

  if (endAt <= startAt) {
    throw new Error("End time must be after start time");
  }

  // Перевірка конфлікту
  const hasConflict = bookings.some((b) => {
    if (b.roomId !== input.roomId) return false;

    // b.startAt / b.endAt — теж number
    return startAt < b.endAt && endAt > b.startAt;
  });

  if (hasConflict) {
    throw new Error("Time conflict with existing booking");
  }

  const newBooking: Booking = {
    id: crypto.randomUUID(),
    ownerId: session.userId,
    roomId: input.roomId,
    startAt,
    endAt,
    description: input.description,
  };

  write(LS.BOOKINGS, [...bookings, newBooking]);

  return {
    ...newBooking,
    room,
    isOwn: true,
  };
};

export const getAllBookingsRaw = () => {
  const session = read<Session | null>(LS.SESSION, null);

  const users: User[] = read(LS.USERS, []);
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const bookings: Booking[] = read(LS.BOOKINGS, []);

  const result: BookingFull[] = [];
  for (const booking of bookings) {
    const room = rooms.find((r) => r.id == booking.roomId);
    const user = users.find((u) => u.id == booking.ownerId);

    result.push({
      ...booking,
      user,
      room,
      isOwn: session?.userId === user?.id,
    });
  }

  return result;
};

export const getBookingsByRoomIdRaw = (id: string) => {
  const bookings: Booking[] = read(LS.BOOKINGS, []);
  return bookings.filter((booking) => booking.roomId === id);
};

export const deleteBookingRaw = (id: string) => {
  const bookings: Booking[] = read(LS.BOOKINGS, []);
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) throw new Error("Not found");
  const deleted = bookings[index];
  bookings.splice(index, 1);
  write(LS.BOOKINGS, bookings);
  return deleted;
};
