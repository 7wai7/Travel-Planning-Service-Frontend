import { useQueryClient } from "@tanstack/react-query";
import usePlaceStore from "../stores/PlaceStore";
import { useCreatePlace, useUpdatePlace, useDeletePlace } from "./places.hooks";
import type {
  CreatePlaceInput,
  UpdatePlaceInput,
} from "../services/api/places/places.types";
import type { Trip } from "../services/api/trips/trips.types";
import { useMemo } from "react";

export function useTripPlaces(trip: Trip) {
  const qc = useQueryClient();
  const setPlace = usePlaceStore((s) => s.set);

  const create = useCreatePlace();
  const update = useUpdatePlace();
  const remove = useDeletePlace();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["trip-page", trip.id] });

  const sortedPlaces = useMemo(() => {
    return [...(trip?.places ?? [])].sort(
      (a, b) => Number(a.dayNumber) - Number(b.dayNumber)
    );
  }, [trip?.places]);

  return {
    sortedPlaces,
    
    openAdd: () => setPlace({ editingPlace: null, isOpenModal: true }),

    create: async (data: Omit<CreatePlaceInput, "trip_id">) => {
      await create.mutateAsync({ ...data, trip_id: trip.id });
      invalidate();
      setPlace({ isOpenModal: false });
    },

    update: async (data: Omit<UpdatePlaceInput, "trip_id">) => {
      await update.mutateAsync({ ...data, trip_id: trip.id });
      invalidate();
      setPlace({ editingPlace: null, isOpenModal: false });
    },

    remove: async (placeId: number) => {
      await remove.mutateAsync({ id: placeId, trip_id: trip.id });
      invalidate();
    },
  };
}
