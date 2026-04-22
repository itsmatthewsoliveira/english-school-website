"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useLang } from "../lib/LangContext";
import { waLink } from "../lib/whatsapp";

type Level = "A1" | "A2" | "B1" | "B2" | "C1";

type Bilingual = { en: string; pt: string };

type Option = { label: Bilingual; level: Level };

type Question = {
  prompt: Bilingual;
  options: Option[];
};

// 12 questions, CEFR-aligned. Each option is scored by the level it
// represents; the user's final level = mode of their answers, tie broken
// toward the lower level (conservative — steer to the right course).
const QUESTIONS: Question[] = [
  {
    prompt: {
      en: "Pick the sentence that is grammatically correct:",
      pt: "Escolha a frase gramaticalmente correta:",
    },
    options: [
      { label: { en: "I am having 25 years old.", pt: "I am having 25 years old." }, level: "A1" },
      { label: { en: "I have 25 years.", pt: "I have 25 years." }, level: "A1" },
      { label: { en: "I am 25 years old.", pt: "I am 25 years old." }, level: "A2" },
      { label: { en: "I'm not sure", pt: "Não tenho certeza" }, level: "A1" },
    ],
  },
  {
    prompt: {
      en: "Choose the correct past tense: 'Yesterday I ___ to the store.'",
      pt: "Escolha o passado correto: 'Yesterday I ___ to the store.'",
    },
    options: [
      { label: { en: "go", pt: "go" }, level: "A1" },
      { label: { en: "goed", pt: "goed" }, level: "A1" },
      { label: { en: "went", pt: "went" }, level: "A2" },
      { label: { en: "was going", pt: "was going" }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Which sentence uses the present perfect correctly?",
      pt: "Qual frase usa o present perfect corretamente?",
    },
    options: [
      { label: { en: "I live here since 2020.", pt: "I live here since 2020." }, level: "A2" },
      { label: { en: "I have lived here since 2020.", pt: "I have lived here since 2020." }, level: "B1" },
      { label: { en: "I am living here since 2020.", pt: "I am living here since 2020." }, level: "A2" },
      { label: { en: "I have been live here since 2020.", pt: "I have been live here since 2020." }, level: "A2" },
    ],
  },
  {
    prompt: {
      en: "Pick the correct conditional: 'If I ___ more time, I would travel more.'",
      pt: "Escolha o condicional correto: 'If I ___ more time, I would travel more.'",
    },
    options: [
      { label: { en: "have", pt: "have" }, level: "A2" },
      { label: { en: "had", pt: "had" }, level: "B1" },
      { label: { en: "would have", pt: "would have" }, level: "B1" },
      { label: { en: "would had", pt: "would had" }, level: "A2" },
    ],
  },
  {
    prompt: {
      en: "Which sentence is grammatically best?",
      pt: "Qual frase é gramaticalmente melhor?",
    },
    options: [
      { label: { en: "Despite he was tired, he kept working.", pt: "Despite he was tired, he kept working." }, level: "B1" },
      { label: { en: "Despite being tired, he kept working.", pt: "Despite being tired, he kept working." }, level: "B2" },
      { label: { en: "In spite he was tired, he kept working.", pt: "In spite he was tired, he kept working." }, level: "B1" },
      { label: { en: "Despite of being tired, he kept working.", pt: "Despite of being tired, he kept working." }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Choose the closest meaning to: 'She let the cat out of the bag.'",
      pt: "Escolha o significado mais próximo de: 'She let the cat out of the bag.'",
    },
    options: [
      { label: { en: "She released a cat from a bag.", pt: "Ela soltou um gato de uma sacola." }, level: "A2" },
      { label: { en: "She revealed a secret.", pt: "Ela revelou um segredo." }, level: "B2" },
      { label: { en: "She made a mistake.", pt: "Ela cometeu um erro." }, level: "B1" },
      { label: { en: "She solved a problem.", pt: "Ela resolveu um problema." }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Fill in: 'Had I known earlier, I ___ told you.'",
      pt: "Complete: 'Had I known earlier, I ___ told you.'",
    },
    options: [
      { label: { en: "will have", pt: "will have" }, level: "B1" },
      { label: { en: "would have", pt: "would have" }, level: "B2" },
      { label: { en: "had", pt: "had" }, level: "B1" },
      { label: { en: "would had", pt: "would had" }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Which word fits best: 'The evidence was ___ to reach a conclusion.'",
      pt: "Qual palavra encaixa melhor: 'The evidence was ___ to reach a conclusion.'",
    },
    options: [
      { label: { en: "enough", pt: "enough" }, level: "B1" },
      { label: { en: "sufficient", pt: "sufficient" }, level: "B2" },
      { label: { en: "bastante", pt: "bastante" }, level: "A2" },
      { label: { en: "plenty", pt: "plenty" }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Which collocation is correct?",
      pt: "Qual colocação é correta?",
    },
    options: [
      { label: { en: "make a research", pt: "make a research" }, level: "B1" },
      { label: { en: "do research", pt: "do research" }, level: "B2" },
      { label: { en: "make research", pt: "make research" }, level: "B1" },
      { label: { en: "make researches", pt: "make researches" }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Which is the most natural way to disagree politely in a meeting?",
      pt: "Qual é a forma mais natural de discordar educadamente numa reunião?",
    },
    options: [
      { label: { en: "You are wrong.", pt: "You are wrong." }, level: "A2" },
      { label: { en: "I see your point, but I'd like to offer another perspective.", pt: "I see your point, but I'd like to offer another perspective." }, level: "C1" },
      { label: { en: "No, no, no.", pt: "No, no, no." }, level: "A2" },
      { label: { en: "I don't agree with you.", pt: "I don't agree with you." }, level: "B1" },
    ],
  },
  {
    prompt: {
      en: "Choose the sentence with correct advanced grammar:",
      pt: "Escolha a frase com gramática avançada correta:",
    },
    options: [
      { label: { en: "Not only she speaks English, but also French.", pt: "Not only she speaks English, but also French." }, level: "B2" },
      { label: { en: "Not only does she speak English, but she also speaks French.", pt: "Not only does she speak English, but she also speaks French." }, level: "C1" },
      { label: { en: "She not only speaks English and French.", pt: "She not only speaks English and French." }, level: "B1" },
      { label: { en: "Not only speaks she English, but French too.", pt: "Not only speaks she English, but French too." }, level: "B2" },
    ],
  },
  {
    prompt: {
      en: "Which sentence uses nuanced vocabulary correctly?",
      pt: "Qual frase usa vocabulário refinado corretamente?",
    },
    options: [
      { label: { en: "The report was very long and had many words.", pt: "The report was very long and had many words." }, level: "A2" },
      { label: { en: "The report was very big and complicated.", pt: "The report was very big and complicated." }, level: "B1" },
      { label: { en: "The report was exhaustive, albeit somewhat repetitive.", pt: "The report was exhaustive, albeit somewhat repetitive." }, level: "C1" },
      { label: { en: "The report was too big.", pt: "The report was too big." }, level: "A2" },
    ],
  },
];

function scoreToLevel(picks: Level[]): Level {
  const counts: Record<Level, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
  picks.forEach((p) => counts[p]++);

  const levels: Level[] = ["A1", "A2", "B1", "B2", "C1"];
  let best: Level = "A1";
  let bestCount = -1;
  // Tie-break toward the lower level (conservative)
  for (const l of levels) {
    if (counts[l] > bestCount) {
      best = l;
      bestCount = counts[l];
    }
  }
  return best;
}

function recommendation(level: Level): {
  course: Bilingual;
  coursePath: string;
  courseShort: Bilingual;
  whyEn: string;
  whyPt: string;
  next: Bilingual;
  intent: "foundation" | "fluency-builder" | "mastery" | "trial";
} {
  if (level === "A1" || level === "A2") {
    return {
      course: { en: "Foundation English", pt: "Inglês Básico (Foundation)" },
      coursePath: "/courses/foundation",
      courseShort: { en: "Beginner — Foundation", pt: "Iniciante — Foundation" },
      whyEn:
        "You're at the starting line. Foundation English builds core grammar, vocabulary, and confident everyday conversations from the ground up.",
      whyPt:
        "Você está no começo do caminho. O Foundation English constrói gramática, vocabulário e conversas do dia a dia com confiança, do zero.",
      next: {
        en: "Book a free trial to confirm your level with Teacher Josi.",
        pt: "Agende uma aula gratuita para confirmar seu nível com a Teacher Josi.",
      },
      intent: "foundation",
    };
  }
  if (level === "B1") {
    return {
      course: { en: "Fluency Builder", pt: "Construtor de Fluência" },
      coursePath: "/courses/fluency-builder",
      courseShort: { en: "Intermediate — Fluency Builder", pt: "Intermediário — Fluency Builder" },
      whyEn:
        "You've got the basics. Fluency Builder is designed exactly for this moment — to turn textbook English into real, confident conversation.",
      whyPt:
        "Você já tem a base. O Fluency Builder foi feito pra esse momento — transformar o inglês de livro em conversa real e confiante.",
      next: {
        en: "Book a free trial to start building real fluency.",
        pt: "Agende uma aula gratuita para começar a construir fluência de verdade.",
      },
      intent: "fluency-builder",
    };
  }
  if (level === "B2") {
    return {
      course: { en: "Fluency Builder (advanced track) or Mastery Program", pt: "Fluency Builder (avançado) ou Mastery Program" },
      coursePath: "/courses/fluency-builder",
      courseShort: { en: "Upper-intermediate", pt: "Intermediário-avançado" },
      whyEn:
        "You're upper-intermediate. Depending on your goals (work, travel, exams), Teacher Josi will place you in advanced Fluency Builder or start you on the Mastery Program.",
      whyPt:
        "Você está intermediário-avançado. Dependendo dos seus objetivos (trabalho, viagem, provas), a Teacher Josi te coloca no Fluency Builder avançado ou no Mastery Program.",
      next: {
        en: "Book a free trial so Teacher Josi can recommend the exact fit.",
        pt: "Agende uma aula gratuita para a Teacher Josi recomendar o curso ideal.",
      },
      intent: "trial",
    };
  }
  // C1
  return {
    course: { en: "Mastery Program", pt: "Mastery Program" },
    coursePath: "/courses/mastery",
    courseShort: { en: "Advanced — Mastery", pt: "Avançado — Mastery" },
    whyEn:
      "Your level is advanced. The Mastery Program polishes precision, nuance, professional communication, and native-level fluency.",
    whyPt:
      "Seu nível é avançado. O Mastery Program refina precisão, nuance, comunicação profissional e fluência de nível nativo.",
    next: {
      en: "Book a free trial to map your next milestones with Teacher Josi.",
      pt: "Agende uma aula gratuita para mapear seus próximos marcos com a Teacher Josi.",
    },
    intent: "mastery",
  };
}

export default function QuizPage() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0); // index into QUESTIONS; step === QUESTIONS.length means done
  const [picks, setPicks] = useState<Level[]>([]);

  const done = step >= QUESTIONS.length;

  function pick(level: Level) {
    const nextPicks = [...picks, level];
    setPicks(nextPicks);
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setPicks([]);
  }

  return (
    <>
      <Navbar />

      <section className="quiz-hero">
        <div className="quiz-hero-decoration">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-orb hero-orb-1" />
          <div className="hero-gradient-orb hero-orb-2" />
        </div>
        <div className="container">
          <div className="detail-breadcrumb">
            <Link href="/">{t("Home", "Início")}</Link>
            <span>/</span>
            <span>{t("English level quiz", "Teste de nível")}</span>
          </div>
          <div className="quiz-hero-content">
            <span className="detail-tag">
              {t("Free · 3 min · No signup", "Grátis · 3 min · Sem cadastro")}
            </span>
            <h1>
              {t(
                "What's your English level? Find out in 3 minutes.",
                "Qual é o seu nível de inglês? Descubra em 3 minutos."
              )}
            </h1>
            <p className="detail-subtitle">
              {t(
                "12 quick questions. At the end, we'll show your CEFR level (A1–C1) and recommend the right course to reach your goals faster.",
                "12 perguntas rápidas. No final, mostramos seu nível CEFR (A1–C1) e recomendamos o curso certo pra você chegar mais rápido no seu objetivo."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="quiz-body">
        <div className="container">
          <div className="quiz-card">
            {!done ? (
              <>
                <div className="quiz-progress">
                  <div className="quiz-progress-bar">
                    <div
                      className="quiz-progress-fill"
                      style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                  <span className="quiz-progress-text">
                    {t(
                      `Question ${step + 1} of ${QUESTIONS.length}`,
                      `Pergunta ${step + 1} de ${QUESTIONS.length}`
                    )}
                  </span>
                </div>

                <h2 className="quiz-question">
                  {t(QUESTIONS[step].prompt.en, QUESTIONS[step].prompt.pt)}
                </h2>

                <div className="quiz-options">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={i}
                      className="quiz-option"
                      onClick={() => pick(opt.level)}
                    >
                      <span className="quiz-option-letter">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{t(opt.label.en, opt.label.pt)}</span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    className="quiz-back"
                    onClick={() => {
                      setPicks(picks.slice(0, -1));
                      setStep(step - 1);
                    }}
                  >
                    ← {t("Back", "Voltar")}
                  </button>
                )}
              </>
            ) : (
              <QuizResult picks={picks} onRestart={restart} t={t} lang={lang} />
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat intent="general" />
    </>
  );
}

function QuizResult({
  picks,
  onRestart,
  t,
  lang,
}: {
  picks: Level[];
  onRestart: () => void;
  t: (en: string, pt: string) => string;
  lang: "en" | "pt";
}) {
  const level = scoreToLevel(picks);
  const rec = recommendation(level);

  return (
    <div className="quiz-result">
      <p className="quiz-result-eyebrow">
        {t("Your English level", "Seu nível de inglês")}
      </p>
      <div className="quiz-result-level">{level}</div>
      <h2>{t(rec.courseShort.en, rec.courseShort.pt)}</h2>
      <p className="quiz-result-why">{t(rec.whyEn, rec.whyPt)}</p>

      <div className="quiz-result-card">
        <p className="quiz-result-card-label">
          {t("Recommended course", "Curso recomendado")}
        </p>
        <h3>{t(rec.course.en, rec.course.pt)}</h3>
        <p>{t(rec.next.en, rec.next.pt)}</p>
        <div className="quiz-result-actions">
          <a
            href={waLink(rec.intent, lang)}
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
          >
            {t("Book free trial on WhatsApp", "Agendar aula grátis no WhatsApp")}
          </a>
          <Link href={rec.coursePath} className="btn btn-outline">
            {t("Read course details", "Ver detalhes do curso")}
          </Link>
        </div>
      </div>

      <button className="quiz-restart" onClick={onRestart}>
        ↻ {t("Retake the quiz", "Refazer o teste")}
      </button>
    </div>
  );
}
