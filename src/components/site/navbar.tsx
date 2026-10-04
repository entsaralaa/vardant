"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBagShopping,
  faHeart,
  faUser,
  faBars,
  faXmark,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import {
  useRouter,
  type RouteKey,
} from "@/components/providers/router";

import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useAuthStore } from "@/store/auth";

const NAV: Array<{
  label: string;
  route: RouteKey;
}> = [
  { label: "Home", route: "home" },
  { label: "Shop", route: "shop" },
  { label: "Lookbook", route: "lookbook" },
  { label: "Journal", route: "journal" },
  {
    label: "Sustainability",
    route: "sustainability",
  },
  { label: "About", route: "about" },
  { label: "Contact", route: "contact" },
];

export function Navbar() {
  const { route, navigate } = useRouter();

  const cartCount = useCartStore((state) =>
    state.count(),
  );

  const wishlistCount = useWishlistStore(
    (state) => state.productIds.length,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* ---------------------------------------------
     Scroll state
  --------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* ---------------------------------------------
     Close mobile menu when route changes
  --------------------------------------------- */

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  /* ---------------------------------------------
     Prevent body scrolling while mobile menu open
  --------------------------------------------- */

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const goTo = (nextRoute: RouteKey) => {
    setMobileOpen(false);
    navigate(nextRoute);
  };

  const goToShop = () => {
    setMobileOpen(false);
    navigate("shop", { q: "" });
  };

  const goToWishlist = () => {
    setMobileOpen(false);
    navigate("wishlist");
  };

  const goToCart = () => {
    setMobileOpen(false);
    navigate("cart");
  };

  const goToAccount = () => {
    setMobileOpen(false);
    navigate(user ? "account" : "login");
  };

  const firstName =
    user?.name?.trim().split(" ")[0] ||
    "Account";

  return (
    <>
      {/* =========================================
          HEADER
      ========================================= */}

      <header
        className="sticky inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(246, 239, 224, 0.98)"
            : "rgba(246, 239, 224, 0.96)",
          borderBottom:
            "1px solid rgba(31, 61, 43, 0.10)",
          boxShadow: scrolled
            ? "0 8px 24px -20px rgba(15, 36, 23, 0.45)"
            : "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="page-dense flex h-[64px] items-center justify-between md:h-[72px]">
          {/* =====================================
              LOGO
          ===================================== */}

          <button
            type="button"
            onClick={() => goTo("home")}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Verdant home"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, var(--forest) 0%, var(--forest-deep) 100%)",
                boxShadow:
                  "0 6px 18px -6px rgba(15, 36, 23, 0.35)",
              }}
            >
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-[15px]"
                style={{
                  color: "var(--straw)",
                }}
              />
            </span>

            <span
              className="font-display text-xl tracking-tight md:text-2xl"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              Verdant
            </span>
          </button>

          {/* =====================================
              DESKTOP NAV
          ===================================== */}

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary navigation"
          >
            {NAV.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() =>
                  goTo(item.route)
                }
                className={`nav-link ${
                  route === item.route
                    ? "active"
                    : ""
                }`}
                aria-current={
                  route === item.route
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* =====================================
              ACTIONS
          ===================================== */}

          <div className="flex items-center gap-0.5 md:gap-1.5">
            {/* Search */}

            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10 md:flex"
              onClick={goToShop}
              aria-label="Search products"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-[15px]"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              />
            </button>

            {/* Wishlist */}

            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10"
              onClick={goToWishlist}
              aria-label={
                wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} saved items`
                  : "Wishlist"
              }
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="text-[15px]"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              />

              {wishlistCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[9px] font-bold"
                  style={{
                    background:
                      "var(--straw-deep)",
                    color: "var(--beige)",
                  }}
                >
                  {wishlistCount > 99
                    ? "99+"
                    : wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}

            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10"
              onClick={goToCart}
              aria-label={
                cartCount > 0
                  ? `Shopping bag, ${cartCount} items`
                  : "Shopping bag"
              }
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-[15px]"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              />

              {cartCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[9px] font-bold"
                  style={{
                    background:
                      "var(--straw-deep)",
                    color: "var(--beige)",
                  }}
                >
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </button>

            {/* Account */}

            <button
              type="button"
              className="relative hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10 sm:flex"
              onClick={goToAccount}
              aria-label={
                user
                  ? `Account for ${firstName}`
                  : "Sign in"
              }
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-[15px]"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              />
            </button>

            {/* Mobile menu */}

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-forest/10 lg:hidden"
              onClick={() =>
                setMobileOpen(
                  (current) => !current,
                )
              }
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <FontAwesomeIcon
                icon={
                  mobileOpen
                    ? faXmark
                    : faBars
                }
                className="text-[16px]"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          MOBILE DRAWER
      ========================================= */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          {/* Overlay */}

          <div className="absolute inset-0 bg-forest-deep/30 backdrop-blur-sm" />

          {/* Menu */}

          <div
            id="mobile-navigation"
            className="absolute left-0 right-0 top-[64px] rounded-b-2xl p-5 shadow-xl glass-strong md:top-[72px]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <nav
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() =>
                    goTo(item.route)
                  }
                  className={`nav-link text-left ${
                    route === item.route
                      ? "active"
                      : ""
                  }`}
                  style={{
                    fontSize: "1rem",
                    padding:
                      "0.7rem 0.25rem",
                  }}
                  aria-current={
                    route === item.route
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </button>
              ))}

              <div className="organic-divider my-3" />

              {/* Mobile actions */}

              <button
                type="button"
                onClick={goToShop}
                className="nav-link flex items-center gap-3 text-left"
                style={{
                  fontSize: "1rem",
                  padding:
                    "0.7rem 0.25rem",
                }}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-4 text-[13px]"
                />
                Search
              </button>

              <button
                type="button"
                onClick={goToWishlist}
                className="nav-link flex items-center justify-between text-left"
                style={{
                  fontSize: "1rem",
                  padding:
                    "0.7rem 0.25rem",
                }}
              >
                <span className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="w-4 text-[13px]"
                  />
                  Wishlist
                </span>

                {wishlistCount > 0 && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background:
                        "var(--straw-deep)",
                      color:
                        "var(--beige)",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={goToCart}
                className="nav-link flex items-center justify-between text-left"
                style={{
                  fontSize: "1rem",
                  padding:
                    "0.7rem 0.25rem",
                }}
              >
                <span className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="w-4 text-[13px]"
                  />
                  Bag
                </span>

                {cartCount > 0 && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background:
                        "var(--straw-deep)",
                      color:
                        "var(--beige)",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="organic-divider my-3" />

              <button
                type="button"
                onClick={goToAccount}
                className="nav-link flex items-center gap-3 text-left"
                style={{
                  fontSize: "1rem",
                  padding:
                    "0.7rem 0.25rem",
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-4 text-[13px]"
                />

                {user
                  ? `Hi, ${firstName}`
                  : "Sign in / Register"}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}