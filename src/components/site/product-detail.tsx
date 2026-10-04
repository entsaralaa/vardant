"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faTruck,
  faRecycle,
  faRuler,
  faArrowLeft,
  faMinus,
  faPlus,
  faShieldHeart,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { ProductCard } from "@/components/shop/product-card";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  price: number;
  compareAt?: number | null;
  images: string[];
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inventory: number;
};

type ProductResponse = {
  product: ProductDetail;
  related: ProductDetail[];
};

export function ProductDetailPage() {
  const { params, navigate } = useRouter();

  const slug = params.id || "";

  const [data, setData] = useState<ProductResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore(
    (state) => state.toggle,
  );

  const inWishlist = useWishlistStore((state) =>
    state.productIds.includes(data?.product.id || ""),
  );

  useEffect(() => {
    if (!slug) {
      return;
    }

    let cancelled = false;

    api<ProductResponse>(`/api/products/${slug}`)
      .then((response) => {
        if (cancelled) {
          return;
        }

        setData(response);
        setNotFound(false);
        setActiveImg(0);
        setQty(1);

        setSize(response.product.sizes?.[0] || "");
        setColor(
          response.product.colors?.[0]?.name || "",
        );
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setData(null);
        setNotFound(true);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (notFound) {
    return (
      <div className="page-dense min-h-[70vh] pt-28 pb-16 md:pt-36">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="glass-card w-full max-w-xl rounded-[2rem] p-8 text-center md:p-12">
            <p className="tag-soft mb-4">
              Piece not found
            </p>

            <h1
              className="font-display mb-3 text-3xl md:text-4xl"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              That piece has returned to the meadow.
            </h1>

            <p
              className="mb-6"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              The product may have been removed or the
              link may be out of date.
            </p>

            <button
              type="button"
              onClick={() => navigate("shop")}
              className="btn-straw"
            >
              Browse the collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-dense pt-28 pb-16 md:pt-36">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className="glass-card rounded-[2rem]"
            style={{
              aspectRatio: "3 / 4",
            }}
          />

          <div className="space-y-4">
            <div className="glass-card h-8 w-2/3 rounded-[1rem]" />
            <div className="glass-card h-6 w-1/3 rounded-[1rem]" />
            <div className="glass-card h-24 w-full rounded-[1rem]" />
            <div className="glass-card h-12 w-1/2 rounded-[1rem]" />
          </div>
        </div>
      </div>
    );
  }

  const product = data.product;

  const hasSizes = product.sizes?.length > 0;
  const hasColors = product.colors?.length > 0;
  const isOutOfStock = product.inventory <= 0;

  const canAddToBag =
    !isOutOfStock && (!hasSizes || Boolean(size));

  const currentImage =
    product.images?.[activeImg] ||
    product.images?.[0] ||
    "/images/verdant/hero-field.webp";

  const onAdd = () => {
    if (!canAddToBag) {
      toast({
        title: hasSizes
          ? "Choose a size"
          : "This item is unavailable",
        description: hasSizes
          ? "Please select a size before adding it to your bag."
          : "This product is currently out of stock.",
      });

      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      size: size || undefined,
      color: color || undefined,
      quantity: qty,
    });

    const options = [
      size,
      color,
    ].filter(Boolean);

    toast({
      title: "Added to bag",
      description: options.length
        ? `${product.name} · ${options.join(" · ")}`
        : product.name,
    });
  };

  const onWishlist = () => {
    toggleWishlist(product.id);

    toast({
      title: inWishlist ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
    });
  };

  const decreaseQuantity = () => {
    setQty((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQty((current) =>
      Math.min(
        Math.max(1, product.inventory),
        current + 1,
      ),
    );
  };

  const salePercent =
    product.compareAt &&
    product.compareAt > product.price
      ? Math.round(
          ((product.compareAt - product.price) /
            product.compareAt) *
            100,
        )
      : 0;

  return (
    <div className="page-dense pt-24 pb-16 md:pt-32">
      {/* Breadcrumb */}
      <div
        className="mb-6 flex flex-wrap items-center gap-2 text-xs"
        style={{
          color: "var(--muted-foreground)",
        }}
        data-animate="fade"
      >
        <button
          type="button"
          onClick={() => navigate("home")}
          className="transition-colors hover:text-[var(--forest-deep)]"
        >
          Home
        </button>

        <span>/</span>

        <button
          type="button"
          onClick={() => navigate("shop")}
          className="transition-colors hover:text-[var(--forest-deep)]"
        >
          Shop
        </button>

        <span>/</span>

        <button
          type="button"
          onClick={() =>
            navigate("shop", {
              category: product.category,
            })
          }
          className="transition-colors hover:text-[var(--forest-deep)]"
        >
          {product.category}
        </button>

        <span>/</span>

        <span
          className="max-w-[220px] truncate"
          style={{
            color: "var(--forest-deep)",
          }}
        >
          {product.name}
        </span>
      </div>

      {/* Main product */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div data-animate="rise">
          <div className="glass-card mb-3 aspect-[3/4] overflow-hidden rounded-[2rem]">
            <img
              src={currentImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImg(index)}
                  className="glass-card aspect-square overflow-hidden rounded-[1rem] transition-transform hover:scale-[1.02]"
                  style={{
                    outline:
                      activeImg === index
                        ? "2px solid var(--straw-deep)"
                        : "none",
                    outlineOffset:
                      activeImg === index ? "2px" : "0",
                  }}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div data-animate="rise" data-delay="0.1">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <span className="tag-soft">
              {product.category}
            </span>

            <span
              className="flex items-center gap-1.5 text-sm"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                className="text-[11px]"
                style={{
                  color: "var(--straw-deep)",
                }}
              />

              {Number(product.rating || 0).toFixed(1)}

              <span>·</span>

              {product.reviewCount || 0} reviews
            </span>
          </div>

          <h1
            className="font-display text-3xl leading-[1.06] md:text-5xl"
            style={{
              color: "var(--forest-deep)",
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span
              className="font-display text-2xl font-bold md:text-3xl"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              {product.price.toLocaleString()} EGP
            </span>

            {product.compareAt &&
              product.compareAt > product.price && (
                <>
                  <span
                    className="text-base line-through"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {product.compareAt.toLocaleString()} EGP
                  </span>

                  <span
                    className="rounded-full px-2 py-0.5 text-xs"
                    style={{
                      background:
                        "rgba(184, 134, 29, 0.18)",
                      color: "var(--straw-deep)",
                    }}
                  >
                    {salePercent}% off
                  </span>
                </>
              )}
          </div>

          {/* Description */}
          <p
            className="mt-5 text-base leading-relaxed"
            style={{
              color: "var(--foreground)",
            }}
          >
            {product.longDescription ||
              product.description}
          </p>

          {/* Colors */}
          {hasColors && (
            <div className="mt-7">
              <p
                className="font-display mb-2.5 text-sm font-semibold"
                style={{
                  color: "var(--forest-deep)",
                }}
              >
                Colour:{" "}
                <span
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {color || "Select"}
                </span>
              </p>

              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setColor(item.name)}
                    className="h-10 w-10 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: item.hex,
                      outline:
                        color === item.name
                          ? "2px solid var(--straw-deep)"
                          : "1px solid rgba(31, 61, 43, 0.2)",
                      outlineOffset:
                        color === item.name ? "2px" : "0",
                    }}
                    aria-label={`Select ${item.name}`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {hasSizes && (
            <div className="mt-6">
              <div className="mb-2.5 flex items-center justify-between gap-4">
                <p
                  className="font-display text-sm font-semibold"
                  style={{
                    color: "var(--forest-deep)",
                  }}
                >
                  Size
                </p>

                <button
                  type="button"
                  onClick={() => navigate("size-guide")}
                  className="inline-flex items-center gap-1.5 text-xs"
                  style={{
                    color: "var(--straw-deep)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRuler}
                    className="text-[10px]"
                  />
                  Size guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className="min-w-[48px] rounded-full px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      background:
                        size === item
                          ? "var(--forest)"
                          : "rgba(255, 252, 244, 0.55)",
                      color:
                        size === item
                          ? "var(--beige)"
                          : "var(--forest-deep)",
                      border:
                        "1px solid rgba(31, 61, 43, 0.22)",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add */}
          <div className="mt-7 flex items-center gap-3">
            <div
              className="flex shrink-0 items-center rounded-full"
              style={{
                background:
                  "rgba(255, 252, 244, 0.55)",
                border:
                  "1px solid rgba(31, 61, 43, 0.22)",
              }}
            >
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={qty <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  className="text-[12px]"
                />
              </button>

              <span className="font-display w-8 text-center text-base font-semibold">
                {qty}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  isOutOfStock ||
                  qty >= product.inventory
                }
                className="flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[12px]"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={onAdd}
              disabled={!canAddToBag}
              className="btn-glass flex min-w-0 flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isOutOfStock
                ? "Out of stock"
                : `Add to bag · ${(product.price * qty).toLocaleString()} EGP`}
            </button>

            <button
              type="button"
              onClick={onWishlist}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all"
              style={{
                background: inWishlist
                  ? "rgba(184, 59, 46, 0.92)"
                  : "rgba(255, 252, 244, 0.55)",
                color: inWishlist
                  ? "var(--beige)"
                  : "var(--forest-deep)",
                border:
                  "1px solid rgba(31, 61, 43, 0.22)",
              }}
              aria-label={
                inWishlist
                  ? "Remove from wishlist"
                  : "Save to wishlist"
              }
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>

          {/* Buy now */}
          <button
            type="button"
            onClick={() => {
              onAdd();

              if (canAddToBag) {
                navigate("checkout");
              }
            }}
            className="btn-straw mt-3 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canAddToBag}
          >
            Buy now

            <FontAwesomeIcon
              icon={faArrowLeft}
              className="rotate-180 text-[12px]"
            />
          </button>

          {/* Stock */}
          <p
            className="mt-4 text-xs"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {isOutOfStock
              ? "Out of stock"
              : `${product.inventory} pieces remaining — restocked slowly`}
          </p>

          {/* Trust */}
          <div className="glass-card mt-7 grid grid-cols-1 gap-4 rounded-[1.5rem] p-5 sm:grid-cols-2">
            {[
              {
                icon: faTruck,
                label:
                  "Free shipping over 2,500 EGP",
              },
              {
                icon: faRecycle,
                label: "Lifetime free repair",
              },
              {
                icon: faShieldHeart,
                label:
                  "Secure checkout · TLS 1.3",
              },
              {
                icon: faLeaf,
                label:
                  "Organic, certified fibres",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-[13px]"
                  style={{
                    color: "var(--forest)",
                  }}
                />

                <span
                  className="text-xs"
                  style={{
                    color:
                      "var(--muted-foreground)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {data.related?.length > 0 && (
        <section className="mt-16 md:mt-24">
          <div
            className="mb-8 flex items-end justify-between gap-4"
            data-animate="rise"
          >
            <h2
              className="font-display text-3xl md:text-4xl"
              style={{
                color: "var(--forest-deep)",
              }}
            >
              You may also like
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate("shop", {
                  category: product.category,
                })
              }
              className="btn-ghost-glass shrink-0"
            >
              All in {product.category}
            </button>
          </div>

          <div
            className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4"
            data-animate-stagger
          >
            {data.related.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                data-stagger-child
              >
                <ProductCard
                  product={relatedProduct}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}