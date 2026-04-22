"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/LangContext";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Floating chat widget powered by Claude Haiku.
 * - Sits at bottom-left so it doesn't collide with the WhatsApp float (bottom-right).
 * - Streams responses token-by-token via SSE from /api/chat.
 * - Bilingual EN/PT (picks up from LangContext).
 */
export default function ChatWidget() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const greeting: Msg = {
    role: "assistant",
    content:
      lang === "pt"
        ? "Oi! Sou a assistente virtual da Teacher Josi. Posso te ajudar com dúvidas sobre cursos, agendamento ou qualquer coisa sobre a escola. O que você quer saber?"
        : "Hi! I'm Teacher Josi's virtual assistant. I can help with questions about our courses, booking, or anything about the school. What would you like to know?",
  };

  // Seed greeting when the chat opens for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([greeting]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");

    const nextHistory: Msg[] = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(nextHistory);
    setBusy(true);

    // API payload rules: first message MUST be user. So skip index 0
    // (the seeded greeting, a fake assistant turn) and the trailing
    // empty placeholder we just pushed for streaming.
    const payload = nextHistory.slice(1, -1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Parse Server-Sent Events: blocks are separated by a blank line;
      // each block has one or more "event:" / "data:" lines.
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Process complete events
        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const block = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          let event = "message";
          let data = "";
          for (const line of block.split("\n")) {
            if (line.startsWith("event: ")) event = line.slice(7).trim();
            else if (line.startsWith("data: ")) data += line.slice(6);
          }
          if (!data) continue;
          try {
            const parsed = JSON.parse(data);
            if (event === "text") {
              // Append delta to the trailing assistant message
              setMessages((prev) => {
                const copy = prev.slice();
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") {
                  copy[copy.length - 1] = {
                    role: "assistant",
                    content: last.content + String(parsed),
                  };
                }
                return copy;
              });
            } else if (event === "error") {
              setMessages((prev) => {
                const copy = prev.slice();
                copy[copy.length - 1] = {
                  role: "assistant",
                  content:
                    lang === "pt"
                      ? "Desculpa, tive um problema para responder. Você pode tentar de novo ou falar direto com a Teacher Josi no WhatsApp."
                      : "Sorry, I ran into a problem. Please try again — or message Teacher Josi directly on WhatsApp.",
                };
                return copy;
              });
            }
          } catch {
            /* ignore parse errors on non-JSON data frames */
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const copy = prev.slice();
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            lang === "pt"
              ? "Desculpa, não consegui responder agora. Fala com a Teacher Josi direto no WhatsApp: +55 19 98886-9805."
              : "Sorry, I couldn't respond right now. Message Teacher Josi directly on WhatsApp: +55 19 98886-9805.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        className={`chat-launcher${open ? " chat-launcher-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={t("Open chat", "Abrir chat")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>{t("Ask us anything", "Tire suas dúvidas")}</span>
      </button>

      {/* Panel */}
      <div className={`chat-panel${open ? " chat-panel-open" : ""}`} aria-hidden={!open}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">J</div>
            <div>
              <p className="chat-title">{t("Josi's Assistant", "Assistente da Josi")}</p>
              <p className="chat-status">
                <span className="chat-dot" />
                {t("Online · AI assistant", "Online · Assistente IA")}
              </p>
            </div>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label={t("Close chat", "Fechar chat")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
              {m.content ? (
                <MessageContent text={m.content} />
              ) : (
                <span className="chat-typing">
                  <span /> <span /> <span />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t(
              "Ask about courses, booking, anything…",
              "Pergunte sobre cursos, agendamento, qualquer coisa…"
            )}
            rows={1}
            disabled={busy}
          />
          <button
            className="chat-send"
            onClick={send}
            disabled={busy || !input.trim()}
            aria-label={t("Send", "Enviar")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="chat-disclaimer">
          {t(
            "AI assistant. For bookings, Teacher Josi replies personally on WhatsApp.",
            "Assistente de IA. Para agendar, a Teacher Josi responde pessoalmente no WhatsApp."
          )}
        </p>
      </div>
    </>
  );
}

/**
 * Renders chat message text with URL and path patterns upgraded to
 * clickable buttons. Detects:
 *   - https:// links (e.g. https://wa.me/... or https://example.com)
 *   - site paths starting with "/" like /book/trial, /courses/mastery, /quiz
 * External links open in a new tab; internal paths stay in-app.
 */
function MessageContent({ text }: { text: string }) {
  // Regex: external URLs, or internal paths that start with a slash
  // followed by a known top-level segment. Bounded to avoid matching
  // punctuation or prose.
  const pattern = /(https?:\/\/[^\s)]+)|(\/(?:book|courses|quiz|about|schedule)(?:\/[a-z0-9-]+)?\/?)/gi;

  const parts: Array<{ type: "text" | "link"; value: string; href?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    // Strip trailing punctuation that likely isn't part of the URL
    const trimmed = raw.replace(/[.,!?;:]+$/, "");
    const punct = raw.slice(trimmed.length);
    parts.push({ type: "link", value: trimmed, href: trimmed });
    if (punct) parts.push({ type: "text", value: punct });
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((p, i) => {
        if (p.type === "text") return <span key={i}>{p.value}</span>;
        const isExternal = p.href!.startsWith("http");
        const label = prettyLabel(p.href!);
        return (
          <a
            key={i}
            href={p.href!}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener" : undefined}
            className="chat-link-btn"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {isExternal ? (
                <>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </>
              ) : (
                <>
                  <path d="M5 12h14" />
                  <polyline points="12 5 19 12 12 19" />
                </>
              )}
            </svg>
            <span>{label}</span>
          </a>
        );
      })}
    </>
  );
}

function prettyLabel(href: string): string {
  // WhatsApp links
  if (href.includes("wa.me/")) return "WhatsApp Teacher Josi";
  if (href.includes("instagram.com")) return "Instagram";

  // Internal routes get friendly labels
  const map: Record<string, string> = {
    "/quiz": "Take the quiz",
    "/about": "About the school",
    "/schedule": "See schedule",
    "/book/trial": "Book free trial",
    "/book/individual": "Book 1-on-1",
    "/book/group": "Join a group class",
    "/courses/foundation": "Foundation English",
    "/courses/fluency-builder": "Fluency Builder",
    "/courses/mastery": "Mastery Program",
  };
  const clean = href.replace(/\/$/, "");
  if (map[clean]) return map[clean];

  // Fallback: strip trailing slash, show as path
  return clean || href;
}
