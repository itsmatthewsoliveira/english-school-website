"use client";

import DetailPage from "../../components/DetailPage";

export default function IndividualBookingPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Individual class", pt: "Aula individual" }}
      tag={{
        en: "1-on-1 · 60 min · Fastest progress",
        pt: "Individual · 60 min · Progresso mais rapido",
      }}
      title={{
        en: "Individual 1-on-1 classes — built around you",
        pt: "Aulas individuais — feitas sob medida pra voce",
      }}
      subtitle={{
        en: "Every minute focused on you. Teacher Josi builds the curriculum around your goals, schedule, and pace — no group slowing you down, no cookie-cutter plan.",
        pt: "Cada minuto focado em voce. A Teacher Josi monta o curriculo ao redor dos seus objetivos, horarios e ritmo — sem grupo te segurando, sem plano pronto.",
      }}
      priceNote={{
        en: "60-minute live classes · Weekly, 2x, or 3x per week — whatever fits",
        pt: "Aulas ao vivo de 60 min · Semanal, 2x ou 3x por semana — o que couber",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "Teacher Josi in a 1-on-1 online English class with a student",
          pt: "Teacher Josi em uma aula individual de ingles online com um aluno",
        },
      }}
      intent="individual"
      primaryCtaLabel={{
        en: "Chat on WhatsApp to book",
        pt: "Fale no WhatsApp para agendar",
      }}
      sections={[
        {
          heading: {
            en: "Why students choose 1-on-1",
            pt: "Por que alunos escolhem a individual",
          },
          bullets: [
            {
              en: "3–4x faster progress than group classes — you speak the entire hour",
              pt: "Progresso 3–4x mais rapido que em grupo — voce fala a hora toda",
            },
            {
              en: "Curriculum built around your specific goals — work, travel, exams, conversation",
              pt: "Curriculo focado nos seus objetivos — trabalho, viagem, provas, conversacao",
            },
            {
              en: "Flexible scheduling — easy to move a class if work or life changes",
              pt: "Agenda flexivel — facil remarcar se trabalho ou vida mudar",
            },
            {
              en: "Immediate, personalized feedback on every mistake",
              pt: "Feedback imediato e personalizado em cada erro",
            },
            {
              en: "Safe space to speak — no fear of being judged by classmates",
              pt: "Ambiente seguro para falar — sem medo de ser julgado por colegas",
            },
          ],
        },
        {
          heading: {
            en: "How the first month works",
            pt: "Como funciona o primeiro mes",
          },
          bullets: [
            {
              en: "Week 1: level assessment + goal-setting + study plan draft",
              pt: "Semana 1: avaliacao de nivel + definicao de metas + rascunho do plano",
            },
            {
              en: "Week 2–4: dive into the course chosen for you (Foundation, Fluency, or Mastery)",
              pt: "Semana 2–4: imersao no curso escolhido (Foundation, Fluency ou Mastery)",
            },
            {
              en: "End of month 1: progress check + adjustments to the plan",
              pt: "Final do mes 1: check de progresso + ajustes no plano",
            },
            {
              en: "Ongoing: you always know exactly what you're working on and why",
              pt: "Continuo: voce sempre sabe exatamente o que esta trabalhando e por que",
            },
          ],
        },
        {
          heading: {
            en: "Scheduling & logistics",
            pt: "Agendamento e logistica",
          },
          bullets: [
            {
              en: "Classes Mon–Sat, with morning, afternoon, and evening slots",
              pt: "Aulas de segunda a sabado, com horarios de manha, tarde e noite",
            },
            {
              en: "Held live on Google Meet or Zoom — you pick",
              pt: "Ao vivo no Google Meet ou Zoom — voce escolhe",
            },
            {
              en: "Reschedule up to 24h before with no penalty",
              pt: "Remarcar ate 24h antes sem penalidade",
            },
            {
              en: "Ask about package deals — students who commit to 2–3x per week get better rates",
              pt: "Pergunte sobre pacotes — alunos 2–3x por semana tem preco melhor",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Students who want results fast and are willing to invest",
          pt: "Alunos que querem resultado rapido e estao dispostos a investir",
        },
        {
          en: "Professionals with specific work-English needs",
          pt: "Profissionais com necessidades especificas de ingles no trabalho",
        },
        {
          en: "People preparing for a move, exam, interview, or trip",
          pt: "Pessoas se preparando para mudanca, prova, entrevista ou viagem",
        },
        {
          en: "Anyone who feels shy speaking in front of a group",
          pt: "Quem tem vergonha de falar na frente de um grupo",
        },
      ]}
    />
  );
}
