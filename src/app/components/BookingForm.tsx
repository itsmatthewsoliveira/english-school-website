"use client";

import { useState } from "react";
import { useLang } from "../lib/LangContext";
import { waLink, WAIntent } from "../lib/whatsapp";

type ClassType = "trial" | "individual" | "group";
type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm({
  classType,
  intent,
}: {
  classType: ClassType;
  intent: WAIntent;
}) {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      classType,
      level: String(data.get("level") ?? ""),
      goals: String(data.get("goals") ?? ""),
      preferredTimes: String(data.get("preferredTimes") ?? ""),
      lang,
    };

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.ok !== true) {
        setStatus("error");
        setError(body?.error ?? `HTTP ${res.status}`);
        return;
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error");
    }
  }

  if (status === "success") {
    return (
      <div className="booking-form-success">
        <div className="booking-form-success-icon" aria-hidden>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>
          {t(
            "You're in. Teacher Josi will reply soon.",
            "Deu certo! A Teacher Josi responde em breve."
          )}
        </h3>
        <p>
          {t(
            "We've got your details. Expect a reply within a few hours. If you're in a rush, you can also message her directly on WhatsApp.",
            "Recebemos suas informações. A resposta vem em poucas horas. Se tiver pressa, você pode falar direto com ela no WhatsApp."
          )}
        </p>
        <a
          href={waLink(intent, lang)}
          className="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          {t("Message Teacher Josi on WhatsApp", "Falar com a Teacher Josi no WhatsApp")}
        </a>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      <h3>{t("Book on the website", "Agende pelo site")}</h3>
      <p className="booking-form-sub">
        {t(
          "Fill this out and Teacher Josi will reach out to confirm your time.",
          "Preenche aqui e a Teacher Josi entra em contato pra confirmar seu horário."
        )}
      </p>

      <div className="booking-form-row">
        <label>
          <span>{t("Your name", "Seu nome")} *</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>{t("Email", "E-mail")} *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>

      <div className="booking-form-row">
        <label>
          <span>{t("WhatsApp (with country code)", "WhatsApp (com DDI)")}</span>
          <input name="whatsapp" maxLength={60} placeholder="+55 11 9XXXX-XXXX" autoComplete="tel" />
        </label>
        <label>
          <span>{t("Current English level", "Nível atual de inglês")}</span>
          <select name="level" defaultValue="">
            <option value="">{t("Not sure yet", "Ainda não sei")}</option>
            <option value="A1">{t("A1 — Beginner", "A1 — Iniciante")}</option>
            <option value="A2">{t("A2 — Elementary", "A2 — Básico")}</option>
            <option value="B1">{t("B1 — Intermediate", "B1 — Intermediário")}</option>
            <option value="B2">{t("B2 — Upper-intermediate", "B2 — Intermediário-avançado")}</option>
            <option value="C1">{t("C1 — Advanced", "C1 — Avançado")}</option>
          </select>
        </label>
      </div>

      <label className="booking-form-full">
        <span>
          {t("What do you want to achieve with English?", "O que você quer alcançar com o inglês?")}
        </span>
        <textarea
          name="goals"
          rows={3}
          maxLength={800}
          placeholder={t(
            "e.g. prepare for a job interview, travel to Canada next year, finally be fluent…",
            "ex: me preparar pra uma entrevista, viajar pro Canadá ano que vem, finalmente ficar fluente…"
          )}
        />
      </label>

      <label className="booking-form-full">
        <span>
          {t(
            "Preferred class times (any day/time that fits your week)",
            "Melhores horários (qualquer dia/hora que caiba na sua semana)"
          )}
        </span>
        <input
          name="preferredTimes"
          maxLength={300}
          placeholder={t(
            "e.g. Tue/Thu 8pm, weekends mornings, flexible",
            "ex: Ter/Qui 20h, sábado de manhã, flexível"
          )}
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary btn-full btn-lg"
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? t("Sending…", "Enviando…")
          : t("Send booking request", "Enviar pedido")}
      </button>

      {status === "error" && (
        <p className="booking-form-error">
          {t(
            "Couldn't send. Please try again or message Teacher Josi on WhatsApp.",
            "Não foi possível enviar. Tente de novo ou fale com a Teacher Josi no WhatsApp."
          )}
          {error ? ` (${error})` : null}
        </p>
      )}
      <p className="booking-form-fine">
        {t(
          "We only use your details to reply about your class. No spam, no sharing.",
          "Usamos seus dados só pra te responder sobre a aula. Sem spam, sem compartilhar."
        )}
      </p>
    </form>
  );
}
