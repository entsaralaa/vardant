"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "./router";

export function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const { route, params } = useRouter();

  const [phase, setPhase] = useState<
    "idle" | "leave"
  >("idle");

  const previousKey = useRef(
    JSON.stringify({
      route,
      params,
    })
  );

  useEffect(() => {
    const currentKey = JSON.stringify({
      route,
      params,
    });

    if (previousKey.current === currentKey) {
      return;
    }

    previousKey.current = currentKey;

    setPhase("leave");

    const timer = window.setTimeout(() => {
      setPhase("idle");
    }, 180);

    return () => {
      window.clearTimeout(timer);
    };
  }, [route, params]);

  const pageKey = `${route}-${JSON.stringify(params)}`;

  return (
    <div
      key={pageKey}
      data-page-content
      style={{
        opacity: phase === "leave" ? 0.25 : 1,
        transform:
          phase === "leave"
            ? "translateY(4px)"
            : "translateY(0)",
        transition:
          "opacity 180ms ease, transform 220ms ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}