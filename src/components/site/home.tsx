"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLeaf,
  faSeedling,
  faScissors,
  faRuler,
  faSpa,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/components/providers";
import { ProductCard, type Product } from "@/components/shop/product-card";
import { api } from "@/lib/api";

export function HomePage() {
  const { navigate } = useRouter();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api<{ products: Product[] }>("/api/products/featured")
      .then((r) => setFeatured(r.products || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <div className="pt-0">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative w-full min-h-[760px] h-[94vh] overflow-hidden">
        {/* Background */}
        <img
          src="/images/verdant/hero-field.webp"
          alt="Backlit tall grass in a wild meadow at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          data-parallax="0.18"
        />

        {/* Main overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 36, 23, 0.42) 0%, rgba(15, 36, 23, 0.16) 28%, rgba(15, 36, 23, 0.38) 62%, rgba(15, 36, 23, 0.72) 100%)",
          }}
        />

        {/* Extra top protection for fixed navbar */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 36, 23, 0.34) 0%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col">
          {/* Reserve comfortable space below fixed navbar */}
          <div className="page-dense flex-1 flex items-end pt-[88px] md:pt-[100px]">
            <div className="max-w-2xl pb-10 md:pb-14">
              {/* Eyebrow */}
              <p
                className="tag-soft mb-5 inline-flex"
                data-animate="rise"
                style={{
                  background: "rgba(212, 168, 65, 0.94)",
                  color: "var(--forest-deep)",
                }}
              >
                Autumn 2026 · The Field Collection
              </p>

              {/* Main heading */}
              <h1
                className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.94] tracking-tight"
                style={{ color: "var(--beige)" }}
                data-animate="rise"
                data-delay="0.05"
              >
                Clothing woven
                <br />
                from the meadow.
              </h1>

              {/* Description */}
              <p
                className="mt-6 md:mt-7 text-base md:text-lg max-w-xl leading-[1.7]"
                style={{ color: "rgba(239, 229, 210, 0.94)" }}
                data-animate="rise"
                data-delay="0.12"
              >
                Linen spun from European flax, organic cotton grown without
                irrigation, and natural dyes pulled from chamomile, indigo,
                and oak gall. Designed in Cairo, finished by hand.
              </p>

              {/* CTA Buttons */}
              <div
                className="mt-9 md:mt-10 flex flex-wrap gap-3.5"
                data-animate="rise"
                data-delay="0.18"
              >
                <button
                  onClick={() => navigate("shop")}
                  className="btn-straw"
                >
                  Shop the collection
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[13px]"
                  />
                </button>

                <button
                  onClick={() => navigate("lookbook")}
                  className="btn-ghost-glass"
                  style={{
                    color: "var(--beige)",
                    borderColor: "rgba(239, 229, 210, 0.4)",
                  }}
                >
                  View the lookbook
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="text-[13px]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              HERO STAT STRIP
          ====================================================== */}
          <div className="page-dense pb-8 md:pb-10 pt-2 md:pt-4">
            <div
              className="glass-strong rounded-[2rem] px-5 py-5 md:px-6 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 md:gap-6"
              data-animate="rise"
              data-delay="0.22"
            >
              {[
                {
                  icon: faLeaf,
                  label: "100% natural fibers",
                  body: "Linen, organic cotton, hemp",
                },
                {
                  icon: faSeedling,
                  label: "Carbon-positive studio",
                  body: "−2.4t CO2e / 100 pieces",
                },
                {
                  icon: faScissors,
                  label: "Hand-finished in Cairo",
                  body: "Living-wage atelier",
                },
                {
                  icon: faRuler,
                  label: "Lifetime repair promise",
                  body: "Free mending, forever",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 min-w-0"
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(31, 61, 43, 0.12)",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={s.icon}
                      className="text-[15px]"
                      style={{ color: "var(--forest)" }}
                    />
                  </span>

                  <div className="min-w-0">
                    <p
                      className="font-display text-sm font-semibold leading-snug"
                      style={{
                        color: "var(--forest-deep)",
                      }}
                    >
                      {s.label}
                    </p>

                    <p
                      className="text-xs mt-1 leading-relaxed"
                      style={{
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MANIFESTO
      ========================================================== */}
      <section className="section-tight page-dense">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7" data-animate="rise">
            <p className="tag-soft mb-4">Our studio</p>

            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.04]"
              style={{ color: "var(--forest-deep)" }}
            >
              A slow house, building garments that quietly outlast the season.
            </h2>

            <p
              className="mt-6 text-base md:text-lg leading-[1.75]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Verdant began in a small atelier in Zamalek, where a single loom
              clattered through the afternoon. Today we work with growers in
              the Delta, dyers in Fayoum, and weavers in Florence — but the
              pace is unchanged. We release small collections, not seasons; we
              mend, not replace; and we put the meadow on your shoulders, not
              on a billboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("about")}
                className="btn-glass"
              >
                Read our story
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[12px]"
                />
              </button>

              <button
                onClick={() => navigate("sustainability")}
                className="btn-ghost-glass"
              >
                Sustainability report
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4"
            data-animate-stagger
          >
            <div
              className="aspect-[3/4] rounded-[1.5rem] overflow-hidden glass-card"
              data-stagger-child
            >
              <img
                src="/images/verdant/atelier.webp"
                alt="Field of tall grasses"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="aspect-[3/4] rounded-[1.5rem] overflow-hidden glass-card mt-8"
              data-stagger-child
            >
              <img
                src="/images/verdant/atelier.webp"
                alt="Hand weaving on a wooden loom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED COLLECTION
      ========================================================== */}
      <section className="section-tight page-dense">
        <div
          className="flex items-end justify-between mb-9 md:mb-11"
          data-animate="rise"
        >
          <div>
            <p className="tag-soft mb-3">Field Collection</p>

            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl"
              style={{ color: "var(--forest-deep)" }}
            >
              Pieces from this autumn
            </h2>
          </div>

          <button
            onClick={() => navigate("shop")}
            className="hidden sm:inline-flex btn-ghost-glass"
          >
            All pieces
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[12px]"
            />
          </button>
        </div>

        {loaded ? (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
            data-animate-stagger
          >
            {featured.slice(0, 4).map((p) => (
              <div key={p.id} data-stagger-child>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-[2rem] overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================== */}
      <section className="section-tight page-dense">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {[
            {
              title: "Linen shirts",
              img: "/images/verdant/shirt.webp",
              route: "shop" as const,
              params: { category: "Shirts" },
            },
            {
              title: "Knitwear",
              img: "/images/verdant/trousers.webp",
              route: "shop" as const,
              params: { category: "Knitwear" },
            },
            {
              title: "Accessories",
              img: "/images/verdant/hat.webp",
              route: "shop" as const,
              params: { category: "Accessories" },
            },
          ].map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate(cat.route, cat.params)}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card group text-left"
              data-animate="scale"
              data-delay={i * 0.08}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15, 36, 23, 0) 30%, rgba(15, 36, 23, 0.72) 100%)",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p
                  className="font-display text-2xl md:text-3xl"
                  style={{ color: "var(--beige)" }}
                >
                  {cat.title}
                </p>

                <p
                  className="flex items-center gap-2 mt-2 text-sm"
                  style={{
                    color: "rgba(239, 229, 210, 0.85)",
                  }}
                >
                  Explore
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[11px]"
                  />
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================
          QUOTE
      ========================================================== */}
      <section className="section-tight page-dense">
        <div
          className="glass-card rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden"
          data-animate="scale"
        >
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, var(--sage) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div
            className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, var(--straw) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "rgba(31, 61, 43, 0.12)",
              }}
            >
              <FontAwesomeIcon
                icon={faSpa}
                className="text-[20px]"
                style={{ color: "var(--forest)" }}
              />
            </span>

            <p
              className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] max-w-4xl mx-auto"
              style={{ color: "var(--forest-deep)" }}
            >
              &quot;The meadow keeps no calendar. It greens when it must,
              ripens when it can, and rests when the work is done. We try to do
              the same.&quot;
            </p>

            <p
              className="mt-7 text-sm uppercase tracking-[0.2em]"
              style={{ color: "var(--straw-deep)" }}
            >
              Marwa El-Said · Founder, Verdant
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNAL
      ========================================================== */}
      <section className="section-tight page-dense">
        <div
          className="flex items-end justify-between mb-9"
          data-animate="rise"
        >
          <div>
            <p className="tag-soft mb-3">Field notes</p>

            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl"
              style={{ color: "var(--forest-deep)" }}
            >
              From the journal
            </h2>
          </div>

          <button
            onClick={() => navigate("journal")}
            className="btn-ghost-glass"
          >
            All entries
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[12px]"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              img: "/images/verdant/hero-field.webp",
              tag: "Materials",
              title: "The slow alchemy of oak gall dye",
              excerpt:
                "How we get a forest-deep green from a single oak gall, and why we wait six weeks for the colour to set.",
            },
            {
              img: "/images/verdant/atelier.webp",
              tag: "Process",
              title: "One hundred hands in the Delta",
              excerpt:
                "A morning with the linen growers of Kafr El-Sheikh, where flax is still pulled by hand at first light.",
            },
            {
              img: "/images/verdant/hat.webp",
              tag: "Studio",
              title: "Mending, not replacing",
              excerpt:
                "Our free lifetime repair promise — how it works, why we do it, and what we ask of you.",
            },
          ].map((post, i) => (
            <button
              key={i}
              onClick={() =>
                navigate("journal-post", {
                  id: String(i + 1),
                })
              }
              className="glass-card rounded-[2rem] overflow-hidden text-left group"
              data-animate="rise"
              data-delay={i * 0.08}
            >
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                />
              </div>

              <div className="p-5 md:p-6">
                <span className="tag-soft mb-3">
                  {post.tag}
                </span>

                <p
                  className="font-display text-lg md:text-xl leading-[1.18]"
                  style={{ color: "var(--forest-deep)" }}
                >
                  {post.title}
                </p>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {post.excerpt}
                </p>

                <p
                  className="mt-4 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--straw-deep)" }}
                >
                  Read entry
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[11px]"
                  />
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}