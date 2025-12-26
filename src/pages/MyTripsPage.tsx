import TripItem from "../components/TripItem";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useGetMyTrips } from "../hooks/trips.hooks";
import useTripsStore from "../stores/TripsStore";
import css from "../styles/MyTripsPage.module.css";

export default function MyTripsPage() {
  const setTripsStore = useTripsStore((s) => s.setTripsStore);
  const { data: trips = [], isLoading, error } = useGetMyTrips(["places"]);

  return (
    <>
      <h1 className={css.header}>My trips</h1>
      <button
        className={css.create_trip_btn}
        onClick={() => setTripsStore({ isOpenModal: true })}
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
    </>
  );
}
