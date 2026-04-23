"use client";

import DetailPage from "../../components/DetailPage";

export default function FluencyBuilderPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Fluency Builder", pt: "Construtor de Fluencia" }}
      tag={{ en: "Intermediate · Most popular", pt: "Intermediario · Mais popular" }}
      title={{
        en: "Fluency Builder — go from 'okay at English' to genuinely fluent",
        pt: "Construtor de Fluencia — saia do 'razoavel' e chegue a fluência de verdade",
      }}
      subtitle={{
        en: "The course that gets you speaking confidently in professional and social situations. Real conversations, useful business English, and the cultural nuance textbooks miss.",
        pt: "O curso que te faz falar com confiança em situacoes profissionais e sociais. Conversas reais, inglês de negócios util e a nuance cultural que os livros deixam de lado.",
      }}
      priceNote={{
        en: "Live classes · 60 min · Most students do 2x per week",
        pt: "Aulas ao vivo · 60 min · Maioria faz 2x por semana",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "An intermediate English class at The Way on video",
          pt: "Uma aula de inglês intermediário na The Way por vídeo",
        },
      }}
      intent="fluency-builder"
      primaryCtaLabel={{
        en: "Chat on WhatsApp about Fluency Builder",
        pt: "Fale no WhatsApp sobre o Fluency Builder",
      }}
      sections={[
        {
          heading: {
            en: "What you'll master",
            pt: "O que você vai dominar",
          },
          bullets: [
            {
              en: "Advanced conversation — debating, storytelling, disagreeing politely",
              pt: "Conversa avançada — debate, storytelling, discordar com educacao",
            },
            {
              en: "Business English basics — meetings, emails, presentations, LinkedIn",
              pt: "Inglês de negócios — reunioes, e-mails, apresentacoes, LinkedIn",
            },
            {
              en: "Reading and writing — articles, reports, structured responses",
              pt: "Leitura e escrita — artigos, relatorios, respostas estruturadas",
            },
            {
              en: "Cultural fluency — US vs UK, idioms, professional tone, small talk",
              pt: "Fluencia cultural — EUA vs Reino Unido, girias, tom profissional, small talk",
            },
            {
              en: "Advanced grammar — conditionals, reported speech, phrasal verbs",
              pt: "Gramatica avançada — condicionais, discurso indireto, phrasal verbs",
            },
          ],
        },
        {
          heading: {
            en: "How Fluency Builder is structured",
            pt: "Como o Fluency Builder e estruturado",
          },
          bullets: [
            {
              en: "Every class mixes conversation (40%), focused grammar/vocab (30%), and real-world practice (30%)",
              pt: "Cada aula mistura conversa (40%), gramática/vocabulário focado (30%) e prática real (30%)",
            },
            {
              en: "Real materials — TED talks, news articles, business emails, podcasts",
              pt: "Materiais reais — TED talks, noticias, e-mails corporativos, podcasts",
            },
            {
              en: "Role-play exercises — job interviews, negotiations, client calls",
              pt: "Exercicios de role-play — entrevistas, negociações, chamadas com clientes",
            },
            {
              en: "Monthly progress check with clear milestones",
              pt: "Checkpoint mensal com marcos claros de progresso",
            },
          ],
        },
        {
          heading: {
            en: "Why students call this the 'unlock'",
            pt: "Por que os alunos chamam isso de 'destravada'",
          },
          bullets: [
            {
              en: "You stop translating in your head and start thinking in English",
              pt: "Você para de traduzir na cabeca e começa a pensar em inglês",
            },
            {
              en: "You go from 'I understand but can't respond' to natural back-and-forth",
              pt: "Você sai do 'entendo mas não respondo' para um dialogo natural",
            },
            {
              en: "Job interviews, work meetings, and travel stop feeling scary",
              pt: "Entrevistas, reunioes de trabalho e viagens deixam de assustar",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Students who already have basic grammar and vocabulary (A2–B1)",
          pt: "Alunos que já têm gramática e vocabulário basico (A2–B1)",
        },
        {
          en: "Professionals who need English for work — meetings, emails, interviews",
          pt: "Profissionais que precisam de inglês no trabalho — reunioes, e-mails, entrevistas",
        },
        {
          en: "Students who've plateaued with apps and want real progress",
          pt: "Alunos que estagnaram nos apps e querem progresso real",
        },
        {
          en: "People planning to travel, study, or work abroad in the next 6–12 months",
          pt: "Pessoas planejando viajar, estudar ou trabalhar fora nos próximos 6–12 meses",
        },
      ]}
    />
  );
}
