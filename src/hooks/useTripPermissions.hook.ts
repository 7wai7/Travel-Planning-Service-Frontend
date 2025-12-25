import type { Trip } from "../services/api/trips/trips.types";

export function useTripPermissions(trip: Trip) {
  const role = trip.tripParticipants?.[0].role ?? "USER";

  return {
    role,
    isOwner: role === "OWNER",
    isCollaborator: role === "COLLABORATOR",
    canEditPlaces: role === "OWNER" || role === "COLLABORATOR",
  };
}
