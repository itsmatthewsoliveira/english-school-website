"use client";

import Link from "next/link";
import { useLang } from "../lib/LangContext";
import { waLink } from "../lib/whatsapp";

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-mark">
              <span className="logo-the">The</span>
              <span className="logo-way">Way</span>
            </span>
            <span className="logo-sub">English School</span>
            <p className="footer-desc">
              {t(
                "Empowering students to achieve their dreams through effective English education since 2003.",
                "Capacitando alunos a realizarem seus sonhos atraves de uma educacao eficaz em ingles desde 2003."
              )}
            </p>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">{t("Links", "Links")}</p>
            <Link href="/">{t("Home", "Inicio")}</Link>
            <Link href="/#about">{t("About", "Sobre")}</Link>
            <Link href="/#teacher">{t("Teacher", "Professora")}</Link>
            <Link href="/#courses">{t("Courses", "Cursos")}</Link>
            <Link href="/#testimonials">{t("Reviews", "Avaliacoes")}</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">{t("Courses", "Cursos")}</p>
            <Link href="/courses/foundation">{t("Foundation English", "Ingles Basico")}</Link>
            <Link href="/courses/fluency-builder">{t("Fluency Builder", "Construtor de Fluencia")}</Link>
            <Link href="/courses/mastery">{t("Mastery Program", "Programa de Dominio")}</Link>
            <Link href="/book/trial">{t("Free trial", "Aula experimental")}</Link>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">{t("Contact", "Contato")}</p>
            <a href="mailto:josi.rodrigues.rjg@gmail.com">{t("Email us", "Envie um email")}</a>
            <a href={waLink("general", lang)} target="_blank" rel="noopener">
              WhatsApp
            </a>
            <a
              href="https://instagram.com/teacherjosi.theway"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 The Way English School. All rights reserved.</p>
          <p>Owner: Josimeri Rodrigues Jacinto Gitahy</p>
        </div>
      </div>
    </footer>
  );
}
