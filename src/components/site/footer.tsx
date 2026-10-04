"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faPaperPlane,
  faArrowRight,
  faShieldHeart,
  faTruck,
  faRecycle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import {
  useRouter,
  type RouteKey,
} from "@/components/providers/router";

import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const COLUMNS: Array<{
  title: string;
  links: Array<{
    label: string;
    route: RouteKey;
  }>;
}> = [
  {
    title: "Shop",
    links: [
      {
        label: "All clothing",
        route: "shop",
      },
      {
        label: "Lookbook",
        route: "lookbook",
      },
      {
        label: "Wishlist",
        route: "wishlist",
      },
      {
        label: "Cart",
        route: "cart",
      },
    ],
  },
  {
    title: "Studio",
    links: [
      {
        label: "About Verdant",
        route: "about",
      },
      {
        label: "Sustainability",
        route: "sustainability",
      },
      {
        label: "Journal",
        route: "journal",
      },
      {
        label: "Careers",
        route: "careers",
      },
    ],
  },
  {
    title: "Help",
    links: [
      {
        label: "Contact us",
        route: "contact",
      },
      {
        label: "Shipping & delivery",
        route: "shipping",
      },
      {
        label: "Size guide",
        route: "size-guide",
      },
      {
        label: "FAQ",
        route: "faq",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        route: "privacy",
      },
      {
        label: "Terms of Use",
        route: "terms",
      },
      {
        label: "Security Policy",
        route: "security",
      },
      {
        label: "Refund Policy",
        route: "refund",
      },
      {
        label: "Data Processing (DPA)",
        route: "dpa",
      },
      {
        label: "Egypt Trading Laws",
        route: "egypt-trading",
      },
    ],
  },
];

export function Footer() {
  const { navigate } = useRouter();

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubscribe = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail || busy) {
      return;
    }

    setBusy(true);

    try {
      await api("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      toast({
        title: "Subscribed",
        description:
          "Welcome to the meadow. Watch your inbox for the next journal.",
      });

      setEmail("");
    } catch (error) {
      toast({
        title: "Could not subscribe",
        description:
          error instanceof Error
            ? error.message
            : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="relative mt-auto px-5 pt-20 pb-10 md:px-8">
      {/* Trust strip */}

      <div className="page-dense">
        <div className="glass mb-12 grid grid-cols-2 gap-5 rounded-[2rem] p-6 md:grid-cols-4 md:p-8">
          {[
            {
              icon: faTruck,
              title: "Free shipping",
              body: "On all orders over 2,500 EGP",
            },
            {
              icon: faShieldHeart,
              title: "Secure checkout",
              body: "256-bit TLS encryption",
            },
            {
              icon: faCircleCheck,
              title: "30-day returns",
              body: "Hassle-free refund policy",
            },
            {
              icon: faRecycle,
              title: "Organic fibers",
              body: "Linen, hemp, organic cotton",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3.5"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    "rgba(31, 61, 43, 0.12)",
                }}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-[16px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />
              </span>

              <div className="min-w-0">
                <p
                  className="font-display text-sm font-semibold"
                  style={{
                    color: "var(--forest-deep)",
                  }}
                >
                  {feature.title}
                </p>

                <p
                  className="text-xs"
                  style={{
                    color:
                      "var(--muted-foreground)",
                  }}
                >
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter + main footer */}

      <div className="page-dense">
        <div className="glass-card overflow-hidden rounded-[2.5rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Newsletter */}

            <div className="relative p-8 md:p-12 lg:p-14">
              <div
                className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, var(--sage) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <p className="tag-soft mb-4">
                Field notes
              </p>

              <h3
                className="font-display text-3xl leading-[1.05] md:text-4xl"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                Slow letters from the meadow.
              </h3>

              <p
                className="mt-3 max-w-md text-base leading-relaxed"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                Once a fortnight we send a long,
                quiet note — new collections, studio
                visits, and field journals from the
                growers, dyers, and weavers behind
                Verdant.
              </p>

              <form
                onSubmit={onSubscribe}
                className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="your@email.com"
                  className="input-glass"
                  aria-label="Email"
                  disabled={busy}
                />

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-glass shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-[13px]"
                  />

                  {busy
                    ? "Joining…"
                    : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Link columns */}

            <div className="grid grid-cols-2 gap-6 p-8 sm:grid-cols-4 md:p-12 lg:p-14">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <p
                    className="mb-3 font-display text-xs uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--straw-deep)",
                    }}
                  >
                    {column.title}
                  </p>

                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(link.route)
                          }
                          className="group inline-flex items-center gap-1.5 text-left text-sm transition-colors hover:text-forest-deep"
                          style={{
                            color:
                              "var(--muted-foreground)",
                          }}
                        >
                          <span
                            className="-ml-3 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
                            style={{
                              color:
                                "var(--straw-deep)",
                            }}
                            aria-hidden="true"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="text-[10px]"
                            />
                          </span>

                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}

        <div className="mt-10 flex flex-col justify-between gap-5 px-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: "var(--forest)",
              }}
            >
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-[12px]"
                style={{
                  color: "var(--straw)",
                }}
              />
            </span>

            <p
              className="text-sm"
              style={{
                color:
                  "var(--muted-foreground)",
              }}
            >
              © {new Date().getFullYear()} Verdant
              Studio. Woven in Cairo, worn
              everywhere.
            </p>
          </div>

          <div
            className="flex items-center gap-3 text-xs"
            style={{
              color:
                "var(--muted-foreground)",
            }}
          >
            <span>Designed in Cairo</span>

            <span aria-hidden="true">·</span>

            <span>Made slowly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}