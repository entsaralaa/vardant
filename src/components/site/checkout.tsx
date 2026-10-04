"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHeart,
  faArrowRight,
  faCircleCheck,
  faLock,
  faTruck,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postal: string;
  notes: string;
  paymentMethod: "cash_on_delivery";
};

type OrderResponse = {
  order: {
    orderNumber: string;
    total: number;
  };
};

export function CheckoutPage() {
  const { navigate } = useRouter();

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore(
    (state) => state.hydrated
  );

  const subtotal = useCartStore(
    (state) => state.subtotal()
  );

  const [form, setForm] =
    useState<CheckoutForm>(() => ({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "Cairo",
      country: "Egypt",
      postal: "",
      notes: "",
      paymentMethod: "cash_on_delivery",
    }));

  const [submitting, setSubmitting] =
    useState(false);

  const [placed, setPlaced] = useState<{
    orderNumber: string;
    total: number;
  } | null>(null);

  /*
   * Keep the displayed totals identical
   * to the server calculation.
   */
  const shipping = useMemo(() => {
    if (subtotal <= 0) return 0;

    return subtotal > 2500 ? 0 : 95;
  }, [subtotal]);

  const tax = useMemo(
    () => subtotal * 0.14,
    [subtotal]
  );

  const total =
    subtotal + shipping + tax;

  const codUnavailable =
    total > 5000;

  const updateField = <
    K extends keyof CheckoutForm
  >(
    field: K,
    value: CheckoutForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submitting) return;

    if (!hydrated) {
      toast({
        title: "Please wait",
        description:
          "Your session is still loading.",
      });
      return;
    }

    if (!user) {
      toast({
        title:
          "Please log in to place an order",
        description:
          "You need an account before checkout.",
        variant: "destructive",
      });

      navigate("login");
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const address = form.address.trim();
    const city = form.city.trim();
    const country = form.country.trim();
    const postal = form.postal.trim();
    const notes = form.notes.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      toast({
        title:
          "Complete your shipping details",
        description:
          "Please fill in all required fields.",
        variant: "destructive",
      });

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      toast({
        title: "Invalid email",
        description:
          "Please enter a valid email address.",
        variant: "destructive",
      });

      return;
    }

    if (
      country.toLowerCase() !==
      "egypt"
    ) {
      toast({
        title:
          "Egypt delivery only",
        description:
          "Cash on delivery is currently available in Egypt only.",
        variant: "destructive",
      });

      return;
    }

    if (codUnavailable) {
      toast({
        title:
          "Cash on delivery unavailable",
        description:
          "Cash on delivery is available for orders up to 5,000 EGP.",
        variant: "destructive",
      });

      return;
    }

    if (items.length === 0) {
      toast({
        title: "Your bag is empty",
        description:
          "Add a product before checking out.",
        variant: "destructive",
      });

      navigate("shop");
      return;
    }

    setSubmitting(true);

    try {
      /*
       * Important:
       * We intentionally send only the cart lines
       * and shipping information.
       *
       * The server calculates subtotal, shipping,
       * tax and total from the database.
       */
      const response =
        await api<OrderResponse>(
          "/api/orders",
          {
            method: "POST",
            body: JSON.stringify({
              items: items.map((item) => ({
                productId:
                  item.productId,
                quantity:
                  item.quantity,
                size:
                  item.size || null,
                color:
                  item.color || null,
              })),

              shippingAddress: {
                name,
                email,
                phone,
                address,
                city,
                country,
                postal,
                notes,
              },

              paymentMethod:
                form.paymentMethod,
            }),
          }
        );

      setPlaced({
        orderNumber:
          response.order.orderNumber,
        total:
          response.order.total,
      });

      clear();
    } catch (error) {
      toast({
        title:
          "Could not place order",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * EMPTY BAG
   */
  if (
    items.length === 0 &&
    !placed
  ) {
    return (
      <main className="page-dense min-h-[68vh] px-4 pt-24 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <span
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background:
                "rgba(138, 166, 139, 0.22)",
            }}
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-[24px]"
              style={{
                color: "var(--forest)",
              }}
            />
          </span>

          <p className="tag-soft mb-3">
            Checkout
          </p>

          <h1
            className="font-display text-3xl md:text-4xl mb-3"
            style={{
              color:
                "var(--forest-deep)",
            }}
          >
            Your bag is empty
          </h1>

          <p
            className="text-sm leading-6 mb-7"
            style={{
              color:
                "var(--muted-foreground)",
            }}
          >
            Add something you love to your
            bag before continuing to
            checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("shop")
            }
            className="btn-straw"
          >
            Browse collection

            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[12px]"
            />
          </button>
        </div>
      </main>
    );
  }

  /*
   * ORDER SUCCESS
   */
  if (placed) {
    return (
      <main className="page-dense min-h-[78vh] px-4 pt-24 pb-20 flex items-center justify-center">
        <div
          className="glass-card w-full max-w-xl rounded-[2rem] p-7 text-center md:rounded-[2.5rem] md:p-12"
          data-animate="scale"
        >
          <span
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background:
                "rgba(138, 166, 139, 0.3)",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-[32px]"
              style={{
                color: "var(--forest)",
              }}
            />
          </span>

          <p className="tag-soft mb-3">
            Order confirmed
          </p>

          <h1
            className="font-display mb-4 text-3xl leading-tight md:text-4xl"
            style={{
              color:
                "var(--forest-deep)",
            }}
          >
            Thank you for your order
          </h1>

          <p
            className="mb-6 text-sm leading-7 md:text-base"
            style={{
              color:
                "var(--muted-foreground)",
            }}
          >
            We&apos;ve received your order.
            The studio team will prepare it
            with care and dispatch it on the
            next working day.
          </p>

          <div className="glass mb-7 rounded-[1.5rem] p-5">
            <p
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{
                color:
                  "var(--straw-deep)",
              }}
            >
              Order number
            </p>

            <p
              className="mt-1 font-display text-xl font-bold"
              style={{
                color:
                  "var(--forest-deep)",
              }}
            >
              {placed.orderNumber}
            </p>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--muted-foreground)",
              }}
            >
              Total:{" "}
              {placed.total.toLocaleString(
                "en-EG"
              )}{" "}
              EGP
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                navigate("account")
              }
              className="btn-ghost-glass justify-center"
            >
              View my orders
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("shop")
              }
              className="btn-straw justify-center"
            >
              Continue shopping

              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[12px]"
              />
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * CHECKOUT
   */
  return (
    <main className="page-dense px-4 pt-24 pb-20 md:px-6 md:pt-28">
      <header
        className="mx-auto mb-8 max-w-7xl md:mb-10"
        data-animate="rise"
      >
        <p className="tag-soft mb-3">
          Checkout
        </p>

        <h1
          className="font-display text-4xl leading-none md:text-5xl"
          style={{
            color:
              "var(--forest-deep)",
          }}
        >
          Almost there
        </h1>

        {!user &&
          hydrated && (
            <p
              className="mt-4 text-sm leading-6"
              style={{
                color:
                  "var(--straw-deep)",
              }}
            >
              Please{" "}
              <button
                type="button"
                onClick={() =>
                  navigate("login")
                }
                className="underline underline-offset-4"
              >
                log in
              </button>{" "}
              or{" "}
              <button
                type="button"
                onClick={() =>
                  navigate("signup")
                }
                className="underline underline-offset-4"
              >
                create an account
              </button>{" "}
              to complete your order.
            </p>
          )}
      </header>

      <form
        onSubmit={onSubmit}
        className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8"
      >
        {/* SHIPPING */}
        <div className="space-y-5 md:space-y-6">
          <section
            className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-8"
            data-animate="rise"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p
                className="font-display text-xl"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              >
                1 · Contact & shipping
              </p>

              <span
                className="hidden text-[10px] uppercase tracking-[0.18em] sm:block"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                Required fields *
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="Full name"
                value={form.name}
                onChange={(value) =>
                  updateField(
                    "name",
                    value
                  )
                }
                required
                autoComplete="name"
                disabled={submitting}
              />

              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField(
                    "email",
                    value
                  )
                }
                required
                autoComplete="email"
                disabled={submitting}
              />

              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField(
                    "phone",
                    value
                  )
                }
                required
                autoComplete="tel"
                disabled={submitting}
              />

              <Field
                label="Postal code"
                value={form.postal}
                onChange={(value) =>
                  updateField(
                    "postal",
                    value
                  )
                }
                autoComplete="postal-code"
                disabled={submitting}
              />

              <Field
                label="Street address"
                value={form.address}
                onChange={(value) =>
                  updateField(
                    "address",
                    value
                  )
                }
                required
                full
                autoComplete="street-address"
                disabled={submitting}
              />

              <Field
                label="City"
                value={form.city}
                onChange={(value) =>
                  updateField(
                    "city",
                    value
                  )
                }
                required
                autoComplete="address-level2"
                disabled={submitting}
              />

              <Field
                label="Country"
                value={form.country}
                onChange={(value) =>
                  updateField(
                    "country",
                    value
                  )
                }
                required
                autoComplete="country-name"
                disabled={submitting}
              />

              <div className="md:col-span-2">
                <label
                  className="mb-1.5 block text-sm font-medium"
                  style={{
                    color:
                      "var(--forest-deep)",
                  }}
                >
                  Notes{" "}
                  <span className="font-normal opacity-60">
                    (optional)
                  </span>
                </label>

                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    updateField(
                      "notes",
                      event.target.value
                    )
                  }
                  className="input-glass min-h-[88px] resize-y"
                  placeholder="Delivery instructions, gift wrap, etc."
                  disabled={submitting}
                />
              </div>
            </div>
          </section>

          {/* PAYMENT */}
          <section
            className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-8"
            data-animate="rise"
            data-delay="0.05"
          >
            <p
              className="mb-5 font-display text-xl"
              style={{
                color:
                  "var(--forest-deep)",
              }}
            >
              2 · Payment
            </p>

            <div className="space-y-3">
              <PaymentOption
                selected={
                  form.paymentMethod ===
                  "cash_on_delivery"
                }
                disabled={
                  codUnavailable ||
                  submitting
                }
                title="Cash on delivery"
                body={
                  codUnavailable
                    ? "Available for orders up to 5,000 EGP."
                    : "Pay when your order arrives in Egypt."
                }
                onClick={() =>
                  updateField(
                    "paymentMethod",
                    "cash_on_delivery"
                  )
                }
              />

              <PaymentOption
                selected={false}
                disabled
                title="Credit / debit card"
                body="Card processing is coming soon."
                onClick={() => {}}
              />
            </div>

            <p
              className="mt-4 flex items-start gap-2 text-xs leading-5"
              style={{
                color:
                  "var(--muted-foreground)",
              }}
            >
              <FontAwesomeIcon
                icon={faLock}
                className="mt-1 text-[10px]"
              />

              <span>
                Your payment information is
                protected in transit with TLS
                encryption.
              </span>
            </p>
          </section>
        </div>

        {/* SUMMARY */}
        <aside
          className="h-fit lg:sticky lg:top-28"
          data-animate="rise"
          data-delay="0.1"
        >
          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
            <p
              className="mb-5 font-display text-xl"
              style={{
                color:
                  "var(--forest-deep)",
              }}
            >
              Order summary
            </p>

            <div className="mb-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((line) => (
                <div
                  key={`${line.productId}-${line.size || ""}-${line.color || ""}`}
                  className="flex gap-3"
                >
                  <div className="h-[72px] w-14 shrink-0 overflow-hidden rounded-xl bg-forest/5">
                    {line.image ? (
                      <img
                        src={line.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{
                        color:
                          "var(--forest-deep)",
                      }}
                    >
                      {line.name}
                    </p>

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
                        .join(" · ") ||
                        "Standard"}{" "}
                      · ×{line.quantity}
                    </p>

                    <p
                      className="mt-1.5 text-xs font-semibold"
                      style={{
                        color:
                          "var(--forest-deep)",
                      }}
                    >
                      {(
                        line.price *
                        line.quantity
                      ).toLocaleString(
                        "en-EG"
                      )}{" "}
                      EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="organic-divider mb-4" />

            <div className="space-y-3 text-sm">
              <SummaryRow
                label="Subtotal"
                value={`${subtotal.toLocaleString(
                  "en-EG"
                )} EGP`}
              />

              <SummaryRow
                label="Shipping"
                value={
                  shipping === 0
                    ? "Free"
                    : `${shipping.toLocaleString(
                        "en-EG"
                      )} EGP`
                }
              />

              <SummaryRow
                label="VAT (14%)"
                value={`${tax.toLocaleString(
                  "en-EG",
                  {
                    maximumFractionDigits: 0,
                  }
                )} EGP`}
              />

              <div className="organic-divider my-2" />

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
                  {total.toLocaleString(
                    "en-EG",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}{" "}
                  EGP
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                submitting ||
                !hydrated ||
                !user ||
                codUnavailable
              }
              className="btn-straw mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Placing order…"
                : "Place order"}

              {!submitting && (
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[12px]"
                />
              )}
            </button>

            {!user && hydrated && (
              <p
                className="mt-3 text-center text-xs leading-5"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                Log in before placing
                your order.
              </p>
            )}

            {codUnavailable && (
              <p
                className="mt-3 text-center text-xs leading-5"
                style={{
                  color:
                    "var(--destructive)",
                }}
              >
                Cash on delivery is
                unavailable above 5,000
                EGP.
              </p>
            )}

            <div
              className="mt-5 space-y-2.5 border-t pt-4 text-xs"
              style={{
                borderColor:
                  "rgba(31, 61, 43, 0.1)",
                color:
                  "var(--muted-foreground)",
              }}
            >
              <span className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faShieldHeart}
                  className="mt-0.5 text-[11px]"
                  style={{
                    color:
                      "var(--forest)",
                  }}
                />

                <span>
                  Secure checkout with
                  encrypted payment data.
                </span>
              </span>

              <span className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="mt-0.5 text-[11px]"
                  style={{
                    color:
                      "var(--forest)",
                  }}
                />

                <span>
                  Orders are prepared for
                  dispatch on working days.
                </span>
              </span>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}

