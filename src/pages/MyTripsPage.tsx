import { useQuery } from "@tanstack/react-query";
import CreateTripModal from "../components/CreateTripModal";
import useTripsStore from "../stores/TripsStore";
import css from "../styles/MyTripsPage.module.css";
import { getMyTripsApi } from "../services/api/trips/trips.api";
import TripItem from "../components/TripItem";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyTripsPage() {
  const { setIsOpenModal } = useTripsStore();

  const {
    data: trips = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-trips-list"],
    queryFn: () => getMyTripsApi(["places"]),
  });

  return (
    <>
      <h1 className={css.header}>My trips</h1>
      <button
        className={css.create_trip_btn}
        onClick={() => setIsOpenModal(true)}
      >
        Create trip
      </button>
      <section className={css.trips_list_section}>
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
        {isLoading && <LoadingSpinner description="none" size={3} />}
        {error && <p className="error_message">{error.message}</p>}
      </section>
      <CreateTripModal />
    </>
  );
}
