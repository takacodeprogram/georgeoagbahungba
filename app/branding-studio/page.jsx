"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, RefreshCw, Upload, Layout, User, Square, Eye, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";

const PRESETS = {
  takacode: {
    name: "TakaCode",
    colors: {
      bg: "#070a0c",
      accent: "#dda63c",
      text: "#f8f5ed",
      textMuted: "#b9bdc4",
    },
    fonts: {
      title: "Venite Adoremus",
      subtitle: "Plus Jakarta Sans",
    },
    logo: "/media/takacode-skull.png",
    defaultTagline: "INITIALISATION • APPRENDRE PAR LA PRATIQUE",
  },
  person: {
    name: "Georgeo Agbahungba",
    colors: {
      bg: "#080b0d",
      accent: "#c38218",
      text: "#f8f5ed",
      textMuted: "#8a9099",
    },
    fonts: {
      title: "Plus Jakarta Sans",
      subtitle: "Manrope",
    },
    logo: "/media/georgeo-logo-gold.webp",
    defaultTagline: "AGROECONOMISTE • FULL STACK • DATA ENGINEER",
  },
};

const FORMATS = {
  square: { name: "Carré (Instagram / LinkedIn)", width: 1080, height: 1080, aspect: "1/1" },
  vertical: { name: "Vertical (Story / TikTok)", width: 1080, height: 1920, aspect: "9/16" },
  landscape: { name: "Paysage (X / Banner)", width: 1200, height: 630, aspect: "1.91/1" },
};

