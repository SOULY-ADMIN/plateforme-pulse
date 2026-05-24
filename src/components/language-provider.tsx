"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isLanguage, languageMeta, languages, translations } from "@/src/lib/i18n";
import type { Language } from "@/src/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => undefined
});

function sourceText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (translations.fr[trimmed] || translations.ar[trimmed] || translations.es[trimmed]) return trimmed;
  for (const dictionary of Object.values(translations)) {
    for (const [source, translated] of Object.entries(dictionary)) {
      if (translated === trimmed) return source;
    }
  }
  return null;
}

function translate(value: string, language: Language) {
  const source = sourceText(value);
  if (!source || language === "en") return source || value;
  return translations[language][source] || source;
}

function translateDocument(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, svg, textarea, input, [data-no-translate], .notranslate")) {
        return NodeFilter.FILTER_REJECT;
      }
      return sourceText(node.textContent || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  textNodes.forEach((node) => {
    const text = node.textContent || "";
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    const nextText = `${leading}${translate(text, language)}${trailing}`;
    if (node.textContent !== nextText) node.textContent = nextText;
  });

  document.querySelectorAll<HTMLElement>("[placeholder], [title], [aria-label], [alt]").forEach((element) => {
    ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (!current) return;
      const source = sourceText(current);
      if (!source) return;
      const nextValue = translate(source, language);
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
    });
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  function persistLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    try {
      localStorage.setItem("pulse_language", nextLanguage);
    } catch {
      // Storage can be unavailable in some embedded previews.
    }
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pulse_language");
      if (isLanguage(stored)) setLanguageState(stored);
    } catch {
      setLanguageState("en");
    }
  }, []);

  useEffect(() => {
    function selectLanguage(event: Event) {
      const target = event.target instanceof Element ? event.target.closest("[data-language-option]") : null;
      if (!target) return;
      const nextLanguage = target.getAttribute("data-language-option");
      if (!isLanguage(nextLanguage)) return;
      event.preventDefault();
      persistLanguage(nextLanguage);
    }

    function selectLanguageWithKeyboard(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;
      selectLanguage(event);
    }

    document.addEventListener("click", selectLanguage, true);
    document.addEventListener("keydown", selectLanguageWithKeyboard, true);
    return () => {
      document.removeEventListener("click", selectLanguage, true);
      document.removeEventListener("keydown", selectLanguageWithKeyboard, true);
    };
  }, []);

  useEffect(() => {
    const meta = languageMeta[language];
    document.documentElement.lang = language;
    document.documentElement.dir = meta.dir;
    document.body.dataset.language = language;
    document.documentElement.classList.add("language-switching");
    translateDocument(language);
    const observer = new MutationObserver(() => translateDocument(language));
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => document.documentElement.classList.remove("language-switching"), 520);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage(nextLanguage) {
      persistLanguage(nextLanguage);
    }
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
