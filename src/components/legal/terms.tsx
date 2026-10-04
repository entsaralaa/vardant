import { LegalPage, LegalList } from "./layout";

export function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      subtitle="The rules that govern your visit to and purchases from the Verdant Site."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Agreement to terms",
          body: (
            <>
              <p>
                These Terms of Use (&quot;Terms&quot;) form a binding agreement between Verdant Studio
                (&quot;Verdant&quot;, &quot;we&quot;, &quot;us&quot;) and you, the visitor or customer. By
                accessing, browsing, registering an account, or placing an order on the Site, you confirm
                that you have read and accepted these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, you may not access the Site or place an
                order. Visitors who are under 16 may use the Site only with the involvement of a parent or
                legal guardian.
              </p>
            </>
          ),
        },
        {
          heading: "Definitions",
          body: (
            <LegalList
              items={[
                "Site: the Verdant storefront at verdant.egypt, including all pages, sub-domains, and the API.",
                "Customer: any person who creates an account or places an order.",
                "Order: a request to purchase one or more products, submitted through the checkout flow.",
                "Products: items listed for sale on the Site, including clothing, accessories, and related goods.",
                "Content: any text, image, video, or other material displayed on the Site, whether owned by Verdant or contributed by users.",
              ]}
            />
          ),
        },
        {
          heading: "Account registration",
          body: (
            <>
              <p>
                To place an order you must register an account. You agree to provide accurate, current, and
                complete information during registration and to keep it updated. You are solely responsible
                for safeguarding your password and for any activity conducted under your account.
              </p>
              <p>
                You must not share your account credentials, use another customer&apos;s account, or permit
                any third party to use yours. Notify us immediately at security@verdant.egypt if you suspect
                unauthorised use of your account.
              </p>
            </>
          ),
        },
        {
          heading: "Orders and pricing",
          body: (
            <>
              <p>
                All prices on the Site are shown in Egyptian Pounds (EGP) and include the value-added tax
                required by Egyptian Law No. 67 of 2016. Shipping is calculated at checkout and is
                additional, except where a free-shipping promotion applies.
              </p>
              <p>
                We make every effort to display accurate product information, including images, materials,
                sizing, and inventory. Errors may, however, occur. We reserve the right to correct any error
                and to cancel orders that were placed on the basis of an incorrect price or description, with
                a full refund to the original payment method.
              </p>
              <p>
                When you submit an order you make an offer to purchase the listed products. We accept the
                offer — and the contract is formed — when we send the order-confirmation email. Until that
                point, we may decline the order in whole or in part.
              </p>
            </>
          ),
        },
        {
          heading: "Payment",
          body: (
            <p>
              We accept major cards through our payment processor, as well as cash on delivery for orders
              within Egypt up to 5,000 EGP. Payment is taken in Egyptian Pounds. For card payments, the
              charge on your statement may appear under the name of our payment processor.
            </p>
          ),
        },
        {
          heading: "Shipping",
          body: (
            <p>
              Orders are shipped by Aramex, DHL Egypt, or Bosta, depending on the destination and service
              selected at checkout. Estimated delivery times are indicative and not guaranteed. Risk in
              the goods passes to you on delivery to the address you provided, except where the carrier
              confirms loss in transit.
            </p>
          ),
        },
        {
          heading: "Returns and refunds",
          body: (
            <p>
              You may return any unworn item with tags intact within 14 days of delivery, in line with
              Egyptian Consumer Protection Law No. 67 of 2006. Refunds are issued to the original payment
              method within 10 working days of receipt. See our Refund Policy for full details.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <>
              <p>
                All Content on the Site — including the Verdant name, logo, photography, product designs,
                marketing copy, lookbooks, and journal entries — is owned by Verdant or licensed to us by
                our suppliers and is protected by Egyptian Law No. 82 of 2002 on the Protection of
                Intellectual Property Rights.
              </p>
              <p>
                You may not copy, reproduce, distribute, or create derivative works from any Content without
                our prior written consent. You may, however, share product links on social media for
                non-commercial purposes.
              </p>
            </>
          ),
        },
        {
          heading: "User conduct",
          body: (
            <LegalList
              items={[
                "You must not use the Site for any unlawful purpose, including fraud, money laundering, or financing of prohibited activities.",
                "You must not attempt to gain unauthorised access to any part of the Site, its database, or our internal systems.",
                "You must not upload or transmit any virus, worm, or other malicious code.",
                "You must not scrape, mirror, or use automated tools to extract data without written permission.",
                "You must not impersonate another person or misrepresent your affiliation with a person or entity.",
              ]}
            />
          ),
        },
        {
          heading: "Reviews and contributions",
          body: (
            <p>
              If you submit a product review, journal comment, or any other user content, you grant us a
              non-exclusive, royalty-free, worldwide licence to use, reproduce, and display that content in
              connection with the Site. You warrant that the content is your own and does not infringe the
              rights of any third party.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the maximum extent permitted by Egyptian law, Verdant shall not be liable for indirect,
              incidental, or consequential damages, or for loss of profits, arising from your use of the
              Site or any product purchased through it. Our aggregate liability for any claim shall not
              exceed the amount paid by you for the relevant order.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These Terms are governed by the laws of the Arab Republic of Egypt. Any dispute that cannot
              be resolved amicably will be submitted to the exclusive jurisdiction of the competent courts
              of Cairo, except where mandatory consumer-protection rules require otherwise.
            </p>
          ),
        },
        {
          heading: "Changes to Terms",
          body: (
            <p>
              We may amend these Terms at any time. The &quot;last updated&quot; date reflects the most
              recent revision. Continued use of the Site after a change constitutes acceptance of the
              updated Terms.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Verdant Studio, 14 Al-Sawy Waterwheel Lane, Zamalek, Cairo, Egypt. Email:
              legal@verdant.egypt. Phone: +20 2 2735 9000.
            </p>
          ),
        },
      ]}
    />
  );
}
