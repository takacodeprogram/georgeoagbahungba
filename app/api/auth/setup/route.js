import { NextResponse } from "next/server";
import { initDb } from "@/lib/initDb";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Initialise la table
    await initDb();

    // Vérifie s'il y a déjà des utilisateurs
    const users = await sql`SELECT id FROM users LIMIT 1`;
    
    if (users.length === 0) {
      // Crée un compte administrateur par défaut
      // Email: admin@takacode.app
      // Password: admin_takacode_secure
      const hashedPassword = await bcrypt.hash("admin_takacode_secure", 10);
      await sql`
        INSERT INTO users (email, password, role)
        VALUES ('admin@takacode.app', ${hashedPassword}, 'admin')
      `;
      return NextResponse.json({ message: "Database initialized, default admin account created (admin@takacode.app / admin_takacode_secure)" });
    }

    return NextResponse.json({ message: "Database already initialized." });
  } catch (error) {
    console.error("Initialization error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
