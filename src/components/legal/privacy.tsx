import { LegalPage, LegalList } from "./layout";

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How Verdant collects, uses, and protects the personal information you share with us."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Overview",
          body: (
            <>
              <p>
                Verdant Studio (&quot;Verdant&quot;, &quot;we&quot;, &quot;us&quot;) operates the e-commerce storefront
                at verdant.egypt (&quot;the Site&quot;). This Privacy Policy describes the categories of personal
                information we collect when you visit, register, or place an order, the purposes for which we
                use that information, and the choices available to you.
              </p>
              <p>
                By using the Site, you agree to the practices described here. Where Egyptian law —
                particularly Law No. 151 of 2020 on the Protection of Personal Data (&quot;the Data Protection
                Law&quot;) and the related Executive Regulations issued by the Personal Data Protection Centre
                (PDPC) — imposes stricter requirements, those requirements prevail.
              </p>
            </>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We collect the following categories of information:</p>
              <LegalList
                items={[
                  "Account information: your name, email address, password (stored as a bcrypt hash), and optional profile fields such as phone number and avatar.",
                  "Order information: billing and shipping name, address, city, country, postal code, phone number, and the items you ordered.",
                  "Payment information: Verdant does not store full card numbers. Card data is collected directly by our payment partners and is governed by their own privacy policies.",
                  "Browsing information: pages visited, products viewed, referrer, device type, IP address, and similar analytics.",
                  "Communication: messages you send us through our contact form, email, or chat.",
                ]}
              />
            </>
          ),
        },
        {
          heading: "How we use information",
          body: (
            <>
              <p>We process your personal information for the following purposes:</p>
              <LegalList
                items={[
                  "To register and authenticate your account, and to keep the Site secure (Article 19, Data Protection Law — legitimate interest).",
                  "To process, fulfil, and ship your orders, and to communicate with you about them (Article 19 — contract performance).",
                  "To send marketing communications to customers who have opted in, and to provide an unsubscribe mechanism in every message (Article 19 — consent, withdrawable at any time).",
                  "To improve our products, marketing, and the Site itself through aggregated, de-identified analytics.",
                  "To meet legal obligations under Egyptian consumer protection and tax law.",
                ]}
              />
            </>
          ),
        },
        {
          heading: "Legal basis for processing",
          body: (
            <p>
              Under Egyptian Law No. 151 of 2020, we rely on the following legal bases: (a) your explicit
              consent when you subscribe to newsletters or accept non-essential cookies; (b) the performance
              of a contract when you place an order and create an account; (c) our legitimate interests in
              fraud prevention, network security, and improving the customer experience; and (d) compliance
              with legal obligations under Egyptian tax, customs, and consumer-protection statutes.
            </p>
          ),
        },
        {
          heading: "Sharing and sub-processors",
          body: (
            <>
              <p>
                We share personal information with carefully selected sub-processors who act on our written
                instructions and are bound by data-processing agreements. Current sub-processors include:
              </p>
              <LegalList
                items={[
                  "Payment processors — to authorise and settle card transactions.",
                  "Shipping carriers (Aramex, DHL Egypt, Bosta) — to deliver your orders.",
                  "Email and transactional messaging providers — to deliver order confirmations and newsletters.",
                  "Cloud hosting — to store and serve the Site and database.",
                  "Analytics providers — to help us understand how the Site is used.",
                ]}
              />
              <p>
                We do not sell personal information to third parties. We may disclose information when
                required by Egyptian courts, the Public Prosecutor, or the Personal Data Protection Centre.
              </p>
            </>
          ),
        },
        {
          heading: "International transfers",
          body: (
            <p>
              Some sub-processors are located outside Egypt. Where this is the case, we transfer data only
              to countries that have been recognised by the PDPC as providing an adequate level of
              protection, or under the standard contractual clauses approved by the PDPC for international
              transfers.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>Under the Data Protection Law, you have the following rights:</p>
              <LegalList
                items={[
                  "Right of access — request a copy of the personal information we hold about you.",
                  "Right to rectification — correct inaccurate or incomplete information.",
                  "Right to erasure — request deletion of your data, subject to legal retention obligations.",
                  "Right to restrict or object to processing — limit how we use your data.",
                  "Right to data portability — receive your data in a structured, machine-readable format.",
                  "Right to withdraw consent at any time, without affecting the lawfulness of processing before withdrawal.",
                ]}
              />
              <p>
                To exercise any right, contact privacy@verdant.egypt. We respond within 30 days as required
                by Article 24 of the Data Protection Law.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              We use essential cookies (shopping cart, session authentication) and non-essential cookies
              (analytics, marketing). Non-essential cookies are only placed after you consent via the cookie
              banner. You can revoke consent at any time through the cookies preference centre linked in the
              footer.
            </p>
          ),
        },
        {
          heading: "Data retention",
          body: (
            <p>
              We retain account information for as long as your account is active. Order information is
              retained for the statutory period required by Egyptian tax law (currently seven years) and
              thereafter deleted or anonymised. Newsletter subscriptions are deleted within 30 days of
              unsubscribe.
            </p>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              We protect personal information with TLS 1.3 in transit, AES-256 at rest, bcrypt password
              hashing (cost factor 12), strict access controls, and continuous monitoring. Details are in
              our Security Policy.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              The Site is not directed at children under 16 and we do not knowingly collect personal
              information from them. If you believe a child has provided us with personal information,
              contact us at privacy@verdant.egypt and we will delete it.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              We may update this policy from time to time. The &quot;last updated&quot; date at the top of
              this page reflects the most recent revision. Material changes will be communicated by email
              to registered customers at least 14 days before they take effect.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Verdant Studio, 14 Al-Sawy Waterwheel Lane, Zamalek, Cairo, Egypt. Email:
              privacy@verdant.egypt. Phone: +20 2 2735 9000. For complaints about our handling of personal
              data, you may also contact the Personal Data Protection Centre at pdpc.eg.
            </p>
          ),
        },
      ]}
    />
  );
}
