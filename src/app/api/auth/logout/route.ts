import { NextResponse } from "next/server";

const COOKIE_NAME = "verdant-token";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(
      "[logout] error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to log out.",
      },
      {
        status: 500,
      }
    );
  }
}