"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type RouteKey =
  | "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "account" | "login" | "signup"
  | "about" | "contact" | "faq" | "careers" | "journal" | "journal-post" | "lookbook" | "sustainability"
  | "shipping" | "size-guide" | "privacy" | "terms" | "security" | "refund" | "dpa" | "egypt-trading" | "cookies" | "not-found";

type RouterState = {
  route: RouteKey; params: Record<string, string>;
  navigate: (route: RouteKey, params?: Record<string, string>) => void;
  back: () => void; history: Array<{ route: RouteKey; params: Record<string, string> }>; hydrated: boolean;
};

const RouterContext = createContext<RouterState | null>(null);
const DEFAULT_STATE = { route: "home" as RouteKey, params: {} };

const KNOWN = new Set<RouteKey>([
  "home","shop","product","cart","checkout","wishlist","account","login","signup","about","contact","faq","careers",
  "journal","journal-post","lookbook","sustainability","shipping","size-guide","privacy","terms","security","refund","dpa","egypt-trading","cookies","not-found",
]);

function pathFor(route: RouteKey, params: Record<string,string> = {}) {
  const base = route === "home" ? "/" : `/${route}`;
  const id = params.id ? `/${encodeURIComponent(params.id)}` : "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key,value]) => { if (key !== "id" && value) query.set(key,value); });
  const qs = query.toString();
  return `${base}${id}${qs ? `?${qs}` : ""}`;
}

function parseLocation(): { route: RouteKey; params: Record<string,string> } {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const legacyHash = window.location.hash.replace(/^#\/?/, "");
  const raw = legacyHash || `${window.location.pathname.replace(/^\//, "")}${window.location.search}`;
  if (!raw) return DEFAULT_STATE;
  const [path, query = ""] = raw.split("?");
  const segments = path.split("/").filter(Boolean);
  let route = (segments[0] || "home") as RouteKey;
  if (!KNOWN.has(route)) route = "not-found";
  const params: Record<string,string> = {};
  if (segments[1]) params.id = decodeURIComponent(segments[1]);
  new URLSearchParams(query).forEach((value,key) => { params[key] = value; });
  return { route, params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state,setState] = useState(DEFAULT_STATE);
  const [history,setHistory] = useState([DEFAULT_STATE]);
  const [hydrated,setHydrated] = useState(false);

  useEffect(() => {
    const parsed = parseLocation();
    setState(parsed); setHistory([parsed]); setHydrated(true);
    if (window.location.hash) window.history.replaceState(null,"",pathFor(parsed.route,parsed.params));
    window.scrollTo(0,0);
  }, []);

  const navigate = useCallback((route: RouteKey, params: Record<string,string> = {}) => {
    const next = { route, params };
    window.history.pushState({ route, params }, "", pathFor(route,params));
    setState(next); setHistory(prev => [...prev,next]);
    window.scrollTo({top:0,behavior:"smooth"});
  }, []);

  const back = useCallback(() => {
    if (history.length > 1) { window.history.back(); return; }
    navigate("home");
  }, [history.length,navigate]);

  useEffect(() => {
    const onPop = () => setState(parseLocation());
    window.addEventListener("popstate",onPop);
    window.addEventListener("hashchange",onPop);
    return () => { window.removeEventListener("popstate",onPop); window.removeEventListener("hashchange",onPop); };
  }, []);

  const value = useMemo(() => ({ route:state.route, params:state.params, navigate, back, history, hydrated }), [state,navigate,back,history,hydrated]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within Providers");
  return ctx;
}

export function useIsRoute(target: RouteKey | RouteKey[]) {
  const { route } = useRouter();
  return Array.isArray(target) ? target.includes(route) : route === target;
}
