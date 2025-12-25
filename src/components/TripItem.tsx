import { useNavigate } from "react-router-dom";
import type { Place } from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import css from "../styles/TripItem.module.css";
import { formatDateInput } from "../utils/date";
import Dropdown from "./Dropdown";
import { Ellipsis } from "lucide-react";
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
    <div className={css.card} onClick={onClick}>
      <div className={css.header}>
        <h3 className={css.title}>{trip.title}</h3>
        <Dropdown icon={() => <Ellipsis color="black" />}>
          <>
            <button>Delete</button>
          </>
        </Dropdown>
      </div>
      <PlacesList places={trip.places ?? []} />
      {trip.description && (
        <p className={css.description}>{trip.description}</p>
      )}
      {trip.startDate && trip.endDate && (
        <p className={css.date}>
          {formatDateInput(trip.startDate)} - {formatDateInput(trip.endDate)}
        </p>
      )}

      {role && (
        <p className={clsx(css.my_role, css[role.toLowerCase()])}>{role}</p>
      )}
    </div>
  );
}

function PlacesList({ places }: { places: Place[] }) {
  if (places.length === 0) return;

  return (
    <div className={css.places_list}>
      {places.map((p) => (
        <p key={p.id} className={css.place_name}>
          {p.locationName}
        </p>
      ))}
    </div>
  );
}
