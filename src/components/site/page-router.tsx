"use client";

import { useEffect } from "react";
import { useRouter } from "@/components/providers";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HomePage } from "@/components/site/home";
import { ShopPage } from "@/components/site/shop";
import { ProductDetailPage } from "@/components/site/product-detail";
import { CartPage } from "@/components/site/cart";
import { CheckoutPage } from "@/components/site/checkout";
import { WishlistPage } from "@/components/site/wishlist";
import { LoginPage } from "@/components/auth/login";
import { SignupPage } from "@/components/auth/signup";
import { AccountPage } from "@/components/auth/account";
import {
  AboutPage,
  ContactPage,
  LookbookPage,
  JournalPage,
  JournalPostPage,
  SustainabilityPage,
  ShippingPage,
  SizeGuidePage,
  FaqPage,
  CareersPage,
} from "@/components/site/info-pages";
import { PrivacyPolicyPage } from "@/components/legal/privacy";
import { TermsOfUsePage } from "@/components/legal/terms";
import { SecurityPolicyPage } from "@/components/legal/security";
import { RefundPolicyPage } from "@/components/legal/refund";
import { DataProcessingAgreementPage } from "@/components/legal/dpa";
import { EgyptTradingLawsPage } from "@/components/legal/egypt-trading";
import { CookiesPage } from "@/components/legal/cookies";
import { NotFoundPage } from "@/components/site/not-found";

let seeded = false;

export function PageRouter() {
  const { route, hydrated } = useRouter();

  // Seed database on first client mount only
  useEffect(() => {
    if (seeded) return;
    seeded = true;
    fetch("/api/seed", { method: "POST" }).catch(() => {});
  }, []);

  let page: React.ReactNode;
  switch (route) {
    case "home": page = <HomePage />; break;
    case "shop": page = <ShopPage />; break;
    case "product": page = <ProductDetailPage />; break;
    case "cart": page = <CartPage />; break;
    case "checkout": page = <CheckoutPage />; break;
    case "wishlist": page = <WishlistPage />; break;
    case "login": page = <LoginPage />; break;
    case "signup": page = <SignupPage />; break;
    case "account": page = <AccountPage />; break;
    case "about": page = <AboutPage />; break;
    case "contact": page = <ContactPage />; break;
    case "lookbook": page = <LookbookPage />; break;
    case "journal": page = <JournalPage />; break;
    case "journal-post": page = <JournalPostPage />; break;
    case "sustainability": page = <SustainabilityPage />; break;
    case "shipping": page = <ShippingPage />; break;
    case "size-guide": page = <SizeGuidePage />; break;
    case "faq": page = <FaqPage />; break;
    case "careers": page = <CareersPage />; break;
    case "privacy": page = <PrivacyPolicyPage />; break;
    case "terms": page = <TermsOfUsePage />; break;
    case "security": page = <SecurityPolicyPage />; break;
    case "refund": page = <RefundPolicyPage />; break;
    case "dpa": page = <DataProcessingAgreementPage />; break;
    case "egypt-trading": page = <EgyptTradingLawsPage />; break;
    case "cookies": page = <CookiesPage />; break;
    default: page = <NotFoundPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="meadow-backdrop grain-overlay" />
      <Navbar />
      <main className="flex-1">
        {/* On SSR / first client render before hydration, render a tiny placeholder
            to avoid route mismatch between server and client. */}
        {hydrated === false ? (
          <div className="page-dense pt-28 md:pt-36 pb-16 min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-12 h-12 rounded-full animate-spin"
                style={{ borderColor: "rgba(212, 168, 65, 0.25)", borderTopColor: "rgba(212, 168, 65, 0.95)" }}
              />
              <p className="font-display text-sm tracking-[0.3em] uppercase" style={{ color: "var(--straw-deep)" }}>
                Verdant
              </p>
            </div>
          </div>
        ) : (
          page
        )}
      </main>
      <Footer />
    </div>
  );
}
