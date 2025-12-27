import { Link, useNavigate } from "react-router-dom";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";
import type { Trip } from "../services/api/trips/trips.types";
import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import { useDeleteTrip } from "../hooks/trips.hooks";
import { useQueryClient } from "@tanstack/react-query";
import useTripsStore from "../stores/TripsStore";
import clsx from "clsx";

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
    <header className="flex items-center justify-between flex-row gap-8 mb-3">
      <h1 className="text-black text-3xl font-bold">{trip.title}</h1>
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "font-semibold px-3 py-1 rounded-full text-sm border",
            role === "OWNER" &&
              "text-green-600 bg-green-100 border-green-600",
            role === "COLLABORATOR" &&
              "text-blue-600 bg-blue-100 border-blue-600",
            role === "USER" && "text-neutral-600 bg-neutral-100 border-transparent"
          )}
        >
          {role}
        </div>

        {isOwner && (
          <div className="flex gap-2.5">
            <Link
              to={`/trips/${trip.id}/access`}
              className="interact py-2 px-3 bg-blue-50 border-blue-100 hover:border-blue-400 text-blue-500"
            >
              Invite
            </Link>

            <button className="interact py-2 px-3 bg-blue-50 border-blue-100 hover:border-blue-400 text-blue-500" onClick={() => onEdit()}>
              Edit trip
            </button>

            <button
              className="interact py-2 px-3 bg-red-100 text-red-400 hover:border-red-400"
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
