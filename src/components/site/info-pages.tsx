"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faSeedling,
  faHands,
  faScissors,
  faArrowRight,
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faCircleCheck,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/components/providers";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

/* =========================================================
   Shared helpers
========================================================= */

function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`page-dense pt-24 md:pt-32 pb-16 md:pb-20 ${className}`}>
      {children}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 md:mb-12" data-animate="rise">
      <p className="tag-soft mb-4">{eyebrow}</p>

      <h1
        className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
        style={{ color: "var(--forest-deep)" }}
      >
        {title}
      </h1>

      {description && (
        <p
          className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function IconCircle({
  icon,
  size = "normal",
}: {
  icon: any;
  size?: "small" | "normal";
}) {
  return (
    <span
      className={
        size === "small"
          ? "w-10 h-10 rounded-full flex items-center justify-center"
          : "w-11 h-11 rounded-full flex items-center justify-center"
      }
      style={{ background: "rgba(31, 61, 43, 0.08)" }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={size === "small" ? "text-[14px]" : "text-[16px]"}
        style={{ color: "var(--forest)" }}
      />
    </span>
  );
}

function DataTable({
  headers,
  rows,
  minWidth = "620px",
}: {
  headers: string[];
  rows: string[][];
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table
        className="w-full text-sm"
        style={{ minWidth }}
      >
        <thead>
          <tr style={{ color: "var(--straw-deep)" }}>
            {headers.map((header, index) => (
              <th
                key={header}
                className={`text-left py-2 whitespace-nowrap ${
                  index === headers.length - 1 ? "text-right" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderTop: "1px solid rgba(31, 61, 43, 0.12)",
              }}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-3 ${
                    cellIndex === row.length - 1 ? "text-right" : ""
                  }`}
                  style={{
                    color:
                      cellIndex === 0
                        ? "var(--forest-deep)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   ABOUT
========================================================= */

export function AboutPage() {
  const { navigate } = useRouter();

  const pillars = [
    {
      icon: faSeedling,
      title: "Grow",
      body: "We partner with three organic-flax farms in Kafr El-Sheikh, paying 28% above the regional market rate.",
    },
    {
      icon: faHands,
      title: "Make",
      body: "Our atelier in Cairo employs 14 craftspeople at a verified living wage, with paid sick leave and parental leave.",
    },
    {
      icon: faScissors,
      title: "Mend",
      body: "Send any Verdant piece back to the studio for free repair, for as long as the garment exists.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "First loom, Zamalek",
      body: "Marwa opens a 32-square-metre studio with one second-hand shuttle loom.",
    },
    {
      year: "2020",
      title: "Delta partnership",
      body: "Three organic-flax farms in Kafr El-Sheikh agree to grow Verdant flax at premium prices.",
    },
    {
      year: "2021",
      title: "First field collection",
      body: "30 pieces, sold out in 11 days. We start a no-sale policy — pieces are restocked, never discounted.",
    },
    {
      year: "2023",
      title: "Florence weaving partnership",
      body: "We partner with a family-run mill in Tuscany for our merino–cashmere knits.",
    },
    {
      year: "2024",
      title: "Carbon-positive by design",
      body: "Every order removes 2.4kg of CO₂e through verified reforestation in the Sinai.",
    },
    {
      year: "2026",
      title: "The Field Collection",
      body: "Our largest release to date — 38 pieces for autumn, woven across three studios.",
    },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <section
        className="relative h-[56vh] min-h-[460px] md:min-h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-14 md:mb-16"
        data-animate="scale"
      >
        <img
          src="/images/verdant/hero-field.webp"
          alt="A wild meadow at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 36, 23, 0.18) 0%, rgba(15, 36, 23, 0.58) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p
            className="tag-soft mb-4"
            style={{
              background: "rgba(212, 168, 65, 0.95)",
              color: "var(--forest-deep)",
            }}
          >
            Est. 2019 · Cairo
          </p>

          <h1
            className="font-display text-5xl md:text-7xl leading-[0.98]"
            style={{ color: "var(--beige)" }}
          >
            From a single loom
            <br />
            to the meadow&apos;s edge.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mb-14 md:mb-16" data-animate="rise">
        <p
          className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.4] max-w-4xl"
          style={{ color: "var(--forest-deep)" }}
        >
          Verdant began in 2019 with a single loom in a small studio
          overlooking the Nile in Zamalek. Marwa El-Sayed, fresh from a
          decade in Parisian ateliers, came home with a question:{" "}
          <em>what would it look like to dress Egypt in its own landscape?</em>
        </p>

        <p
          className="mt-6 text-base md:text-lg leading-[1.75] max-w-3xl"
          style={{ color: "var(--muted-foreground)" }}
        >
          The answer has taken us to the flax fields of the Delta, the
          dyers&apos; souks of Fayoum, and a weaving partnership in Florence.
          We release small collections instead of seasons, mend our pieces
          for free forever, and work to a carbon-positive budget — currently
          removing 2.4kg of CO₂e for every 100 pieces we ship.
        </p>
      </section>

      {/* Pillars */}
      <section className="mb-14 md:mb-16">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          data-animate-stagger
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card rounded-[1.5rem] md:rounded-[1.75rem] p-6 md:p-7 min-h-[220px] transition-transform duration-300 hover:-translate-y-1"
              data-stagger-child
            >
              <div className="mb-5">
                <IconCircle icon={pillar.icon} />
              </div>

              <h3
                className="font-display text-xl mb-2.5"
                style={{ color: "var(--forest-deep)" }}
              >
                {pillar.title}
              </h3>

              <p
                className="text-sm leading-[1.75] max-w-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-14 md:mb-16" data-animate="rise">
        <p className="tag-soft mb-4">A short history</p>

        <h2
          className="font-display text-3xl md:text-4xl mb-7"
          style={{ color: "var(--forest-deep)" }}
        >
          Six years, three studios, one meadow.
        </h2>

        <div className="space-y-3 md:space-y-4">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="glass-card rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-5"
            >
              <p
                className="font-display text-2xl md:text-3xl"
                style={{ color: "var(--straw-deep)" }}
              >
                {item.year}
              </p>

              <div>
                <p
                  className="font-display text-base md:text-lg font-semibold"
                  style={{ color: "var(--forest-deep)" }}
                >
                  {item.title}
                </p>

                <p
                  className="mt-1 text-sm leading-[1.7]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center"
        data-animate="scale"
      >
        <p className="tag-soft mb-4">Walk with us</p>

        <h2
          className="font-display text-3xl md:text-5xl mb-4"
          style={{ color: "var(--forest-deep)" }}
        >
          The meadow keeps its door open.
        </h2>

        <p
          className="max-w-xl mx-auto mb-7 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Visit the studio on Saturdays for coffee, loom-side chats, and the
          slow pleasure of choosing a piece in person. Or browse the new
          collection from your own quiet corner.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate("shop")}
            className="btn-straw"
          >
            Shop the collection
            <FontAwesomeIcon icon={faArrowRight} className="text-[13px]" />
          </button>

          <button
            type="button"
            onClick={() => navigate("contact")}
            className="btn-ghost-glass"
          >
            Visit the studio
          </button>
        </div>
      </section>
    </PageShell>
  );
}

/* =========================================================
   CONTACT
========================================================= */

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });

  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Please complete the form",
        description: "Name, email and message are required.",
        variant: "destructive",
      });
      return;
    }

    setBusy(true);

    try {
      await api("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      toast({
        title: "Message sent",
        description: "We'll be in touch within 5 working days.",
      });

      setForm({
        name: "",
        email: "",
        subject: "General enquiry",
        message: "",
      });
    } catch (err) {
      toast({
        title: "Could not send",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const contactDetails = [
    {
      icon: faLocationDot,
      body: "14 Al-Sawy Waterwheel Lane, Zamalek, Cairo, Egypt",
    },
    {
      icon: faPhone,
      body: "+20 2 2735 9000",
    },
    {
      icon: faEnvelope,
      body: "hello@verdant.egypt",
    },
    {
      icon: faClock,
      body: "Sat–Thu · 10:00–18:00 · Closed Fridays",
    },
  ];

  const specialistContacts = [
    { label: "Mend & repair", body: "repair@verdant.egypt" },
    { label: "Returns", body: "returns@verdant.egypt" },
    { label: "Privacy", body: "privacy@verdant.egypt" },
    { label: "Press", body: "press@verdant.egypt" },
    { label: "Wholesale", body: "trade@verdant.egypt" },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Say hello"
        title="We answer every letter."
        description="Whether you want to ask about a piece, request a mend, or share a thought from the field — write to us. We aim to reply within five working days."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8">
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8"
          data-animate="rise"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Name
              </label>

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input-glass"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div>
              <label
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Email
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="input-glass"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              className="text-sm font-medium mb-2 block"
              style={{ color: "var(--forest-deep)" }}
            >
              Subject
            </label>

            <select
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="input-glass"
            >
              <option>General enquiry</option>
              <option>Order support</option>
              <option>Returns & refunds</option>
              <option>Mend request</option>
              <option>Wholesale</option>
              <option>Press</option>
              <option>Privacy & data</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              className="text-sm font-medium mb-2 block"
              style={{ color: "var(--forest-deep)" }}
            >
              Message
            </label>

            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="input-glass resize-y min-h-[150px]"
              placeholder="Tell us everything…"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-straw disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Sending…" : "Send letter"}

            {!busy && (
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[13px]"
              />
            )}
          </button>
        </form>

        {/* Sidebar */}
        <aside
          className="space-y-4"
          data-animate="rise"
          data-delay="0.1"
        >
          <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6">
            <p
              className="font-display text-xl mb-5"
              style={{ color: "var(--forest-deep)" }}
            >
              Studio
            </p>

            <ul className="space-y-4 text-sm">
              {contactDetails.map((item) => (
                <li
                  key={item.body}
                  className="flex items-start gap-3"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[12px] mt-1"
                    style={{ color: "var(--forest)" }}
                  />

                  <span
                    className="leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6">
            <p
              className="font-display text-xl mb-5"
              style={{ color: "var(--forest-deep)" }}
            >
              Specialised
            </p>

            <ul className="space-y-3 text-sm">
              {specialistContacts.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start justify-between gap-3"
                >
                  <span style={{ color: "var(--muted-foreground)" }}>
                    {item.label}
                  </span>

                  <span
                    className="text-right break-all"
                    style={{ color: "var(--forest-deep)" }}
                  >
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

/* =========================================================
   LOOKBOOK
========================================================= */

export function LookbookPage() {
  const { navigate } = useRouter();

  const looks = [
    {
      img: "/images/verdant/shirt.webp",
      title: "Look 01 · Wildflower",
      caption:
        "Linen shirt · Meadow Drift trousers · Straw Field hat",
    },
    {
      img: "/images/verdant/trousers.webp",
      title: "Look 02 · Backlit Grass",
      caption: "Hill Field knit · Tall Grass trench",
    },
    {
      img: "/images/verdant/dress.webp",
      title: "Look 03 · Pasture",
      caption:
        "Backlit Grass maxi dress · Wild Meadow scarf",
    },
    {
      img: "/images/verdant/lookbook-dress.webp",
      title: "Look 04 · Hill Field",
      caption: "Hill Field knit · Pasture slip dress",
    },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Autumn 2026"
        title="The Field Lookbook"
        description="Four looks from the Field Collection, photographed at first light in a meadow outside Fayoum."
      />

      <div
        className="space-y-5"
        data-animate-stagger
      >
        {looks.map((look) => (
          <button
            key={look.title}
            type="button"
            className="relative block w-full text-left aspect-[16/10] md:aspect-[16/8] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden glass-card group cursor-pointer"
            data-stagger-child
            onClick={() => navigate("shop")}
          >
            <img
              src={look.img}
              alt={look.title}
              className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.035]"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15, 36, 23, 0) 45%, rgba(15, 36, 23, 0.68) 100%)",
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p
                className="font-display text-2xl md:text-3xl"
                style={{ color: "var(--beige)" }}
              >
                {look.title}
              </p>

              <p
                className="text-sm mt-1 leading-relaxed"
                style={{ color: "rgba(239, 229, 210, 0.85)" }}
              >
                {look.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

/* =========================================================
   JOURNAL
========================================================= */

const journalPosts = [
  {
    id: "1",
    img: "/images/verdant/hero-field.webp",
    tag: "Materials",
    title: "The slow alchemy of oak gall dye",
    excerpt:
      "How we get a forest-deep green from a single oak gall, and why we wait six weeks for the colour to set.",
  },
  {
    id: "2",
    img: "/images/verdant/atelier.webp",
    tag: "Process",
    title: "One hundred hands in the Delta",
    excerpt:
      "A morning with the linen growers of Kafr El-Sheikh, where flax is still pulled by hand at first light.",
  },
  {
    id: "3",
    img: "/images/verdant/hat.webp",
    tag: "Studio",
    title: "Mending, not replacing",
    excerpt:
      "Our free lifetime repair promise — how it works, why we do it, and what we ask of you.",
  },
  {
    id: "4",
    img: "/images/verdant/dress.webp",
    tag: "People",
    title: "Aida, our master dyer",
    excerpt:
      "Twenty-six years of indigo vats, and why she still measures colour with her grandmother's bowl.",
  },
  {
    id: "5",
    img: "/images/verdant/lookbook-dress.webp",
    tag: "Materials",
    title: "Why we don't use polyester",
    excerpt:
      "The cost of cheap fabric — to the soil, to the worker, and to the person who wears it.",
  },
  {
    id: "6",
    img: "/images/verdant/shirt.webp",
    tag: "Process",
    title: "Chamomile: a softer yellow",
    excerpt:
      "A weekend with the chamomile pickers of Beni Suef, where our straw-yellow thread begins.",
  },
];

export function JournalPage() {
  const { navigate } = useRouter();

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Field notes"
        title="Slow letters from the meadow."
      />

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        data-animate-stagger
      >
        {journalPosts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() =>
              navigate("journal-post", { id: post.id })
            }
            className="glass-card rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden text-left group transition-transform duration-300 hover:-translate-y-1"
            data-stagger-child
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.035]"
              />
            </div>

            <div className="p-5 md:p-6">
              <span className="tag-soft mb-3">
                {post.tag}
              </span>

              <p
                className="font-display text-lg md:text-xl leading-[1.18]"
                style={{ color: "var(--forest-deep)" }}
              >
                {post.title}
              </p>

              <p
                className="mt-2 text-sm leading-[1.7]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {post.excerpt}
              </p>

              <p
                className="mt-4 flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--straw-deep)" }}
              >
                Read entry
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[11px]"
                />
              </p>
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

/* =========================================================
   JOURNAL POST
========================================================= */

const journalPostData: Record<
  string,
  {
    title: string;
    tag: string;
    img: string;
    body: string[];
  }
> = {
  "1": {
    title: "The slow alchemy of oak gall dye",
    tag: "Materials",
    img: "/images/verdant/hero-field.webp",
    body: [
      "An oak gall is a small, grey-green sphere — the tree's quiet response to a wasp's earlier visit. Crack one open and the tannins inside are dense enough to stain your fingers for days. We use them for our forest-deep green, a colour that takes six weeks to fully set on linen.",
      "The process is unfussy and slow: the galls are crushed, soaked in rainwater for three days, simmered for four hours, and left to cool overnight. The fabric is then dipped, hung to dry, dipped again. Each cycle darkens the colour by a shade. After six weeks, the linen carries a green so deep it almost reads as black in low light — and as the colour of a meadow in the evening sun when you step outside.",
      "We use oak gall not because it is fast (it is the slowest dye in our studio) but because it is honest. The colour it produces cannot be rushed, faked, or shortened. Each piece carries the time it took to make it.",
    ],
  },

  "2": {
    title: "One hundred hands in the Delta",
    tag: "Process",
    img: "/images/verdant/atelier.webp",
    body: [
      "The flax harvest in Kafr El-Sheikh still begins at first light. The stalks are pulled — not cut — by hand, because pulling preserves the full length of the fibre and yields the long, fine linen thread we use for our shirts and trousers.",
      "On the morning we visited, twenty workers moved through the field in a slow, syncopated line: pull, gather, bind, stack. By nine o'clock the sun was high enough to make the dew on the stalks catch light, and the field turned briefly silver. The flax was left to ret in the field for two weeks, then dried, scutched, and hackled into long pale ribbons of fibre.",
      "We pay our three partner farms twenty-eight percent above the regional market rate for organic flax. It is not charity — it is the cost of doing this work in a way that keeps the people doing it able to keep doing it.",
    ],
  },

  "3": {
    title: "Mending, not replacing",
    tag: "Studio",
    img: "/images/verdant/hat.webp",
    body: [
      "Every Verdant piece comes with a small mending card in the pocket — a printed square of fabric, a needle, three colours of thread, and a single line of instructions: \"Send this piece home when it needs us.\"",
      "We mend every Verdant piece for free, for as long as the garment exists. You pay nothing — not even shipping. A patched elbow, a rehemmed cuff, a button replaced, a moth-hole darned. The work is done in our Cairo studio by the same hands that finished the piece in the first place.",
      "Why? Because the most sustainable garment is the one already in your wardrobe. Mending is not a marketing line for us — it is the entire point. We would rather spend the next twenty years mending the pieces we have already made than make ten times as many new ones.",
    ],
  },

  "4": {
    title: "Aida, our master dyer",
    tag: "People",
    img: "/images/verdant/dress.webp",
    body: [
      "Aida has run our indigo vats for seven years. Before that, she ran vats in her mother's house in Aswan, where the family dyed cotton for the tourist market. She measures colour with a small ceramic bowl that belonged to her grandmother — a pale, slightly chipped bowl that, when filled with dye, tells her (and only her) whether the colour is ready.",
      "\"The bowl tells me,\" she says, laughing, when asked. \"I cannot explain it. After twenty-six years, you know by the way the colour sits in the bowl.\"",
      "We have tried, twice, to put a spectrophotometer next to the bowl and to write down the values. The values are always slightly different — because indigo is alive, and the day's humidity, the vat's age, and the time of the month all shift it. Aida's bowl is more accurate than any machine we have bought.",
    ],
  },

  "5": {
    title: "Why we don't use polyester",
    tag: "Materials",
    img: "/images/verdant/shirt.webp",
    body: [
      "Polyester is the dominant fibre of the global clothing industry — cheap, durable, easy to print on, and made from petroleum. We do not use it. Not because it is impossible to recycle (it is, with effort) but because its life-cycle cost is hidden.",
      "Every wash of a polyester garment releases thousands of micro-plastic fibres into the wastewater stream. These fibres are too small to be caught by municipal treatment plants, and they end up in rivers, lakes, and — eventually — in us. The fibres carry the dyes and the flame-retardants of their original fabric. They do not biodegrade.",
      "Linen, organic cotton, hemp, and silk return to the soil. They have been returning to the soil for thousands of years. We would rather use a fibre that knows how to end.",
    ],
  },

  "6": {
    title: "Chamomile: a softer yellow",
    tag: "Process",
    img: "/images/verdant/lookbook-dress.webp",
    body: [
      "Our straw-yellow thread begins in a field of chamomile outside Beni Suef. The flowers are picked at full bloom — when the petals are flat and the colour is at its deepest — and dried in the shade for three days. The dried flowers go into a copper pot with rainwater and a mordant of alum, and the silk is dipped.",
      "The first dip gives a pale, almost cream yellow. The second deepens it. By the seventh dip — over the course of two weeks — the silk has the colour of ripe straw, the colour of late-summer meadows just before they turn.",
      "Chamomile is one of the gentlest dyes in our studio. It does not exhaust the fabric the way indigo does, and it does not require the heat of oak gall. The colour it gives is the colour of the meadow that produced it — quiet, warm, and impossible to fake.",
    ],
  },
};

export function JournalPostPage() {
  const { params, navigate } = useRouter();

  const id = params.id || "1";
  const post = journalPostData[id] || journalPostData["1"];

  return (
    <article className="page-dense pt-24 md:pt-32 pb-16 md:pb-20">
      <div
        className="max-w-3xl"
        data-animate="rise"
      >
        <button
          type="button"
          onClick={() => navigate("journal")}
          className="btn-ghost-glass mb-7"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-[11px] rotate-180"
          />
          All entries
        </button>

        <p className="tag-soft mb-4">{post.tag}</p>

        <h1
          className="font-display text-4xl md:text-6xl leading-[1.05]"
          style={{ color: "var(--forest-deep)" }}
        >
          {post.title}
        </h1>
      </div>

      <div
        className="aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden my-10 md:my-12 glass-card"
        data-animate="scale"
      >
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl space-y-6 md:space-y-7">
        {post.body.map((paragraph, index) => (
          <p
            key={index}
            className="text-base md:text-lg leading-[1.75]"
            style={{ color: "var(--foreground)" }}
            data-animate="fade"
            data-delay={index * 0.05}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div
        className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-8 mt-12 max-w-3xl text-center"
        data-animate="rise"
      >
        <p
          className="font-display text-2xl md:text-3xl mb-4"
          style={{ color: "var(--forest-deep)" }}
        >
          Read more field notes
        </p>

        <button
          type="button"
          onClick={() => navigate("journal")}
          className="btn-straw"
        >
          All entries
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-[13px]"
          />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   SUSTAINABILITY
========================================================= */

export function SustainabilityPage() {
  const { navigate } = useRouter();

  const stats = [
    {
      icon: faLeaf,
      value: "−2.4t",
      label: "CO₂e per 100 pieces",
      body: "Net removed via verified Sinai reforestation",
    },
    {
      icon: faSeedling,
      value: "1%",
      label: "Of every order",
      body: "Replants native trees through the Sinai Native Forest",
    },
    {
      icon: faHands,
      value: "14",
      label: "Craftspeople at living wage",
      body: "In our Cairo studio, with paid sick & parental leave",
    },
    {
      icon: faScissors,
      value: "∞",
      label: "Free mending",
      body: "Every Verdant piece, for as long as it exists",
    },
  ];

  const materials = [
    {
      title: "Fibres we use",
      body: "100% natural fibres — long-staple European linen, organic-certified cotton, hemp, silk, and a merino–cashmere blend. No polyester, no acrylic, no elastane.",
    },
    {
      title: "Fibres we do not use",
      body: "All synthetic fibres (polyester, nylon, acrylic, elastane, spandex) and conventional (non-organic) cotton that requires intensive irrigation and pesticide use.",
    },
    {
      title: "Dyes",
      body: "Plant dyes — chamomile, indigo, madder, oak gall — wherever possible. Where fastness requires a synthetic dye, we use GOTS-certified low-impact dyes only.",
    },
    {
      title: "Energy & water",
      body: "Studio powered by grid solar. Dye vats are heated with closed-loop gas; water is recycled through a three-stage filtration system that returns clean water to the city mains.",
    },
    {
      title: "Packaging",
      body: "Boxes are 100% recycled, kraft paper ribbon is unbleached, and the protective inner sleeve is home-compostable. No plastic, ever — not even the tape.",
    },
    {
      title: "Workers",
      body: "Living wage verified annually by an independent third party. Paid sick leave, parental leave, and a four-day work week in low season. No subcontracting.",
    },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Our impact"
        title="Carbon-positive by design."
        description="We measure what we use, we publish what we measure, and we work to leave the meadow — and the soil, the river, and the air — better than we found it."
      />

      {/* Stats */}
      <section
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-12 md:mb-14"
        data-animate-stagger
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card rounded-[1.5rem] p-5 md:p-6 min-h-[190px] transition-transform duration-300 hover:-translate-y-1"
            data-stagger-child
          >
            <div className="mb-4">
              <IconCircle icon={stat.icon} size="small" />
            </div>

            <p
              className="font-display text-2xl md:text-3xl"
              style={{ color: "var(--forest-deep)" }}
            >
              {stat.value}
            </p>

            <p
              className="font-display text-sm font-semibold mt-1.5"
              style={{ color: "var(--forest-deep)" }}
            >
              {stat.label}
            </p>

            <p
              className="text-xs mt-2 leading-[1.6]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {stat.body}
            </p>
          </div>
        ))}
      </section>

      {/* Materials */}
      <section
        className="mb-12 md:mb-14 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"
        data-animate-stagger
      >
        {materials.map((item) => (
          <div
            key={item.title}
            className="glass-card rounded-[1.5rem] md:rounded-[1.75rem] p-6 md:p-7"
            data-stagger-child
          >
            <p
              className="font-display text-xl md:text-2xl mb-3"
              style={{ color: "var(--forest-deep)" }}
            >
              {item.title}
            </p>

            <p
              className="text-sm md:text-base leading-[1.75]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section
        className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center"
        data-animate="scale"
      >
        <p className="tag-soft mb-4">Open-source report</p>

        <h2
          className="font-display text-3xl md:text-5xl mb-4"
          style={{ color: "var(--forest-deep)" }}
        >
          Read the full 2025 report.
        </h2>

        <p
          className="max-w-xl mx-auto mb-7 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          A 38-page open-source impact report — raw numbers, third-party
          audits, and the things we have not yet figured out.
        </p>

        <button
          type="button"
          onClick={() => navigate("contact")}
          className="btn-straw"
        >
          Request the report
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-[13px]"
          />
        </button>
      </section>
    </PageShell>
  );
}

/* =========================================================
   SHIPPING
========================================================= */

export function ShippingPage() {
  const domesticRows = [
    ["Cairo & Giza", "Same-day (Bosta)", "Same day", "Free over 1,500"],
    ["Alexandria", "Next-day (Bosta)", "1 day", "Free over 2,500"],
    ["Delta & Canal", "Aramex ground", "2–3 days", "65 EGP"],
    ["Upper Egypt", "Aramex ground", "3–5 days", "95 EGP"],
    ["Red Sea & Sinai", "Aramex air", "3–5 days", "120 EGP"],
  ];

  const internationalRows = [
    ["GCC", "Aramex Priority", "3–5 days", "240 EGP"],
    ["Europe", "DHL Express", "4–7 days", "380 EGP"],
    ["North America", "DHL Express", "5–9 days", "520 EGP"],
    ["Asia & Pacific", "DHL Express", "6–10 days", "620 EGP"],
  ];

  const shippingCards = [
    {
      icon: faTruck,
      title: "Same-day dispatch",
      body: "Orders placed before 14:00 on weekdays are dispatched the same day from our Cairo studio.",
    },
    {
      icon: faCircleCheck,
      title: "Tracked, always",
      body: "Every order ships with Aramex, DHL Egypt, or Bosta. Tracking links are emailed at dispatch.",
    },
    {
      icon: faLeaf,
      title: "Carbon-positive",
      body: "Every shipment removes 2.4kg of CO₂e via verified reforestation in the Sinai.",
    },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Delivery"
        title="Shipping & delivery."
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12"
        data-animate-stagger
      >
        {shippingCards.map((card) => (
          <div
            key={card.title}
            className="glass-card rounded-[1.5rem] p-6"
            data-stagger-child
          >
            <div className="mb-4">
              <IconCircle icon={card.icon} />
            </div>

            <h3
              className="font-display text-lg mb-2"
              style={{ color: "var(--forest-deep)" }}
            >
              {card.title}
            </h3>

            <p
              className="text-sm leading-[1.7]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <div
        className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 mb-8"
        data-animate="rise"
      >
        <h2
          className="font-display text-2xl md:text-3xl mb-5"
          style={{ color: "var(--forest-deep)" }}
        >
          Egypt · Domestic
        </h2>

        <DataTable
          headers={[
            "Region",
            "Service",
            "Est. delivery",
            "Cost",
          ]}
          rows={domesticRows}
        />
      </div>

      <div
        className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8"
        data-animate="rise"
      >
        <h2
          className="font-display text-2xl md:text-3xl mb-5"
          style={{ color: "var(--forest-deep)" }}
        >
          International
        </h2>

        <DataTable
          headers={[
            "Region",
            "Service",
            "Est. delivery",
            "Cost",
          ]}
          rows={internationalRows}
        />

        <p
          className="mt-5 text-xs leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Customs duties and import VAT may apply on international
          shipments and are the responsibility of the recipient. See
          our Egyptian Trading Laws page for details.
        </p>
      </div>
    </PageShell>
  );
}

/* =========================================================
   SIZE GUIDE
========================================================= */

export function SizeGuidePage() {
  const shirtRows = [
    ["XS", "92 cm", "76 cm", "42 cm", "60 cm"],
    ["S", "98 cm", "82 cm", "44 cm", "62 cm"],
    ["M", "104 cm", "88 cm", "46 cm", "63 cm"],
    ["L", "110 cm", "94 cm", "48 cm", "64 cm"],
    ["XL", "116 cm", "100 cm", "50 cm", "65 cm"],
  ];

  const trouserRows = [
    ["XS", "76 cm", "92 cm", "78 cm"],
    ["S", "82 cm", "98 cm", "79 cm"],
    ["M", "88 cm", "104 cm", "80 cm"],
    ["L", "94 cm", "110 cm", "81 cm"],
    ["XL", "100 cm", "116 cm", "82 cm"],
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Fit"
        title="Size guide."
        description="All measurements in centimetres. When in doubt, size up — our cuts are intentionally relaxed."
      />

      <div
        className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 mb-8"
        data-animate="rise"
      >
        <h2
          className="font-display text-xl mb-4"
          style={{ color: "var(--forest-deep)" }}
        >
          Shirts & tops
        </h2>

        <DataTable
          headers={[
            "Size",
            "Chest",
            "Waist",
            "Shoulder",
            "Sleeve",
          ]}
          rows={shirtRows}
          minWidth="560px"
        />
      </div>

      <div
        className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8"
        data-animate="rise"
      >
        <h2
          className="font-display text-xl mb-4"
          style={{ color: "var(--forest-deep)" }}
        >
          Trousers & bottoms
        </h2>

        <DataTable
          headers={["Size", "Waist", "Hip", "Inseam"]}
          rows={trouserRows}
          minWidth="480px"
        />
      </div>

      <p
        className="mt-6 text-sm leading-relaxed"
        style={{ color: "var(--muted-foreground)" }}
      >
        For personalised sizing help, write to{" "}
        <span style={{ color: "var(--straw-deep)" }}>
          hello@verdant.egypt
        </span>{" "}
        with your measurements and the piece you&apos;re considering.
      </p>
    </PageShell>
  );
}

/* =========================================================
   FAQ
========================================================= */

export function FaqPage() {
  const faqs = [
    {
      q: "How long will my order take to arrive?",
      a: "Cairo and Giza orders placed before 14:00 on weekdays are dispatched the same day and usually arrive the same evening. Elsewhere in Egypt takes 1–5 working days depending on the region. International orders take 3–10 working days depending on the destination.",
    },
    {
      q: "What is your return policy?",
      a: "You may return any unworn item with tags intact within 14 days of delivery, in line with Egyptian Consumer Protection Law No. 67 of 2006. See our Refund Policy for full details.",
    },
    {
      q: "Do you offer free mending?",
      a: "Yes — every Verdant piece is mended for free, for as long as the garment exists. Email repair@verdant.egypt with a description and photo of the mend needed, and we'll send a prepaid return label.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Visa, Mastercard, and Meeza through our PCI-DSS Level 1 payment processor, and cash on delivery for orders within Egypt up to 5,000 EGP.",
    },
    {
      q: "Are your pieces true to size?",
      a: "Our cuts are intentionally relaxed. When in doubt, size up. Detailed measurements are in our size guide, and you can write to hello@verdant.egypt for personalised sizing help.",
    },
    {
      q: "Do you ship outside Egypt?",
      a: "Yes — to the GCC, Europe, North America, and Asia & Pacific. Customs duties and import VAT may apply on international shipments and are the responsibility of the recipient.",
    },
    {
      q: "How should I care for my Verdant pieces?",
      a: "Machine-wash cold on a delicate cycle, hang to dry, and iron on a medium setting. Avoid tumble-drying. Linen softens and improves with washing.",
    },
    {
      q: "Where are your pieces made?",
      a: "Linen shirts and trousers are cut and sewn in our Cairo atelier. Knitwear is knitted in Florence. The full breakdown is on our Sustainability page.",
    },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Help"
        title="Frequently asked."
      />

      <div
        className="space-y-3"
        data-animate-stagger
      >
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="glass-card rounded-[1.5rem] p-5 md:p-6 group"
            data-stagger-child
          >
            <summary
              className="font-display text-base md:text-lg cursor-pointer flex items-center justify-between gap-5 list-none"
              style={{ color: "var(--forest-deep)" }}
            >
              <span>{faq.q}</span>

              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[12px] shrink-0 transition-transform duration-300 group-open:rotate-90"
                style={{ color: "var(--straw-deep)" }}
              />
            </summary>

            <p
              className="mt-4 pr-5 text-sm md:text-base leading-[1.75]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}

/* =========================================================
   CAREERS
========================================================= */

export function CareersPage() {
  const { navigate } = useRouter();

  const roles = [
    {
      title: "Studio manager, Cairo",
      team: "Operations",
      loc: "Full-time · Zamalek",
    },
    {
      title: "Junior dyer apprentice",
      team: "Atelier",
      loc: "Full-time · Zamalek",
    },
    {
      title: "E-commerce lead",
      team: "Digital",
      loc: "Full-time · Cairo (hybrid)",
    },
    {
      title: "Sustainability analyst",
      team: "Impact",
      loc: "Part-time · Cairo",
    },
  ];

  return (
    <PageShell>
      <SectionIntro
        eyebrow="Work with us"
        title="Open positions."
        description="Verdant is a small house with a long view. We hire slowly, pay a verified living wage, and look for people who would rather mend than replace."
      />

      <div
        className="space-y-3 mb-10"
        data-animate-stagger
      >
        {roles.map((role) => (
          <div
            key={role.title}
            className="glass-card rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap"
            data-stagger-child
          >
            <div>
              <p
                className="font-display text-lg"
                style={{ color: "var(--forest-deep)" }}
              >
                {role.title}
              </p>

              <p
                className="text-xs mt-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                {role.team} · {role.loc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("contact")}
              className="btn-ghost-glass"
            >
              Apply
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[12px]"
              />
            </button>
          </div>
        ))}
      </div>

      <div
        className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center"
        data-animate="scale"
      >
        <p className="tag-soft mb-4">
          Don&apos;t see your role?
        </p>

        <h2
          className="font-display text-3xl md:text-4xl mb-3"
          style={{ color: "var(--forest-deep)" }}
        >
          Send us a letter anyway.
        </h2>

        <p
          className="max-w-xl mx-auto mb-6 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Tell us about your work, what you&apos;d like to make at Verdant,
          and where you&apos;d like to be in five years. We read every letter.
        </p>

        <button
          type="button"
          onClick={() => navigate("contact")}
          className="btn-straw"
        >
          Write to us
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-[13px]"
          />
        </button>
      </div>
    </PageShell>
  );
}