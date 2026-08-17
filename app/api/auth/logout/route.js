import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("takacode_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1, // Supprime le cookie
    path: "/",
  });

  const response = NextResponse.json({ message: "Déconnexion réussie." });
  response.headers.append("Set-Cookie", cookie);
  return response;
}
