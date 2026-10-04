"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faXmark,
  faChevronDown,
  faMagnifyingGlass,
  faTruck,
  faSeedling,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/components/providers";
import {
  ProductCard,
  type Product,
} from "@/components/shop/product-card";
import { api } from "@/lib/api";

const CATEGORIES = [
  "Shirts",
  "Trousers",
  "Knitwear",
  "Dresses",
  "Outerwear",
  "Accessories",
];

const SORTS = [
  {
    id: "new",
    label: "New arrivals",
  },
  {
    id: "price-asc",
    label: "Price: low → high",
  },
  {
    id: "price-desc",
    label: "Price: high → low",
  },
];

export function ShopPage() {
  const { params } = useRouter();

  /*
   * Read route params once when the page is mounted.
   * We intentionally do not synchronize them through useEffect,
   * because that creates unnecessary render loops / lint errors.
   */
  const initialSearch = params.q || "";
  const initialCategory = params.category || "All";

  const [all, setAll] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState(initialSearch);

  const [activeCat, setActiveCat] = useState<string>(
    CATEGORIES.includes(initialCategory)
      ? initialCategory
      : "All",
  );

  const [sort, setSort] = useState("new");
  const [drawer, setDrawer] = useState(false);

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const response = await api<{
          products: Product[];
        }>("/api/products");

        if (cancelled) return;

        setAll(response.products || []);
      } catch {
        if (cancelled) return;

        setAll([]);
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filtered = useMemo(() => {
    let items = [...all];

    if (activeCat !== "All") {
      items = items.filter(
        (product) => product.category === activeCat,
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      items = items.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const description =
          product.description?.toLowerCase() || "";
        const category =
          product.category?.toLowerCase() || "";

        return (
          name.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        );
      });
    }

    if (sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [all, activeCat, search, sort]);

  const hasFilters =
    activeCat !== "All" || search.trim().length > 0;

  const clearFilters = () => {
    setActiveCat("All");
    setSearch("");
  };

  const selectCategory = (category: string) => {
    setActiveCat(category);
    setDrawer(false);
  };

  return (
    <main className="page-dense px-4 pt-20 pb-20 md:px-6 md:pt-24 md:pb-24">
      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <section
        className="mb-10 md:mb-14"
        data-animate="rise"
      >
        <p className="tag-soft mb-4 inline-flex">
          Collection
        </p>

        <h1
          className="font-display text-4xl leading-[0.98] tracking-tight md:text-5xl lg:text-6xl"
          style={{
            color: "var(--forest-deep)",
          }}
        >
          The Field Collection
        </h1>

        <p
          className="mt-5 max-w-2xl text-base leading-[1.75] md:mt-6 md:text-lg"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          A small, considered range of linen, organic-cotton,
          and knit pieces dyed with chamomile, indigo, and oak
          gall. Restocked slowly — never on a sale rack.
        </p>
      </section>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section
        className="glass mb-7 rounded-[1.5rem] p-3 md:mb-9 md:rounded-[1.75rem] md:p-4"
        data-animate="rise"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          {/* Search */}

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2">
            <span className="shrink-0">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-[13px]"
                style={{
                  color: "var(--muted-foreground)",
                }}
              />
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search pieces, materials, colours…"
              aria-label="Search products"
              className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm outline-none"
              style={{
                color: "var(--foreground)",
              }}
            />

            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-60"
                aria-label="Clear search"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-[11px]"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                />
              </button>
            )}
          </div>

          {/* Controls */}

          <div className="flex flex-wrap items-center gap-2 xl:flex-nowrap">
            {/* Mobile filter button */}

            <button
              type="button"
              onClick={() => setDrawer((current) => !current)}
              className="btn-ghost-glass min-h-[42px] px-4 lg:hidden"
              aria-expanded={drawer}
              aria-controls="shop-mobile-filters"
            >
              <FontAwesomeIcon
                icon={faSliders}
                className="text-[12px]"
              />

              Filters
            </button>

            {/* Desktop categories */}

            <div className="hidden items-center gap-1.5 lg:flex">
              {["All", ...CATEGORIES].map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() =>
                    selectCategory(category)
                  }
                  className={`nav-link whitespace-nowrap text-sm ${
                    activeCat === category
                      ? "active"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}

            <div className="relative shrink-0">
              <label
                htmlFor="shop-sort"
                className="sr-only"
              >
                Sort products
              </label>

              <select
                id="shop-sort"
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="min-h-[42px] cursor-pointer appearance-none rounded-full border bg-transparent py-2.5 pl-4 pr-10 text-sm outline-none"
                style={{
                  color: "var(--foreground)",
                  borderColor:
                    "rgba(31, 61, 43, 0.18)",
                  backgroundColor:
                    "rgba(246, 239, 224, 0.45)",
                }}
              >
                {SORTS.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </option>
                ))}
              </select>

              <FontAwesomeIcon
                icon={faChevronDown}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px]"
                style={{
                  color: "var(--muted-foreground)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTERS
      ===================================================== */}

      {drawer && (
        <section
          id="shop-mobile-filters"
          className="glass-card mb-7 rounded-[1.5rem] p-4 lg:hidden md:mb-8 md:p-5"
          data-animate="rise"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p
              className="font-display text-sm font-semibold"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              Browse by category
            </p>

            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-60"
              aria-label="Close filters"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...CATEGORIES].map((category) => (
              <button
                type="button"
                key={category}
                onClick={() =>
                  selectCategory(category)
                }
                className={`nav-link text-sm ${
                  activeCat === category
                    ? "active"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}

      <div
        className="mb-5 flex flex-wrap items-center justify-between gap-3 md:mb-6"
        data-animate="rise"
      >
        <p
          className="text-sm"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          {loaded
            ? `${filtered.length} ${
                filtered.length === 1
                  ? "piece"
                  : "pieces"
              }`
            : "Loading…"}
        </p>

        {hasFilters && loaded && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-60"
            style={{
              color: "var(--straw-deep)",
            }}
          >
            Clear filters

            <FontAwesomeIcon
              icon={faXmark}
              className="text-[10px]"
            />
          </button>
        )}
      </div>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      {!loaded ? (
        <div
          className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 lg:grid-cols-3"
          aria-label="Loading products"
        >
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="glass-card animate-pulse rounded-[1.5rem] md:rounded-[2rem]"
              style={{
                aspectRatio: "3 / 4.4",
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-card rounded-[1.5rem] px-6 py-16 text-center md:rounded-[2rem] md:py-20"
          data-animate="fade"
        >
          <p
            className="mb-3 font-display text-2xl md:text-3xl"
            style={{
              color: "var(--forest-deep)",
            }}
          >
            No pieces match that just yet.
          </p>

          <p
            className="mx-auto max-w-md text-sm leading-relaxed md:text-base"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Try clearing the filters or searching for a
            different material.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn-straw mt-7"
            >
              View all pieces
            </button>
          )}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 lg:grid-cols-3"
          data-animate-stagger
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              data-stagger-child
              className="min-w-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}

      <section
        className="mt-20 md:mt-28"
        data-animate="rise"
      >
        <div className="glass-card rounded-[1.5rem] px-5 py-7 md:rounded-[2rem] md:px-8 md:py-9">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: faTruck,
                title: "Free Cairo shipping",
                body: "Over 1,500 EGP",
              },
              {
                icon: faSeedling,
                title: "Carbon-positive by design",
                body: "Every order removes 2.4kg of CO2e.",
              },
              {
                icon: faShieldHeart,
                title: "Mended forever",
                body: "Free repair for every Verdant piece.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "rgba(31, 61, 43, 0.10)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[15px]"
                    style={{
                      color: "var(--forest)",
                    }}
                  />
                </span>

                <div className="min-w-0">
                  <p
                    className="font-display text-sm font-semibold leading-snug"
                    style={{
                      color: "var(--forest-deep)",
                    }}
                  >
                    {item.title}
                  </p>

                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}