import { create } from "zustand";
import type { Place } from "../services/api/places/places.types";

interface IEditState {
  isOpenModal: boolean;
  editingPlace: Place | null;
}

interface IPlaceState extends IEditState {
  set: (values: Partial<IEditState>) => void;
}

const usePlaceStore = create<IPlaceState>((set) => ({
  isOpenModal: false,
  editingPlace: null,

  set: (values) => set(values),
}));

export default usePlaceStore;
