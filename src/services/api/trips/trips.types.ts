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
} & CreateTripRequest;
