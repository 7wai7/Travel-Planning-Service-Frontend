import { create } from "zustand";

interface IEditState {
  title: string | null;
  description: string | null;
  subject: string | null;
  payload?: unknown;
  isOpen: boolean;
}

interface IState extends IEditState {
  setConfirm: (values: Partial<IEditState>) => void;
}

const useConfirmDialogStore = create<IState>((set) => ({
  title: null,
  description: null,
  subject: null,
  isOpen: false,

  setConfirm: (values) => set(values),
}));

export default useConfirmDialogStore;
