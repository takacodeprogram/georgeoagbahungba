import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("takacode_auth");

    if (!cookie) {
      return NextResponse.json({ authenticated: false });
    }

    const payload = jwt.verify(cookie.value, process.env.JWT_SECRET);
    return NextResponse.json({
      authenticated: true,
      user: {
        email: payload.email,
        role: payload.role
      }
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
