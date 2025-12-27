import { useNavigate } from "react-router-dom";
import type { Place } from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import { formatDateInput } from "../utils/date";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  trip: Trip;
}

export default function TripItem({ trip }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const role = trip.tripParticipants?.[0].role;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Якщо клік по посиланню або кнопці — нічого не робимо
    const anchor = (e.target as HTMLElement).closest("a, button, input");
    if (anchor) return;

    // додатково перевірити dropdown, input тощо:
    if ((e.target as HTMLElement).closest(".dropdown")) return;

    queryClient.setQueryData(["trip-page", trip.id], trip);
    navigate(`/trips/${trip.id}`);
  };

  return (
    <div
      className="flex flex-col animate-anim items-start bg-white rounded-xl py-3 px-4 shadow-[-0.2rem_0_0_0_var(--blue)] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full">
        <h3 className="overflow-hidden text-ellipsis line-clamp-1 text-black text-lg mb-1">
          {trip.title}
        </h3>
      </div>
      <PlacesList places={trip.places ?? []} />
      {trip.description && (
        <p className="overflow-hidden text-ellipsis line-clamp-3 text-(--muted) text-sm">
          {trip.description}
        </p>
      )}
      {trip.startDate && trip.endDate && (
        <p className="text-black text-sm">
          {formatDateInput(trip.startDate)} - {formatDateInput(trip.endDate)}
        </p>
      )}

      {role && (
        <p
          className={clsx(
            "mt-4 px-4 py-[0.05rem] text-[0.6rem] rounded-(--radius)",
            role.toLowerCase() === "owner" &&
              "bg-[rgba(153,255,0,0.4)] text-green-500",
            role.toLowerCase() === "collaborator" &&
              "bg-[rgba(0,251,255,0.4)] text-blue-500",
            role.toLowerCase() !== "owner" &&
              role.toLowerCase() !== "collaborator" &&
              "bg-[rgba(189,189,189,0.4)] text-[rgb(47,47,47)]"
          )}
        >
          {role}
        </p>
      )}
    </div>
  );
}

function PlacesList({ places }: { places: Place[] }) {
  if (places.length === 0) return;

  return (
    <div className="flex flex-wrap">
      {places.map((p, i) => (
        <span key={p.id} className="text-(--muted) text-[0.9rem] relative">
          {p.locationName}
          {i < places.length - 1 && (
            <span className="mx-1 text-[1.2rem] leading-none text-(--blue)">
              •
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
