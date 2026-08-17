"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue. Réessayez.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "Inscription confirmée !");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Connexion impossible. Réessayez dans un instant.");
    }
  }

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="eyebrow">Newsletter</p>
          <h2 id="newsletter-title">À l’intersection du terrain, <em>de la data et du produit.</em></h2>
          <p className="newsletter-lead">
            Je partage mes expérimentations, projets, ressources et réflexions autour de l’Agritech, de la donnée, de l’IA et du développement numérique.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="newsletter-email">Votre adresse e-mail</label>
          <div className="newsletter-row">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Votre e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Envoi…" : "Suivre mes travaux"}
            </button>
          </div>
          {status === "success" && <p className="newsletter-feedback is-ok" role="status">{message}</p>}
          {status === "error" && <p className="newsletter-feedback is-error" role="alert">{message}</p>}
        </form>
      </div>
    </section>
  );
}
