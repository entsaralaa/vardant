import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imagesForProduct } from "@/lib/product-images";

export async function GET() {
  const products = await db.product.findMany({
    where: { featured: true, active: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  const parsed = products.map((p) => ({
    ...p,
    images: imagesForProduct(p.slug, JSON.parse(p.images)),
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
    tags: JSON.parse(p.tags),
  }));
  return NextResponse.json({ products: parsed });
}
