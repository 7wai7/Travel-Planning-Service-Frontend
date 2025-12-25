import { create } from "zustand";

interface ITripsState {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}

const useTripsStore = create<ITripsState>((set) => ({
  isOpenModal: false,
  setIsOpenModal: (value) => set({ isOpenModal: value }),
}));

export default useTripsStore;
