"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../lib/LangContext";
import { waLink } from "../lib/whatsapp";

export default function Footer() {
  const { t, lang } = useLang();
  const pathname = usePathname();

  // Smart hash navigation — same logic as Navbar.
  const goToHash = (hash: string) => (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

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
                "Capacitando alunos a realizarem seus sonhos atraves de uma educacao eficaz em inglês desde 2003."
              )}
            </p>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">{t("Links", "Links")}</p>
            <Link href="/">{t("Home", "Inicio")}</Link>
            <Link href="/about">{t("About", "Sobre")}</Link>
            <Link href="/schedule">{t("Schedule", "Horários")}</Link>
            <Link href="/quiz">{t("Level quiz", "Teste de nível")}</Link>
            <a href="/#courses" onClick={goToHash("courses")}>{t("Courses", "Cursos")}</a>
            <a href="/#testimonials" onClick={goToHash("testimonials")}>{t("Reviews", "Avaliacoes")}</a>
            <a href="/#faq" onClick={goToHash("faq")}>FAQ</a>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">{t("Courses", "Cursos")}</p>
            <Link href="/courses/foundation">{t("Foundation English", "Inglês Basico")}</Link>
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
