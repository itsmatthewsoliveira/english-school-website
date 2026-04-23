"use client";

import DetailPage from "../../components/DetailPage";

export default function MasteryPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Mastery Program", pt: "Programa de Dominio" }}
      tag={{ en: "Advanced", pt: "Avancado" }}
      title={{
        en: "Mastery Program — polish your English to native-level",
        pt: "Programa de Dominio — refine seu inglês ao nível nativo",
      }}
      subtitle={{
        en: "For advanced students who want native-level nuance: precise vocabulary, sophisticated grammar, professional writing, and the subtle cultural fluency that sets you apart.",
        pt: "Para alunos avançados que buscam nuance de nível nativo: vocabulário preciso, gramática sofisticada, escrita profissional e a fluência cultural sutil que te diferencia.",
      }}
      priceNote={{
        en: "Live classes · 60 min · 1-on-1 recommended for this level",
        pt: "Aulas ao vivo · 60 min · Individual recomendado neste nível",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "An advanced-level online English coaching session at The Way",
          pt: "Uma sessão avançada de coaching de inglês online na The Way",
        },
      }}
      intent="mastery"
      primaryCtaLabel={{
        en: "Chat on WhatsApp about Mastery",
        pt: "Fale no WhatsApp sobre o Mastery",
      }}
      sections={[
        {
          heading: {
            en: "What you'll refine",
            pt: "O que você vai refinar",
          },
          bullets: [
            {
              en: "Professional presentations — executive-level structure, delivery, and Q&A",
              pt: "Apresentacoes profissionais — estrutura executiva, entrega e Q&A",
            },
            {
              en: "Advanced business English — negotiation, leadership communication, pitching",
              pt: "Inglês empresarial avançado — negociação, comunicação de liderança, pitching",
            },
            {
              en: "Academic writing — essays, research papers, applications, cover letters",
              pt: "Escrita acadêmica — redacoes, papers, candidaturas, cartas de apresentacao",
            },
            {
              en: "Native-level fluency — idioms, register, humor, cultural references",
              pt: "Fluencia de nível nativo — expressõés, registro, humor, referencias culturais",
            },
            {
              en: "Advanced pronunciation and accent reduction",
              pt: "Pronuncia avançada e reducao de sotaque",
            },
          ],
        },
        {
          heading: {
            en: "Real-world outcomes",
            pt: "Resultados no mundo real",
          },
          bullets: [
            {
              en: "Interview for senior roles at international companies",
              pt: "Entrevistar para vagas seniores em empresas internacionais",
            },
            {
              en: "Present in English to global audiences with confidence",
              pt: "Apresentar em inglês para audiências globais com confiança",
            },
            {
              en: "Write professional content — articles, whitepapers, executive emails",
              pt: "Escrever conteudo profissional — artigos, whitepapers, e-mails executivos",
            },
            {
              en: "Apply to Master's, PhD, or MBA programs abroad",
              pt: "Candidatar-se a mestrado, doutorado ou MBA no exterior",
            },
            {
              en: "Prepare for Cambridge CAE/CPE, IELTS 7.5+, or TOEFL 100+",
              pt: "Preparar para Cambridge CAE/CPE, IELTS 7.5+ ou TOEFL 100+",
            },
          ],
        },
        {
          heading: {
            en: "Approach for this level",
            pt: "Abordagem deste nível",
          },
          bullets: [
            {
              en: "Individually tailored — your teacher builds the curriculum around your goals",
              pt: "Personalizado individualmente — seu professor monta o curriculo ao redor dos seus objetivos",
            },
            {
              en: "Every class includes detailed feedback on your own writing and speaking",
              pt: "Cada aula inclui feedback detalhado sobre sua própria escrita e fala",
            },
            {
              en: "Real projects from your life — your work, your applications, your goals",
              pt: "Projetos reais da sua vida — seu trabalho, suas candidaturas, seus objetivos",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Upper-intermediate to advanced students (B2–C1)",
          pt: "Alunos intermediários-avançados (B2–C1)",
        },
        {
          en: "Professionals in senior or international roles",
          pt: "Profissionais em cargos seniores ou internacionais",
        },
        {
          en: "Candidates preparing for Cambridge, IELTS, TOEFL, or grad school applications",
          pt: "Candidatos se preparando para Cambridge, IELTS, TOEFL ou pos-graduação",
        },
        {
          en: "Fluent speakers who want to sound truly native",
          pt: "Falantes fluentes que querem soar verdadeiramente nativos",
        },
      ]}
    />
  );
}
