import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imagesForProduct } from "@/lib/product-images";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const related = await db.product.findMany({
    where: { category: product.category, slug: { not: slug }, active: true },
    take: 4,
  });
  return NextResponse.json({
    product: {
      ...product,
      images: JSON.parse(product.images),
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors),
      tags: JSON.parse(product.tags),
    },
    related: related.map((p) => ({
      ...p,
      images: imagesForProduct(p.slug, JSON.parse(p.images)),
      sizes: JSON.parse(p.sizes),
      colors: JSON.parse(p.colors),
      tags: JSON.parse(p.tags),
    })),
  });
}
