import TripItem from "../components/TripItem";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useGetMyTrips } from "../hooks/trips.hooks";
import useTripsStore from "../stores/TripsStore";


export default function MyTripsPage() {
  const setTripsStore = useTripsStore((s) => s.setTripsStore);
  const { data: trips = [], isLoading, error } = useGetMyTrips(["places"]);

  return (
    <>
      <h1 className="text-black text-2xl font-semibold">My trips</h1>
      {trips.length > 0 && (
        <button
          className="interact bg-blue-500 px-1.5 py-2 ml-auto mr-0 mb-4"
          onClick={() => setTripsStore({ isOpenModal: true })}
        >
          Create trip
        </button>
      )}
      {trips.length > 0 ? (
        <section className="grid grid-cols-3 gap-4 w-full h-min">
          {trips.map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </section>
      ) : !isLoading && (
        <div className="flex flex-row gap-4 items-center mt-10">
          <p className="text-black text-2xl">You don't have any trips yet.</p>
          <button
            className="interact bg-blue-100 hover:bg-blue-200 border-blue-300 hover:border-blue-400 text-blue-900 px-2 py-1.5 whitespace-nowrap"
            onClick={() => setTripsStore({ isOpenModal: true })}
          >
            Create first trip
          </button>
        </div>
      )}
      {isLoading && <LoadingSpinner description="Loading trips..." size={5} />}
      {error && <p className="error_message">{error.message}</p>}
    </>
  );
}
