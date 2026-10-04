"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowRight,
  faBagShopping,
  faTrash,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useWishlistStore } from "@/store/wishlist";
import {
  ProductCard,
  type Product,
} from "@/components/shop/product-card";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function WishlistPage() {
  const { navigate } = useRouter();

  const ids = useWishlistStore(
    (state) => state.productIds,
  );

  const clear = useWishlistStore(
    (state) => state.clear,
  );

  const [items, setItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadWishlist = async () => {
      if (ids.length === 0) {
        if (!cancelled) {
          setItems([]);
          setError(false);
          setLoaded(true);
        }

        return;
      }

      setLoaded(false);
      setError(false);

      try {
        const response = await api<{
          products: Product[];
        }>("/api/products");

        if (cancelled) {
          return;
        }

        const products = response.products || [];

        const wishlistProducts = products.filter(
          (product) => ids.includes(product.id),
        );

        setItems(wishlistProducts);
      } catch {
        if (!cancelled) {
          setItems([]);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    };

    loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [ids]);

  /* -------------------------------------------------
     Loading
  ------------------------------------------------- */

  if (!loaded) {
    return (
      <main className="page-dense pt-24 pb-20 md:pt-28">
        <div className="mb-10 md:mb-12">
          <div className="mb-4 h-3 w-24 animate-pulse rounded-full bg-forest/10" />

          <div className="h-10 w-40 animate-pulse rounded-full bg-forest/10 md:h-12" />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="glass-card overflow-hidden rounded-[1.75rem]"
              style={{
                aspectRatio: "3 / 4.4",
              }}
            >
              <div className="h-full w-full animate-pulse bg-forest/5" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  /* -------------------------------------------------
     Error
  ------------------------------------------------- */

  if (error) {
    return (
      <main className="page-dense flex min-h-[68vh] items-center justify-center px-4 pt-24 pb-20 md:pt-28">
        <div className="w-full max-w-xl text-center">
          <div
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background:
                "rgba(31, 61, 43, 0.09)",
            }}
          >
            <FontAwesomeIcon
              icon={faRotate}
              className="text-[25px]"
              style={{
                color: "var(--forest)",
              }}
            />
          </div>

          <p className="tag-soft mb-4">
            Saved pieces
          </p>

          <h1
            className="font-display mb-4 text-3xl md:text-5xl"
            style={{
              color: "var(--forest-deep)",
            }}
          >
            We couldn’t load your wishlist
          </h1>

          <p
            className="mx-auto mb-8 max-w-md text-sm leading-7 md:text-base"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Something interrupted the connection.
            Your saved pieces are still stored on
            this device.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-straw"
          >
            Try again

            <FontAwesomeIcon
              icon={faRotate}
              className="text-[12px]"
            />
          </button>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------
     Empty
  ------------------------------------------------- */

  if (items.length === 0) {
    return (
      <main className="page-dense flex min-h-[68vh] items-center justify-center pt-24 pb-20 md:pt-28">
        <div className="w-full max-w-xl px-4 text-center">
          <div
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background:
                "rgba(184, 59, 46, 0.12)",
            }}
            data-animate="scale"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="text-[27px]"
              style={{
                color: "var(--destructive)",
              }}
            />
          </div>

          <p
            className="tag-soft mb-4"
            data-animate="rise"
          >
            Saved pieces
          </p>

          <h1
            className="font-display mb-4 text-3xl leading-tight md:text-5xl"
            style={{
              color: "var(--forest-deep)",
            }}
            data-animate="rise"
            data-delay="0.05"
          >
            Nothing saved yet
          </h1>

          <p
            className="mx-auto mb-8 max-w-md text-sm leading-7 md:text-base"
            style={{
              color: "var(--muted-foreground)",
            }}
            data-animate="rise"
            data-delay="0.1"
          >
            Save the pieces you love by tapping the
            heart. They’ll stay here while you decide
            what belongs in your wardrobe.
          </p>

          <button
            type="button"
            onClick={() => navigate("shop")}
            className="btn-straw"
            data-animate="rise"
            data-delay="0.15"
          >
            Browse the collection

            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[12px]"
            />
          </button>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------
     Wishlist
  ------------------------------------------------- */

  return (
    <main className="page-dense pt-24 pb-20 md:pt-28">
      <header
        className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between"
        data-animate="rise"
      >
        <div>
          <p className="tag-soft mb-3">
            Saved pieces
          </p>

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
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => navigate("shop")}
            className="btn-ghost-glass"
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-[12px]"
            />

            Continue shopping
          </button>

          <button
            type="button"
            onClick={() => {
              clear();

              toast({
                title: "Wishlist cleared",
              });
            }}
            className="btn-ghost-glass"
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="text-[12px]"
            />

            Clear all
          </button>
        </div>
      </header>

      <section
        className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 lg:grid-cols-4"
        data-animate-stagger
        aria-label="Saved products"
      >
        {items.map((product) => (
          <div
            key={product.id}
            data-stagger-child
          >
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </main>
  );
}