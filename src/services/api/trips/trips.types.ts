import type { Place } from "../places/places.types";

export type CreateTripRequest = {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type Trip = {
  id: number;
  places?: Place[];
  tripParticipants?: TripParticipant[];
} & CreateTripRequest;

export type UpdateTripRequest = {
  id: number;
} & Partial<CreateTripRequest>;

export type TripParticipant = {
  role: TripRole;
};

export type TripRole = "OWNER" | "COLLABORATOR" | "USER";

export type InviteTripRequest = {
  tripId: number;
  email: string;
};
