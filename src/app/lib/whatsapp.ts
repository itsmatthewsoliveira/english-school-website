// WhatsApp link builder for The Way English School.
// Phone: +55 19 98886-9805 (school contact)
//
// CTAs that deep-link to WhatsApp act as a *fallback* channel — the
// on-site booking form at /book/* is the primary path. These messages
// are kept generic (not addressed to a specific teacher) because the
// school has a team of teachers; the right one will respond based on
// the student's needs and schedule.

export const WA_PHONE = "5519888869805";

export type Lang = "en" | "pt";

export type WAIntent =
  | "general"
  | "trial"
  | "individual"
  | "group"
  | "foundation"
  | "fluency-builder"
  | "mastery";

const MESSAGES: Record<WAIntent, { en: string; pt: string }> = {
  general: {
    en: "Hi! I'm interested in learning English with The Way. Can we chat?",
    pt: "Oi! Tenho interesse em aprender ingles com a The Way. Podemos conversar?",
  },
  trial: {
    en: "Hi! I'd like to book a FREE trial class (30 min) with level assessment. When is the next available time?",
    pt: "Oi! Queria agendar uma AULA EXPERIMENTAL gratuita (30 min) com avaliacao de nivel. Qual o proximo horario disponivel?",
  },
  individual: {
    en: "Hi! I'd like to book an INDIVIDUAL 1-on-1 English class (60 min). Could you send me times and pricing?",
    pt: "Oi! Quero agendar uma AULA INDIVIDUAL de ingles (60 min). Pode me mandar horarios e precos?",
  },
  group: {
    en: "Hi! I'm interested in joining a small GROUP English class (max 5 students, 60 min). What groups do you have open?",
    pt: "Oi! Tenho interesse em entrar em uma AULA EM GRUPO (maximo 5 alunos, 60 min). Quais grupos estao abertos?",
  },
  foundation: {
    en: "Hi! I'm a beginner and want to learn about the FOUNDATION ENGLISH course. Can we chat?",
    pt: "Oi! Sou iniciante e quero saber mais sobre o curso INGLES BASICO (Foundation English). Podemos conversar?",
  },
  "fluency-builder": {
    en: "Hi! I'm interested in the FLUENCY BUILDER (intermediate) course. How do I get started?",
    pt: "Oi! Tenho interesse no curso CONSTRUTOR DE FLUENCIA (intermediario). Como faco para comecar?",
  },
  mastery: {
    en: "Hi! I'd like to learn more about the MASTERY PROGRAM (advanced English). Could you send details?",
    pt: "Oi! Queria saber mais sobre o PROGRAMA DE DOMINIO (ingles avancado). Pode me mandar detalhes?",
  },
};

export function waLink(intent: WAIntent, lang: Lang): string {
  const text = MESSAGES[intent][lang];
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}
