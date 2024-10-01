import { create } from 'zustand';

export type State = {
  numberOfRows: number;
};

export type Actions = {
  setNumberOfRows: (numberOfRows: number) => void;
};

export const useRowsStore = create<State & Actions>((set) => ({
  numberOfRows: 5,
  setNumberOfRows: (numberOfRows: number) =>
    set({ numberOfRows: numberOfRows }),
}));
