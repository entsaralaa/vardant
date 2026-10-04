import { LegalPage, LegalList } from "./layout";

export function SecurityPolicyPage() {
  return (
    <LegalPage
      title="Security Policy"
      subtitle="The technical and organisational measures Verdant takes to keep your data safe."
      lastUpdated="October 2026"
      sections={[
        {
          heading: "Commitment",
          body: (
            <p>
              Verdant Studio is committed to protecting the confidentiality, integrity, and availability of
              customer information. This Security Policy summarises the technical and organisational
              measures we apply across our infrastructure, application, and operations, in line with
              Egyptian Law No. 151 of 2020 on the Protection of Personal Data and the PDPC Executive
              Regulations.
            </p>
          ),
        },
        {
          heading: "Transport encryption",
          body: (
            <p>
              All traffic between your browser and the Verdant Site is encrypted using TLS 1.3 with strong
              ciphers (ECDHE-ECDSA-AES256-GCM-SHA384 preferred). We enforce HTTP Strict Transport Security
              (HSTS) with a max-age of one year and include sub-domains. We do not serve any plain-text
              content.
            </p>
          ),
        },
        {
          heading: "Storage encryption",
          body: (
            <p>
              Databases and backups are encrypted at rest with AES-256. Application secrets, API keys, and
              cryptographic material are stored in a managed secrets manager and rotated on a defined
              schedule. We do not store full card numbers, CVV, or PINs — payment data is handled entirely
              by our PCI-DSS Level 1 payment processor.
            </p>
          ),
        },
        {
          heading: "Authentication",
          body: (
            <>
              <p>Customer passwords are hashed using bcrypt with a work factor of 12. We never store plain-text passwords.</p>
              <p>
                Authentication sessions use JWT tokens signed with HS256. Tokens expire after 7 days of
                inactivity. Sensitive actions — viewing order history, changing the password, deleting the
                account — require a fresh re-authentication. We are rolling out optional two-factor
                authentication using TOTP (RFC 6238) for customer accounts in 2026.
              </p>
            </>
          ),
        },
        {
          heading: "Application security",
          body: (
            <LegalList
              items={[
                "Strict input validation on every API endpoint using Zod schemas.",
                "Output encoding to prevent reflected and stored XSS.",
                "Parameterised database queries (via Prisma ORM) — no string concatenation of SQL.",
                "Cross-site request forgery (CSRF) protection via SameSite=Lax cookies and token checks.",
                "Content Security Policy (CSP) that disallows inline scripts and restricts origins.",
                "Sub-resource integrity (SRI) on third-party script tags.",
                "Dependency scanning on every build to detect known vulnerabilities (npm audit + Snyk).",
              ]}
            />
          ),
        },
        {
          heading: "Infrastructure",
          body: (
            <p>
              The Site runs on a hardened, single-purpose application server behind a perimeter firewall.
              SSH access requires key-based authentication and is restricted to two engineers. The
              database is reachable only from the application server. All administrative actions are logged
              and reviewed monthly.
            </p>
          ),
        },
        {
          heading: "Access control",
          body: (
            <p>
              Access to production systems and customer data follows the principle of least privilege. New
              engineers are granted access only after signing the confidentiality agreement and completing
              security onboarding. Access is reviewed quarterly and revoked immediately when no longer
              required.
            </p>
          ),
        },
        {
          heading: "Monitoring and logging",
          body: (
            <p>
              We maintain tamper-evident logs of authentication, order, and administrative events for a
              minimum of 12 months. An intrusion-detection system monitors traffic for anomalies.
              Automated alerts page the on-call engineer within 15 minutes of any high-severity event.
            </p>
          ),
        },
        {
          heading: "Vulnerability disclosure",
          body: (
            <>
              <p>
                We welcome responsible disclosure of security vulnerabilities. If you believe you have
                found a vulnerability, please email security@verdant.egypt with a description and
                reproduction steps.
              </p>
              <p>
                We commit to acknowledging receipt within 48 hours, providing an estimated timeline within
                5 working days, and crediting you in our hall-of-fame once the issue is resolved (unless
                you prefer to remain anonymous). We do not pursue legal action against good-faith
                reporters.
              </p>
            </>
          ),
        },
        {
          heading: "Incident response",
          body: (
            <p>
              In the event of a personal-data breach affecting the rights of customers, we notify the
              Personal Data Protection Centre within 72 hours of becoming aware of the breach, as required
              by Article 39 of the Data Protection Law. Affected customers receive a direct notification
              without undue delay, with a description of the breach, the measures taken, and the steps
              they can take to protect themselves.
            </p>
          ),
        },
        {
          heading: "Business continuity",
          body: (
            <p>
              Database backups are taken every 6 hours and stored in two geographically separated
              locations. We test restore procedures quarterly. In the event of a regional outage, we
              commit to a recovery time objective (RTO) of 4 hours and a recovery point objective (RPO) of
              6 hours.
            </p>
          ),
        },
        {
          heading: "Third-party assurance",
          body: (
            <p>
              Our sub-processors are required to maintain at minimum an ISO 27001 or SOC 2 Type II
              certification. We review their assurance reports annually and require sub-processor
              change-notification with at least 30 days&apos; notice.
            </p>
          ),
        },
        {
          heading: "Policy review",
          body: (
            <p>
              This Security Policy is reviewed annually by the Verdant management team and after any
              material change to our infrastructure. The &quot;last updated&quot; date reflects the most
              recent review.
            </p>
          ),
        },
      ]}
    />
  );
}
