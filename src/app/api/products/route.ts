import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { imagesForProduct } from "@/lib/product-images";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const category =
      url.searchParams.get("category");

    const sort =
      url.searchParams.get("sort") || "new";

    const search =
      url.searchParams.get("q")?.trim();

    const where: Prisma.ProductWhereInput = {
      active: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          tags: {
            contains: search,
          },
        },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
            ? { price: "desc" }
            : { createdAt: "desc" },
    });

    const parsed = products.map((product) => ({
      ...product,

      images: imagesForProduct(
        product.slug,
        safeJsonParse<string[]>(
          product.images,
          [],
        ),
      ),

      sizes: safeJsonParse<string[]>(
        product.sizes,
        [],
      ),

      colors: safeJsonParse<
        Array<{
          name: string;
          hex: string;
        }>
      >(product.colors, []),

      tags: safeJsonParse<string[]>(
        product.tags,
        [],
      ),
    }));

    return NextResponse.json({
      products: parsed,
    });
  } catch (error) {
    console.error(
      "[products] error:",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to load products.",
      },
      {
        status: 500,
      },
    );
  }
}

function safeJsonParse<T>(
  value: string,
  fallback: T,
): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}