import { LegalPage, LegalList } from "./layout";

export function DataProcessingAgreementPage() {
  return (
    <LegalPage
      title="Data Processing Agreement"
      subtitle="The terms under which Verdant processes personal data on behalf of its customers and partners."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Purpose and scope",
          body: (
            <p>
              This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Use and the
              Privacy Policy of Verdant Studio (&quot;Verdant&quot;, the &quot;Processor&quot;). It is
              intended to comply with Article 27 of Egyptian Law No. 151 of 2020 on the Protection of
              Personal Data and the Executive Regulations issued by the PDPC. The customer or visitor
              (&quot;the Data Subject&quot;) retains the role of controller of their personal data, and
              Verdant processes that data on the customer&apos;s behalf under their instructions.
            </p>
          ),
        },
        {
          heading: "Roles and responsibilities",
          body: (
            <>
              <p>
                The Customer is the controller. The Customer decides the purposes and means of processing
                their personal data, including the choice to register an account, place an order, or
                subscribe to a newsletter.
              </p>
              <p>
                Verdant is the processor. We process personal data only as documented in the Privacy
                Policy and only on the Customer&apos;s instructions, except where required to do so by
                Egyptian law.
              </p>
            </>
          ),
        },
        {
          heading: "Categories of data and subjects",
          body: (
            <LegalList
              items={[
                "Account data: name, email, password hash, profile fields.",
                "Order data: shipping address, phone, items ordered, payment references.",
                "Browsing data: IP address, device, pages viewed.",
                "Communication data: messages exchanged via the contact form, email, or chat.",
              ]}
            />
          ),
        },
        {
          heading: "Purposes of processing",
          body: (
            <LegalList
              items={[
                "Account registration, authentication, and account management.",
                "Order processing, fulfilment, shipping, and customer service.",
                "Marketing communications to subscribers who have opted in.",
                "Aggregated analytics to improve the Site and our products.",
                "Compliance with Egyptian tax, customs, and consumer-protection law.",
              ]}
            />
          ),
        },
        {
          heading: "Sub-processors",
          body: (
            <>
              <p>Verdant engages the following categories of sub-processor:</p>
              <LegalList
                items={[
                  "Cloud hosting providers — for serving the Site and storing the database.",
                  "Payment processors — for card authorisation and settlement.",
                  "Shipping carriers — for delivery of orders.",
                  "Email and messaging providers — for transactional and marketing email.",
                  "Analytics providers — for aggregated, de-identified insights.",
                ]}
              />
              <p>
                We give at least 30 days&apos; notice of any new sub-processor, and the Customer may
                object to a new sub-processor by contacting privacy@verdant.egypt before the change takes
                effect.
              </p>
            </>
          ),
        },
        {
          heading: "International transfers",
          body: (
            <p>
              Where a sub-processor is located outside Egypt, we transfer data only to countries
              recognised by the PDPC as providing an adequate level of protection, or under standard
              contractual clauses approved by the PDPC for cross-border transfers.
            </p>
          ),
        },
        {
          heading: "Technical and organisational measures",
          body: (
            <p>
              Verdant implements the technical and organisational measures set out in our Security Policy.
              These include TLS 1.3 in transit, AES-256 at rest, bcrypt password hashing, strict access
              controls, dependency scanning, and quarterly access reviews.
            </p>
          ),
        },
        {
          heading: "Confidentiality",
          body: (
            <p>
              Personnel with access to personal data are bound by written confidentiality agreements and
              receive data-protection training during onboarding and annually thereafter. Personnel
              access is granted on a need-to-know basis.
            </p>
          ),
        },
        {
          heading: "Data subject rights",
          body: (
            <p>
              Verdant assists the Customer in fulfilling data-subject rights (access, rectification,
              erasure, portability, objection) by responding to requests within 30 days as required by
              Article 24 of the Data Protection Law. Customers may submit requests directly to
              privacy@verdant.egypt.
            </p>
          ),
        },
        {
          heading: "Personal data breach",
          body: (
            <p>
              In the event of a personal-data breach, Verdant notifies the Customer and the PDPC within
              72 hours of becoming aware of the breach, in line with Article 39 of the Data Protection
              Law. We provide a description of the breach, the categories and approximate number of data
              subjects affected, the likely consequences, and the measures we have taken or propose to
              take.
            </p>
          ),
        },
        {
          heading: "Data return and deletion",
          body: (
            <p>
              On termination of the customer relationship, or on the Customer&apos;s request, Verdant
              returns or deletes all personal data, except where retention is required by Egyptian tax
              law (currently 7 years for order data) or where the Customer has separately consented to
              retention.
            </p>
          ),
        },
        {
          heading: "Audit",
          body: (
            <p>
              Verdant maintains audit records of its processing activities and makes them available to
              the PDPC on request. The Customer may commission an external audit of our processing
              activities, at the Customer&apos;s cost, with at least 30 days&apos; notice.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              This DPA is governed by Egyptian Law No. 151 of 2020 on the Protection of Personal Data
              and the Executive Regulations issued by the PDPC. Disputes are submitted to the competent
              courts of Cairo, except where mandatory consumer-protection rules require otherwise.
            </p>
          ),
        },
      ]}
    />
  );
}
