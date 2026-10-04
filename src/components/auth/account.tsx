"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faHeart,
  faBagShopping,
  faUser,
  faArrowRight,
  faTruck,
  faCheck,
  faClock,
  faLeaf,
  faSignOut,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useAuthStore } from "@/store/auth";
import { useWishlistStore } from "@/store/wishlist";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    image?: string | null;
    size?: string | null;
    color?: string | null;
  }>;
};

export function AccountPage() {
  const { navigate } = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hydrated = useAuthStore((state) => state.hydrated);

  const wishlistCount = useWishlistStore(
    (state) => state.productIds.length
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  /*
   * Wait until persisted auth state has been restored.
   * This prevents redirecting to login during hydration.
   */
  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      navigate("login");
      return;
    }

    let cancelled = false;

    setLoaded(false);

    api<{ orders: Order[] }>("/api/orders")
      .then((response) => {
        if (cancelled) return;

        setOrders(
          Array.isArray(response.orders)
            ? response.orders
            : []
        );
      })
      .catch(() => {
        if (cancelled) return;

        setOrders([]);
      })
      .finally(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [hydrated, user, navigate]);

  const onLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await api("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      // Clear the local session even if the API request fails.
    } finally {
      logout();

      toast({
        title: "Signed out",
        description: "See you in the meadow.",
      });

      navigate("home");
      setLoggingOut(false);
    }
  };

  /*
   * Loading state while auth is being restored.
   */
  if (!hydrated) {
    return (
      <div className="page-dense pt-28 md:pt-36 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-[2rem] p-8 animate-pulse">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background:
                    "rgba(31, 61, 43, 0.1)",
                }}
              />

              <div className="space-y-2">
                <div
                  className="h-3 w-24 rounded"
                  style={{
                    background:
                      "rgba(31, 61, 43, 0.1)",
                  }}
                />

                <div
                  className="h-6 w-40 rounded"
                  style={{
                    background:
                      "rgba(31, 61, 43, 0.1)",
                  }}
                />

                <div
                  className="h-3 w-52 rounded"
                  style={{
                    background:
                      "rgba(31, 61, 43, 0.1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Redirect is handled by the effect above.
   */
  if (!user) {
    return null;
  }

  const treesPlanted = orders.reduce(
    (sum, order) =>
      sum + Math.floor(order.total / 1000),
    0
  );

  const stats = [
    {
      icon: faBoxOpen,
      label: "Orders placed",
      value: String(orders.length),
    },
    {
      icon: faHeart,
      label: "Saved pieces",
      value: String(wishlistCount),
    },
    {
      icon: faLeaf,
      label: "Trees planted",
      value: String(treesPlanted),
    },
    {
      icon: faEnvelope,
      label: "Newsletter",
      value: "Subscribed",
    },
  ];

  const quickActions = [
    {
      icon: faBagShopping,
      label: "Continue shopping",
      route: "shop" as const,
    },
    {
      icon: faHeart,
      label: "Open wishlist",
      route: "wishlist" as const,
    },
    {
      icon: faUser,
      label: "Account settings",
      route: "account" as const,
    },
    {
      icon: faBoxOpen,
      label: "Track an order",
      route: "account" as const,
    },
  ];

  return (
    <div className="page-dense pt-28 md:pt-36 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* =====================================================
            ACCOUNT HEADER
        ====================================================== */}
        <div
          className="glass-card rounded-[2rem] p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5"
          data-animate="rise"
        >
          <div className="flex items-center gap-4 min-w-0">
            <span
              className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-2xl font-display font-bold"
              style={{
                background:
                  "linear-gradient(135deg, var(--forest) 0%, var(--forest-deep) 100%)",
                color: "var(--straw)",
              }}
            >
              {user.name
                .charAt(0)
                .toUpperCase()}
            </span>

            <div className="min-w-0">
              <p
                className="text-xs uppercase tracking-[0.18em]"
                style={{
                  color: "var(--straw-deep)",
                }}
              >
                Welcome back
              </p>

              <h1
                className="font-display text-2xl md:text-3xl truncate"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                {user.name}
              </h1>

              <p
                className="text-sm truncate"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            disabled={loggingOut}
            className="btn-ghost-glass disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon
              icon={faSignOut}
              className="text-[12px]"
            />

            {loggingOut
              ? "Signing out…"
              : "Sign out"}
          </button>
        </div>

        {/* =====================================================
            STATS
        ====================================================== */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-8"
          data-animate-stagger
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-[1.5rem] p-5"
              data-stagger-child
            >
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                style={{
                  background:
                    "rgba(31, 61, 43, 0.12)",
                }}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="text-[15px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />
              </span>

              <p
                className="font-display text-2xl md:text-3xl"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                {stat.value}
              </p>

              <p
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          data-animate-stagger
        >
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() =>
                navigate(action.route)
              }
              className="glass-card rounded-[1.5rem] p-5 flex items-center gap-3 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              data-stagger-child
            >
              <FontAwesomeIcon
                icon={action.icon}
                className="text-[16px] shrink-0"
                style={{
                  color: "var(--forest)",
                }}
              />

              <span
                className="text-sm font-semibold"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* =====================================================
            ORDERS
        ====================================================== */}
        <section data-animate="rise">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p
                className="text-xs uppercase tracking-[0.18em] mb-1"
                style={{
                  color: "var(--straw-deep)",
                }}
              >
                Your journey
              </p>

              <h2
                className="font-display text-2xl md:text-3xl"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                Order history
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("shop")}
              className="btn-ghost-glass shrink-0"
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[12px]"
              />
              New order
            </button>
          </div>

          {/* Loading */}
          {!loaded ? (
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="glass-card rounded-[1.5rem] p-5 h-32 animate-pulse"
                />
              ))}
            </div>
          ) : orders.length === 0 ? (
            /* Empty */
            <div className="glass-card rounded-[2rem] p-8 md:p-10 text-center">
              <span
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background:
                    "rgba(31, 61, 43, 0.1)",
                }}
              >
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-[22px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />
              </span>

              <p
                className="font-display text-xl mb-2"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                No orders yet
              </p>

              <p
                className="mb-6 max-w-md mx-auto"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                When you place an order, it will
                appear here with its current status
                and order details.
              </p>

              <button
                type="button"
                onClick={() => navigate("shop")}
                className="btn-straw"
              >
                Browse collection
              </button>
            </div>
          ) : (
            /* Orders */
            <div
              className="space-y-3"
              data-animate-stagger
            >
              {orders.map((order) => {
                const status = formatStatus(
                  order.status
                );

                return (
                  <div
                    key={order.id}
                    className="glass-card rounded-[1.5rem] p-5"
                    data-stagger-child
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex -space-x-2 shrink-0">
                          {(order.items || [])
                            .slice(0, 3)
                            .map((item, index) => (
                              <span
                                key={`${order.id}-${index}`}
                                className="w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center"
                                style={{
                                  borderColor:
                                    "var(--background)",
                                  background:
                                    "rgba(31, 61, 43, 0.08)",
                                }}
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faLeaf}
                                    className="text-sm"
                                    style={{
                                      color:
                                        "var(--forest)",
                                    }}
                                  />
                                )}
                              </span>
                            ))}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="font-display text-base font-semibold truncate"
                            style={{
                              color:
                                "var(--forest-deep)",
                            }}
                          >
                            {order.orderNumber}
                          </p>

                          <p
                            className="text-xs"
                            style={{
                              color:
                                "var(--muted-foreground)",
                            }}
                          >
                            {formatDate(
                              order.createdAt
                            )}{" "}
                            ·{" "}
                            {order.items?.length || 0}{" "}
                            items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{
                            background: status.bg,
                            color: status.color,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={status.icon}
                            className="text-[10px]"
                          />

                          {status.label}
                        </span>

                        <p
                          className="font-display text-lg font-bold"
                          style={{
                            color:
                              "var(--forest-deep)",
                          }}
                        >
                          {order.total.toLocaleString(
                            "en-EG"
                          )}{" "}
                          EGP
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        label: "Pending",
        icon: faClock,
        color: "#b8861d",
        bg: "rgba(212, 168, 65, 0.2)",
      };

    case "paid":
      return {
        label: "Paid",
        icon: faCheck,
        color: "#1f3d2b",
        bg: "rgba(138, 166, 139, 0.3)",
      };

    case "shipped":
      return {
        label: "Shipped",
        icon: faTruck,
        color: "#1f3d2b",
        bg: "rgba(138, 166, 139, 0.4)",
      };

    case "delivered":
      return {
        label: "Delivered",
        icon: faCheck,
        color: "#1f3d2b",
        bg: "rgba(138, 166, 139, 0.5)",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        icon: faClock,
        color: "#b23b2e",
        bg: "rgba(184, 59, 46, 0.18)",
      };

    case "refunded":
      return {
        label: "Refunded",
        icon: faArrowRight,
        color: "#b23b2e",
        bg: "rgba(184, 59, 46, 0.18)",
      };

    default:
      return {
        label: status || "Unknown",
        icon: faClock,
        color: "var(--muted-foreground)",
        bg: "rgba(31, 61, 43, 0.1)",
      };
  }
}