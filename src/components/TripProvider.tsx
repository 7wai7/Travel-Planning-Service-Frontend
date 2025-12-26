import { type ReactNode } from "react";
import { TripContext } from "../contexts/TripGuardContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useQueryTrip } from "../hooks/trips.hooks";

export function TripProvider({ children }: { children: ReactNode }) {
  const tripId = Number(useParams().id);
  const { data: trip, isLoading, error } = useQueryTrip(tripId, ["places", "tripParticipants"]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !trip) {
    return (
      <p className="error_message">
        {error?.message ?? "Oops. Something went wrong."}
      </p>
    );
  }

  return (
    <TripContext.Provider value={{ trip }}>{children}</TripContext.Provider>
  );
}
