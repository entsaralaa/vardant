import { LegalPage, LegalList } from "./layout";

export function EgyptTradingLawsPage() {
  return (
    <LegalPage
      title="Egyptian Trading & E-Commerce Laws"
      subtitle="How buying from and selling to Verdant is governed by Egyptian trading law."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Overview",
          body: (
            <>
              <p>
                Verdant Studio is registered in the Arab Republic of Egypt and operates in compliance with
                Egyptian commercial, consumer-protection, tax, customs, and e-commerce law. This page
                summarises the principal statutes that apply to buying and selling on the Site, both for
                our customers (buyers) and for the studio (seller). It is not legal advice — for specific
                questions, contact legal@verdant.egypt or your own counsel.
              </p>
            </>
          ),
        },
        {
          heading: "E-Commerce Law (No. 151 of 2018)",
          body: (
            <>
              <p>
                Egyptian Law No. 151 of 2018 on Electronic Commerce and the relevant Decree of the
                Ministry of Communications and Information Technology regulate the formation of contracts
                online. A contract concluded electronically is valid and enforceable between the parties
                provided the essential elements of offer, acceptance, and consideration exist.
              </p>
              <p>
                The seller must disclose, before the order is finalised: (a) its commercial name,
                registered address, tax registration number, and contact details; (b) the steps required
                to conclude the contract; (c) the technical means for identifying and correcting input
                errors before placing the order; and (d) the languages offered for the conclusion of the
                contract. All four elements are presented at the Verdant checkout.
              </p>
              <p>
                On submission of an order you make an offer; the contract is formed only when Verdant
                sends an order-confirmation email. Until that point we may decline the order in whole or
                in part.
              </p>
            </>
          ),
        },
        {
          heading: "Electronic Signature Law (No. 15 of 2004)",
          body: (
            <p>
              Electronic signatures and records have the same legal validity as handwritten signatures
              and paper records under Egyptian Law No. 15 of 2004 on Electronic Signatures and the
              Information Technology Authority (ITIDA). Order confirmations, invoices, and digital
              receipts issued by Verdant satisfy the form requirements of the Civil Code.
            </p>
          ),
        },
        {
          heading: "Consumer Protection Law (No. 67 of 2006, amended 2018)",
          body: (
            <>
              <p>
                Egyptian Consumer Protection Law No. 67 of 2006 and its 2018 amendments grant consumers
                the right to:
              </p>
              <LegalList
                items={[
                  "Receive truthful information about goods and services, including price, characteristics, and origin.",
                  "A 14-day cooling-off period for distance contracts (online, telephone, mail order).",
                  "Replacement, refund, or price reduction for defective goods.",
                  "Lodge complaints with the Consumer Protection Agency (CPA) at cpa.eg.",
                ]}
              />
              <p>
                Consumers retain these rights even when the seller is registered outside Egypt, as long
                as the consumer is an Egyptian resident and the goods are destined for delivery in Egypt.
              </p>
            </>
          ),
        },
        {
          heading: "Civil Code (No. 131 of 1948)",
          body: (
            <p>
              The Egyptian Civil Code governs the substantive rules of sale — capacity, consent, object,
              and consideration — that apply to every order placed on the Site. The parties are free to
              agree on terms within the limits of public order and morality, and any term that conflicts
              with mandatory rules of the Civil Code is void.
            </p>
          ),
        },
        {
          heading: "Commercial Code (No. 17 of 1999)",
          body: (
            <p>
              The Commercial Code applies to commercial acts performed by traders and governs aspects of
              our operations as a registered commercial entity — including commercial registration,
              accounting, and the relationship with commercial intermediaries such as carriers and
              commission agents.
            </p>
          ),
        },
        {
          heading: "Tax and VAT (Law No. 67 of 2016)",
          body: (
            <>
              <p>
                Verdant is a registered taxpayer under Egyptian Law No. 67 of 2016 on the Value-Added
                Tax. All prices on the Site are inclusive of VAT at the rate applicable to clothing and
                textiles (currently 14%). For each order we issue a tax-compliant electronic invoice that
                includes the seller&apos;s tax registration number, the customer&apos;s name, the invoice
                date, a sequential invoice number, the description and quantity of goods, the unit price
                and total, and the VAT amount.
              </p>
              <p>
                Customers with a tax registration number may request the invoice be issued in their
                trading name by providing the number at checkout.
              </p>
            </>
          ),
        },
        {
          heading: "Customs (Law No. 207 of 2020 and Executive Regulations)",
          body: (
            <p>
              For international shipments — including items shipped from Verdant&apos;s partner studios
              abroad to customers in Egypt — customs duties and import VAT are levied at the rates
              published by the Egyptian Customs Authority (ECA). The customer is responsible for any
              customs charges on inbound shipments. The Site displays an estimate of duties at checkout
              where applicable.
            </p>
          ),
        },
        {
          heading: "Personal Data Protection (Law No. 151 of 2020)",
          body: (
            <p>
              Egyptian Law No. 151 of 2020 on the Protection of Personal Data and the Executive
              Regulations issued by the Personal Data Protection Centre (PDPC) govern how we collect,
              use, share, and retain customer personal data. The rights of the data subject — access,
              rectification, erasure, portability, and objection — are described in our Privacy Policy
              and Data Processing Agreement.
            </p>
          ),
        },
        {
          heading: "Cybercrime (Law No. 175 of 2018)",
          body: (
            <p>
              Egyptian Law No. 175 of 2018 on the Combat of Cybercrime criminalises unauthorised access,
              interception, and interference with information systems. Any attempt to gain unauthorised
              access to the Verdant Site or its database will be reported to the National Telecommunications
              Regulatory Authority (NTRA) and may be prosecuted under this Law.
            </p>
          ),
        },
        {
          heading: "Intellectual Property (Law No. 82 of 2002)",
          body: (
            <p>
              All trademarks, product designs, photography, and marketing copy on the Site are protected
              by Egyptian Law No. 82 of 2002 on the Protection of Intellectual Property Rights. Infringement
              may give rise to civil and criminal liability.
            </p>
          ),
        },
        {
          heading: "Money laundering (Law No. 80 of 2002)",
          body: (
            <p>
              As a seller of consumer goods, Verdant complies with Egyptian Law No. 80 of 2002 on
              Anti-Money Laundering and its Executive Regulations. Orders that exceed 50,000 EGP in cash
              equivalent, or that show indicators of structuring, are subject to enhanced due diligence
              and may be reported to the Egyptian Money Laundering Combating Unit (EMLCU).
            </p>
          ),
        },
        {
          heading: "Sales as a consumer (your obligations)",
          body: (
            <LegalList
              items={[
                "Provide accurate shipping information — Verdant is not liable for failed delivery to incorrect addresses provided by the customer.",
                "Be present, or appoint a representative, to receive the order at the agreed time and address.",
                "Inspect the goods on delivery and notify us of any visible defect within 48 hours.",
                "Pay the agreed price, including any customs duties on international orders.",
                "Use the goods in accordance with their intended purpose and any care instructions provided.",
              ]}
            />
          ),
        },
        {
          heading: "Selling as a trader on Verdant",
          body: (
            <LegalList
              items={[
                "Traders offering goods on Verdant must hold a valid Commercial Registration and Tax Registration Number.",
                "Traders must comply with consumer-protection law, including the 14-day withdrawal period.",
                "Traders must declare the country of origin and material composition of every item.",
                "Traders must price in Egyptian Pounds, inclusive of VAT, and issue compliant electronic invoices.",
                "Traders must cooperate with Verdant in any consumer complaint or chargeback.",
              ]}
            />
          ),
        },
        {
          heading: "Dispute resolution",
          body: (
            <>
              <p>
                We aim to resolve every complaint amicably. The first step is to contact us at
                legal@verdant.egypt — we aim to respond within 5 working days.
              </p>
              <p>
                If the matter cannot be resolved, you may submit a complaint to the Consumer Protection
                Agency (CPA) at cpa.eg, the Personal Data Protection Centre at pdpc.eg for data
                matters, or to the competent courts of Cairo.
              </p>
              <p>
                For cross-border online disputes within the Arab Common Market, you may also use the
                Arab League&apos;s online dispute-resolution platform at odr.lasportal.org.
              </p>
            </>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Verdant Studio, 14 Al-Sawy Waterwheel Lane, Zamalek, Cairo, Egypt. Tax registration:
              201-993-441. Commercial registration: 188215. Email: legal@verdant.egypt.
            </p>
          ),
        },
      ]}
    />
  );
}
