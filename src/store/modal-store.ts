// state is shared across all places || hooks create locale state for every component

import { create } from 'zustand';

export type State = {
  open: boolean;
};

export type Actions = {
  setOpen: (isOpen: boolean) => void;
  closeModal: () => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  open: false,
  setOpen: (isOpen: boolean) => set({ open: isOpen }),
  closeModal: () => set({ open: false }),
}));
