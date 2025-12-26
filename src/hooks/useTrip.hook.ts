import { useContext } from "react";
import { TripContext } from "../contexts/TripGuardContext";

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
};