/* ===========================================================
   PAYMENT OPTION
=========================================================== */

function PaymentOption({
  selected,
  disabled = false,
  title,
  body,
  onClick,
}: {
  selected: boolean;
  disabled?: boolean;
  title: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-[1.25rem] p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background: selected
          ? "rgba(138, 166, 139, 0.24)"
          : "rgba(255, 252, 244, 0.45)",
        border: selected
          ? "1.5px solid var(--forest)"
          : "1px solid rgba(31, 61, 43, 0.16)",
      }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
        style={{
          borderColor: selected
            ? "var(--forest)"
            : "rgba(31, 61, 43, 0.35)",
        }}
      >
        {selected && (
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background:
                "var(--forest)",
            }}
          />
        )}
      </span>

      <span>
        <span
          className="block font-display text-sm font-semibold"
          style={{
            color:
              "var(--forest-deep)",
          }}
        >
          {title}
        </span>

        <span
          className="mt-1 block text-xs leading-5"
          style={{
            color:
              "var(--muted-foreground)",
          }}
        >
          {body}
        </span>
      </span>
    </button>
  );
}

/* ===========================================================
   SUMMARY ROW
=========================================================== */

function SummaryRow({
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
          color:
            "var(--muted-foreground)",
        }}
      >
        {label}
      </span>

      <span>{value}</span>
    </div>
  );
}

/* ===========================================================
   FIELD
=========================================================== */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  full = false,
  autoComplete,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={
        full ? "md:col-span-2" : ""
      }
    >
      <label
        className="mb-1.5 block text-sm font-medium"
        style={{
          color:
            "var(--forest-deep)",
        }}
      >
        {label}{" "}
        {required && (
          <span
            style={{
              color:
                "var(--straw-deep)",
            }}
          >
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className="input-glass disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}