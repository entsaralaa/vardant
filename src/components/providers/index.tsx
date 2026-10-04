"use client";

import {
  type ReactNode,
  useEffect,
} from "react";

import { useAuthStore } from "@/store/auth";

import { RouterProvider } from "./router";
import { useRouter } from "./router";
import { SmoothScroll } from "./smooth-scroll";
import { PageTransition } from "./page-transition";

// Keep useRouter available from:
// import { useRouter } from "@/components/providers";
export { useRouter };

function AuthSessionSync() {
  const setSession = useAuthStore(
    (state) => state.setSession
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  useEffect(() => {
    let cancelled = false;

    const syncSession = async () => {
      try {
        // Restore the persisted auth state on the client.
        await useAuthStore.persist.rehydrate();

        if (cancelled) return;

        const response = await fetch(
          "/api/auth/session",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (cancelled) return;

        if (!response.ok) {
          logout();
          return;
        }

        const data: {
          user:
            | {
                id: string;
                email: string;
                name: string;
                role: string;
              }
            | null;
        } = await response.json();

        if (cancelled) return;

        if (data.user) {
          const currentToken =
            useAuthStore.getState().token;

          setSession(
            data.user,
            currentToken ?? "session"
          );
        } else {
          logout();
        }
      } catch {
        // Keep the persisted local session if
        // the session endpoint is unavailable.
      } finally {
        if (!cancelled) {
          useAuthStore
            .getState()
            .setHydrated(true);
        }
      }
    };

    syncSession();

    return () => {
      cancelled = true;
    };
  }, [setSession, logout]);

  return null;
}

export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RouterProvider>
      <AuthSessionSync />

      <SmoothScroll />

      <PageTransition>
        {children}
      </PageTransition>
    </RouterProvider>
  );
}