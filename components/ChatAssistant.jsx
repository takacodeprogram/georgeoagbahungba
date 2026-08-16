"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/data/portfolio";

const suggestions = ["Quels sont ses projets Agritech ?", "Comment contacter Georgeo ?", "Où télécharger son CV ?"];

// Une seule sollicitation par session : la bulle ne revient ni après un refus
// ni après une première ouverture du chat.
const DISMISS_KEY = "chat-prompt-vu";
const PROMPT_DELAY = 7000;

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "Bonjour, je suis l’assistant du portfolio de Georgeo. Posez-moi une question sur son parcours, ses projets ou ses compétences." }]);
  const promptRef = useRef(null);

  useEffect(() => {
    if (open) return undefined;
    let seen = false;
    try { seen = window.sessionStorage.getItem(DISMISS_KEY) === "1"; } catch { /* mode privé */ }
    if (seen) return undefined;

    const timer = window.setTimeout(() => setPrompt(true), PROMPT_DELAY);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const node = promptRef.current;
    if (!prompt || !node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let tween;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      tween = gsap.fromTo(
        node,
        { scale: 0.4, autoAlpha: 0, y: 14, transformOrigin: "bottom right" },
        { scale: 1, autoAlpha: 1, y: 0, duration: 0.62, ease: "back.out(2.2)" },
      );
    });
    return () => { cancelled = true; tween?.kill(); };
  }, [prompt]);

  function closePrompt() {
    setPrompt(false);
    try { window.sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* mode privé */ }
  }

  function openChat() {
    closePrompt();
    setOpen(true);
  }

  async function send(text) {
    const message = text.trim();
    if (!message || loading) return;
    const next = [...messages, { role: "user", content: message }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-8) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur");
      setMessages((current) => [...current, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: `Je ne peux pas répondre maintenant. Vous pouvez joindre Georgeo sur WhatsApp au ${contact.phoneDisplay}.` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat-panel" aria-label="Assistant du portfolio">
          <header><div><Bot aria-hidden="true" /><span>Assistant Georgeo<small><i /> En ligne</small></span></div><button type="button" onClick={() => setOpen(false)} aria-label="Fermer"><X /></button></header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.content}</p>)}
            {loading && <p className="assistant typing"><i /><i /><i /></p>}
          </div>
          {messages.length === 1 && <div className="chat-suggestions">{suggestions.map((item) => <button type="button" onClick={() => send(item)} key={item}>{item}</button>)}</div>}
          <form onSubmit={(event) => { event.preventDefault(); send(input); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Votre question…" maxLength={500} aria-label="Votre question" />
            <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}><Send /></button>
          </form>
          <small className="chat-disclaimer">Réponses basées sur le portfolio de Georgeo.</small>
        </section>
      )}

      {!open && prompt && (
        <div className="chat-prompt" ref={promptRef} role="status">
          <button className="chat-prompt-body" type="button" onClick={openChat}>
            <strong>Besoin d’un coup de main ?</strong>
            <span>Posez-moi une question sur le parcours ou les projets de Georgeo.</span>
          </button>
          <button className="chat-prompt-close" type="button" onClick={closePrompt} aria-label="Masquer la suggestion"><X /></button>
        </div>
      )}

      <button className="chat-trigger" type="button" onClick={() => { closePrompt(); setOpen((value) => !value); }} aria-label={open ? "Fermer l’assistant" : "Ouvrir l’assistant"}>
        {open ? <X /> : <MessageCircle />}<span>Discuter avec mon IA</span>
      </button>
    </div>
  );
}
