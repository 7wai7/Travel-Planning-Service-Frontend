import { create } from "zustand";
import type { Trip } from "../services/api/trips/trips.types";

interface IEditState {
  isOpenModal: boolean;
  editingTrip: Trip | null;
}

interface ITripsState extends IEditState {
  openCreate: () => void;
  openEdit: (t: Trip) => void;
  close: () => void;
  setTripsStore: (values: Partial<IEditState>) => void;
}

const useTripsStore = create<ITripsState>((set) => ({
  isOpenModal: false,
  editingTrip: null,

  openCreate: () => set({ isOpenModal: true, editingTrip: null }),
  openEdit: (t: Trip) => set({ isOpenModal: true, editingTrip: t }),
  close: () => set({ isOpenModal: false, editingTrip: null }),
  setTripsStore: (values) => set(values),
}));

export default useTripsStore;
