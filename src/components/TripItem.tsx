import type { Place } from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import css from "../styles/TripItem.module.css";
import { formatDateInput } from "../utils/date";

interface Props {
  trip: Trip;
}

export default function TripItem({ trip }: Props) {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{trip.title}</h3>
      <PlacesList places={trip.places ?? []} />
      {trip.description && (
        <p className={css.description}>{trip.description}</p>
      )}
      {trip.startDate && trip.endDate && (
        <p className={css.date}>
          {formatDateInput(trip.startDate)} - {formatDateInput(trip.endDate)}
        </p>
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