const TEMPLATES = [
  {
    id: "tech-card",
    name: "Gabarit Carte Produit / Tech",
    draw: (ctx, width, height, data, logoImg, customImg) => {
      // Fond sombre uni de marque
      ctx.fillStyle = data.colors.bg;
      ctx.fillRect(0, 0, width, height);

      // Noise texture simulée
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      for (let i = 0; i < 20000; i++) {
        let rx = Math.random() * width;
        let ry = Math.random() * height;
        ctx.fillRect(rx, ry, 1.5, 1.5);
      }

      // Lignes de guidage dorées / sub-accents
      ctx.strokeStyle = `${data.colors.accent}15`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, 0); ctx.lineTo(width * 0.08, height);
      ctx.moveTo(width * 0.92, 0); ctx.lineTo(width * 0.92, height);
      ctx.stroke();

      // Dessin du Logo de marque (Toujours affiché en haut à gauche ou centré en haut)
      if (logoImg) {
        ctx.save();
        const logoSize = Math.min(width, height) * 0.12;
        const logoRatio = logoImg.width / logoImg.height;
        let dWidth = logoSize;
        let dHeight = logoSize;
        if (logoRatio > 1) {
          dHeight = logoSize / logoRatio;
        } else {
          dWidth = logoSize * logoRatio;
        }
        // Placé en haut à gauche
        ctx.drawImage(logoImg, width * 0.08, height * 0.06, dWidth, dHeight);
        ctx.restore();
      }

      // Dessin de l'image custom si fournie (affichée au centre)
      if (customImg) {
        ctx.save();
        const imgWidth = width * 0.68;
        const imgHeight = height * 0.35;
        const ix = (width - imgWidth) / 2;
        const iy = height * 0.18;
        
        ctx.strokeStyle = `${data.colors.accent}33`;
        ctx.lineWidth = 1;
        ctx.strokeRect(ix - 4, iy - 4, imgWidth + 8, imgHeight + 8);

        // object-fit: cover simulation
        const targetRatio = imgWidth / imgHeight;
        const imgRatio = customImg.width / customImg.height;
        let sWidth = customImg.width;
        let sHeight = customImg.height;
        let sx = 0;
        let sy = 0;
        
        if (imgRatio > targetRatio) {
          sWidth = customImg.height * targetRatio;
          sx = (customImg.width - sWidth) / 2;
        } else {
          sHeight = customImg.width / targetRatio;
          sy = (customImg.height - sHeight) / 2;
        }

        ctx.drawImage(customImg, sx, sy, sWidth, sHeight, ix, iy, imgWidth, imgHeight);
        ctx.restore();
      }

      // Typographies & Textes
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 1. Tagline / Sur-titre
      ctx.fillStyle = data.colors.accent;
      ctx.font = `bold ${Math.max(12, width * 0.022)}px "${data.fonts.subtitle}"`;
      ctx.fillText(data.tagline.toUpperCase(), width / 2, customImg ? height * 0.62 : height * 0.45);

      // 2. Titre Principal
      ctx.fillStyle = data.colors.text;
      ctx.font = `${Math.max(26, width * 0.048)}px "${data.fonts.title}"`;
      ctx.fillText(data.title, width / 2, customImg ? height * 0.71 : height * 0.56);

      // 3. Description / Texte libre
      ctx.fillStyle = data.colors.textMuted;
      ctx.font = `${Math.max(14, width * 0.026)}px "${data.fonts.subtitle}"`;
      
      const words = data.description.split(" ");
      let line = "";
      let lines = [];
      const maxWidth = width * 0.72;
      const lineHeight = Math.max(20, width * 0.036);

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let startY = customImg ? height * 0.80 : height * 0.68;
      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k], width / 2, startY + (k * lineHeight));
      }

      // 4. Footer visuel (Signature de bas de page)
      ctx.fillStyle = `${data.colors.textMuted}60`;
      ctx.font = `500 ${Math.max(10, width * 0.018)}px "${data.fonts.subtitle}"`;
      ctx.fillText("TERRAIN × DATA × PRODUIT  |  GEORGE-AGBAHUNGBA.XYZ", width / 2, height * 0.94);
    },
  },
  {
    id: "split-studio",
    name: "Gabarit Split Édito",
    draw: (ctx, width, height, data, logoImg, customImg) => {
      // Split layout - fond gauche sombre, fond droit accentué ou image
      ctx.fillStyle = data.colors.bg;
      ctx.fillRect(0, 0, width, height);

      const splitX = width * 0.46;

      // Dessin de l'image custom dans la partie droite
      if (customImg) {
        ctx.save();
        // Côté droit entier
        ctx.beginPath();
        ctx.rect(splitX, 0, width - splitX, height);
        ctx.clip();

        const targetWidth = width - splitX;
        const targetRatio = targetWidth / height;
        const imgRatio = customImg.width / customImg.height;
        let sWidth = customImg.width;
        let sHeight = customImg.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > targetRatio) {
          sWidth = customImg.height * targetRatio;
          sx = (customImg.width - sWidth) / 2;
        } else {
          sHeight = customImg.width / targetRatio;
          sy = (customImg.height - sHeight) / 2;
        }

        ctx.drawImage(customImg, sx, sy, sWidth, sHeight, splitX, 0, targetWidth, height);
        
        // Overlay sombre sur le côté droit pour lisibilité
        ctx.fillStyle = "rgba(7, 10, 12, 0.4)";
        ctx.fillRect(splitX, 0, targetWidth, height);
        ctx.restore();
      } else {
        // Côté droit dégradé abstrait de la marque
        const rightGradient = ctx.createLinearGradient(splitX, 0, width, height);
        rightGradient.addColorStop(0, `${data.colors.accent}15`);
        rightGradient.addColorStop(1, `${data.colors.bg}`);
        ctx.fillStyle = rightGradient;
        ctx.fillRect(splitX, 0, width - splitX, height);
      }

      // Bord de délimitation vertical
      ctx.strokeStyle = `${data.colors.accent}25`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, height);
      ctx.stroke();

      // Dessin du Logo de marque (Toujours affiché)
      if (logoImg) {
        ctx.save();
        const logoSize = Math.min(width, height) * 0.14;
        const logoRatio = logoImg.width / logoImg.height;
        let dWidth = logoSize;
        let dHeight = logoSize;
        if (logoRatio > 1) {
          dHeight = logoSize / logoRatio;
        } else {
          dWidth = logoSize * logoRatio;
        }
        ctx.drawImage(logoImg, width * 0.05, height * 0.08, dWidth, dHeight);
        ctx.restore();
      }

      // Textes alignés à gauche dans la partie gauche
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // 1. Tagline
      ctx.fillStyle = data.colors.accent;
      ctx.font = `bold ${Math.max(12, width * 0.022)}px "${data.fonts.subtitle}"`;
      ctx.fillText(data.tagline.toUpperCase(), width * 0.05, height * 0.32);

      // 2. Titre Principal
      ctx.fillStyle = data.colors.text;
      ctx.font = `${Math.max(24, width * 0.046)}px "${data.fonts.title}"`;
      
      const titleWords = data.title.split(" ");
      let tLine = "";
      let tLines = [];
      const maxTitleWidth = splitX - (width * 0.1);
      const titleLineHeight = Math.max(30, width * 0.054);

      for (let n = 0; n < titleWords.length; n++) {
        let testLine = tLine + titleWords[n] + " ";
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxTitleWidth && n > 0) {
          tLines.push(tLine);
          tLine = titleWords[n] + " ";
        } else {
          tLine = testLine;
        }
      }
      tLines.push(tLine);

      let startTitleY = height * 0.42;
      for (let k = 0; k < tLines.length; k++) {
        ctx.fillText(tLines[k], width * 0.05, startTitleY + (k * titleLineHeight));
      }

      // 3. Description
      ctx.fillStyle = data.colors.textMuted;
      ctx.font = `${Math.max(14, width * 0.026)}px "${data.fonts.subtitle}"`;
      
      const words = data.description.split(" ");
      let line = "";
      let lines = [];
      const maxWidth = splitX - (width * 0.1);
      const lineHeight = Math.max(20, width * 0.034);

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let startDescY = startTitleY + (tLines.length * titleLineHeight) + 20;
      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k], width * 0.05, startDescY + (k * lineHeight));
      }

      // 4. Footer visuel gauche
      ctx.fillStyle = `${data.colors.textMuted}60`;
      ctx.font = `500 ${Math.max(10, width * 0.016)}px "${data.fonts.subtitle}"`;
      ctx.fillText("TAKACODE × GEORGE-AGBAHUNGBA.XYZ", width * 0.05, height * 0.92);
    },
  },
];

