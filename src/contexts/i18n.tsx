/**
 * i18n.tsx
 * Internationalization context and hook
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, type Translations } from '../locales/en';
import { ar } from '../locales/ar';
import { ur } from '../locales/ur';
import { urRm } from '../locales/ur-rm';

export type Language = 'en' | 'ar' | 'ur' | 'ur-rm';
export type Direction = 'ltr' | 'rtl';

interface I18nContextValue {
  language: Language;
  translations: Translations;
  direction: Direction;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'zakaat_language';

const translations: Record<Language, Translations> = {
  en,
  ar,
  ur,
  'ur-rm': urRm,
};

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in translations) {
      return stored as Language;
    }
  } catch {}
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize language from localStorage after mount
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setIsInitialized(true);
  }, []);
  
  const currentTranslations = translations[language];
  const direction = currentTranslations.meta.dir;
  
  // Update document direction
  useEffect(() => {
    if (!isInitialized) return;
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language, isInitialized]);
  
  // Persist language choice
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
    }
  };
  
  return (
    <I18nContext.Provider
      value={{
        language,
        translations: currentTranslations,
        direction,
        setLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

// Convenience hook for just getting translations
export function useT() {
  const { translations } = useTranslation();
  return translations;
}
