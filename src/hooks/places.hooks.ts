import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createPlaceApi,
    deletePlaceApi,
    updatePlaceApi,
} from "../services/api/places/places.api";
import type {
    CreatePlaceInput,
    UpdatePlaceInput,
    DeletePlaceInput,
    Place,
} from "../services/api/places/places.types";

export function useCreatePlace() {
  const qc = useQueryClient();

  return useMutation<Place, Error, CreatePlaceInput>({
    mutationFn: createPlaceApi,
    onMutate: async (variables: CreatePlaceInput) => {
      await qc.cancelQueries({ queryKey: ["trip-page", variables.trip_id] });
    },
    onSettled: (
      _data: Place | undefined,
      _error: Error | null,
      variables: CreatePlaceInput
    ) => {
      qc.invalidateQueries({ queryKey: ["trip-page", variables.trip_id] });
    },
  });
}

export function useUpdatePlace() {
  return useMutation<Place, Error, UpdatePlaceInput>({
    mutationFn: updatePlaceApi,
  });
}

export function useDeletePlace() {
  return useMutation<Place, Error, DeletePlaceInput>({
    mutationFn: deletePlaceApi,
  });
}