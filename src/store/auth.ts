"use client";

import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthState = {
  user: SessionUser | null;
  token: string | null;
  hydrated: boolean;

  setSession: (
    user: SessionUser,
    token: string
  ) => void;

  logout: () => void;

  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,

      setSession: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),

      setHydrated: (value) =>
        set({
          hydrated: value,
        }),
    }),
    {
      name: "verdant-session",

      storage: createJSONStorage(() => localStorage),

      // Prevent localStorage from being read during SSR.
      // Rehydration is triggered explicitly by the providers.
      skipHydration: true,
    }
  )
);