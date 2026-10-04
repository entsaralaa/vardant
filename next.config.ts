import type { NextConfig } from "next";

const appRoutes = [
  "home", "shop", "cart", "checkout", "wishlist", "account", "login", "signup",
  "about", "contact", "faq", "careers", "journal", "lookbook", "sustainability",
  "shipping", "size-guide", "privacy", "terms", "security", "refund", "dpa",
  "egypt-trading", "cookies",
];

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      ...appRoutes.map((route) => ({ source: `/${route}`, destination: "/" })),
      { source: "/product/:id", destination: "/" },
      { source: "/journal-post/:id", destination: "/" },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
