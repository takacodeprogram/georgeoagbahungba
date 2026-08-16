import nodemailer from "nodemailer";
import { contact } from "@/data/portfolio";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function styledEmail({ email }) {
  const domain = "georgeo-agbahungba.xyz";
  const logoUrl = `https://${domain}/media/georgeo-logo-gold.webp`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bienvenue dans la newsletter</title>
</head>
<body style="margin:0;padding:0;background:#f4f1e9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1e9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d1013;border-radius:16px;overflow:hidden;border:1px solid #2a2f36;">
          <tr>
            <td style="padding:40px 40px 24px;text-align:center;background:radial-gradient(ellipse at 50% 0%, rgba(216,169,61,0.22), transparent 60%), #0d1013;">
              <img src="${logoUrl}" alt="Georgeo Agbahungba" width="130" style="width:130px;height:auto;" />
              <h1 style="margin:20px 0 8px;color:#f8f5ed;font-size:26px;line-height:1.2;">Bienvenue dans la newsletter</h1>
              <p style="margin:0;color:#c38218;font-style:italic;font-size:16px;">Analyser. Innover. Développer.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px;background:#0d1013;">
              <p style="margin:0 0 16px;color:#e8e4d8;font-size:15px;line-height:1.7;">
                Bonjour${email ? ` <strong style="color:#fff;">${email}</strong>` : ""},
              </p>
              <p style="margin:0 0 16px;color:#b9bdc4;font-size:15px;line-height:1.7;">
                Merci de vous être inscrit·e à la newsletter. Vous recevrez les nouveautés sur mes projets,
                mes travaux en agroéconomie, data et développement, ainsi que des ressources pratiques.
                Pas de spam, un e-mail de temps en temps, et vous pourrez vous désinscrire à tout moment.
              </p>
              <p style="margin:0 0 24px;color:#b9bdc4;font-size:15px;line-height:1.7;">
                Au plaisir d’échanger sur vos projets, vos données et vos idées.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background:#c38218;border-radius:100px;padding:12px 28px;">
                    <a href="https://${domain}" style="color:#0d1013;text-decoration:none;font-size:14px;font-weight:bold;">Découvrir mon portfolio</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background:#0a0c0f;border-top:1px solid #1c2127;">
              <p style="margin:0 0 6px;color:#8a9099;font-size:13px;line-height:1.6;">
                <strong style="color:#c8ccd2;">Georgeo S. R. Agbahungba</strong><br />
                Agroéconomiste · Développeur Full Stack · Agritech · Data · IA
              </p>
              <p style="margin:0 0 6px;color:#8a9099;font-size:13px;line-height:1.6;">
                ${contact.location} · ${contact.phoneDisplay} · <a href="mailto:${contact.email}" style="color:#c38218;text-decoration:none;">${contact.email}</a>
              </p>
              <p style="margin:0;color:#6b7078;font-size:12px;line-height:1.6;">
                © ${new Date().getFullYear()} Georgeo Agbahungba — Tous droits réservés.<br />
                <a href="https://${domain}" style="color:#6b7078;">${domain}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Adresse e-mail invalide." }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_HOST) {
      return Response.json({ error: "SMTP non configuré côté serveur." }, { status: 500 });
    }

    const html = styledEmail({ email });

    await transporter().sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "Georgeo Agbahungba"}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Bienvenue dans la newsletter — Georgeo Agbahungba",
      text: `Merci de votre inscription à la newsletter de Georgeo Agbahungba (agroéconomie, data, développement et IA).\n\n${contact.location} · ${contact.phoneDisplay} · ${contact.email}\nhttps://georgeo-agbahungba.xyz`,
      html,
    });

    return Response.json({ ok: true, message: "Inscription confirmée, e-mail envoyé." });
  } catch (error) {
    console.error("Newsletter error:", error);
    return Response.json({ error: "L'envoi de l'e-mail a échoué. Réessayez plus tard." }, { status: 500 });
  }
}
