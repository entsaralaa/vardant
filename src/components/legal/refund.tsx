import { LegalPage, LegalList } from "./layout";

export function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Returns Policy"
      subtitle="How to return an item, when refunds are issued, and how long each step takes."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Eligibility",
          body: (
            <>
              <p>
                You may return any item within 14 days of delivery, in line with Egyptian Consumer
                Protection Law No. 67 of 2006 and its amendments. The item must be unworn, unwashed, and
                with all tags and original packaging intact. Underwear, swimwear, and pierced jewellery
                are non-returnable for hygiene reasons.
              </p>
              <p>
                Items marked as final sale, custom-monogrammed pieces, and items purchased with a
                gift-card balance cannot be returned.
              </p>
            </>
          ),
        },
        {
          heading: "How to start a return",
          body: (
            <>
              <p>To start a return:</p>
              <LegalList
                ordered
                items={[
                  "Sign in to your Verdant account.",
                  "Open the order from your Order History.",
                  "Click \"Request return\" next to the item you wish to return.",
                  "Select the reason for return and your preferred refund method.",
                  "Print the prepaid return label that we email to you within 24 hours.",
                ]}
              />
              <p>
                If you checked out as a guest, you can start a return using the order-number and email
                lookup on the same page.
              </p>
            </>
          ),
        },
        {
          heading: "Shipping the return",
          body: (
            <p>
              The prepaid return label covers Aramex ground shipping within Egypt. Drop the package at
              any Aramex branch or authorised drop-off point. Return shipping is free for orders over
              2,500 EGP; for smaller orders, a flat 65 EGP return fee is deducted from your refund.
            </p>
          ),
        },
        {
          heading: "Inspection",
          body: (
            <p>
              When the package reaches our Cairo studio, we inspect the items within 2 working days. You
              will receive an email confirming the inspection result. If an item fails inspection because
              it has been worn or damaged, we will email you photographs and offer to ship the item back to
              you (at your cost) or recycle it on your behalf.
            </p>
          ),
        },
        {
          heading: "Refund methods",
          body: (
            <LegalList
              items={[
                "Original payment method — funds are returned to the card you used at checkout. Banks typically reflect the refund within 5–10 working days.",
                "Verdant store credit — issued instantly and valid for 24 months from the refund date. Includes a 5% bonus as a thank-you for choosing store credit.",
                "Bank transfer (Egyptian accounts only) — issued within 7 working days for orders originally paid by cash on delivery.",
              ]}
            />
          ),
        },
        {
          heading: "Refund timeline",
          body: (
            <p>
              Refunds are issued within 10 working days of receipt of the returned items at our studio.
              You will receive an email receipt for every refund with a reference number you can use when
              contacting your bank or our support team.
            </p>
          ),
        },
        {
          heading: "Faulty or wrong items",
          body: (
            <p>
              If you receive an item that is faulty, damaged, or different from what you ordered, contact
              us at returns@verdant.egypt within 7 days of delivery. We will arrange free return shipping
              and a full refund — including the original outbound shipping — or send a replacement at no
              cost. You may also choose store credit for the full order value plus a 10% goodwill credit.
            </p>
          ),
        },
        {
          heading: "Exchanges",
          body: (
            <p>
              To exchange an item for a different size or colour, the simplest path is to return the
              original item for store credit and place a new order for the replacement. This avoids
              stock-availability issues while your return is in transit.
            </p>
          ),
        },
        {
          heading: "Final-sale items",
          body: (
            <p>
              Final-sale items cannot be returned or exchanged. These are clearly labelled on the product
              page and at checkout. Final-sale items are still covered by the statutory warranty against
              defects under Article 22 of the Consumer Protection Law.
            </p>
          ),
        },
        {
          heading: "Cash on delivery refunds",
          body: (
            <p>
              For orders placed with cash on delivery, refunds are issued via bank transfer to an Egyptian
              account in your name. You will be asked to provide your account details securely when
              starting the return. We do not refund cash in person at our studio.
            </p>
          ),
        },
        {
          heading: "Refusal of refund",
          body: (
            <p>
              We may refuse a refund where there is evidence of fraud, where the return window has been
              exceeded without prior arrangement, where the item has been altered, or where the returned
              item is not the item we shipped. In every case we provide a written explanation and a right
              of reply within 7 days.
            </p>
          ),
        },
        {
          heading: "Statutory rights",
          body: (
            <p>
              Nothing in this policy affects the statutory rights you have under Egyptian Consumer
              Protection Law No. 67 of 2006, including the right to a 14-day withdrawal period, the right
              to a replacement or price reduction for defective goods, and the right to escalate
              unresolved disputes to the Consumer Protection Agency (CPA) at cpa.eg.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Verdant Studio, 14 Al-Sawy Waterwheel Lane, Zamalek, Cairo, Egypt. Email:
              returns@verdant.egypt. Phone: +20 2 2735 9001 (Mon–Sat, 10:00–18:00).
            </p>
          ),
        },
      ]}
    />
  );
}
