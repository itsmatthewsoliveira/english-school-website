"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import BookingForm from "./BookingForm";
import { useLang } from "../lib/LangContext";
import { waLink, WAIntent } from "../lib/whatsapp";

type Bilingual = { en: string; pt: string };

export type DetailSection = {
  heading: Bilingual;
  bullets: Bilingual[];
};

export type DetailPageProps = {
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  heroImage: {
    src: string;
    alt: Bilingual;
  };
  tag?: Bilingual; // small tag like "Free · 30 min" or "Beginner"
  priceNote?: Bilingual; // optional pricing / duration line under subtitle
  intent: WAIntent;
  primaryCtaLabel: Bilingual;
  sections: DetailSection[];
  whoItsFor: Bilingual[];
  featured?: boolean; // colors the primary CTA differently
  // If set, renders the on-site BookingForm. Use "trial" | "individual" | "group".
  bookingFormClass?: "trial" | "individual" | "group";
};

const CheckSvg = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WhatsAppGlyph = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function DetailPage(props: DetailPageProps) {
  const { t, lang } = useLang();
  const {
    eyebrow,
    title,
    subtitle,
    heroImage,
    tag,
    priceNote,
    intent,
    primaryCtaLabel,
    sections,
    whoItsFor,
    bookingFormClass,
  } = props;

  const whatsappHref = waLink(intent, lang);

  return (
    <>
      <Navbar />

      {/* ====== Detail hero ====== */}
      <section className="detail-hero">
        <div className="detail-hero-decoration">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-orb hero-orb-1" />
          <div className="hero-gradient-orb hero-orb-2" />
        </div>
        <div className="container">
          <div className="detail-breadcrumb">
            <Link href="/">{t("Home", "Inicio")}</Link>
            <span>/</span>
            <span>{t(eyebrow.en, eyebrow.pt)}</span>
          </div>
          <div className="detail-hero-layout">
            <div className="detail-hero-content">
              {tag && (
                <span className="detail-tag">{t(tag.en, tag.pt)}</span>
              )}
              <p className="section-label detail-eyebrow">
                {t(eyebrow.en, eyebrow.pt)}
              </p>
              <h1>{t(title.en, title.pt)}</h1>
              <p className="detail-subtitle">{t(subtitle.en, subtitle.pt)}</p>
              {priceNote && (
                <p className="detail-price-note">
                  {t(priceNote.en, priceNote.pt)}
                </p>
              )}
              <div className="detail-cta-row">
                <a
                  href={whatsappHref}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppGlyph size={18} />
                  {t(primaryCtaLabel.en, primaryCtaLabel.pt)}
                </a>
                <a href="/#courses" className="btn btn-ghost btn-lg">
                  {t("See all courses", "Ver todos os cursos")}
                </a>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="detail-hero-image">
                <Image
                  src={heroImage.src}
                  alt={t(heroImage.alt.en, heroImage.alt.pt)}
                  width={1024}
                  height={1024}
                  priority
                  sizes="(max-width: 992px) 100vw, 480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Content sections ====== */}
      <section className="detail-body">
        <div className="container">
          <div className="detail-body-grid">
            <div className="detail-body-main">
              {sections.map((s, i) => (
                <div className="detail-section" key={i}>
                  <h2>{t(s.heading.en, s.heading.pt)}</h2>
                  <ul className="detail-list">
                    {s.bullets.map((b, j) => (
                      <li key={j}>
                        <CheckSvg size={18} />
                        <span>{t(b.en, b.pt)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <h3>{t("Who it's for", "Para quem e")}</h3>
                <ul className="detail-list">
                  {whoItsFor.map((w, i) => (
                    <li key={i}>
                      <CheckSvg size={16} />
                      <span>{t(w.en, w.pt)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-sidebar-card detail-sidebar-cta">
                <h3>{t("Ready to start?", "Pronto para comecar?")}</h3>
                <p>
                  {t(
                    "Message Teacher Josi directly. She'll reply with available times and answer your questions.",
                    "Fale direto com a Teacher Josi. Ela responde com horarios e tira suas duvidas."
                  )}
                </p>
                <a
                  href={whatsappHref}
                  className="btn btn-primary btn-full"
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppGlyph size={18} />
                  {t(primaryCtaLabel.en, primaryCtaLabel.pt)}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ====== On-site booking form (optional) ====== */}
      {bookingFormClass && (
        <section className="booking-form-section">
          <div className="container">
            <div className="booking-form-wrap">
              <BookingForm classType={bookingFormClass} intent={intent} />
            </div>
          </div>
        </section>
      )}

      {/* ====== About the school ====== */}
      <section className="detail-about-school">
        <div className="container">
          <div className="detail-about-layout">
            <div className="detail-about-photo">
              <Image
                src="/images/teacher-josi.png"
                alt={t(
                  "Portrait of Teacher Josi",
                  "Retrato da Teacher Josi"
                )}
                width={1024}
                height={1024}
                sizes="(max-width: 992px) 240px, 360px"
              />
            </div>
            <div className="detail-about-content">
              <p className="section-label">
                {t("About The Way English School", "Sobre a The Way English School")}
              </p>
              <h2>
                {t(
                  "Taught by Teacher Josi — 23+ years of experience",
                  "Com a Teacher Josi — mais de 23 anos de experiencia"
                )}
              </h2>
              <p>
                {t(
                  "The Way is an online English school led by Teacher Josi, based in Pocos de Caldas, Brazil. For over two decades she has helped 500+ students across 10+ countries reach their personal and professional goals through English.",
                  "The Way e uma escola de ingles online liderada pela Teacher Josi, em Pocos de Caldas, Brasil. Por mais de duas decadas, ela ajudou mais de 500 alunos em mais de 10 paises a conquistarem seus objetivos pessoais e profissionais atraves do ingles."
                )}
              </p>
              <p>
                {t(
                  "Every class is 100% live — no apps, no pre-recorded videos, no AI replacements. Just real conversation with a teacher who cares about your progress.",
                  "Cada aula e 100% ao vivo — sem apps, sem videos gravados, sem substitutos de IA. E conversa real com uma professora que se importa com seu progresso."
                )}
              </p>
              <div className="detail-about-stats">
                <div className="stat">
                  <span className="stat-number">23+</span>
                  <span className="stat-label">
                    {t("Years teaching", "Anos ensinando")}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">
                    {t("Students", "Alunos")}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">
                    {t("Countries", "Paises")}
                  </span>
                </div>
              </div>
              <a href="/#teacher" className="btn btn-outline">
                {t("Meet Teacher Josi", "Conheca a Teacher Josi")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Final CTA ====== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>
              {t(
                "Take the first step today",
                "De o primeiro passo hoje"
              )}
            </h2>
            <p>
              {t(
                "Message Teacher Josi on WhatsApp — no forms, no waiting, no pressure.",
                "Fale com a Teacher Josi no WhatsApp — sem formularios, sem espera, sem pressao."
              )}
            </p>
            <div className="cta-buttons">
              <a
                href={whatsappHref}
                className="btn btn-cta-primary"
                target="_blank"
                rel="noopener"
              >
                <WhatsAppGlyph size={20} />
                {t(primaryCtaLabel.en, primaryCtaLabel.pt)}
              </a>
              <a
                href="https://instagram.com/teacherjosi.theway"
                className="btn btn-cta-secondary"
                target="_blank"
                rel="noopener"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                {t("Follow on Instagram", "Siga no Instagram")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat intent={intent} />
    </>
  );
}
