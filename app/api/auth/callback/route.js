import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // Récupérer le token renvoyé par Neon Auth dans l'URL de callback
    const token = searchParams.get("token") || searchParams.get("access_token");

    if (!token) {
      return NextResponse.json({ error: "Token non fourni par Neon Auth." }, { status: 400 });
    }

    // Sauvegarder le token dans le cookie de session
    const cookie = serialize("takacode_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    // Rediriger vers le branding studio
    const response = NextResponse.redirect(new URL("/branding-studio", request.nextUrl.origin));
    response.headers.append("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
}
