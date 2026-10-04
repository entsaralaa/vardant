import { db } from "@/lib/db";

export type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAt?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  category: string;
  tags: string[];
  inventory: number;
  featured?: boolean;
};

const local = (slug: string) => {
  const map: Record<string,string[]> = {
    "wildflower-linen-shirt": ["/images/verdant/shirt.webp", "/images/verdant/hero-field.webp"],
    "meadow-drift-trousers": ["/images/verdant/trousers.webp", "/images/verdant/hero-field.webp"],
    "hill-field-knit-sweater": ["/images/verdant/knitwear.webp", "/images/verdant/atelier.webp"],
    "backlit-grass-maxi-dress": ["/images/verdant/dress.webp", "/images/verdant/lookbook-dress.webp"],
    "straw-field-hat": ["/images/verdant/hat.webp", "/images/verdant/hero-field.webp"],
    "tall-grass-trench": ["/images/verdant/hero-field.webp", "/images/verdant/atelier.webp"],
    "pasture-slip-dress": ["/images/verdant/lookbook-dress.webp", "/images/verdant/dress.webp"],
    "wild-meadow-scarf": ["/images/verdant/atelier.webp", "/images/verdant/hero-field.webp"],
  };
  return map[slug] || ["/images/verdant/hero-field.webp"];
};

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: "Wildflower Linen Shirt",
    slug: "wildflower-linen-shirt",
    description: "Airy European linen shirt with a softly rounded collar and bone buttons.",
    longDescription:
      "Spun from long-staple European flax linen, the Wildflower shirt breathes through summer afternoons and settles into a gentle drape by autumn. A softly rounded collar, mother-of-pearl-look bone buttons, and a curved hem echo the meadow's edge where tall grass meets the path. Pre-washed for a lived-in softness.",
    price: 1850,
    compareAt: 2400,
    images: local("wildflower-linen-shirt"),
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage", hex: "#8aa68b" },
      { name: "Straw", hex: "#d4a841" },
      { name: "Beige", hex: "#efe5d2" },
    ],
    category: "Shirts",
    tags: ["linen", "summer", "natural fiber"],
    inventory: 32,
    featured: true,
  },
  {
    name: "Meadow Drift Trousers",
    slug: "meadow-drift-trousers",
    description: "High-waist wide-leg trousers in soft organic twill.",
    longDescription:
      "Cut from organic cotton twill with a high-waist, wide-leg silhouette, the Meadow Drift moves like the wind through the grass. Hand-finished hem, deep side pockets, and a single coconut button closure.",
    price: 2150,
    images: local("meadow-drift-trousers"),
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Forest", hex: "#1f3d2b" },
      { name: "Beige", hex: "#efe5d2" },
    ],
    category: "Trousers",
    tags: ["organic cotton", "wide leg"],
    inventory: 24,
    featured: true,
  },
  {
    name: "Hill Field Knit Sweater",
    slug: "hill-field-knit-sweater",
    description: "Boxy merino-blend knit with an organic grain texture.",
    longDescription:
      "A softly oversized, boxy-cut sweater knit from a merino–cashmere blend with a subtle grain texture that recalls wind-raked fields. Ribbed crew neck, cuffs, and hem. Made in a small atelier in Florence.",
    price: 2950,
    compareAt: 3600,
    images: local("hill-field-knit-sweater"),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Forest", hex: "#1f3d2b" },
      { name: "Sage", hex: "#8aa68b" },
      { name: "Straw", hex: "#d4a841" },
    ],
    category: "Knitwear",
    tags: ["merino", "cashmere", "knit"],
    inventory: 18,
    featured: true,
  },
  {
    name: "Backlit Grass Maxi Dress",
    slug: "backlit-grass-maxi-dress",
    description: "Floor-sweeping bias-cut dress in sage linen-cotton.",
    longDescription:
      "A bias-cut floor-length dress in a 55% linen / 45% organic cotton blend, dyed with chamomile and indigo for a soft sage tone. Spaghetti straps tie at the shoulder; the back dips gently to reveal the shoulder blade.",
    price: 3250,
    images: local("backlit-grass-maxi-dress"),
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sage", hex: "#8aa68b" },
      { name: "Forest", hex: "#1f3d2b" },
    ],
    category: "Dresses",
    tags: ["linen-cotton", "bias cut"],
    inventory: 14,
    featured: true,
  },
  {
    name: "Straw Field Hat",
    slug: "straw-field-hat",
    description: "Hand-woven wide-brim straw hat with linen band.",
    longDescription:
      "Hand-woven from rye straw by a third-generation maker in Fayoum, the Straw Field Hat shields face and shoulders from the late-spring sun. A linen band in forest green wraps the crown.",
    price: 950,
    images: local("straw-field-hat"),
    sizes: ["One Size"],
    colors: [
      { name: "Straw", hex: "#d4a841" },
    ],
    category: "Accessories",
    tags: ["handmade", "straw", "egypt"],
    inventory: 40,
    featured: true,
  },
  {
    name: "Tall Grass Trench",
    slug: "tall-grass-trench",
    description: "Mid-length belted trench coat in waxed organic cotton.",
    longDescription:
      "A mid-length trench in waxed organic cotton with a deep storm flap, raglan sleeves, and a removable D-ring belt. The fabric softens and lightens with wear, developing a patina unique to the wearer.",
    price: 4200,
    compareAt: 5100,
    images: local("tall-grass-trench"),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Forest", hex: "#1f3d2b" },
      { name: "Sage", hex: "#8aa68b" },
    ],
    category: "Outerwear",
    tags: ["waxed cotton", "rain coat"],
    inventory: 12,
    featured: true,
  },
  {
    name: "Pasture Slip Dress",
    slug: "pasture-slip-dress",
    description: "Silk-blend slip dress with cowl neckline.",
    longDescription:
      "A bias-cut slip dress in a silk-cotton blend with a softly draped cowl neckline and adjustable straps. The fabric carries a faint, natural slub that catches light like dew.",
    price: 2680,
    images: local("pasture-slip-dress"),
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Beige", hex: "#efe5d2" },
      { name: "Sage", hex: "#8aa68b" },
    ],
    category: "Dresses",
    tags: ["silk-blend", "slip"],
    inventory: 16,
    featured: false,
  },
  {
    name: "Wild Meadow Scarf",
    slug: "wild-meadow-scarf",
    description: "Hand-rolled silk twill scarf with meadow print.",
    longDescription:
      "A 90cm silk twill scarf printed with an abstract meadow print in forest greens, sage, and golden straw. Hand-rolled edges. Designed in our Cairo studio and printed in Como.",
    price: 1450,
    images: local("wild-meadow-scarf"),
    sizes: ["One Size"],
    colors: [{ name: "Meadow", hex: "#8aa68b" }],
    category: "Accessories",
    tags: ["silk", "hand-rolled"],
    inventory: 28,
    featured: false,
  },
];

export async function seedProducts() {
  const existing = await db.product.count();
  if (existing > 0) return { seeded: false, count: existing };

  for (const p of SEED_PRODUCTS) {
    await db.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        longDescription: p.longDescription,
        price: p.price,
        compareAt: p.compareAt || null,
        images: JSON.stringify(p.images),
        sizes: JSON.stringify(p.sizes),
        colors: JSON.stringify(p.colors),
        category: p.category,
        tags: JSON.stringify(p.tags),
        inventory: p.inventory,
        featured: p.featured || false,
        active: true,
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: Math.floor(Math.random() * 80) + 12,
      },
    });
  }
  return { seeded: true, count: SEED_PRODUCTS.length };
}
