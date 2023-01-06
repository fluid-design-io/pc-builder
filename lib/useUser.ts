import { devtools, persist } from 'zustand/middleware';
import { Record, RecordAuthResponse } from 'pocketbase';
import create from 'zustand';

type User = RecordAuthResponse<Record>;

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user',
        getStorage: () => localStorage,
      }
    )
  )
);
