"use client";

import DetailPage from "../../components/DetailPage";

export default function FoundationPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Foundation English", pt: "Inglês Basico" }}
      tag={{ en: "Beginner", pt: "Iniciante" }}
      title={{
        en: "Foundation English — start from zero with confidence",
        pt: "Inglês Basico — comece do zero com confiança",
      }}
      subtitle={{
        en: "Build the vocabulary, grammar, and pronunciation you need to have your first real conversations in English. Live, 1-on-1 or small group, with one of our experienced teachers.",
        pt: "Construa o vocabulário, a gramática e a pronúncia necessários para ter suas primeiras conversas reais em inglês. Ao vivo, individual ou em grupo pequeno, com um dos nossos professores experientes.",
      }}
      priceNote={{
        en: "Live classes · 60 min · Weekly or 2–3x per week",
        pt: "Aulas ao vivo · 60 min · Semanal ou 2–3x por semana",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "A live online beginner English class at The Way",
          pt: "Uma aula ao vivo de inglês para iniciantes na The Way",
        },
      }}
      intent="foundation"
      primaryCtaLabel={{
        en: "Chat on WhatsApp to get started",
        pt: "Fale no WhatsApp para começar",
      }}
      sections={[
        {
          heading: {
            en: "What you'll learn",
            pt: "O que você vai aprender",
          },
          bullets: [
            {
              en: "Core grammar — present, past, and future tenses you'll actually use",
              pt: "Gramatica essencial — presente, passado e futuro que você vai usar de verdade",
            },
            {
              en: "1,000+ high-frequency words organized by real-life situations",
              pt: "Mais de 1.000 palavras de alta frequência organizadas por situacoes reais",
            },
            {
              en: "Pronunciation practice — English sounds that don't exist in Portuguese",
              pt: "Pratica de pronúncia — sons do inglês que não existem no portugues",
            },
            {
              en: "Everyday conversations — introductions, shopping, travel, work",
              pt: "Conversas do dia a dia — apresentacoes, compras, viagens, trabalho",
            },
            {
              en: "Listening comprehension with native-speaker audio",
              pt: "Compreensão auditiva com áudio de falantes nativos",
            },
          ],
        },
        {
          heading: { en: "How the classes work", pt: "Como funcionam as aulas" },
          bullets: [
            {
              en: "100% live video — Google Meet or Zoom. No apps, no pre-recorded videos.",
              pt: "100% ao vivo por vídeo — Google Meet ou Zoom. Sem apps, sem vídeos gravados.",
            },
            {
              en: "All materials digital and included — you don't need to buy a textbook",
              pt: "Todos os materiais são digitais e inclusos — você não precisa comprar livro",
            },
            {
              en: "Personalized study plan after your free level assessment",
              pt: "Plano de estudos personalizado após a avaliação de nível gratuita",
            },
            {
              en: "Homework and recap messages between classes (optional)",
              pt: "Licao de casa e mensagens de recapitulacao entre aulas (opcional)",
            },
          ],
        },
        {
          heading: { en: "Expected results", pt: "Resultados esperados" },
          bullets: [
            {
              en: "Month 1–3: introduce yourself, describe your day, order food, ask directions",
              pt: "Mes 1–3: se apresentar, descrever seu dia, pedir comida, pedir direcoes",
            },
            {
              en: "Month 4–6: short everyday conversations, understand slow podcasts, basic emails",
              pt: "Mes 4–6: conversas curtas do dia a dia, entender podcasts devagar, e-mails basicos",
            },
            {
              en: "Month 7–12: comfortable with small talk, travel abroad on your own, job-basic English",
              pt: "Mes 7–12: a vontade em conversas informais, viagens sozinho, inglês basico do trabalho",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Complete beginners (A1) who've never studied English seriously",
          pt: "Iniciantes completos (A1) que nunca estudaram inglês serio",
        },
        {
          en: "People who had English years ago and forgot most of it",
          pt: "Quem estudou inglês há anos e esqueceu a maior parte",
        },
        {
          en: "Adults who want a patient, pressure-free start",
          pt: "Adultos que querem um começo paciente e sem pressão",
        },
        {
          en: "Students preparing for travel, a new job, or moving abroad",
          pt: "Alunos se preparando para viagem, novo emprego ou morar fora",
        },
      ]}
    />
  );
}
