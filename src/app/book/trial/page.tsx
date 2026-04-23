"use client";

import DetailPage from "../../components/DetailPage";

export default function TrialPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Free trial class", pt: "Aula experimental gratuita" }}
      tag={{ en: "Free · 30 min · No obligation", pt: "Gratis · 30 min · Sem compromisso" }}
      title={{
        en: "Book your free 30-minute trial class",
        pt: "Agende sua aula experimental gratuita de 30 min",
      }}
      subtitle={{
        en: "Meet your teacher, get an honest assessment of your current English level, and leave with a clear, personalized study plan — all in 30 minutes. Zero cost, zero pressure.",
        pt: "Conheça seu professor, receba uma avaliação honesta do seu nível atual de inglês e saia com um plano de estudos personalizado — tudo em 30 min. Zero custo, zero pressão.",
      }}
      priceNote={{
        en: "30 minutes · 100% online · In English or Portuguese — whichever is more comfortable",
        pt: "30 minutos · 100% online · Em inglês ou portugues — o que for mais confortavel",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "A teacher at The Way welcoming a new student to their first free trial class",
          pt: "Um professor da The Way recebendo um novo aluno na primeira aula experimental gratuita",
        },
      }}
      intent="trial"
      bookingFormClass="trial"
      primaryCtaLabel={{
        en: "Book free trial on WhatsApp",
        pt: "Agendar aula gratis no WhatsApp",
      }}
      sections={[
        {
          heading: { en: "What happens in the trial", pt: "O que acontece na experimental" },
          bullets: [
            {
              en: "Quick, friendly chat so your teacher understands your goals and background",
              pt: "Uma conversa rápida e amigável para seu professor entender seus objetivos e história",
            },
            {
              en: "Informal level assessment — speaking, listening, grammar, vocabulary",
              pt: "Avaliacao informal de nível — fala, escuta, gramática, vocabulário",
            },
            {
              en: "A mini-lesson so you can feel the class style and teaching approach",
              pt: "Uma mini-aula para você sentir o estilo e a abordagem do ensino",
            },
            {
              en: "Honest feedback on where you are and what you need to reach your goals",
              pt: "Feedback honesto sobre onde você está e o que precisa para atingir seus objetivos",
            },
            {
              en: "A suggested study plan with recommended course, frequency, and timeline",
              pt: "Um plano de estudos sugerido com curso recomendado, frequência e prazos",
            },
          ],
        },
        {
          heading: { en: "How to book", pt: "Como agendar" },
          bullets: [
            {
              en: "Fill out the booking form on this page — takes about 60 seconds",
              pt: "Preencha o formulário de reserva nesta pagina — leva cerca de 60 segundos",
            },
            {
              en: "One of our teachers replies within a few hours with available times",
              pt: "Um dos nossos professores responde em poucas horas com horários disponíveis",
            },
            {
              en: "Pick a time that works — weekday mornings, evenings, or Saturdays",
              pt: "Escolha um horário — manhã, noite ou sábado durante a semana",
            },
            {
              en: "You'll get a Google Meet or Zoom link 10 minutes before your class",
              pt: "Você recebe o link do Google Meet ou Zoom 10 min antes da aula",
            },
          ],
        },
        {
          heading: { en: "What you'll need", pt: "O que você vai precisar" },
          bullets: [
            {
              en: "A computer, tablet, or smartphone with a webcam and microphone",
              pt: "Um computador, tablet ou smartphone com webcam e microfone",
            },
            {
              en: "Stable internet — WiFi or 4G/5G both work fine",
              pt: "Internet estável — WiFi ou 4G/5G funcionam bem",
            },
            {
              en: "A quiet spot where you can speak out loud for 30 minutes",
              pt: "Um lugar tranquilo onde você possa falar em voz alta por 30 min",
            },
            {
              en: "No prior preparation needed — come as you are",
              pt: "Não precisa preparar nada — venha como você está",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Anyone curious about live online English classes",
          pt: "Qualquer um com curiosidade sobre aulas de inglês ao vivo online",
        },
        {
          en: "Beginners who want a gentle, pressure-free introduction",
          pt: "Iniciantes que querem uma introdução sem pressão",
        },
        {
          en: "Intermediate students comparing schools and teachers",
          pt: "Intermediarios comparando escolas e professores",
        },
        {
          en: "Advanced students who want an honest read on their real level",
          pt: "Avancados que querem uma leitura honesta do nível real",
        },
      ]}
    />
  );
}
