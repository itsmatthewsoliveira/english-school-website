"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useLang } from "../lib/LangContext";

export default function AboutPage() {
  const { t } = useLang();

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
            <span>{t("About", "Sobre")}</span>
          </div>
          <div className="detail-hero-layout">
            <div className="detail-hero-content">
              <p className="section-label detail-eyebrow">
                {t("Our story", "Nossa história")}
              </p>
              <h1>
                {t(
                  "The school that treats English like a relationship — not a product",
                  "A escola que trata o inglês como uma relação — não um produto"
                )}
              </h1>
              <p className="detail-subtitle">
                {t(
                  "The Way English School is a high-touch online school, founded in 2003. Over 23+ years we've built a methodology — and a small team of dedicated teachers — that has helped 500+ students across 10+ countries reach the fluency textbooks and apps couldn't give them.",
                  "A The Way English School é uma escola online artesanal, fundada em 2003. Em mais de 23 anos construímos uma metodologia — e uma equipe pequena de professores dedicados — que ajudou mais de 500 alunos em mais de 10 países a alcançarem a fluência que livros e apps não deram."
                )}
              </p>
              <div className="detail-cta-row">
                <Link href="/book/trial" className="btn btn-primary btn-lg">
                  {t("Book a free trial", "Agendar aula gratuita")}
                </Link>
                <Link href="/quiz" className="btn btn-ghost btn-lg">
                  {t("Take the level quiz", "Fazer o teste de nível")}
                </Link>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="detail-hero-image">
                <Image
                  src="/images/hero-class.png"
                  alt={t(
                    "A live online English class at The Way",
                    "Uma aula ao vivo de inglês online na The Way"
                  )}
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

      <section className="detail-body">
        <div className="container">
          <div className="detail-body-grid">
            <div className="detail-body-main">
              <div className="detail-section">
                <h2>{t("How The Way started", "Como a The Way começou")}</h2>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "It began in 2003 with a simple question: why do so many smart, motivated people give up on English? The answer wasn't talent. It was the method.",
                    "Tudo começou em 2003 com uma pergunta simples: por que tanta gente inteligente e motivada desiste do inglês? A resposta não era talento. Era o método."
                  )}
                </p>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "Textbooks, apps, and generic group classes treat language like a subject to be memorized, not a living conversation. Students grind through grammar, cram vocabulary, and still freeze the moment someone asks a real question. We started The Way to prove there's a better way.",
                    "Livros, apps e aulas genéricas em grupo tratam língua como matéria pra decorar, não como conversa viva. Alunos decoram gramática, engolem vocabulário e ainda travam quando alguém faz uma pergunta de verdade. A gente fundou a The Way pra mostrar que existe um jeito melhor."
                  )}
                </p>
                <p style={{ lineHeight: 1.75 }}>
                  {t(
                    "23+ years later, The Way has grown into a small-team online school — still personal, still live, still one-teacher-per-student at its core. Students in Brazil, the US, the UK, Canada, Australia, Germany, Japan, Portugal, Argentina, and beyond.",
                    "Mais de 23 anos depois, a The Way virou uma escola online de equipe pequena — ainda pessoal, ainda ao vivo, ainda com um professor por aluno como princípio. Alunos no Brasil, EUA, Reino Unido, Canadá, Austrália, Alemanha, Japão, Portugal, Argentina e outros países."
                  )}
                </p>
              </div>

              <div className="detail-section">
                <h2>{t("Our methodology", "Nossa metodologia")}</h2>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "We believe three things about learning a language:",
                    "A gente acredita em três coisas sobre aprender uma língua:"
                  )}
                </p>
                <ul className="detail-list">
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Speaking comes first.", "A fala vem primeiro.")}</strong>{" "}
                      {t(
                        "Grammar rules are scaffolding — useful, but not the building. Every class is mostly conversation, with grammar taught in context as you need it.",
                        "Regras de gramática são andaime — úteis, mas não são o prédio. Toda aula é principalmente conversa, com gramática ensinada no contexto, conforme você precisa."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("The teacher matters more than the tool.", "O professor importa mais que a ferramenta.")}</strong>{" "}
                      {t(
                        "Apps and AI can drill you forever and you'll never get fluent. A human teacher who knows you, hears your mistakes, and adjusts in real time is the thing that actually works.",
                        "Apps e IA te treinam pra sempre e você não fica fluente. Um professor humano que te conhece, escuta seus erros e ajusta em tempo real — isso sim funciona."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Enjoyment is not optional.", "Gostar não é opcional.")}</strong>{" "}
                      {t(
                        "Students who enjoy the journey keep showing up. Students who keep showing up become fluent. So our classes are warm, structured, and paced to the student — never rushed, never boring.",
                        "Alunos que curtem a jornada continuam aparecendo. Alunos que continuam aparecendo ficam fluentes. Por isso nossas aulas são acolhedoras, estruturadas e no ritmo do aluno — nunca corridas, nunca chatas."
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="detail-section">
                <h2>{t("What makes us different", "O que nos torna diferentes")}</h2>
                <ul className="detail-list">
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Live, human, 1-on-1 or small group.", "Ao vivo, humana, individual ou em grupo pequeno.")}</strong>{" "}
                      {t(
                        "Every class is on Google Meet or Zoom with one of our teachers. No apps replacing the teacher.",
                        "Toda aula é no Google Meet ou Zoom com um dos nossos professores. Nenhum app substituindo o professor."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("A small team you'll actually recognize.", "Uma equipe pequena que você realmente conhece.")}</strong>{" "}
                      {t(
                        "Not a platform with rotating contractors. Each student is matched with a teacher who sticks with them through the journey.",
                        "Não é uma plataforma com professores rotativos. Cada aluno é pareado com um professor que fica com ele durante a jornada."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Bilingual support when you need it.", "Suporte bilíngue quando precisa.")}</strong>{" "}
                      {t(
                        "Stuck? Our teachers speak Portuguese and can translate the tricky moments — until you don't need that anymore.",
                        "Travou? Nossos professores falam português e traduzem os momentos difíceis — até você não precisar mais disso."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Curriculum built for you, not for the average student.", "Currículo feito pra você, não pro aluno médio.")}</strong>{" "}
                      {t(
                        "Business English for your industry, travel English for your destination, exam prep for your exam.",
                        "Inglês de negócios pro seu setor, inglês de viagem pro seu destino, preparação pra sua prova."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("No long contracts, no fine print.", "Sem contratos longos, sem letras miúdas.")}</strong>{" "}
                      {t(
                        "Pay per month. Cancel anytime. The goal is your progress, not locking you in.",
                        "Pagamento mensal. Cancela quando quiser. O objetivo é seu progresso, não te prender."
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="detail-section">
                <h2>{t("The team", "A equipe")}</h2>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "The Way was founded and is still led by Teacher Josi, based in Pocos de Caldas, Minas Gerais. Over the years she's grown the school into a small team of experienced teachers who share the same philosophy and the same warmth in the classroom.",
                    "A The Way foi fundada e ainda é liderada pela Teacher Josi, em Poços de Caldas, Minas Gerais. Ao longo dos anos ela expandiu a escola para uma equipe pequena de professores experientes que compartilham a mesma filosofia e o mesmo acolhimento em sala de aula."
                  )}
                </p>
                <p style={{ lineHeight: 1.75 }}>
                  {t(
                    "When you book a free trial, you'll be matched with the teacher who best fits your level, goals, and schedule. Sometimes that's the founder; often it's one of our other teachers. Either way, you get someone who knows your name and remembers where you left off.",
                    "Quando você agenda uma aula experimental, é pareado com o professor que melhor encaixa no seu nível, objetivos e horário. Às vezes é a fundadora; frequentemente é um dos nossos outros professores. De qualquer jeito, você tem alguém que sabe seu nome e lembra onde você parou."
                  )}
                </p>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <h3>{t("By the numbers", "Em números")}</h3>
                <ul className="detail-list">
                  <li>
                    <CheckSvg size={16} />
                    <span>
                      <strong>23+</strong> {t("years teaching", "anos ensinando")}
                    </span>
                  </li>
                  <li>
                    <CheckSvg size={16} />
                    <span>
                      <strong>500+</strong> {t("students taught", "alunos ensinados")}
                    </span>
                  </li>
                  <li>
                    <CheckSvg size={16} />
                    <span>
                      <strong>10+</strong> {t("countries reached", "países alcançados")}
                    </span>
                  </li>
                  <li>
                    <CheckSvg size={16} />
                    <span>
                      <strong>100%</strong> {t("live classes", "aulas ao vivo")}
                    </span>
                  </li>
                  <li>
                    <CheckSvg size={16} />
                    <span>
                      <strong>5.0</strong> {t("average student rating", "avaliação média dos alunos")}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="detail-sidebar-card detail-sidebar-cta">
                <h3>{t("Ready to start?", "Pronto para começar?")}</h3>
                <p>
                  {t(
                    "The best way to know if The Way is right for you is to try a free class. 30 minutes, zero obligation.",
                    "O melhor jeito de saber se a The Way é pra você é fazer uma aula grátis. 30 minutos, sem compromisso."
                  )}
                </p>
                <Link href="/book/trial" className="btn btn-primary btn-full">
                  {t("Book free trial", "Agendar aula grátis")}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat intent="general" />
    </>
  );
}

function CheckSvg({ size = 20 }: { size?: number }) {
  return (
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
}
