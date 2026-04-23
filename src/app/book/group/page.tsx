"use client";

import DetailPage from "../../components/DetailPage";

export default function GroupBookingPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Group class", pt: "Aula em grupo" }}
      tag={{
        en: "Max 5 students · 60 min · Great value",
        pt: "Maximo 5 alunos · 60 min · Otimo custo-beneficio",
      }}
      title={{
        en: "Small group classes — learn together, save together",
        pt: "Aulas em grupo pequeno — aprenda junto, economize junto",
      }}
      subtitle={{
        en: "Up to 5 students per class — big enough for real conversation practice, small enough for everyone to speak. A more affordable way to get the same live, interactive classes.",
        pt: "Ate 5 alunos por turma — grande o bastante pra prática de conversa, pequeno o bastante pra todos falarem. Um jeito mais acessivel de ter as mesmas aulas ao vivo e interativas.",
      }}
      priceNote={{
        en: "60-minute live classes · Fixed weekly schedule · Lower price than 1-on-1",
        pt: "Aulas ao vivo de 60 min · Horario fixo semanal · Preco menor que individual",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "A small online English group class at The Way",
          pt: "Uma aula em grupo pequeno de inglês online na The Way",
        },
      }}
      intent="group"
      bookingFormClass="group"
      primaryCtaLabel={{
        en: "Chat on WhatsApp about groups",
        pt: "Fale no WhatsApp sobre grupos",
      }}
      sections={[
        {
          heading: {
            en: "Why group classes work",
            pt: "Por que aulas em grupo funcionam",
          },
          bullets: [
            {
              en: "Real conversation practice — you speak with peers, not just the teacher",
              pt: "Pratica de conversa real — você fala com colegas, não so com a professora",
            },
            {
              en: "Learn from others' questions and mistakes, not just your own",
              pt: "Aprende com as perguntas e erros dos outros, não so seus",
            },
            {
              en: "More affordable — roughly half the cost of 1-on-1 classes",
              pt: "Mais acessivel — cerca de metade do custo da individual",
            },
            {
              en: "Accountability — your group expects you, which keeps you consistent",
              pt: "Comprometimento — seu grupo te espera, o que mantem você consistente",
            },
            {
              en: "Community — many students stay in touch and become real friends",
              pt: "Comunidade — vários alunos ficam em contato e viram amigos",
            },
          ],
        },
        {
          heading: {
            en: "How the groups are organized",
            pt: "Como os grupos são organizados",
          },
          bullets: [
            {
              en: "Maximum 5 students — so everyone speaks in every class",
              pt: "Maximo 5 alunos — para todo mundo falar em toda aula",
            },
            {
              en: "Students placed by level (Foundation, Fluency Builder, or Mastery)",
              pt: "Alunos agrupados por nível (Foundation, Fluency Builder ou Mastery)",
            },
            {
              en: "Fixed weekly time — builds consistency and routine",
              pt: "Horario fixo semanal — cria consistência e rotina",
            },
            {
              en: "New groups open regularly — book a trial to find one that fits you",
              pt: "Grupos novos abrem com frequência — agende uma aula experimental para achar o seu",
            },
          ],
        },
        {
          heading: {
            en: "What a typical class looks like",
            pt: "Como e uma aula típica",
          },
          bullets: [
            {
              en: "Warm-up conversation (5 min) — recap the week in English",
              pt: "Aquecimento (5 min) — recapitulacao da semana em inglês",
            },
            {
              en: "Focused lesson (20 min) — grammar, vocabulary, or reading topic",
              pt: "Aula focada (20 min) — tópico de gramática, vocabulário ou leitura",
            },
            {
              en: "Practice activity (25 min) — pair work, role-play, or discussion",
              pt: "Atividade prática (25 min) — em duplas, role-play ou discussão",
            },
            {
              en: "Wrap-up & Q&A (10 min) — questions, next week's preview",
              pt: "Encerramento & Q&A (10 min) — perguntas, previa da próxima aula",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Students on a tighter budget who still want live human teaching",
          pt: "Alunos com orcamento mais apertado que ainda querem professor humano ao vivo",
        },
        {
          en: "People who learn better alongside others and enjoy discussion",
          pt: "Quem aprende melhor com outras pessoas e curte discussoes",
        },
        {
          en: "Students who can commit to the same weekly time slot",
          pt: "Alunos que conseguem se comprometer com um horário fixo semanal",
        },
        {
          en: "Everyone from beginners to advanced — we have groups at every level",
          pt: "Todos, do iniciante ao avançado — temos grupos em todos os níveis",
        },
      ]}
    />
  );
}
