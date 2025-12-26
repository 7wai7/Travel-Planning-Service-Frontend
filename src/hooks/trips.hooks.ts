import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTripApi,
  deleteTripApi,
  getTripByIdApi,
  inviteTripApi,
} from "../services/api/trips/trips.api";
import type { InviteTripRequest } from "../services/api/trips/trips.types";

export function useQueryTrip(tripId: number) {
  return useQuery({
    queryKey: ["trip-page", tripId],
    queryFn: () => getTripByIdApi(tripId, ["places", "tripParticipants"]),
    enabled: Number.isFinite(tripId),
    staleTime: 1000 * 60, // 1 хвилина
  });
}

export function useCreateTrip() {
  return useMutation({
    mutationFn: createTripApi,
  });
}

export function useDeleteTrip() {
  return useMutation({
    mutationFn: deleteTripApi,
  });
}

export function useInviteTrip() {
  return useMutation<
    { token: string; inviteLink: string },
    Error,
    InviteTripRequest
  >({
    mutationFn: inviteTripApi,
  });
}
