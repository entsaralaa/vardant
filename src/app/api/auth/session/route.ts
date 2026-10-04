import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "verdant-token";

export async function GET(req: Request) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return NextResponse.json(
        {
          user: null,
          error: "Authentication is not configured.",
        },
        { status: 503 }
      );
    }

    const cookieHeader =
      req.headers.get("cookie") || "";

    const tokenMatch = cookieHeader.match(
      /(?:^|;\s*)verdant-token=([^;]+)/
    );

    const token = tokenMatch?.[1];

    if (!token) {
      return NextResponse.json({
        user: null,
      });
    }

    let payload: {
      sub?: string;
      email?: string;
      role?: string;
    };

    try {
      payload = jwt.verify(
        token,
        JWT_SECRET
      ) as {
        sub?: string;
        email?: string;
        role?: string;
      };
    } catch {
      const response = NextResponse.json({
        user: null,
      });

      // Remove an expired/invalid cookie.
      response.cookies.set({
        name: COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    if (!payload.sub) {
      const response = NextResponse.json({
        user: null,
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    const user = await db.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      const response = NextResponse.json({
        user: null,
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error(
      "[session] error:",
      error
    );

    return NextResponse.json(
      {
        user: null,
      },
      { status: 500 }
    );
  }
}