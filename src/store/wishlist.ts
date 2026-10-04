"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggle: (id) =>
        set((state) => ({
          productIds: state.productIds.includes(id)
            ? state.productIds.filter((productId) => productId !== id)
            : [...state.productIds, id],
        })),

      has: (id) => get().productIds.includes(id),

      clear: () => set({ productIds: [] }),
    }),

    {
      name: "verdant-wishlist",

      storage: createJSONStorage(() => localStorage),

      // مهم جدًا للـ SSR / hydration
      skipHydration: true,
    },
  ),
);