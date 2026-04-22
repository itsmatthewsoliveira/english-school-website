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
              {m.content || (
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
