import { create } from "zustand";

interface IUserState {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}

const useTripsStore = create<IUserState>((set) => ({
  isOpenModal: false,
  setIsOpenModal: (value) => set({ isOpenModal: value }),
}));

export default useTripsStore;
