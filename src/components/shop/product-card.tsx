"use client";

import type { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAt?: number | null;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  colors?: {
    name: string;
    hex: string;
  }[];
  sizes?: string[];
  inventory?: number;
  tags?: string[];
  featured?: boolean;
};

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { navigate } = useRouter();

  const toggleWishlist = useWishlistStore(
    (state) => state.toggle,
  );

  const hasInWishlist = useWishlistStore(
    (state) => state.productIds.includes(product.id),
  );

  const addItem = useCartStore(
    (state) => state.addItem,
  );

  const image =
    product.images?.[0] ||
    "/images/verdant/hero-field.webp";

  const isSoldOut =
    typeof product.inventory === "number" &&
    product.inventory <= 0;

  const hasSale =
    typeof product.compareAt === "number" &&
    product.compareAt > product.price;

  const discount = hasSale
    ? Math.round(
        ((product.compareAt! - product.price) /
          product.compareAt!) *
          100,
      )
    : 0;

  const openProduct = () => {
    navigate("product", {
      id: product.slug,
    });
  };

  const quickAdd = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isSoldOut) {
      toast({
        title: "Sold out",
        description: product.name,
        variant: "destructive",
      });

      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image,
      size: product.sizes?.[0],
      color: product.colors?.[0]?.name,
      quantity: 1,
    });

    toast({
      title: "Added to bag",
      description: product.name,
    });
  };

  const onWishlist = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    toggleWishlist(product.id);

    toast({
      title: hasInWishlist
        ? "Removed from wishlist"
        : "Saved to wishlist",
      description: product.name,
    });
  };

  return (
    <article
      onClick={openProduct}
      className="product-card group cursor-pointer"
      data-animate="rise"
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="product-media relative aspect-[4/5] overflow-hidden rounded-[1rem]">
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          loading="lazy"
        />

        {/* Soft image overlay */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* ===================================================
            BADGES
        =================================================== */}

        <div className="absolute left-3 top-3 flex max-w-[75%] flex-wrap gap-2">
          {hasSale && (
            <span className="tag-soft">
              -{discount}%
            </span>
          )}

          {isSoldOut && (
            <span
              className="tag-soft"
              style={{
                background: "rgba(15, 36, 23, 0.88)",
                color: "var(--beige)",
              }}
            >
              Sold out
            </span>
          )}
        </div>

        {/* ===================================================
            WISHLIST
        =================================================== */}

        <button
          type="button"
          onClick={onWishlist}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(247, 240, 223, 0.92)",
            borderColor: "rgba(31, 61, 43, 0.10)",
          }}
          aria-label={
            hasInWishlist
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <FontAwesomeIcon
            icon={faHeart}
            className="text-[13px] transition-transform duration-300"
            style={{
              color: hasInWishlist
                ? "var(--destructive)"
                : "var(--forest-deep)",
            }}
          />
        </button>

        {/* ===================================================
            QUICK ADD
        =================================================== */}

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            disabled={isSoldOut}
            className="btn-glass w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSoldOut ? "Sold out" : "Quick add"}

            {!isSoldOut && (
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[11px]"
              />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          PRODUCT INFO
      ===================================================== */}

      <div className="pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.14em] md:text-[11px]"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              {product.category}
            </p>

            <h3
              className="mt-1 truncate font-display text-base md:text-lg"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              {product.name}
            </h3>
          </div>

          {/* Rating */}

          <span
            className="flex shrink-0 items-center gap-1 pt-1 text-xs"
            style={{
              color: "var(--muted-foreground)",
            }}
            aria-label={`Rated ${
              product.rating?.toFixed(1) || "not rated"
            } out of 5`}
          >
            <FontAwesomeIcon
              icon={faStar}
              className="text-[9px]"
              style={{
                color: "var(--straw-deep)",
              }}
            />

            {product.rating
              ? product.rating.toFixed(1)
              : "—"}
          </span>
        </div>

        {/* Price */}

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span
              className="font-display text-sm font-semibold md:text-base"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              {product.price.toLocaleString()} EGP
            </span>

            {hasSale && (
              <span
                className="truncate text-xs line-through"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {product.compareAt!.toLocaleString()} EGP
              </span>
            )}
          </div>

          {/* Color swatches */}

          {product.colors &&
          product.colors.length > 0 ? (
            <div
              className="flex shrink-0 items-center -space-x-1"
              aria-label={`${product.colors.length} available colours`}
            >
              {product.colors
                .slice(0, 3)
                .map((color) => (
                  <span
                    key={`${product.id}-${color.name}`}
                    className="h-3.5 w-3.5 rounded-full border"
                    style={{
                      background: color.hex,
                      borderColor:
                        "rgba(31, 61, 43, 0.18)",
                    }}
                    title={color.name}
                  />
                ))}
            </div>
          ) : null}
        </div>

        {/* Inventory hint */}

        {!isSoldOut &&
          typeof product.inventory === "number" &&
          product.inventory > 0 &&
          product.inventory <= 3 && (
            <p
              className="mt-2 text-[10px] uppercase tracking-[0.12em]"
              style={{
                color: "var(--straw-deep)",
              }}
            >
              Only {product.inventory} left
            </p>
          )}
      </div>
    </article>
  );
}