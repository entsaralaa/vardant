import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_TTL = "7d";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

export async function POST(req: Request) {
  try {
    const JWT_SECRET = getJwtSecret();

    if (!JWT_SECRET) {
      return NextResponse.json(
        {
          error:
            "Authentication is not configured.",
        },
        { status: 503 }
      );
    }

    let body: {
      email?: unknown;
      name?: unknown;
      password?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error:
            "Name, email, and password are required.",
        },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        {
          error: "Please enter a valid name.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        {
          error: "Password is too long.",
        },
        { status: 400 }
      );
    }

    const existing = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An account with that email already exists.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "customer",
        country: "Egypt",
      },
    });

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: TOKEN_TTL,
      }
    );

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      {
        status: 201,
      }
    );

    response.cookies.set({
      name: "verdant-token",
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(
      "[signup] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Server error during signup.",
      },
      {
        status: 500,
      }
    );
  }
}