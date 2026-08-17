import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

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
      // Rediriger vers la page login locale de notre site
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Valider le token JWT via JWKS
      await jwtVerify(token.value, JWKS);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      // Rediriger vers la page login locale en cas d'erreur
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/branding-studio/:path*"],
};
