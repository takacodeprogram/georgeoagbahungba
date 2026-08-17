import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Protéger le branding-studio
  if (pathname.startsWith("/branding-studio")) {
    const token = request.cookies.get("takacode_auth");

    if (!token) {
      // Rediriger vers l'écran de login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      // Conserve l'URL d'origine pour y revenir après connexion
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Valider le token JWT
      jwt.verify(token.value, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // Token invalide ou expiré -> vers login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configurer le Middleware pour n'écouter que sur /branding-studio
export const config = {
  matcher: ["/branding-studio/:path*"],
};
