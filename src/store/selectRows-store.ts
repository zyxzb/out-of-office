import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type State = {
  numberOfRows: number;
};

export type Actions = {
  setNumberOfRows: (numberOfRows: number) => void;
};

export const useRowsStore = create<State & Actions>()(
  persist(
    (set) => ({
      numberOfRows: 5,
      setNumberOfRows: (numberOfRows: number) =>
        set({ numberOfRows: numberOfRows }),
    }),
    { name: 'numberOfRows' },
  ),
);
