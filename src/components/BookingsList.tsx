import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { memo } from "react";
import { deleteBookingApi, getAllBookingsApi } from "../services/api";
import type { Booking, BookingFull } from "../types/Booking";
import LoadingSpinner from "./LoadingSpinner";
import css from "../styles/BookingsList.module.css";

export const BookingsList = memo(function () {
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings-list"],
    queryFn: getAllBookingsApi,
  });

  return (
    <section className={css.list}>
      <div className={clsx(css.grid, css.list_header)}>
        <p>Room</p>
        <p>Date</p>
        <p>Time</p>
        <p>Description</p>
      </div>
      <hr />
      {bookings.map((data) => (
        <BookingItem key={data.id} data={data} />
      ))}
      {isLoading && (
        <LoadingSpinner
          size={3}
          className={css.loading_spinner}
          description="none"
        />
      )}
      {error && <span className="error_message">{error.message}</span>}
    </section>
  );
});

interface BookingItemProps {
  data: BookingFull;
  onClick?: () => void;
}

function BookingItem({ data, onClick }: BookingItemProps) {
  const queryClient = useQueryClient();

  const { mutate: cancelBooking, isPending } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.setQueryData<Booking[]>(["bookings-list"], (prev) =>
        prev?.filter((booking) => booking.id !== data.id)
      );
    },
  });

  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data.startAt);

  const formattedStartTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(data.startAt);

  const formattedEndTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(data.endAt);

  return (
    <div className={clsx(css.bookings_item, css.grid)} onClick={onClick}>
      <h3 className={css.room_title}>
        {data.room?.title ?? <strong>Not found</strong>}
      </h3>
      <p className={css.date}>{formattedDate}</p>
      <p className={css.time}>
        {formattedStartTime} - {formattedEndTime}
      </p>
      <p className={css.description}>{data.description}</p>
      {data.isOwn && (
        <button
          className={css.cancel_booking_btn}
          onClick={() => cancelBooking(data.id)}
          disabled={isPending}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
