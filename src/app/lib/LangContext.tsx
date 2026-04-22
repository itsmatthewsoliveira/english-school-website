"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "./whatsapp";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, pt: string) => string;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved language on mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theway-lang")) as Lang | null;
    if (saved === "pt") {
      setLangState("pt");
      document.documentElement.setAttribute("data-lang", "pt");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("theway-lang", l);
      document.documentElement.setAttribute("data-lang", l);
    }
  }, []);

  const t = useCallback(
    (en: string, pt: string) => (lang === "pt" ? pt : en),
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang must be used inside <LangProvider>");
  return v;
}
