"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Loader2, AlertCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/branding-studio";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirection automatique si déjà connecté
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated) {
        router.push(redirectUrl);
      }
    }
    checkAuth();
  }, [router, redirectUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      router.push(redirectUrl);
      // Forcer le rafraîchissement de la page cible pour charger le middleware mis à jour
      setTimeout(() => {
        router.refresh();
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", width: "100%", background: "#0d1012", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 20px 45px rgba(0,0,0,0.5)" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ width: "50px", height: "50px", background: "rgba(216,169,61,0.1)", border: "1px solid #dda63c", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 1rem" }}>
          <Lock size={20} style={{ color: "#dda63c" }} />
        </div>
        <h2 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", color: "#f8f5ed", margin: "0 0 0.5rem" }}>Accès restreint</h2>
        <p style={{ color: "var(--mud)", fontSize: "0.9rem", margin: 0 }}>Connectez-vous pour accéder au Studio de Branding.</p>
      </div>

      {error && (
        <div style={{ display: "flex", gap: "0.6rem", background: "rgba(235, 64, 64, 0.1)", border: "1px solid #eb4040", borderRadius: "8px", padding: "0.9rem", color: "#ff8d8d", fontSize: "0.85rem", marginBottom: "1.5rem", alignItems: "center" }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="email" style={{ display: "block", fontSize: "0.85rem", color: "var(--mud)", marginBottom: "0.4rem", fontWeight: "600" }}>Adresse e-mail</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.85rem", background: "#050708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f8f5ed", outline: "none", fontSize: "0.95rem" }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="password" style={{ display: "block", fontSize: "0.85rem", color: "var(--mud)", marginBottom: "0.4rem", fontWeight: "600" }}>Mot de passe</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.85rem", background: "#050708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f8f5ed", outline: "none", fontSize: "0.95rem" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            background: "#dda63c",
            color: "#080b0d",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            transition: "opacity 200ms"
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main style={{ background: "#050708", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader solid />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 2rem 4rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--mud)", fontSize: "0.9rem", marginBottom: "2rem", textDecoration: "none" }}>
          <ArrowLeft size={16} /> Retour au site
        </Link>
        <Suspense fallback={
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--mud)" }}>
            <Loader2 className="animate-spin" /> Chargement du formulaire...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  );
}
