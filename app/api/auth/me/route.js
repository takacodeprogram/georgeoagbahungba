import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(
    process.env.NEON_AUTH_JWKS_URL ||
      "https://ep-icy-bird-ay3324p2.neonauth.c-5.us-east-2.aws.neon.tech/neondb/auth/.well-known/jwks.json"
  )
);

export async function GET(request) {
  try {
    const cookie = request.cookies.get("takacode_auth");

    if (!cookie) {
      return NextResponse.json({ authenticated: false });
    }

    // Valider la signature du jeton via JWKS
    const { payload } = await jwtVerify(cookie.value, JWKS);
    return NextResponse.json({
      authenticated: true,
      user: {
        email: payload.email,
        name: payload.name || payload.email
      }
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
