import PlaceItem from "../components/PlaceItem";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";
import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import type { Trip } from "../services/api/trips/trips.types";
import usePlaceStore from "../stores/PlaceStore";

import css from "../styles/TripPage.module.css";
import { formatDateInput } from "../utils/date";

interface Props {
  trip: Trip;
}

export default function TripDetailsSection({ trip }: Props) {
  const setPlaceStore = usePlaceStore((s) => s.set);
  const { canEditPlaces } = useTripPermissions(trip!);
  const { sortedPlaces, openAdd } = useTripPlaces(trip!);

  return (
    <section className={`${css.details} ${css.card}`}>
      <p className={css.description}>
        <strong>Description: </strong>
        {trip.description ? trip.description : "-"}
      </p>

      <p className={css.dates}>
        <strong>Dates: </strong>
        {trip.startDate && trip.endDate ? (
          <>
            {formatDateInput(trip.startDate)} &mdash;{" "}
            {formatDateInput(trip.endDate)}
          </>
        ) : (
          "-"
        )}
      </p>

      <div className={css.places_section}>
        <div className={css.places_header}>
          <strong>Places</strong>
          <div className={css.places_actions}>
            {canEditPlaces && (
              <button className={css.add_place_btn} onClick={openAdd}>
                + Add place
              </button>
            )}
            <span className={css.places_count}>
              {sortedPlaces.length}{" "}
              {sortedPlaces.length === 1 ? "place" : "places"}
            </span>
          </div>
        </div>

        {sortedPlaces.length === 0 ? (
          <div className={css.empty_state}>
            <p className={css.placeholder}>The trip hasn't places yet.</p>
            {canEditPlaces && (
              <button className={css.add_place_btn} onClick={openAdd}>
                Add first place
              </button>
            )}
          </div>
        ) : (
          <ul className={css.places_list}>
            {sortedPlaces.map((place) => (
              <li key={place.id}>
                <PlaceItem
                  trip={trip}
                  place={place}
                  canEdit={canEditPlaces}
                  onEdit={() =>
                    setPlaceStore({ editingPlace: place, isOpenModal: true })
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
