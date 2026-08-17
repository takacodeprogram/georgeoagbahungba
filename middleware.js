import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

// Créer le vérificateur JWKS distant pour Neon Auth
const JWKS = createRemoteJWKSet(
  new URL(
    process.env.NEON_AUTH_JWKS_URL ||
      "https://ep-icy-bird-ay3324p2.neonauth.c-5.us-east-2.aws.neon.tech/neondb/auth/.well-known/jwks.json"
  )
);

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Protéger le branding-studio
  if (pathname.startsWith("/branding-studio")) {
    const token = request.cookies.get("takacode_auth");

    if (!token) {
      // Rediriger vers l'écran de connexion Neon Auth managé
      const loginUrl = `${process.env.NEON_AUTH_URL}/login?redirect_uri=${encodeURIComponent(
        request.nextUrl.origin + "/api/auth/callback"
      )}`;
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Valider le token JWT de Neon Auth via les clés JWKS publiques
      await jwtVerify(token.value, JWKS);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      // Rediriger vers Neon Auth en cas d'expiration/erreur
      const loginUrl = `${process.env.NEON_AUTH_URL}/login?redirect_uri=${encodeURIComponent(
        request.nextUrl.origin + "/api/auth/callback"
      )}`;
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/branding-studio/:path*"],
};
