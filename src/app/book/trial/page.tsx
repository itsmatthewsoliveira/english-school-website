"use client";

import DetailPage from "../../components/DetailPage";

export default function TrialPage() {
  return (
    <DetailPage
      eyebrow={{ en: "Free trial class", pt: "Aula experimental gratuita" }}
      tag={{ en: "Free · 30 min · No obligation", pt: "Gratis · 30 min · Sem compromisso" }}
      title={{
        en: "Book your free 30-minute trial class with Teacher Josi",
        pt: "Agende sua aula experimental gratuita de 30 min com a Teacher Josi",
      }}
      subtitle={{
        en: "Meet Teacher Josi, get an honest assessment of your current English level, and leave with a clear, personalized study plan — all in 30 minutes. Zero cost, zero pressure.",
        pt: "Conheca a Teacher Josi, receba uma avaliacao honesta do seu nivel atual de ingles e saia com um plano de estudos personalizado — tudo em 30 min. Zero custo, zero pressao.",
      }}
      priceNote={{
        en: "30 minutes · 100% online · In English or Portuguese — whichever is more comfortable",
        pt: "30 minutos · 100% online · Em ingles ou portugues — o que for mais confortavel",
      }}
      heroImage={{
        src: "/images/hero-class.png",
        alt: {
          en: "Teacher Josi welcoming a new student to their first free trial class",
          pt: "Teacher Josi recebendo um novo aluno na primeira aula experimental gratuita",
        },
      }}
      intent="trial"
      primaryCtaLabel={{
        en: "Book free trial on WhatsApp",
        pt: "Agendar aula gratis no WhatsApp",
      }}
      sections={[
        {
          heading: { en: "What happens in the trial", pt: "O que acontece na experimental" },
          bullets: [
            {
              en: "Quick, friendly chat so Teacher Josi understands your goals and background",
              pt: "Uma conversa rapida e amigavel para a Teacher Josi entender seus objetivos e historia",
            },
            {
              en: "Informal level assessment — speaking, listening, grammar, vocabulary",
              pt: "Avaliacao informal de nivel — fala, escuta, gramatica, vocabulario",
            },
            {
              en: "A mini-lesson so you can feel the class style and teaching approach",
              pt: "Uma mini-aula para voce sentir o estilo e a abordagem do ensino",
            },
            {
              en: "Honest feedback on where you are and what you need to reach your goals",
              pt: "Feedback honesto sobre onde voce esta e o que precisa para atingir seus objetivos",
            },
            {
              en: "A suggested study plan with recommended course, frequency, and timeline",
              pt: "Um plano de estudos sugerido com curso recomendado, frequencia e prazos",
            },
          ],
        },
        {
          heading: { en: "How to book", pt: "Como agendar" },
          bullets: [
            {
              en: "Click the WhatsApp button — a ready-to-send message is pre-filled",
              pt: "Clique no botao do WhatsApp — ja vem com uma mensagem pronta",
            },
            {
              en: "Teacher Josi replies within a few hours with available times",
              pt: "A Teacher Josi responde em poucas horas com horarios disponiveis",
            },
            {
              en: "Pick a time that works — weekday mornings, evenings, or Saturdays",
              pt: "Escolha um horario — manha, noite ou sabado durante a semana",
            },
            {
              en: "You'll get a Google Meet or Zoom link 10 minutes before your class",
              pt: "Voce recebe o link do Google Meet ou Zoom 10 min antes da aula",
            },
          ],
        },
        {
          heading: { en: "What you'll need", pt: "O que voce vai precisar" },
          bullets: [
            {
              en: "A computer, tablet, or smartphone with a webcam and microphone",
              pt: "Um computador, tablet ou smartphone com webcam e microfone",
            },
            {
              en: "Stable internet — WiFi or 4G/5G both work fine",
              pt: "Internet estavel — WiFi ou 4G/5G funcionam bem",
            },
            {
              en: "A quiet spot where you can speak out loud for 30 minutes",
              pt: "Um lugar tranquilo onde voce possa falar em voz alta por 30 min",
            },
            {
              en: "No prior preparation needed — come as you are",
              pt: "Nao precisa preparar nada — venha como voce esta",
            },
          ],
        },
      ]}
      whoItsFor={[
        {
          en: "Anyone curious about live online English classes",
          pt: "Qualquer um com curiosidade sobre aulas de ingles ao vivo online",
        },
        {
          en: "Beginners who want a gentle, pressure-free introduction",
          pt: "Iniciantes que querem uma introducao sem pressao",
        },
        {
          en: "Intermediate students comparing schools and teachers",
          pt: "Intermediarios comparando escolas e professores",
        },
        {
          en: "Advanced students who want an honest read on their real level",
          pt: "Avancados que querem uma leitura honesta do nivel real",
        },
      ]}
    />
  );
}
