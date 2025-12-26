import { Link, useNavigate } from "react-router-dom";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";
import type { Trip } from "../services/api/trips/trips.types";
import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import css from "../styles/TripPage.module.css";
import { useDeleteTrip } from "../hooks/trips.hooks";
import { useQueryClient } from "@tanstack/react-query";
import useTripsStore from "../stores/TripsStore";

interface Props {
  trip: Trip;
}

export default function TripHeader({ trip }: Props) {
  const queryClient = useQueryClient();
  const { role, isOwner } = useTripPermissions(trip);
  const setTripsStore = useTripsStore((s) => s.setTripsStore);
  const navigate = useNavigate();
  const setConfirm = useConfirmDialogStore((s) => s.setConfirm);
  const deleteTrip = useDeleteTrip();

  const handleDeleteTripConfirm = () => {
    setConfirm({
      isOpen: true,
      title: "Delete trip",
      description:
        "Delete entire trip and all places? This action cannot be undone.",
      subject: "trip",
      payload: trip.id,
      onConfirm: async () => {
        await deleteTrip.mutateAsync(trip.id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trips-list"] });
            navigate("/trips");
          },
        });
      },
    });
  };

  const onEdit = () => {
    setTripsStore({ isOpenModal: true, editingTrip: trip });
  };

  return (
    <header className={css.headerRow}>
      <h1 className={css.header}>{trip.title}</h1>
      <div className={css.headerActions}>
        <div className={css.role_badge} data-role={role}>
          {role}
        </div>

        {isOwner && (
          <div className={css.owner_controls}>
            <Link
              to={`/trips/${trip.id}/access`}
              className={css.invite_trip_btn}
            >
              Invite
            </Link>

            <button className={css.edit_trip_btn} onClick={() => onEdit()}>
              Edit trip
            </button>

            <button
              className={css.delete_trip_btn}
              onClick={() => {
                handleDeleteTripConfirm();
              }}
            >
              Delete trip
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
