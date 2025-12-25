import { useParams } from "react-router-dom";
import AddEditPlaceModal from "../components/AddEditPlaceModal";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import { PlacesAnimation } from "../components/PlacesAnimation";
import TripDetailsSection from "../components/TripDetailsSection";
import TripHeader from "../components/TripHeader";
import { useTrip } from "../hooks/trips.hooks";
import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import usePlaceStore from "../stores/PlaceStore";

export default function TripPage() {
  const tripId = Number(useParams().id);
  const { data: trip, isLoading, error } = useTrip(tripId);

  const { sortedPlaces, create, update } = useTripPlaces(trip!);

  if (isLoading) return <LoadingSpinner />;
  if (error || !trip)
    return (
      <p className="error_message">
        {error?.message ?? "Oops. Something went wrong."}
      </p>
    );

  return (
    <>
      <TripHeader trip={trip} />

      <PlacesAnimation places={sortedPlaces} />

      <TripDetailsSection trip={trip} />

      <AddEditPlaceModal
        onSubmit={async (values) => {
          const { editingPlace } = usePlaceStore.getState();

          if (editingPlace) {
            await update({ ...values, id: editingPlace.id });
          } else {
            const dayNum = Number(values.dayNumber);
            await create({ ...values, dayNumber: dayNum });
          }
        }}
      />

      <ConfirmDialog />
    </>
  );
}
