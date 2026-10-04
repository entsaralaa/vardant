"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
} from "@fortawesome/free-brands-svg-icons";
import {
  faLeaf,
  faPaperPlane,
  faArrowRight,
  faShieldHeart,
  faTruck,
  faRecycle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, type RouteKey } from "@/components/providers";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; route: RouteKey }> }> = [
  {
    title: "Shop",
    links: [
      { label: "All clothing", route: "shop" },
      { label: "Lookbook", route: "lookbook" },
      { label: "Wishlist", route: "wishlist" },
      { label: "Cart", route: "cart" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Verdant", route: "about" },
      { label: "Sustainability", route: "sustainability" },
      { label: "Journal", route: "journal" },
      { label: "Careers", route: "careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact us", route: "contact" },
      { label: "Shipping & delivery", route: "shipping" },
      { label: "Size guide", route: "size-guide" },
      { label: "FAQ", route: "faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", route: "privacy" },
      { label: "Terms of Use", route: "terms" },
      { label: "Security Policy", route: "security" },
      { label: "Refund Policy", route: "refund" },
      { label: "Data Processing (DPA)", route: "dpa" },
      { label: "Egypt Trading Laws", route: "egypt-trading" },
    ],
  },
];

export function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      toast({ title: "Subscribed", description: "Welcome to the meadow. Watch your inbox for the next journal." });
      setEmail("");
    } catch (err) {
      toast({ title: "Could not subscribe", description: (err as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="mt-auto relative pt-20 pb-10 px-5 md:px-8">
      {/* Trust strip */}
      <div className="page-dense">
        <div className="glass rounded-[2rem] p-6 md:p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: faTruck, title: "Free shipping", body: "On all orders over 2,500 EGP" },
            { icon: faShieldHeart, title: "Secure checkout", body: "256-bit TLS encryption" },
            { icon: faCircleCheck, title: "30-day returns", body: "Hassle-free refund policy" },
            { icon: faRecycle, title: "Organic fibers", body: "Linen, hemp, organic cotton" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3.5">
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(31, 61, 43, 0.12)" }}
              >
                <FontAwesomeIcon icon={f.icon} className="text-[16px]" style={{ color: "var(--forest)" }} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold" style={{ color: "var(--forest-deep)" }}>
                  {f.title}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter + main footer */}
      <div className="page-dense">
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Newsletter */}
            <div className="p-8 md:p-12 lg:p-14 relative">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, var(--sage) 0%, transparent 70%)" }}
                aria-hidden
              />
              <p className="tag-soft mb-4">Field notes</p>
              <h3 className="font-display text-3xl md:text-4xl leading-[1.05]" style={{ color: "var(--forest-deep)" }}>
                Slow letters from the meadow.
              </h3>
              <p className="mt-3 text-base leading-relaxed max-w-md" style={{ color: "var(--muted-foreground)" }}>
                Once a fortnight we send a long, quiet note — new collections, studio visits, and field journals from the growers, dyers, and weavers behind Verdant.
              </p>
              <form onSubmit={onSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-glass"
                  aria-label="Email"
                />
                <button type="submit" disabled={busy} className="btn-glass shrink-0">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-[13px]" />
                  {busy ? "Joining…" : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Link columns */}
            <div className="p-8 md:p-12 lg:p-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className="font-display text-xs uppercase tracking-[0.18em] mb-3" style={{ color: "var(--straw-deep)" }}>
                    {col.title}
                  </p>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => navigate(link.route)}
                          className="group inline-flex items-center gap-1.5 text-sm text-left hover:text-forest-deep transition-colors"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          <span className="opacity-0 -ml-3 group-hover:ml-0 group-hover:opacity-100 transition-all" style={{ color: "var(--straw-deep)" }}>
                            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
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
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-5 px-2">
          <div className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--forest)" }}
            >
              <FontAwesomeIcon icon={faLeaf} className="text-[12px]" style={{ color: "var(--straw)" }} />
            </span>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              © {new Date().getFullYear()} Verdant Studio. Woven in Cairo, worn everywhere.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <span>Designed in Cairo</span>
            <span aria-hidden>·</span>
            <span>Made slowly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
