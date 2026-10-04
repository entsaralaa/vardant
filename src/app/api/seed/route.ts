import { NextResponse } from "next/server";
import { seedProducts } from "@/data/products";

// Run once on first request — also re-runs safely if already seeded.
export async function POST() {
  const result = await seedProducts();
  return NextResponse.json(result);
}

export async function GET() {
  const result = await seedProducts();
  return NextResponse.json(result);
}
