"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "../lib/LangContext";

type NavLink = { hash: string; labelEn: string; labelPt: string };

// Hash-anchored nav items (they live on the homepage).
const LINKS: NavLink[] = [
  { hash: "courses", labelEn: "Courses", labelPt: "Cursos" },
  { hash: "testimonials", labelEn: "Reviews", labelPt: "Avaliacoes" },
  { hash: "faq", labelEn: "FAQ", labelPt: "FAQ" },
];

// Full pages (dedicated routes).
type PageLink = { href: string; labelEn: string; labelPt: string };
const PAGES: PageLink[] = [
  { href: "/about", labelEn: "About", labelPt: "Sobre" },
  { href: "/schedule", labelEn: "Schedule", labelPt: "Horários" },
  { href: "/quiz", labelEn: "Level quiz", labelPt: "Teste de nível" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  // Smart hash navigation:
  //   - On homepage: scroll to the section smoothly. We use window.scrollTo
  //     rather than el.scrollIntoView({behavior:'smooth'}) because the latter
  //     was silently a no-op in production (likely conflicting with the
  //     scroll-behavior:smooth CSS rule + body overflow).
  //   - Off homepage: let the browser handle the <a href="/#hash"> naturally —
  //     full page load to / auto-scrolls to the hash.
  const goToHash = (hash: string) => (e: React.MouseEvent) => {
    closeMenu();
    if (pathname !== "/") return; // browser handles it
    e.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72; // 72 = navbar height
    window.scrollTo({ top, behavior: "smooth" });
    // Don't touch history — Next.js App Router picks up the hash change
    // and kicks in scroll restoration, which resets us to 0.
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div className="nav-wrapper">
          <Link href="/" className="logo" onClick={closeMenu}>
            <span className="logo-mark">
              <span className="logo-the">The</span>
              <span className="logo-way">Way</span>
            </span>
            <span className="logo-sub">English School</span>
          </Link>
          <div className="nav-right">
            <div className="lang-toggle">
              <button
                className={`lang-btn${lang === "en" ? " active" : ""}`}
                onClick={() => setLang("en")}
                aria-label="English"
              >
                <svg width="20" height="14" viewBox="0 0 60 42">
                  <rect width="60" height="42" fill="#002868" />
                  <rect y="0" width="60" height="3.23" fill="#fff" />
                  <rect y="6.46" width="60" height="3.23" fill="#fff" />
                  <rect y="12.92" width="60" height="3.23" fill="#fff" />
                  <rect y="19.38" width="60" height="3.23" fill="#fff" />
                  <rect y="25.85" width="60" height="3.23" fill="#fff" />
                  <rect y="32.31" width="60" height="3.23" fill="#fff" />
                  <rect y="38.77" width="60" height="3.23" fill="#fff" />
                  <rect y="3.23" width="60" height="3.23" fill="#BF0A30" />
                  <rect y="9.69" width="60" height="3.23" fill="#BF0A30" />
                  <rect y="16.15" width="60" height="3.23" fill="#BF0A30" />
                  <rect y="22.62" width="60" height="3.23" fill="#BF0A30" />
                  <rect y="29.08" width="60" height="3.23" fill="#BF0A30" />
                  <rect y="35.54" width="60" height="3.23" fill="#BF0A30" />
                  <rect width="24" height="22.62" fill="#002868" />
                </svg>
                <span>EN</span>
              </button>
              <button
                className={`lang-btn${lang === "pt" ? " active" : ""}`}
                onClick={() => setLang("pt")}
                aria-label="Portugues"
              >
                <svg width="20" height="14" viewBox="0 0 60 42">
                  <rect width="60" height="42" fill="#009c3b" />
                  <polygon points="30,4 56,21 30,38 4,21" fill="#ffdf00" />
                  <circle cx="30" cy="21" r="9" fill="#002776" />
                  <path d="M21.5,21 Q30,15 38.5,21" stroke="#fff" strokeWidth="1" fill="none" />
                </svg>
                <span>PT</span>
              </button>
            </div>
            <button
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
            <ul className={`nav-menu${mobileMenuOpen ? " active" : ""}`}>
              <li>
                <Link href="/" onClick={closeMenu}>
                  {t("Home", "Inicio")}
                </Link>
              </li>
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} onClick={closeMenu}>
                    {t(p.labelEn, p.labelPt)}
                  </Link>
                </li>
              ))}
              {LINKS.map((l) => (
                <li key={l.hash}>
                  <a href={`/#${l.hash}`} onClick={goToHash(l.hash)}>
                    {t(l.labelEn, l.labelPt)}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/book/trial" className="nav-cta" onClick={closeMenu}>
                  {t("Book a class", "Agendar aula")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
