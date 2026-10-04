import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imagesForProduct } from "@/lib/product-images";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "verdant-token";
const COD_LIMIT = 5000;
const FREE_SHIPPING_THRESHOLD = 2500;
const SHIPPING_FEE = 95;
const TAX_RATE = 0.14;

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string;
};

type CartRequestItem = {
  productId?: unknown;
  quantity?: unknown;
  size?: unknown;
  color?: unknown;
};

type ShippingAddress = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  country?: unknown;
  postal?: unknown;
  notes?: unknown;
};

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

function getTokenFromRequest(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";

  const match = cookieHeader.match(
    /(?:^|;\s*)verdant-token=([^;]+)/
  );

  return match?.[1] || null;
}

async function getUser(req: Request) {
  const token = getTokenFromRequest(req);
  const JWT_SECRET = getJwtSecret();

  if (!token || !JWT_SECRET) {
    return null;
  }

  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    if (!payload.sub) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email || "",
      role: payload.role || "customer",
    };
  } catch {
    return null;
  }
}

function parseJson<T>(
  value: string,
  fallback: T
): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function cleanString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function GET(req: Request) {
  try {
    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        {
          orders: [],
        },
        {
          status: 200,
        }
      );
    }

    const orders = await db.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    console.error(
      "[orders:get] error:",
      error
    );

    return NextResponse.json(
      {
        error: "Could not load orders.",
        orders: [],
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        {
          error: "Login required.",
        },
        {
          status: 401,
        }
      );
    }

    let body: {
      items?: unknown;
      shippingAddress?: ShippingAddress;
      paymentMethod?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const items = body.items;
    const shippingAddress =
      body.shippingAddress;

    const paymentMethod =
      cleanString(body.paymentMethod);

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Your cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

    if (items.length > 50) {
      return NextResponse.json(
        {
          error: "Too many items in the order.",
        },
        {
          status: 400,
        }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        {
          error:
            "Shipping information is required.",
        },
        {
          status: 400,
        }
      );
    }

    const shippingName = cleanString(
      shippingAddress.name
    );

    const shippingEmail = cleanString(
      shippingAddress.email
    ).toLowerCase();

    const shippingPhone = cleanString(
      shippingAddress.phone
    );

    const shippingAddressText = cleanString(
      shippingAddress.address
    );

    const shippingCity = cleanString(
      shippingAddress.city
    );

    const shippingCountry = cleanString(
      shippingAddress.country
    );

    const shippingPostal = cleanString(
      shippingAddress.postal
    );

    const notes = cleanString(
      shippingAddress.notes
    );

    if (
      !shippingName ||
      !shippingEmail ||
      !shippingPhone ||
      !shippingAddressText ||
      !shippingCity ||
      !shippingCountry
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required shipping fields.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(shippingEmail)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid shipping email.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      paymentMethod !==
      "cash_on_delivery"
    ) {
      return NextResponse.json(
        {
          error:
            "Card payments are not currently connected. Please choose cash on delivery.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      shippingCountry.toLowerCase() !==
      "egypt"
    ) {
      return NextResponse.json(
        {
          error:
            "Cash on delivery is currently available in Egypt only.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Normalize cart items.
     */
    const requested = (
      items as CartRequestItem[]
    ).map((item) => {
      const productId =
        cleanString(item.productId);

      const quantity =
        typeof item.quantity === "number"
          ? item.quantity
          : Number(item.quantity);

      const size =
        cleanString(item.size) || null;

      const color =
        cleanString(item.color) || null;

      return {
        productId,
        quantity,
        size,
        color,
      };
    });

    const invalidItem = requested.some(
      (item) =>
        !item.productId ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
    );

    if (invalidItem) {
      return NextResponse.json(
        {
          error: "Invalid cart item.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Combine duplicate product + variant lines.
     */
    const grouped = new Map<
      string,
      {
        productId: string;
        quantity: number;
        size: string | null;
        color: string | null;
      }
    >();

    for (const item of requested) {
      const key = [
        item.productId,
        item.size || "",
        item.color || "",
      ].join("::");

      const existing = grouped.get(key);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        grouped.set(key, {
          ...item,
        });
      }
    }

    const normalizedItems = Array.from(
      grouped.values()
    );

    /*
     * Load all products from the database.
     * Never trust price/name/inventory from the client.
     */
    const ids = [
      ...new Set(
        normalizedItems.map(
          (item) => item.productId
        )
      ),
    ];

    const products =
      await db.product.findMany({
        where: {
          id: {
            in: ids,
          },
          active: true,
        },
      });

    if (products.length !== ids.length) {
      return NextResponse.json(
        {
          error:
            "One or more products are no longer available.",
        },
        {
          status: 409,
        }
      );
    }

    const productsById = new Map(
      products.map((product) => [
        product.id,
        product,
      ])
    );

    let subtotal = 0;

    const orderItems = normalizedItems.map(
      (item) => {
        const product =
          productsById.get(item.productId);

        if (!product) {
          throw new Error(
            "Product is no longer available."
          );
        }

        if (
          item.quantity >
          product.inventory
        ) {
          throw new Error(
            `Only ${product.inventory} ${product.name} available.`
          );
        }

        const sizes = parseJson<string[]>(
          product.sizes,
          []
        );

        const colors = parseJson<
          { name: string }[]
        >(
          product.colors,
          []
        );

        if (
          item.size &&
          sizes.length > 0 &&
          !sizes.includes(item.size)
        ) {
          throw new Error(
            `Invalid size for ${product.name}.`
          );
        }

        if (
          item.color &&
          colors.length > 0 &&
          !colors.some(
            (color) =>
              color.name === item.color
          )
        ) {
          throw new Error(
            `Invalid colour for ${product.name}.`
          );
        }

        subtotal +=
          product.price * item.quantity;

        const imageList =
          parseJson<string[]>(
            product.images,
            []
          );

        const images =
          imagesForProduct(
            product.slug,
            imageList
          );

        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: images[0] || null,
        };
      }
    );

    const shipping =
      subtotal >
      FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE;

    const tax =
      subtotal * TAX_RATE;

    const total =
      subtotal +
      shipping +
      tax;

    if (total > COD_LIMIT) {
      return NextResponse.json(
        {
          error:
            "Cash on delivery is limited to orders up to 5,000 EGP.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Generate a readable order number.
     */
    const orderNumber =
      `VRD-${Date.now()
        .toString(36)
        .toUpperCase()}-${Math.floor(
        Math.random() * 9000 + 1000
      )}`;

    /*
     * Create order + decrement inventory
     * atomically.
     */
    const order =
      await db.$transaction(
        async (tx) => {
          for (const item of orderItems) {
            const updated =
              await tx.product.updateMany({
                where: {
                  id: item.productId,
                  active: true,
                  inventory: {
                    gte: item.quantity,
                  },
                },
                data: {
                  inventory: {
                    decrement:
                      item.quantity,
                  },
                },
              });

            if (updated.count !== 1) {
              throw new Error(
                `${item.name} sold out while you were checking out.`
              );
            }
          }

          const created =
            await tx.order.create({
              data: {
                orderNumber,

                userId: user.id,

                subtotal,
                shipping,
                tax,
                total,

                status: "pending",

                paymentMethod:
                  "cash_on_delivery",

                shippingName,
                shippingEmail,
                shippingPhone,
                shippingAddress:
                  shippingAddressText,
                shippingCity,
                shippingCountry,
                shippingPostal,

                notes,

                items: {
                  create: orderItems,
                },
              },

              include: {
                items: true,
              },
            });

          /*
           * Clear any server-side cart items
           * belonging to this user.
           */
          await tx.cartItem.deleteMany({
            where: {
              userId: user.id,
            },
          });

          return created;
        }
      );

    return NextResponse.json(
      {
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "[orders:post] error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Could not place order.";

    /*
     * Inventory/business validation errors are
     * client-correctable. Unexpected DB/server
     * errors should be 500.
     */
    const isBusinessError =
      message.includes("available") ||
      message.includes("sold out") ||
      message.includes("Invalid size") ||
      message.includes("Invalid colour");

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: isBusinessError
          ? 409
          : 500,
      }
    );
  }
}