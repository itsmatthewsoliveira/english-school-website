"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useLang } from "../lib/LangContext";
import { waLink } from "../lib/whatsapp";

type Slot = { time: string; available: boolean };
type Day = { label: { en: string; pt: string }; morning: Slot[]; afternoon: Slot[]; evening: Slot[] };

// Indicative weekly schedule. Availability changes — students confirm
// actual times with the school when booking.
const WEEK: Day[] = [
  { label: { en: "Monday", pt: "Segunda" },
    morning:   [{ time: "07:00", available: true }, { time: "08:00", available: true }, { time: "09:00", available: false }, { time: "10:00", available: true }, { time: "11:00", available: true }],
    afternoon: [{ time: "14:00", available: true }, { time: "15:00", available: false }, { time: "16:00", available: true }, { time: "17:00", available: true }],
    evening:   [{ time: "18:00", available: true }, { time: "19:00", available: true }, { time: "20:00", available: false }, { time: "21:00", available: true }] },
  { label: { en: "Tuesday", pt: "Terça" },
    morning:   [{ time: "07:00", available: true }, { time: "08:00", available: false }, { time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: false }],
    afternoon: [{ time: "14:00", available: false }, { time: "15:00", available: true }, { time: "16:00", available: true }, { time: "17:00", available: true }],
    evening:   [{ time: "18:00", available: false }, { time: "19:00", available: true }, { time: "20:00", available: true }, { time: "21:00", available: true }] },
  { label: { en: "Wednesday", pt: "Quarta" },
    morning:   [{ time: "07:00", available: true }, { time: "08:00", available: true }, { time: "09:00", available: true }, { time: "10:00", available: false }, { time: "11:00", available: true }],
    afternoon: [{ time: "14:00", available: true }, { time: "15:00", available: true }, { time: "16:00", available: false }, { time: "17:00", available: true }],
    evening:   [{ time: "18:00", available: true }, { time: "19:00", available: false }, { time: "20:00", available: true }, { time: "21:00", available: true }] },
  { label: { en: "Thursday", pt: "Quinta" },
    morning:   [{ time: "07:00", available: false }, { time: "08:00", available: true }, { time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }],
    afternoon: [{ time: "14:00", available: true }, { time: "15:00", available: false }, { time: "16:00", available: true }, { time: "17:00", available: false }],
    evening:   [{ time: "18:00", available: true }, { time: "19:00", available: true }, { time: "20:00", available: true }, { time: "21:00", available: false }] },
  { label: { en: "Friday", pt: "Sexta" },
    morning:   [{ time: "07:00", available: true }, { time: "08:00", available: true }, { time: "09:00", available: false }, { time: "10:00", available: true }, { time: "11:00", available: true }],
    afternoon: [{ time: "14:00", available: true }, { time: "15:00", available: true }, { time: "16:00", available: true }, { time: "17:00", available: false }],
    evening:   [{ time: "18:00", available: false }, { time: "19:00", available: true }, { time: "20:00", available: false }, { time: "21:00", available: true }] },
  { label: { en: "Saturday", pt: "Sábado" },
    morning:   [{ time: "08:00", available: true }, { time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: false }],
    afternoon: [{ time: "14:00", available: true }, { time: "15:00", available: true }],
    evening:   [] },
];

