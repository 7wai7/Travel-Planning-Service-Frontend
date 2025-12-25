export type CreatePlaceInput = {
  trip_id: number;
  locationName: string;
  dayNumber: number;
  notes?: string;
};

export type Place = {
  id: number;
} & CreatePlaceInput;

export type UpdatePlaceInput = Partial<CreatePlaceInput> & {
  id: number;
  trip_id: number;
};

export type DeletePlaceInput = {
  id: number;
  trip_id: number;
};
