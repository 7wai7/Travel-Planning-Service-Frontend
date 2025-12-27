import PlaceItem from "../components/PlaceItem";
import { useTripPermissions } from "../hooks/useTripPermissions.hook";
import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import type { Trip } from "../services/api/trips/trips.types";
import usePlaceStore from "../stores/PlaceStore";
import { formatDateInput } from "../utils/date";

interface Props {
  trip: Trip;
}

export default function TripDetailsSection({ trip }: Props) {
  const setPlaceStore = usePlaceStore((s) => s.set);
  const { canEditPlaces } = useTripPermissions(trip!);
  const { sortedPlaces, openAdd } = useTripPlaces(trip!);

  return (
    <section className={`mt-2 bg-white py-3 px-4 rounded-2xl`}>
      <p className="text-sm text-(--muted) my-2">
        <strong className="text-black">Description: </strong>
        {trip.description ? trip.description : "-"}
      </p>

      <p className="mt-1.5 mb-3 text-blue-900">
        <strong className="text-black">Dates: </strong>
        {trip.startDate && trip.endDate ? (
          <>
            {formatDateInput(trip.startDate)} &mdash;{" "}
            {formatDateInput(trip.endDate)}
          </>
        ) : (
          "-"
        )}
      </p>

      <div className="mt-2.5">
        <div className="flex justify-between items-center">
          <strong className="text-black">Places</strong>
          <div className="flex items-center gap-3">
            {canEditPlaces && (
              <button className="interact py-2 px-3 rounded-lg bg-linear-to-b from-[#6c63ff] to-[#5748d8]" onClick={openAdd}>
                + Add place
              </button>
            )}
            <span className="text-sm text-gray-500">
              {sortedPlaces.length}{" "}
              {sortedPlaces.length === 1 ? "place" : "places"}
            </span>
          </div>
        </div>

        {sortedPlaces.length === 0 ? (
          <div className="p-5 bg-(--bg) rounded-lg border border-blue-200 border-dashed mt-2.5">
            <p className="text-black mb-2">The trip hasn't places yet.</p>
            {canEditPlaces && (
              <button className="interact py-2 px-3 rounded-lg bg-linear-to-b from-[#6c63ff] to-[#5748d8]" onClick={openAdd}>
                Add first place
              </button>
            )}
          </div>
        ) : (
          <ul className="mt-3 grid grid-cols-1 gap-2">
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
