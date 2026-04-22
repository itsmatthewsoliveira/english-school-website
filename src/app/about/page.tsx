"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useLang } from "../lib/LangContext";
import { waLink } from "../lib/whatsapp";

export default function AboutPage() {
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
            <span>{t("About", "Sobre")}</span>
          </div>
          <div className="detail-hero-layout">
            <div className="detail-hero-content">
              <p className="section-label detail-eyebrow">
                {t("About us", "Sobre nós")}
              </p>
              <h1>
                {t(
                  "The school that treats English like a relationship — not a product",
                  "A escola que trata o inglês como uma relação — não um produto"
                )}
              </h1>
              <p className="detail-subtitle">
                {t(
                  "The Way English School is a one-teacher, high-touch online school founded and run by Teacher Josi. Over 23 years, it has helped 500+ students across 10+ countries reach the fluency that textbooks and apps couldn't give them.",
                  "A The Way English School é uma escola online artesanal, fundada e conduzida pela Teacher Josi. Em 23 anos, ajudou mais de 500 alunos em mais de 10 países a alcançarem a fluência que livros e apps não deram."
                )}
              </p>
              <div className="detail-cta-row">
                <a
                  href={waLink("trial", lang)}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener"
                >
                  {t("Book a free trial", "Agendar aula gratuita")}
                </a>
                <Link href="/quiz" className="btn btn-ghost btn-lg">
                  {t("Take the level quiz", "Fazer o teste de nível")}
                </Link>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="detail-hero-image">
                <Image
                  src="/images/teacher-josi.png"
                  alt={t(
                    "Portrait of Teacher Josi, founder of The Way English School",
                    "Retrato da Teacher Josi, fundadora da The Way English School"
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
                <h2>{t("Our story", "Nossa história")}</h2>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "The Way started in 2003 with a simple idea: most people don't fail at English because they're not smart enough — they fail because the way they were taught didn't match how humans actually learn a language. Textbooks, apps, and generic group classes treat language like a subject to be memorized, not a living conversation.",
                    "A The Way começou em 2003 com uma ideia simples: a maioria das pessoas não fracassa no inglês por falta de inteligência — fracassa porque o jeito como foi ensinada não combina com o jeito que o cérebro humano aprende uma língua. Livros, apps e aulas genéricas em grupo tratam língua como matéria pra decorar, não como conversa viva."
                  )}
                </p>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "Teacher Josi built The Way around the opposite principle: every class is live, every class is a real conversation, and every student's path is personal. No apps, no pre-recorded videos, no AI teachers. Just a room (virtual, but real) where you speak, make mistakes safely, and leave a little more confident every time.",
                    "A Teacher Josi construiu a The Way no princípio oposto: toda aula é ao vivo, toda aula é conversa real e o caminho de cada aluno é personalizado. Sem apps, sem vídeos gravados, sem professores de IA. Só uma sala (virtual, mas real) onde você fala, erra em segurança e sai um pouco mais confiante a cada vez."
                  )}
                </p>
                <p style={{ lineHeight: 1.75 }}>
                  {t(
                    "23 years later, The Way has become a quiet success story — students in Brazil, the US, the UK, Canada, Australia, Germany, Japan, Portugal, Argentina, and beyond, all taught by the same dedicated teacher who knows their name, their goals, and where they struggle.",
                    "23 anos depois, a The Way virou uma história de sucesso silenciosa — alunos no Brasil, EUA, Reino Unido, Canadá, Austrália, Alemanha, Japão, Portugal, Argentina e outros países, todos com a mesma professora dedicada que conhece seus nomes, objetivos e dificuldades."
                  )}
                </p>
              </div>

              <div className="detail-section">
                <h2>{t("What makes us different", "O que nos torna diferentes")}</h2>
                <ul className="detail-list">
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Live, human, 1-on-1 or small group.", "Ao vivo, humana, individual ou em grupo pequeno.")}</strong>{" "}
                      {t(
                        "No apps replacing the teacher. Every class is on Google Meet or Zoom with Teacher Josi.",
                        "Nenhum app substituindo a professora. Toda aula é no Google Meet ou Zoom com a Teacher Josi."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("23+ years of experience in one teacher.", "23+ anos de experiência numa única professora.")}</strong>{" "}
                      {t(
                        "Not a platform with rotating contractors. The person in your first class is the same person in your 100th.",
                        "Não é uma plataforma com professores rotativos. Quem está na sua primeira aula é a mesma pessoa da sua centésima."
                      )}
                    </span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>
                      <strong>{t("Bilingual support when you need it.", "Suporte bilíngue quando precisa.")}</strong>{" "}
                      {t(
                        "Stuck? Josi speaks Portuguese natively and can translate the tricky moments — until you don't need that anymore.",
                        "Travou? A Josi fala português nativamente e traduz os momentos difíceis — até você não precisar mais disso."
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
                <h2>{t("About Teacher Josi", "Sobre a Teacher Josi")}</h2>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "Josimeri Rodrigues Jacinto Gitahy — known to everyone as Teacher Josi — has been teaching English in Pocos de Caldas, Minas Gerais, Brazil since 2003. She's taught absolute beginners, corporate executives, PhD candidates, retirees preparing to move abroad, kids learning their first words, and everything in between.",
                    "Josimeri Rodrigues Jacinto Gitahy — conhecida como Teacher Josi — ensina inglês em Poços de Caldas, Minas Gerais, Brasil desde 2003. Já ensinou iniciantes absolutos, executivos corporativos, candidatos a doutorado, aposentados indo morar fora, crianças aprendendo as primeiras palavras e tudo no meio."
                  )}
                </p>
                <p style={{ lineHeight: 1.75, marginBottom: 16 }}>
                  {t(
                    "Her teaching philosophy is simple: when students enjoy the journey, they achieve extraordinary results. Classes are warm, structured, and paced to the student — never rushed, never boring. She believes the teacher's job isn't to be impressive; it's to make the student confident enough to stop needing the teacher.",
                    "Sua filosofia é simples: quando o aluno curte a jornada, ele alcança resultados extraordinários. As aulas são acolhedoras, estruturadas e no ritmo do aluno — nunca corridas, nunca chatas. Ela acredita que o trabalho da professora não é impressionar, é deixar o aluno confiante o bastante pra não precisar mais dela."
                  )}
                </p>
                <p style={{ lineHeight: 1.75 }}>
                  {t(
                    "Outside of teaching, Josi is a mom, a reader, a traveler, and an endless student herself — always learning something new, because the best teachers are the ones who haven't forgotten what it feels like to be a beginner.",
                    "Fora da sala de aula, a Josi é mãe, leitora, viajante e aluna eterna — sempre aprendendo algo novo, porque as melhores professoras são aquelas que não esqueceram como é ser iniciante."
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
                    "The best way to know if The Way is right for you is to meet Teacher Josi. Free, 30 minutes, zero obligation.",
                    "O melhor jeito de saber se a The Way é pra você é conhecer a Teacher Josi. Grátis, 30 minutos, sem compromisso."
                  )}
                </p>
                <a
                  href={waLink("trial", lang)}
                  className="btn btn-primary btn-full"
                  target="_blank"
                  rel="noopener"
                >
                  {t("Book free trial", "Agendar aula grátis")}
                </a>
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
