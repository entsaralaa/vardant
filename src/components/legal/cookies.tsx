import { LegalPage, LegalList } from "./layout";

export function CookiesPage() {
  return (
    <LegalPage
      title="Cookies & Tracking Preferences"
      subtitle="How Verdant and its partners use cookies and similar technologies."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "What are cookies?",
          body: (
            <p>
              Cookies are small text files stored on your device when you visit a website. They are
              widely used across the web to keep you signed in, remember preferences, and measure how a
              site is used. Egyptian Law No. 151 of 2020 requires us to obtain your consent for
              non-essential cookies before placing them.
            </p>
          ),
        },
        {
          heading: "Essential cookies",
          body: (
            <>
              <p>These are required for the Site to function. They are placed automatically and cannot be disabled:</p>
              <LegalList
                items={[
                  "verdant-token — stores your authenticated session.",
                  "verdant-cart — keeps your shopping cart between visits.",
                  "verdant-wishlist — keeps your wishlist between visits.",
                  "verdant-consent — records your cookie consent.",
                ]}
              />
            </>
          ),
        },
        {
          heading: "Analytics cookies",
          body: (
            <p>
              We use privacy-respecting, cookie-less analytics that do not require consent under Egyptian
              law. Where we add a third-party analytics provider that places cookies, we will request
              your consent and you may withdraw it at any time through the cookie preference centre in
              the footer.
            </p>
          ),
        },
        {
          heading: "Marketing cookies",
          body: (
            <p>
              Marketing cookies, if enabled, allow us to show you Verdant products on social-media
              platforms and other websites. They are placed only after you opt in via the cookie banner
              and can be revoked at any time.
            </p>
          ),
        },
        {
          heading: "Managing cookies",
          body: (
            <p>
              Most browsers accept cookies by default. You can configure your browser to refuse cookies
              or to alert you when a cookie is being placed. Please note that disabling essential
              cookies will affect the operation of the Site — for example, you may not be able to log in
              or to keep items in your cart.
            </p>
          ),
        },
      ]}
    />
  );
}
