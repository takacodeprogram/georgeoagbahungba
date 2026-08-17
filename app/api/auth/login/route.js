import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    // Récupérer l'utilisateur
    const results = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (results.length === 0) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const user = results[0];
    
    // Valider le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    // Signer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Créer le cookie HTTPOnly de session
    const cookie = serialize("takacode_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    const response = NextResponse.json({
      message: "Connexion réussie.",
      user: { email: user.email, role: user.role }
    });
    
    response.headers.append("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la connexion." }, { status: 500 });
  }
}
