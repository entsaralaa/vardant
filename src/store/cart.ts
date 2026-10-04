"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartLine = {
  productId: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];

  addItem: (item: CartLine) => void;

  removeItem: (
    productId: string,
    size?: string,
    color?: string,
  ) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
    size?: string,
    color?: string,
  ) => void;

  clear: () => void;

  subtotal: () => number;

  count: () => number;
};

function match(
  line: CartLine,
  productId: string,
  size?: string,
  color?: string,
) {
  return (
    line.productId === productId &&
    (line.size || "") === (size || "") &&
    (line.color || "") === (color || "")
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex((line) =>
            match(
              line,
              item.productId,
              item.size,
              item.color,
            ),
          );

          if (existingIndex !== -1) {
            const nextItems = [...state.items];
            const existing = nextItems[existingIndex];

            nextItems[existingIndex] = {
              ...existing,

              // Preserve an existing slug, but recover it
              // when an older persisted cart item doesn't have one.
              slug: existing.slug ?? item.slug,

              quantity:
                existing.quantity + item.quantity,
            };

            return {
              items: nextItems,
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (line) =>
              !match(
                line,
                productId,
                size,
                color,
              ),
          ),
        })),

      updateQuantity: (
        productId,
        quantity,
        size,
        color,
      ) =>
        set((state) => ({
          items: state.items
            .map((line) =>
              match(
                line,
                productId,
                size,
                color,
              )
                ? {
                    ...line,
                    quantity: Math.max(
                      0,
                      quantity,
                    ),
                  }
                : line,
            )
            .filter(
              (line) => line.quantity > 0,
            ),
        })),

      clear: () =>
        set({
          items: [],
        }),

      subtotal: () =>
        get().items.reduce(
          (total, line) =>
            total +
            line.price * line.quantity,
          0,
        ),

      count: () =>
        get().items.reduce(
          (total, line) =>
            total + line.quantity,
          0,
        ),
    }),

    {
      name: "verdant-cart",

      storage: createJSONStorage(
        () => localStorage,
      ),

      // Prevent persisted localStorage data
      // from causing hydration mismatches.
      skipHydration: true,
    },
  ),
);