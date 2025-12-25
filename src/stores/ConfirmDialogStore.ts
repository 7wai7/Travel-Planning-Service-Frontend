import { create } from "zustand";

interface IEditState {
  title: string | null;
  description: string | null;
  subject: string | null;
  payload?: unknown;
  isOpen: boolean;
  onCancel: (() => void) | null;
  onConfirm: (() => void) | null;
}

interface IState extends IEditState {
  setConfirm: (values: Partial<IEditState>) => void;
  reset: () => void;
}

const useConfirmDialogStore = create<IState>((set) => ({
  title: null,
  description: null,
  subject: null,
  isOpen: false,

  onCancel: null,
  onConfirm: null,

  setConfirm: (values) => set(values),
  reset: () =>
    set({
      title: null,
      description: null,
      subject: null,
      payload: null,
      isOpen: false,
      onCancel: null,
      onConfirm: null,
    }),
}));

export default useConfirmDialogStore;