export default function BrandingStudioPage() {
  const [presetKey, setPresetKey] = useState("takacode");
  const [formatKey, setFormatKey] = useState("square");
  const [templateId, setTemplateId] = useState("minimalist");
  
  const [title, setTitle] = useState("EXPLORER L'IA");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("Construire des applications interactives et automatiser les processus complexes.");
  
  const [customImage, setCustomImage] = useState(null);
  const [customImageSrc, setCustomImageSrc] = useState("");

  const canvasRef = useRef(null);
  
  const activePreset = PRESETS[presetKey];
  const activeFormat = FORMATS[formatKey];
  const activeTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  // Met à jour la tagline par défaut au changement de preset
  useEffect(() => {
    setTagline(PRESETS[presetKey].defaultTagline);
  }, [presetKey]);

  // Génération du rendu sur le Canvas
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = activeFormat.width;
    const height = activeFormat.height;

    canvas.width = width;
    canvas.height = height;

    const drawVisuals = (logoImg, customImg) => {
      activeTemplate.draw(
        ctx,
        width,
        height,
        {
          colors: activePreset.colors,
          fonts: activePreset.fonts,
          title,
          tagline: tagline || activePreset.defaultTagline,
          description,
        },
        logoImg,
        customImg
      );
    };

    // Chargement des images (Logo et Custom Image si fournie)
    const logoPromise = new Promise((resolve) => {
      const img = new Image();
      img.src = activePreset.logo;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });

    const customPromise = new Promise((resolve) => {
      if (!customImageSrc) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.src = customImageSrc;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });

    Promise.all([logoPromise, customPromise]).then(([logoImg, customImg]) => {
      // Attendre un court instant que les polices soient chargées si possible
      document.fonts.ready.then(() => {
        drawVisuals(logoImg, customImg);
      });
    });
  };

  // Lance le rendu au changement de n'importe quel paramètre de design
  useEffect(() => {
    renderCanvas();
  }, [presetKey, formatKey, templateId, title, tagline, description, customImageSrc]);

  // Gestion de l'upload de l'image personnalisée
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCustomImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setCustomImageSrc(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  // Téléchargement du visuel généré
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${presetKey}_visuel_${formatKey}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="agency-page branding-studio" style={{ background: "#050708", color: "#f8f5ed", minHeight: "100vh" }}>
      <SiteHeader solid />

      <header className="cv-page-hero" style={{ paddingBottom: "2rem" }}>
        <Link href="/" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow"><Sparkles size={14} style={{ color: "var(--gold)", display: "inline", verticalAlign: "middle", marginRight: "6px" }} /> Outil de Branding interne</p>
        <h1 data-anim="title">Générateur de <em>Visuels & Social Media</em></h1>
        <p className="lead" data-anim="up">
          Créez des cartes de réseaux sociaux harmonisées avec la charte graphique de TakaCode ou le branding personnel Georgeo Agbahungba.
        </p>
      </header>

      <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", alignItems: "start" }}>
          
          {/* Section Options / Contrôles */}
          <div style={{ background: "#0d1012", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "2.5rem" }}>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.8rem", color: "#dda63c" }}>Configuration</h3>
            
            {/* 1. Choix du Branding */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.5rem", fontWeight: "600" }}>Univers / Branding</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setPresetKey("takacode")}
                  style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    border: presetKey === "takacode" ? "1px solid #dda63c" : "1px solid rgba(255,255,255,0.08)",
                    background: presetKey === "takacode" ? "rgba(221,166,60,0.08)" : "#070a0c",
                    color: presetKey === "takacode" ? "#dda63c" : "#f8f5ed",
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Layout size={16} /> TakaCode
                </button>
                <button
                  type="button"
                  onClick={() => setPresetKey("person")}
                  style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    border: presetKey === "person" ? "1px solid #c38218" : "1px solid rgba(255,255,255,0.08)",
                    background: presetKey === "person" ? "rgba(195,130,24,0.08)" : "#070a0c",
                    color: presetKey === "person" ? "#c38218" : "#f8f5ed",
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <User size={16} /> G. Agbahungba
                </button>
              </div>
            </div>

            {/* 2. Format & Réseau */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.5rem", fontWeight: "600" }}>Format d'export</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                {Object.entries(FORMATS).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormatKey(key)}
                    style={{
                      padding: "0.8rem 0.5rem",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      border: formatKey === key ? `1px solid ${activePreset.colors.accent}` : "1px solid rgba(255,255,255,0.08)",
                      background: formatKey === key ? `${activePreset.colors.accent}1a` : "#070a0c",
                      color: formatKey === key ? activePreset.colors.accent : "#f8f5ed",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    {value.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Choix du Template */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.5rem", fontWeight: "600" }}>Gabarit de mise en page (Template)</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setTemplateId(tpl.id)}
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: templateId === tpl.id ? `1px solid ${activePreset.colors.accent}` : "1px solid rgba(255,255,255,0.08)",
                      background: templateId === tpl.id ? `${activePreset.colors.accent}1a` : "#070a0c",
                      color: templateId === tpl.id ? activePreset.colors.accent : "#f8f5ed",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Textes */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="title-input" style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.4rem", fontWeight: "600" }}>Titre Principal</label>
              <input
                id="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "0.9rem", background: "#050708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f8f5ed", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="tagline-input" style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.4rem", fontWeight: "600" }}>Sous-titre / Tagline</label>
              <input
                id="tagline-input"
                type="text"
                placeholder={activePreset.defaultTagline}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                style={{ width: "100%", padding: "0.9rem", background: "#050708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f8f5ed", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="desc-input" style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.4rem", fontWeight: "600" }}>Texte additionnel / Description</label>
              <textarea
                id="desc-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "0.9rem", background: "#050708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f8f5ed", outline: "none", resize: "none" }}
              />
            </div>

            {/* 5. Upload Image Custom */}
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--mud)", marginBottom: "0.5rem", fontWeight: "600" }}>Image personnalisée (remplace le logo)</label>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <label
                  style={{
                    flex: "1",
                    padding: "0.9rem",
                    background: "#050708",
                    border: "1px dashed rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "var(--mud)",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Upload size={16} /> Charger un fichier
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                </label>
                {customImageSrc && (
                  <button
                    type="button"
                    onClick={() => { setCustomImage(null); setCustomImageSrc(""); }}
                    style={{ padding: "0.9rem 1.2rem", background: "#bf4040", border: "none", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Actions de Génération & Téléchargement */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              <button
                type="button"
                onClick={renderCanvas}
                style={{
                  padding: "1.1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "#f8f5ed",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem"
                }}
              >
                <RefreshCw size={16} /> Rafraîchir
              </button>
              <button
                type="button"
                onClick={handleDownload}
                style={{
                  padding: "1.1rem",
                  borderRadius: "8px",
                  border: "none",
                  background: activePreset.colors.accent,
                  color: "#080b0d",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem"
                }}
              >
                <Download size={16} /> Télécharger
              </button>
            </div>

          </div>

          {/* Section Preview du Visuel */}
          <div style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--mud)", marginBottom: "1rem", alignSelf: "flex-start", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }}><Eye size={16} /> Aperçu Temps Réel</h3>
            
            {/* Conteneur d'affichage proportionnel */}
            <div style={{
              width: "100%",
              maxWidth: "480px",
              aspectRatio: activeFormat.aspect,
              background: "#080b0d",
              borderRadius: "16px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "transparent",
                }}
              />
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--mud)", marginTop: "1rem", textAlign: "center" }}>
              Résolution réelle d'exportation : {activeFormat.width}px × {activeFormat.height}px
            </p>
          </div>

        </div>
      </section>

      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
