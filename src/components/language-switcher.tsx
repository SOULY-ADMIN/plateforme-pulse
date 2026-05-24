"use client";

import { languageMeta, languages } from "@/src/lib/i18n";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label="Language">
      {languages.map((item) => (
        <button
          aria-pressed={language === item}
          className={language === item ? "active" : ""}
          data-language-option={item}
          key={item}
          onClick={() => setLanguage(item)}
          title={languageMeta[item].name}
          type="button"
        >
          {languageMeta[item].label}
        </button>
      ))}
    </div>
  );
}
