import { devtools, persist } from 'zustand/middleware';
import { Record, RecordAuthResponse } from 'pocketbase';
import create from 'zustand';

type User = RecordAuthResponse<Record>;

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: 'user',
        getStorage: () => localStorage,
      }
    )
  )
);
