import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imagesForProduct } from "@/lib/product-images";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort") || "new";
  const search = url.searchParams.get("q");

  const where: { category?: string; OR?: unknown[]; active?: boolean } = { active: true };
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { tags: { contains: search } },
    ];
  }

  let products = await db.product.findMany({
    where,
    orderBy: sort === "price-asc" ? { price: "asc" } : sort === "price-desc" ? { price: "desc" } : { createdAt: "desc" },
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
