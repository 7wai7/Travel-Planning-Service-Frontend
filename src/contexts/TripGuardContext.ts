import { createContext } from "react";
import type { Trip } from "../services/api/trips/trips.types";

export type TripContextType = {
  trip: Trip
};

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);