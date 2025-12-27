import TripItem from "../components/TripItem";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useGetMyTrips } from "../hooks/trips.hooks";
import useTripsStore from "../stores/TripsStore";

export default function MyTripsPage() {
  const setTripsStore = useTripsStore((s) => s.setTripsStore);
  const { data: trips = [], isLoading, error } = useGetMyTrips(["places"]);

  return (
    <>
      <h1 className="text-black text-xl">My trips</h1>
      <button
        className="interact bg-(--blue) px-1.5 py-2 ml-auto mr-0 mb-4"
        onClick={() => setTripsStore({ isOpenModal: true })}
      >
        Create trip
      </button>
      <section className="grid grid-cols-3 gap-4 w-full h-min">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </section>
      {isLoading && <LoadingSpinner description="none" size={5} />}
      {error && <p className="error_message">{error.message}</p>}
    </>
  );
}
