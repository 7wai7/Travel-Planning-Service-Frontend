import api from "../axios";
import { fetcher } from "../fetcher";
import type {
  CreateTripRequest,
  InviteTripRequest,
  Trip,
  UpdateTripRequest,
} from "./trips.types";

export const createTripApi = (data: CreateTripRequest) =>
  fetcher<Trip>(api.post("/trips", data));

export const editTripApi = async (data: UpdateTripRequest) =>
  fetcher<Trip>(api.put(`/trips/${data.id}`, data));

export const getMyTripsApi = async (include: string[] = []) =>
  fetcher<Trip[]>(
    api.get("/trips/my/trips/participating", {
      params: { include },
      paramsSerializer: {
        indexes: null,
      },
    })
  );

export const getTripByIdApi = async (id: number, include: string[] = []) =>
  fetcher<Trip>(
    api.get(`/trips/by-id/${id}`, {
      params: { include },
      paramsSerializer: {
        indexes: null,
      },
    })
  );

export const deleteTripApi = async (id: number) =>
  fetcher(api.delete(`/trips/${id}`));

export const inviteTripApi = async ({ tripId, email }: InviteTripRequest) =>
  fetcher(api.post(`/trips/${tripId}/access`, null, { params: { email } }));
