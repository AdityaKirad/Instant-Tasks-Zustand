import { create } from "zustand";

interface SlidersState {
  menu: boolean;
  todaysTasks: boolean;
  menuSet: (to: boolean) => void;
  todaysTasksSet: (to: boolean) => void;
}

export const useSliders = create<SlidersState>()((set) => ({
  menu: false,
  todaysTasks: false,

  menuSet: (to) => set({ menu: to }),
  todaysTasksSet: (to) => set({ todaysTasks: to }),
}));
