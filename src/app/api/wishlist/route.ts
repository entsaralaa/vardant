import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function getUser(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/verdant-token=([^;]+)/);
  if (!match) return null;
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(match[1], JWT_SECRET) as { sub: string };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ items: [] });
  const items = await db.wishlistItem.findMany({
    where: { userId: user.sub },
    include: { product: true },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const { productId } = await req.json();
  const existing = await db.wishlistItem.findFirst({ where: { userId: user.sub, productId } });
  if (existing) {
    await db.wishlistItem.delete({ where: { id: existing.id } });
    return NextResponse.json({ state: "removed" });
  }
  await db.wishlistItem.create({ data: { userId: user.sub, productId } });
  return NextResponse.json({ state: "added" });
}
