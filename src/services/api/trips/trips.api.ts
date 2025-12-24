import api from "../axios";
import { fetcher } from "../fetcher";
import type { CreateTripRequest, Trip } from "./trips.types";

export const createTripApi = (data: CreateTripRequest) =>
  fetcher<Trip>(api.post("/trips", data));

export const getMyTripsApi = async ({ places }: { places?: boolean }) =>
  fetcher<Trip[]>(
    api.get("/trips/my/trips/participating", {
      params: { places },
    })
  );
