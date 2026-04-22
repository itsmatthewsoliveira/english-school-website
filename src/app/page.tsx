"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { useLang } from "./lib/LangContext";
import { waLink } from "./lib/whatsapp";

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FiveStars = () => (
  <div className="testimonial-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <StarIcon key={i} />
    ))}
  </div>
);

const CheckSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FaqPlusIcon = () => (
  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Page() {
  const { t, lang } = useLang();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(
        ".feature-card, .course-card, .why-card, .testimonial-card, .faq-item, .teacher-content, .booking-card, .hero-image-card"
      )
      .forEach((el, i) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "translateY(16px)";
        (el as HTMLElement).style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
        observer.observe(el);
      });

    const style = document.createElement("style");
    style.textContent = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(style);
    return () => {
      observer.disconnect();
      style.remove();
    };
  }, []);

  const faqItems = [
    {
      q: ["How do the online classes work?", "Como funcionam as aulas online?"],
      a: [
        "Classes are held live via video call (Google Meet or Zoom). You'll have real-time interaction with Teacher Josi, just like being in a physical classroom - but from the comfort of your home. All you need is a computer or tablet with internet access.",
        "As aulas sao realizadas ao vivo por videochamada (Google Meet ou Zoom). Voce tera interacao em tempo real com a Teacher Josi, como em uma sala de aula presencial - mas no conforto da sua casa. Tudo que voce precisa e um computador ou tablet com acesso a internet.",
      ],
    },
    {
      q: ["What is the class schedule like?", "Como e o horario das aulas?"],
      a: [
        "We offer flexible scheduling to fit your lifestyle. Classes are available Monday through Saturday, with morning, afternoon, and evening time slots. We'll find the best time that works for you during your free trial.",
        "Oferecemos horarios flexiveis para se adaptar ao seu estilo de vida. As aulas estao disponiveis de segunda a sabado, com horarios de manha, tarde e noite. Encontraremos o melhor horario para voce durante sua aula experimental.",
      ],
    },
    {
      q: ["Do you offer individual or group classes?", "Voces oferecem aulas individuais ou em grupo?"],
      a: [
        "We offer both! Individual classes provide fully personalized attention, while small group classes (maximum 5 students) offer peer interaction at a more accessible price point. Both formats are 100% live and interactive.",
        "Oferecemos ambos! Aulas individuais proporcionam atencao totalmente personalizada, enquanto aulas em grupo (maximo 5 alunos) oferecem interacao com colegas a um preco mais acessivel. Ambos os formatos sao 100% ao vivo e interativos.",
      ],
    },
    {
      q: ["I'm a complete beginner. Is that okay?", "Sou iniciante completo. Tudo bem?"],
      a: [
        "Absolutely! Many of our most successful students started with zero English knowledge. Teacher Josi is experienced in working with complete beginners and will guide you step by step. The free trial class includes a level assessment so we know exactly where to start.",
        "Com certeza! Muitos dos nossos alunos mais bem-sucedidos comecaram sem nenhum conhecimento de ingles. A Teacher Josi tem experiencia em trabalhar com iniciantes completos e vai guia-lo passo a passo. A aula experimental gratuita inclui uma avaliacao de nivel para sabermos exatamente por onde comecar.",
      ],
    },
    {
      q: ["How long does it take to become fluent?", "Quanto tempo leva para ficar fluente?"],
      a: [
        "Every student is different, but with consistent classes (2-3 times per week), most students see meaningful progress within 3-6 months. Complete beginners typically reach conversational fluency within 12-18 months. We'll set realistic goals together during your trial class.",
        "Cada aluno e diferente, mas com aulas consistentes (2-3 vezes por semana), a maioria dos alunos ve progresso significativo em 3-6 meses. Iniciantes completos geralmente alcancam fluencia conversacional em 12-18 meses. Definiremos metas realistas juntos durante sua aula experimental.",
      ],
    },
    {
      q: ["What materials do I need?", "Quais materiais eu preciso?"],
      a: [
        "All learning materials are provided digitally by Teacher Josi. You just need a computer, tablet, or smartphone with a stable internet connection, a webcam, and a microphone. No expensive textbooks required!",
        "Todos os materiais de aprendizagem sao fornecidos digitalmente pela Teacher Josi. Voce so precisa de um computador, tablet ou smartphone com conexao estavel a internet, webcam e microfone. Sem necessidade de livros caros!",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      {/* ========== Hero ========== */}
      <section id="home" className="hero">
        <div className="hero-decoration">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-orb hero-orb-1" />
          <div className="hero-gradient-orb hero-orb-2" />
        </div>
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <div className="hero-badge">
                {t(
                  "Online English school with 23+ years of experience",
                  "Escola de ingles online com mais de 23 anos de experiencia"
                )}
              </div>
              <h1>
                {t(
                  "Learn English with live classes that actually work",
                  "Aprenda ingles com aulas ao vivo que realmente funcionam"
                )}
              </h1>
              <p className="hero-subtitle">
                {t(
                  "Dynamic, fun, and effective online lessons from beginner to advanced. Study from anywhere with a teacher who cares about your progress.",
                  "Aulas online dinamicas, divertidas e eficazes, do iniciante ao avancado. Estude de qualquer lugar com uma professora que se importa com seu progresso."
                )}
              </p>
              <div className="hero-cta">
                <a href={waLink("trial", lang)} className="btn btn-primary" target="_blank" rel="noopener">
                  {t("Book a free trial", "Agende uma aula gratis")}
                </a>
                <a href="#courses" className="btn btn-ghost">
                  {t("View courses", "Ver cursos")}
                </a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">23+</span>
                  <span className="stat-label">{t("Years experience", "Anos de experiencia")}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">{t("Students taught", "Alunos ensinados")}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">{t("Live classes", "Aulas ao vivo")}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">{t("Countries", "Paises")}</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-card">
                <div className="hero-img">
                  <Image
                    src="/images/hero-class.png"
                    alt={t(
                      "Teacher Josi in a live online English class with students on video call",
                      "Teacher Josi em uma aula ao vivo de ingles online com alunos por videochamada"
                    )}
                    width={1024}
                    height={1024}
                    priority
                    sizes="(max-width: 992px) 100vw, 520px"
                  />
                </div>
                <div className="hero-floating-badge hero-fb-1">
                  <span className="hfb-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{t("500+ students", "500+ alunos")}</span>
                </div>
                <div className="hero-floating-badge hero-fb-2">
                  <span className="hfb-icon hfb-star">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <span>5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== About ========== */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("About us", "Sobre nos")}</p>
            <h2>{t("Your path to English fluency", "Seu caminho para a fluencia em ingles")}</h2>
          </div>
          <div className="about-content">
            <p className="about-lead">
              {t(
                "We are an online English school with live classes taught by an experienced, dedicated teacher. With 23 years of teaching, we've helped hundreds of students achieve their personal and professional dreams.",
                "Somos uma escola de ingles online com aulas ao vivo ministradas por uma professora experiente e dedicada. Com 23 anos de ensino, ajudamos centenas de alunos a realizarem seus sonhos pessoais e profissionais."
              )}
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  'Our approach is simple: <strong>dynamic, fun, and effective classes</strong> that make learning English an enjoyable journey, not a chore.',
                  'Nossa abordagem e simples: <strong>aulas dinamicas, divertidas e eficazes</strong> que tornam o aprendizado de ingles uma jornada prazerosa, nao uma obrigacao.'
                ),
              }}
            />
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>{t("Expert instruction", "Ensino especializado")}</h3>
              <p>{t("Learn from Teacher Josi with 23 years of dedicated teaching experience", "Aprenda com a Teacher Josi com 23 anos de experiencia dedicada ao ensino")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>{t("100% online", "100% online")}</h3>
              <p>{t("Study from anywhere in the world with live interactive video classes", "Estude de qualquer lugar do mundo com aulas ao vivo e interativas")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3>{t("Results-focused", "Foco em resultados")}</h3>
              <p>{t("From beginner to advanced - structured programs that deliver real fluency", "Do iniciante ao avancado - programas estruturados que entregam fluencia real")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Teacher ========== */}
      <section id="teacher" className="teacher-section">
        <div className="container">
          <div className="teacher-content">
            <div className="teacher-photo">
              <div className="teacher-photo-img">
                <Image
                  src="/images/teacher-josi.png"
                  alt={t(
                    "Portrait of Teacher Josi, founder and lead teacher of The Way English School",
                    "Retrato da Teacher Josi, fundadora e professora principal da The Way English School"
                  )}
                  width={1024}
                  height={1024}
                  sizes="(max-width: 992px) 280px, 420px"
                />
              </div>
            </div>
            <div className="teacher-info">
              <p className="section-label">{t("Meet your teacher", "Conheca sua professora")}</p>
              <h2>Teacher Josi</h2>
              <p className="teacher-role">{t("Founder & Lead Teacher", "Fundadora e Professora Principal")}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    "With over <strong>23 years of dedicated teaching experience</strong>, Teacher Josi has helped hundreds of students across the globe unlock their potential through English fluency.",
                    "Com mais de <strong>23 anos de experiencia dedicada ao ensino</strong>, a Teacher Josi ajudou centenas de alunos em todo o mundo a desbloquear seu potencial atraves da fluencia em ingles."
                  ),
                }}
              />
              <p>
                {t(
                  "Based in Pocos de Caldas, Brazil, she brings warmth, professionalism, and passion to every class. Her philosophy: when students enjoy the journey, they achieve extraordinary results.",
                  "Sediada em Pocos de Caldas, Brasil, ela traz calor humano, profissionalismo e paixao para cada aula. Sua filosofia: quando os alunos aproveitam a jornada, alcancam resultados extraordinarios."
                )}
              </p>
              <ul className="teacher-credentials">
                <li><CheckSvg /><span>{t("23+ years of English teaching", "23+ anos ensinando ingles")}</span></li>
                <li><CheckSvg /><span>{t("500+ students taught worldwide", "500+ alunos ensinados no mundo todo")}</span></li>
                <li><CheckSvg /><span>{t("Beginner through advanced levels", "Do nivel iniciante ao avancado")}</span></li>
                <li><CheckSvg /><span>{t("Personalized learning approach", "Abordagem de aprendizado personalizada")}</span></li>
              </ul>
              <a href={waLink("trial", lang)} className="btn btn-primary" target="_blank" rel="noopener">
                {t("Book a class with Teacher Josi", "Agende uma aula com a Teacher Josi")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Courses ========== */}
      <section id="courses" className="courses">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("Courses", "Cursos")}</p>
            <h2>{t("Programs designed for your success", "Programas criados para o seu sucesso")}</h2>
            <p className="section-desc">
              {t(
                "Whether you're starting from scratch or refining advanced skills, we have the right course for you.",
                "Seja voce iniciante ou aperfeicoando habilidades avancadas, temos o curso certo para voce."
              )}
            </p>
          </div>
          <div className="courses-grid">
            <div className="course-card">
              <span className="course-level">{t("Beginner", "Iniciante")}</span>
              <h3>{t("Foundation English", "Ingles Basico")}</h3>
              <p>{t("Build essential vocabulary, grammar, and conversational skills with confidence.", "Construa vocabulario essencial, gramatica e habilidades de conversacao com confianca.")}</p>
              <ul className="course-features">
                <li>{t("Basic grammar and vocabulary", "Gramatica e vocabulario basico")}</li>
                <li>{t("Everyday conversations", "Conversas do dia a dia")}</li>
                <li>{t("Pronunciation practice", "Pratica de pronuncia")}</li>
                <li>{t("Live interactive lessons", "Aulas interativas ao vivo")}</li>
              </ul>
              <Link href="/courses/foundation" className="btn btn-outline">
                {t("Learn more", "Saiba mais")}
              </Link>
            </div>
            <div className="course-card course-featured">
              <span className="course-badge">{t("Most popular", "Mais popular")}</span>
              <span className="course-level">{t("Intermediate", "Intermediario")}</span>
              <h3>{t("Fluency Builder", "Construtor de Fluencia")}</h3>
              <p>{t("Enhance your communication and gain confidence in professional and social settings.", "Melhore sua comunicacao e ganhe confianca em ambientes profissionais e sociais.")}</p>
              <ul className="course-features">
                <li>{t("Advanced conversation practice", "Pratica de conversacao avancada")}</li>
                <li>{t("Business English basics", "Ingles para negocios")}</li>
                <li>{t("Writing and reading skills", "Habilidades de escrita e leitura")}</li>
                <li>{t("Cultural insights", "Conhecimentos culturais")}</li>
              </ul>
              <Link href="/courses/fluency-builder" className="btn btn-primary">
                {t("Learn more", "Saiba mais")}
              </Link>
            </div>
            <div className="course-card">
              <span className="course-level">{t("Advanced", "Avancado")}</span>
              <h3>{t("Mastery Program", "Programa de Dominio")}</h3>
              <p>{t("Perfect your English for professional success with nuanced, native-level communication.", "Aperfeicoce seu ingles para o sucesso profissional com comunicacao refinada e de nivel nativo.")}</p>
              <ul className="course-features">
                <li>{t("Professional presentations", "Apresentacoes profissionais")}</li>
                <li>{t("Advanced business English", "Ingles comercial avancado")}</li>
                <li>{t("Academic writing", "Escrita academica")}</li>
                <li>{t("Native-level fluency", "Fluencia de nivel nativo")}</li>
              </ul>
              <Link href="/courses/mastery" className="btn btn-outline">
                {t("Learn more", "Saiba mais")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Why Us ========== */}
      <section className="why-us">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("Why The Way", "Por que The Way")}</p>
            <h2>{t("What makes us different", "O que nos torna diferentes")}</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>{t("Dynamic & fun", "Dinamico e divertido")}</h3>
              <p>{t("Engaging classes that make learning feel natural and exciting, never boring.", "Aulas envolventes que tornam o aprendizado natural e empolgante, nunca entediante.")}</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>{t("Proven results", "Resultados comprovados")}</h3>
              <p>{t("Students consistently achieve their language goals and see real, measurable progress.", "Alunos consistentemente alcancam suas metas linguisticas e veem progresso real e mensuravel.")}</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>{t("Personal attention", "Atencao personalizada")}</h3>
              <p>{t("Live interaction and personalized feedback in every single class.", "Interacao ao vivo e feedback personalizado em cada aula.")}</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>{t("Learn from anywhere", "Aprenda de qualquer lugar")}</h3>
              <p>{t("Study online from anywhere in the world, at times that fit your schedule.", "Estude online de qualquer lugar do mundo, nos horarios que cabem na sua agenda.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Booking ========== */}
      <section id="book" className="booking-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("Book a class", "Agende uma aula")}</p>
            <h2>{t("Pick the class that fits you", "Escolha a aula ideal para voce")}</h2>
            <p className="section-desc">
              {t(
                "Message Teacher Josi directly on WhatsApp — she'll reply with available times and get you started.",
                "Fale direto com a Teacher Josi no WhatsApp — ela responde com horarios e te ajuda a comecar."
              )}
            </p>
          </div>
          <div className="booking-grid">
            <div className="booking-card">
              <div className="booking-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="booking-tag booking-tag-free">{t("Free · 30 min", "Gratis · 30 min")}</span>
              <h3>{t("Trial class", "Aula experimental")}</h3>
              <p className="booking-desc">
                {t(
                  "Meet Teacher Josi, get a level assessment, and receive a custom study plan.",
                  "Conheca a Teacher Josi, receba uma avaliacao de nivel e um plano de estudos personalizado."
                )}
              </p>
              <ul className="booking-features">
                <li>{t("Level assessment included", "Avaliacao de nivel inclusa")}</li>
                <li>{t("Personalized study plan", "Plano de estudos personalizado")}</li>
                <li>{t("Zero obligation", "Sem compromisso")}</li>
              </ul>
              <Link href="/book/trial" className="btn btn-outline-light btn-full">
                {t("Learn more · Book", "Saiba mais · Agende")}
              </Link>
            </div>
            <div className="booking-card booking-featured">
              <span className="booking-badge">{t("Most popular", "Mais popular")}</span>
              <div className="booking-icon booking-icon-featured">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="booking-tag">{t("1-on-1 · 60 min", "Individual · 60 min")}</span>
              <h3>{t("Individual class", "Aula individual")}</h3>
              <p className="booking-desc">
                {t(
                  "Fully personalized lessons built around your goals, level, and pace.",
                  "Aulas totalmente personalizadas de acordo com seus objetivos, nivel e ritmo."
                )}
              </p>
              <ul className="booking-features">
                <li>{t("Custom curriculum", "Curriculo personalizado")}</li>
                <li>{t("Flexible scheduling", "Horarios flexiveis")}</li>
                <li>{t("Fastest progress", "Progresso mais rapido")}</li>
              </ul>
              <Link href="/book/individual" className="btn btn-primary btn-full">
                {t("Learn more · Book", "Saiba mais · Agende")}
              </Link>
            </div>
            <div className="booking-card">
              <div className="booking-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="booking-tag">{t("Group · 60 min", "Grupo · 60 min")}</span>
              <h3>{t("Group class", "Aula em grupo")}</h3>
              <p className="booking-desc">
                {t(
                  "Small groups of up to 5 students — peer practice and conversation at a lower price.",
                  "Grupos pequenos de ate 5 alunos — pratica com colegas e conversacao por um preco menor."
                )}
              </p>
              <ul className="booking-features">
                <li>{t("Max 5 students", "Maximo 5 alunos")}</li>
                <li>{t("Conversational focus", "Foco em conversacao")}</li>
                <li>{t("More accessible pricing", "Preco mais acessivel")}</li>
              </ul>
              <Link href="/book/group" className="btn btn-outline-light btn-full">
                {t("Learn more · Book", "Saiba mais · Agende")}
              </Link>
            </div>
          </div>
          <p className="booking-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              {t(
                "All classes are 100% online, held live via video call.",
                "Todas as aulas sao 100% online, ao vivo por videochamada."
              )}
            </span>
          </p>
        </div>
      </section>

      {/* ========== Testimonials ========== */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("Reviews", "Avaliacoes")}</p>
            <h2>{t("What our students say", "O que nossos alunos dizem")}</h2>
          </div>
          <div className="testimonials-grid">
            {[
              {
                text: [
                  '"The classes are very dynamic, fun, and effective. I\'ve seen incredible progress in just a few months!"',
                  '"As aulas sao muito dinamicas, divertidas e eficazes. Vi um progresso incrivel em apenas alguns meses!"',
                ],
                name: "Maria S.",
                role: ["Business Professional", "Profissional de Negocios"],
                initial: "M",
              },
              {
                text: [
                  '"Teacher Josi makes learning English enjoyable and accessible. The live classes are engaging and I always look forward to them."',
                  '"A Teacher Josi torna o aprendizado de ingles agradavel e acessivel. As aulas ao vivo sao envolventes e eu sempre espero ansiosamente por elas."',
                ],
                name: "Carlos R.",
                role: ["University Student", "Estudante Universitario"],
                initial: "C",
              },
              {
                text: [
                  '"I started as a complete beginner and now I can confidently communicate in English. The Way changed my career prospects!"',
                  '"Comecei como iniciante completo e agora consigo me comunicar em ingles com confianca. The Way mudou minhas perspectivas de carreira!"',
                ],
                name: "Ana P.",
                role: ["Healthcare Worker", "Profissional de Saude"],
                initial: "A",
              },
            ].map((review) => (
              <div className="testimonial-card" key={review.name}>
                <FiveStars />
                <p className="testimonial-text">{t(review.text[0], review.text[1])}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{review.initial}</div>
                  <div>
                    <p className="author-name">{review.name}</p>
                    <p className="author-role">{t(review.role[0], review.role[1])}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">FAQ</p>
            <h2>{t("Frequently asked questions", "Perguntas frequentes")}</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <div className={`faq-item${activeFaq === i ? " active" : ""}`} key={i}>
                <button
                  className="faq-question"
                  aria-expanded={activeFaq === i}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{t(item.q[0], item.q[1])}</span>
                  <FaqPlusIcon />
                </button>
                <div className="faq-answer">
                  <p>{t(item.a[0], item.a[1])}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA / Contact ========== */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t("Ready to start learning?", "Pronto para comecar a aprender?")}</h2>
            <p>
              {t(
                "Take the first step toward achieving your personal and professional dreams.",
                "De o primeiro passo para realizar seus sonhos pessoais e profissionais."
              )}
            </p>
            <div className="cta-buttons">
              <a href={waLink("general", lang)} className="btn btn-cta-primary" target="_blank" rel="noopener">
                <WhatsAppIcon size={20} />
                {t("Contact on WhatsApp", "Contato pelo WhatsApp")}
              </a>
              <a
                href="https://instagram.com/teacherjosi.theway"
                className="btn btn-cta-secondary"
                target="_blank"
                rel="noopener"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                {t("Follow on Instagram", "Siga no Instagram")}
              </a>
            </div>
            <div className="contact-details">
              <a href="mailto:josi.rodrigues.rjg@gmail.com" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                josi.rodrigues.rjg@gmail.com
              </a>
              <a href="tel:+5519888869805" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +55 19 98886-9805
              </a>
              <span className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {t(
                    "Pocos de Caldas, Brazil (Online Worldwide)",
                    "Pocos de Caldas, Brasil (Online para o Mundo Todo)"
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat intent="general" />
    </>
  );
}
