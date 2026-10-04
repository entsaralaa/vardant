import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function getUserId(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/verdant-token=([^;]+)/);
  if (!match) return null;
  try {
    if (!JWT_SECRET) return null;
    const payload = jwt.verify(match[1], JWT_SECRET) as { sub: string };
    return payload.sub;
  } catch {
    return null;
  }
}

// GET cart for the logged-in user
export async function GET(req: Request) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ items: [] });
  const items = await db.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
  return NextResponse.json({ items });
}

// POST add an item
export async function POST(req: Request) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { productId, quantity, size, color } = body;
  if (!productId || !quantity) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const existing = await db.cartItem.findFirst({
    where: { userId, productId, size: size || null, color: color || null },
  });
  if (existing) {
    const updated = await db.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
    return NextResponse.json({ item: updated });
  }
  const item = await db.cartItem.create({
    data: { userId, productId, quantity, size: size || null, color: color || null },
  });
  return NextResponse.json({ item });
}

// DELETE all items (clear)
export async function DELETE(req: Request) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db.cartItem.deleteMany({ where: { userId } });
  return NextResponse.json({ ok: true });
}
