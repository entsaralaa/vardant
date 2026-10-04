import type { Metadata } from "next";
import { Nunito, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
// (Providers combines SmoothScroll + GsapProvider + PageTransition; the hash router
// lives in ./router and is consumed via useRouter hook.)

const nunito = Nunito({
  variable: "--font-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Verdant — Meadow-Woven Clothing",
  description: "Verdant is a clothing house drawing inspiration from wild meadows, rolling hills, and backlit tall grasses. Timeless, organic, and quietly luxurious garments made for life outdoors.",
  keywords: ["Verdant", "organic clothing", "meadow", "linen", "Egypt", "sustainable fashion", "natural fiber"],
  authors: [{ name: "Verdant Studio" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Verdant — Meadow-Woven Clothing",
    description: "Timeless, organic, and quietly luxurious garments made for life outdoors.",
    siteName: "Verdant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdant — Meadow-Woven Clothing",
    description: "Timeless, organic, and quietly luxurious garments made for life outdoors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${sourceSerif.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
