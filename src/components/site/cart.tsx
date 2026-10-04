"use client";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faXmark,
  faBagShopping,
  faArrowRight,
  faTruck,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";

export function CartPage() {
  const { navigate } = useRouter();

  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore(
    (state) => state.updateQuantity,
  );
  const remove = useCartStore(
    (state) => state.removeItem,
  );
  const clear = useCartStore((state) => state.clear);
  const subtotal = useCartStore((state) =>
    state.subtotal(),
  );

  const shipping = useMemo(
    () =>
      subtotal > 2500 || subtotal === 0
        ? 0
        : 95,
    [subtotal],
  );

  const tax = useMemo(
    () => subtotal * 0.14,
    [subtotal],
  );

  const total = subtotal + shipping + tax;

  const openProduct = (slug?: string) => {
    if (!slug) {
      return;
    }

    navigate("product", {
      id: slug,
    });
  };

  /* -------------------------------------------------
     Empty cart
  ------------------------------------------------- */

  if (items.length === 0) {
    return (
      <main className="page-dense flex min-h-[70vh] items-center justify-center px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20">
        <div className="w-full max-w-md text-center">
          <span
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background:
                "rgba(31, 61, 43, 0.09)",
            }}
            data-animate="scale"
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-[27px]"
              style={{
                color: "var(--forest)",
              }}
            />
          </span>

          <p
            className="tag-soft mb-3"
            data-animate="rise"
          >
            Your bag
          </p>

          <h1
            className="font-display mb-3 text-3xl md:text-4xl"
            style={{
              color: "var(--forest-deep)",
            }}
            data-animate="rise"
          >
            Your bag is empty
          </h1>

          <p
            className="mx-auto mb-7 max-w-md text-sm leading-7 md:text-base"
            style={{
              color: "var(--muted-foreground)",
            }}
            data-animate="rise"
            data-delay="0.1"
          >
            The Field Collection is waiting — linen
            shirts, knit sweaters, and considered
            accessories for everyday wear.
          </p>

          <button
            type="button"
            onClick={() => navigate("shop")}
            className="btn-straw"
            data-animate="rise"
            data-delay="0.2"
          >
            Explore the collection

            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[13px]"
            />
          </button>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------
     Cart
  ------------------------------------------------- */

  return (
    <main className="page-dense px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20">
      {/* Header */}

      <header
        className="mx-auto mb-9 max-w-7xl"
        data-animate="rise"
      >
        <p className="tag-soft mb-3">
          Your bag
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1
            className="font-display text-4xl leading-none md:text-5xl"
            style={{
              color: "var(--forest-deep)",
            }}
          >
            {items.length}{" "}
            {items.length === 1
              ? "piece"
              : "pieces"}
          </h1>

          <p
            className="text-sm"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Review your pieces before checkout.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 xl:gap-10">
        {/* Items */}

        <section
          className="min-w-0"
          aria-label="Shopping bag items"
        >
          <div
            className="space-y-3.5"
            data-animate-stagger
          >
            {items.map((line) => (
              <article
                key={`${line.productId}-${line.size || ""}-${line.color || ""}`}
                className="glass-card rounded-[1.25rem] p-3.5 sm:p-4 md:p-5"
                data-stagger-child
              >
                <div className="flex gap-3.5 sm:gap-4 md:gap-5">
                  {/* Product image */}

                  <button
                    type="button"
                    onClick={() =>
                      openProduct(line.slug)
                    }
                    disabled={!line.slug}
                    className="group h-28 w-[84px] shrink-0 overflow-hidden rounded-[0.9rem] bg-forest/5 text-left disabled:cursor-default sm:h-32 sm:w-24 md:h-36 md:w-28"
                    aria-label={`View ${line.name}`}
                  >
                    <img
                      src={
                        line.image ||
                        "/images/verdant/hero-field.webp"
                      }
                      alt={line.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </button>

                  {/* Product information */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            openProduct(line.slug)
                          }
                          disabled={!line.slug}
                          className="text-left disabled:cursor-default"
                        >
                          <p
                            className="font-display text-[15px] font-semibold leading-snug transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                            style={{
                              color:
                                "var(--forest-deep)",
                            }}
                          >
                            {line.name}
                          </p>
                        </button>

                        {(line.size ||
                          line.color) && (
                          <p
                            className="mt-1 text-xs"
                            style={{
                              color:
                                "var(--muted-foreground)",
                            }}
                          >
                            {[
                              line.size,
                              line.color,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                      </div>

                      {/* Remove */}

                      <button
                        type="button"
                        onClick={() => {
                          remove(
                            line.productId,
                            line.size,
                            line.color,
                          );

                          toast({
                            title: "Removed",
                            description:
                              line.name,
                          });
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-forest/10"
                        aria-label={`Remove ${line.name}`}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-[12px]"
                        />
                      </button>
                    </div>

                    {/* Quantity + price */}

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      {/* Quantity */}

                      <div
                        className="flex w-fit items-center rounded-full"
                        style={{
                          background:
                            "rgba(255, 252, 244, 0.55)",
                          border:
                            "1px solid rgba(31, 61, 43, 0.20)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              line.productId,
                              Math.max(
                                0,
                                line.quantity - 1,
                              ),
                              line.size,
                              line.color,
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10"
                          aria-label={`Decrease quantity of ${line.name}`}
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="text-[10px]"
                          />
                        </button>

                        <span className="font-display w-7 text-center text-sm font-semibold">
                          {line.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              line.productId,
                              line.quantity + 1,
                              line.size,
                              line.color,
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="text-[10px]"
                          />
                        </button>
                      </div>

                      {/* Price */}

                      <div className="text-left sm:text-right">
                        <p
                          className="font-display text-base font-bold md:text-lg"
                          style={{
                            color:
                              "var(--forest-deep)",
                          }}
                        >
                          {(
                            line.price *
                            line.quantity
                          ).toLocaleString()}{" "}
                          EGP
                        </p>

                        {line.quantity > 1 && (
                          <p
                            className="mt-0.5 text-xs"
                            style={{
                              color:
                                "var(--muted-foreground)",
                            }}
                          >
                            {line.price.toLocaleString()}{" "}
                            EGP each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Cart actions */}

          <div className="mt-5 flex flex-col gap-3 border-t border-forest/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                navigate("shop")
              }
              className="btn-ghost-glass w-fit"
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="rotate-180 text-[11px]"
              />

              Continue shopping
            </button>

            <button
              type="button"
              onClick={() => {
                clear();

                toast({
                  title: "Bag cleared",
                });
              }}
              className="w-fit text-sm transition-opacity hover:opacity-70"
              style={{
                color:
                  "var(--muted-foreground)",
              }}
            >
              Clear bag
            </button>
          </div>
        </section>

        {/* Summary */}

        <aside
          className="h-fit lg:sticky lg:top-28"
          data-animate="rise"
          data-delay="0.1"
        >
          <div className="glass-card rounded-[1.5rem] p-5 sm:p-6">
            <p
              className="font-display mb-5 text-xl"
              style={{
                color:
                  "var(--forest-deep)",
              }}
            >
              Order summary
            </p>

            <div className="space-y-3 text-sm">
              <Row
                label="Subtotal"
                value={`${subtotal.toLocaleString()} EGP`}
              />

              <Row
                label="Shipping"
                value={
                  shipping === 0
                    ? "Free"
                    : `${shipping.toLocaleString()} EGP`
                }
              />

              <Row
                label="VAT (14%)"
                value={`${tax.toFixed(0)} EGP`}
              />

              <div className="organic-divider my-4" />

              <div className="flex items-center justify-between gap-4">
                <span
                  className="font-display text-lg"
                  style={{
                    color:
                      "var(--forest-deep)",
                  }}
                >
                  Total
                </span>

                <span
                  className="font-display text-xl font-bold"
                  style={{
                    color:
                      "var(--forest-deep)",
                  }}
                >
                  {total.toLocaleString()} EGP
                </span>
              </div>
            </div>

            {/* Free shipping message */}

            {shipping > 0 &&
              subtotal < 2500 && (
                <div
                  className="mt-4 flex items-start gap-2 text-xs leading-5"
                  style={{
                    color:
                      "var(--straw-deep)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="mt-0.5 shrink-0 text-[11px]"
                  />

                  <span>
                    Add{" "}
                    <strong>
                      {(
                        2500 - subtotal
                      ).toLocaleString()}{" "}
                      EGP
                    </strong>{" "}
                    for free shipping.
                  </span>
                </div>
              )}

            {/* Checkout */}

            <button
              type="button"
              onClick={() =>
                navigate("checkout")
              }
              className="btn-straw mt-6 w-full justify-center"
            >
              Checkout

              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[13px]"
              />
            </button>

            {/* Trust points */}

            <div className="mt-5 space-y-2.5 border-t border-forest/10 pt-5">
              <div
                className="flex items-start gap-2.5 text-xs leading-5"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                <FontAwesomeIcon
                  icon={faTruck}
                  className="mt-0.5 shrink-0 text-[11px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />

                <span>
                  Dispatch from Cairo on working
                  days.
                </span>
              </div>

              <div
                className="flex items-start gap-2.5 text-xs leading-5"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="mt-0.5 shrink-0 text-[11px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />

                <span>
                  Thoughtful materials and
                  lower-impact choices.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        style={{
          color: "var(--muted-foreground)",
        }}
      >
        {label}
      </span>

      <span
        className="text-right"
        style={{
          color: "var(--foreground)",
        }}
      >
        {value}
      </span>
    </div>
  );
}