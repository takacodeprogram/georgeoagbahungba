"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/data/portfolio";

const suggestions = ["Quels sont ses projets Agritech ?", "Comment contacter Georgeo ?", "Où télécharger son CV ?"];

const DISMISS_KEY = "chat-prompt-vu";
const PROMPT_DELAY = 7000;

// Simple utility function to render markdown-like text to HTML
// without installing external dependencies (marked / ReactMarkdown).
// Handles bold, line breaks, bullet lists and links.
function parseSimpleMarkdown(text) {
  if (!text) return "";
  
  let html = text
    // Escape HTML tags to prevent XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold: **text** -> <strong>text</strong>
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Bullet lists: - item -> <li>item</li> (needs wrapping later)
    .replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>")
    // Links: [text](url) -> <a href="url" target="_blank" rel="noreferrer">text</a>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="chat-link">$1</a>')
    // Line breaks
    .replace(/\n/g, "<br />");

  // If there are lists, wrap them
  if (html.includes("<li>")) {
    // This is a naive but solid split-and-wrap logic for the chat box
    const lines = html.split("<br />");
    let inList = false;
    const processed = lines.map((line) => {
      if (line.startsWith("<li>") || line.startsWith("  <li>")) {
        if (!inList) {
          inList = true;
          return `<ul class="chat-list">${line}`;
        }
        return line;
      } else {
        if (inList) {
          inList = false;
          return `</ul>${line}`;
        }
        return line;
      }
    });
    if (inList) {
      processed.push("</ul>");
    }
    html = processed.join("<br />");
  }

  return html;
}

export default function ChatAssistant({ locale = "fr" }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: locale === "en" 
        ? "Hello! I am Georgeo's assistant. Ask me anything about his projects, skills, or professional background."
        : "Bonjour ! Je suis l’assistant de Georgeo. Posez-moi une question sur son parcours, ses projets ou ses compétences." 
    }
  ]);
  const promptRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatMessagesContainerRef = useRef(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, loading, open]);

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

  const isEn = locale === "en";

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat-panel" aria-label="Assistant du portfolio">
          <header>
            <div>
              <Bot aria-hidden="true" />
              <span>
                {isEn ? "Georgeo's AI Assistant" : "Assistant Georgeo"}
                <small><i /> {isEn ? "Online" : "En ligne"}</small>
              </span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer"><X /></button>
          </header>
          
          <div className="chat-messages" aria-live="polite" ref={chatMessagesContainerRef}>
            {messages.map((message, index) => (
              <div 
                className={`${message.role} chat-message-bubble`} 
                key={`${message.role}-${index}`}
                dangerouslySetInnerHTML={{ __html: parseSimpleMarkdown(message.content) }}
              />
            ))}
            {loading && <div className="assistant typing chat-message-bubble"><i /><i /><i /></div>}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && (
            <div className="chat-suggestions">
              {suggestions.map((item) => <button type="button" onClick={() => send(item)} key={item}>{item}</button>)}
            </div>
          )}
          
          <form onSubmit={(event) => { event.preventDefault(); send(input); }}>
            <input 
              value={input} 
              onChange={(event) => setInput(event.target.value)} 
              placeholder={isEn ? "Ask your question..." : "Votre question…"} 
              maxLength={500} 
              aria-label="Votre question" 
            />
            <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}><Send /></button>
          </form>
          <small className="chat-disclaimer">
            {isEn ? "Answers based on Georgeo's portfolio." : "Réponses basées sur le portfolio de Georgeo."}
          </small>
        </section>
      )}

      {!open && prompt && (
        <div className="chat-prompt" ref={promptRef} role="status">
          <button className="chat-prompt-body" type="button" onClick={openChat}>
            <strong>{isEn ? "Need a hand?" : "Besoin d’un coup de main ?"}</strong>
            <span>{isEn ? "Ask me a question about Georgeo's background or projects." : "Posez-moi une question sur le parcours ou les projets de Georgeo."}</span>
          </button>
          <button className="chat-prompt-close" type="button" onClick={closePrompt} aria-label="Masquer la suggestion"><X /></button>
        </div>
      )}

      <button className="chat-trigger" type="button" onClick={() => { closePrompt(); setOpen((value) => !value); }} aria-label={open ? "Fermer l’assistant" : "Ouvrir l’assistant"}>
        {open ? <X /> : <MessageCircle />}<span>{isEn ? "Chat with my AI" : "Discuter avec mon IA"}</span>
      </button>
    </div>
  );
}