export default function SchedulePage() {
  const { t, lang } = useLang();

  return (
    <>
      <Navbar />

      <section className="detail-hero">
        <div className="detail-hero-decoration">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-orb hero-orb-1" />
          <div className="hero-gradient-orb hero-orb-2" />
        </div>
        <div className="container">
          <div className="detail-breadcrumb">
            <Link href="/">{t("Home", "Início")}</Link>
            <span>/</span>
            <span>{t("Schedule", "Horários")}</span>
          </div>
          <div className="quiz-hero-content">
            <span className="detail-tag">
              {t("Indicative weekly schedule", "Horário semanal indicativo")}
            </span>
            <h1>
              {t(
                "Class schedule — find a time that fits your life",
                "Horários das aulas — encontre o seu"
              )}
            </h1>
            <p className="detail-subtitle">
              {t(
                "Our teachers teach Monday through Saturday, with morning, afternoon, and evening slots. Here's a typical week. Real availability shifts — pick any time below and we'll confirm within minutes.",
                "Nossos professores dão aulas de segunda a sábado, com horários de manhã, tarde e noite. Este é um exemplo de semana. A disponibilidade real muda — escolha qualquer horário abaixo e confirmamos em minutos."
              )}
            </p>
            <p
              className="detail-price-note"
              style={{ marginTop: 16 }}
            >
              {t(
                "Times shown in Brazil time (UTC−3). Most students book in their local timezone — we adapt.",
                "Horários em horário de Brasília (UTC−3). A maioria dos alunos agenda no seu fuso — a gente adapta."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="schedule-body">
        <div className="container">
          <div className="schedule-legend">
            <div className="schedule-legend-item">
              <span className="schedule-dot schedule-dot-open" />
              <span>{t("Usually open", "Costuma estar livre")}</span>
            </div>
            <div className="schedule-legend-item">
              <span className="schedule-dot schedule-dot-taken" />
              <span>{t("Often booked", "Costuma estar ocupado")}</span>
            </div>
          </div>

          <div className="schedule-grid">
            {WEEK.map((day, di) => (
              <div className="schedule-day" key={di}>
                <h3>{t(day.label.en, day.label.pt)}</h3>

                <ScheduleBlock
                  label={t("Morning", "Manhã")}
                  slots={day.morning}
                  t={t}
                  lang={lang}
                  day={t(day.label.en, day.label.pt)}
                />
                <ScheduleBlock
                  label={t("Afternoon", "Tarde")}
                  slots={day.afternoon}
                  t={t}
                  lang={lang}
                  day={t(day.label.en, day.label.pt)}
                />
                <ScheduleBlock
                  label={t("Evening", "Noite")}
                  slots={day.evening}
                  t={t}
                  lang={lang}
                  day={t(day.label.en, day.label.pt)}
                />
              </div>
            ))}
          </div>

          <div className="schedule-note">
            <h3>{t("How booking works", "Como funciona a reserva")}</h3>
            <ol>
              <li>
                {t(
                  "Tap any time slot above (or the WhatsApp button below) — a pre-filled message opens with the day and time you picked.",
                  "Toque em qualquer horário acima (ou no botão de WhatsApp abaixo) — abre uma mensagem com o dia e horário escolhidos."
                )}
              </li>
              <li>
                {t(
                  "The school confirms or suggests the nearest alternative within a few hours.",
                  "A escola confirma ou sugere a alternativa mais próxima em poucas horas."
                )}
              </li>
              <li>
                {t(
                  "You get a Google Meet or Zoom link 10 minutes before your class. Done.",
                  "Você recebe o link do Google Meet ou Zoom 10 minutos antes da aula. Pronto."
                )}
              </li>
            </ol>
          </div>

          <div className="schedule-cta">
            <h2>
              {t(
                "Don't see a time that works? Just ask.",
                "Não achou um horário? Pergunta pra gente."
              )}
            </h2>
            <p>
              {t(
                "We open new slots often. Message us with the time that would work for you — we'll almost always find a way.",
                "A gente abre horários novos com frequência. Mande o horário que funcionaria pra você — quase sempre dá um jeito."
              )}
            </p>
            <div className="detail-cta-row" style={{ justifyContent: "center" }}>
              <a
                href={waLink("trial", lang)}
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener"
              >
                {t("Ask about my time on WhatsApp", "Perguntar meu horário no WhatsApp")}
              </a>
              <Link href="/book/trial" className="btn btn-ghost btn-lg">
                {t("Book a free trial", "Agendar aula gratuita")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat intent="general" />
    </>
  );
}

function ScheduleBlock({
  label,
  slots,
  t,
  lang,
  day,
}: {
  label: string;
  slots: Slot[];
  t: (en: string, pt: string) => string;
  lang: "en" | "pt";
  day: string;
}) {
  if (slots.length === 0) {
    return (
      <div className="schedule-block">
        <p className="schedule-block-label">{label}</p>
        <p className="schedule-block-empty">—</p>
      </div>
    );
  }
  return (
    <div className="schedule-block">
      <p className="schedule-block-label">{label}</p>
      <div className="schedule-slots">
        {slots.map((s, i) => {
          const text =
            lang === "pt"
              ? `Oi! Queria agendar uma aula gratuita na ${day} às ${s.time}. Esse horário funciona?`
              : `Hi! I'd like to book a free trial class on ${day} at ${s.time}. Does that work?`;
          const href = `https://wa.me/5519888869805?text=${encodeURIComponent(text)}`;
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener"
              className={`schedule-slot${s.available ? " schedule-slot-open" : " schedule-slot-taken"}`}
            >
              {s.time}
            </a>
          );
        })}
      </div>
    </div>
  );
}
