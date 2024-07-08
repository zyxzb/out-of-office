import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type State = {
  theme: 'dark' | 'light';
};

export type Actions = {
  setTheme: () => void;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: () =>
        set((state) => ({
          ...state,
          theme: get().theme === 'dark' ? 'light' : 'dark',
        })),
    }),
    {
      name: 'theme',
    },
  ),
);
