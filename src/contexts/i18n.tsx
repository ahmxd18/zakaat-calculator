import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import { en, type Translations } from '../locales/en'
export type Language = 'en' | 'ar' | 'ur' | 'ur-rm'
export type Direction = 'ltr' | 'rtl'
interface I18nContextValue {
  language: Language
  translations: Translations
  direction: Direction
  setLanguage: (language: Language) => void
}
const I18nContext = createContext<I18nContextValue | undefined>(undefined)
const STORAGE_KEY = 'zakaat_language'
const loaders = {
  en: async () => en,
  ar: async () => (await import('../locales/ar')).ar,
  ur: async () => (await import('../locales/ur')).ur,
  'ur-rm': async () => (await import('../locales/ur-rm')).urRm,
}
function validLanguage(value: unknown): value is Language {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(loaders, value)
}
function initialLanguage(): Language {
  try { const saved = localStorage.getItem(STORAGE_KEY); if (validLanguage(saved)) return saved } catch { /* Preference storage is optional. */ }
  return 'en'
}
export function I18nProvider({children}: {children: ReactNode}) {
  const [requested, setRequested] = useState<Language>(initialLanguage)
  const [active, setActive] = useState<{ language: Language; translations: Translations }>({language:'en',translations:en})
  const [failed, setFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    let current = true
    setFailed(false)
    void loaders[requested]().then(translations => {
      if (current) setActive({ language: requested, translations })
    }).catch(() => { if (current) setFailed(true) })
    return () => { current = false }
  }, [requested, retry])
  const direction = active.translations.meta.dir
  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = active.language === 'ur-rm' ? 'ur-Latn' : active.language
  }, [direction, active.language])
  const setLanguage = useCallback((language: Language) => {
    if (!validLanguage(language)) return
    setRequested(language)
    try { localStorage.setItem(STORAGE_KEY, language) } catch { /* Session selection still works. */ }
  }, [])
  const value = useMemo(() => ({ ...active, direction, setLanguage }), [active, direction, setLanguage])
  return <I18nContext.Provider value={value}>
    {failed && <p role="alert" className="p-3 text-center">{active.translations.common.languageLoadError} <button type="button" onClick={() => setRetry(previous => previous + 1)}>{active.translations.common.tryAgain}</button></p>}
    {children}
  </I18nContext.Provider>
}
export function useTranslation() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useTranslation must be used within I18nProvider')
  return value
}
export function useT() { return useTranslation().translations }
