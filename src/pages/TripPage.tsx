import AddEditPlaceModal from "../components/AddEditPlaceModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { PlacesAnimation } from "../components/PlacesAnimation";
import TripDetailsSection from "../components/TripDetailsSection";
import TripHeader from "../components/TripHeader";
import { useTrip } from "../hooks/useTrip.hook";
import { useTripPlaces } from "../hooks/useTripPlaces.hook";
import usePlaceStore from "../stores/PlaceStore";

export default function TripPage() {
  const { trip } = useTrip();
  const { sortedPlaces, create, update } = useTripPlaces(trip);

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
