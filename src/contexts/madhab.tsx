/**
 * madhab.tsx
 * Context for the user's selected school of Fiqh (madhab).
 * Persists to localStorage. Provides the selected madhab globally.
 */
import { createContext, useContext, useState, type ReactNode } from "react"
import { MADHABS, type Madhab, type MadhabMeta } from "../constants/madhab"

export { MADHABS }
export type { Madhab, MadhabMeta }

// ── Context ──────────────────────────────────────────────────────────────────

interface MadhabContextValue {
  madhab: Madhab
  madhabMeta: MadhabMeta
  setMadhab: (madhab: Madhab) => void
}

const MadhabContext = createContext<MadhabContextValue | undefined>(undefined)

const STORAGE_KEY = "zakaat_madhab"

function getInitialMadhab(): Madhab {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && MADHABS.some((m) => m.code === stored)) return stored as Madhab
  } catch (error) {
    console.error("Unable to read the saved madhab preference.", error)
  }
  return "default"
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function MadhabProvider({ children }: { children: ReactNode }) {
  const [madhab, setMadhabState] = useState<Madhab>(getInitialMadhab)

  const setMadhab = (m: Madhab) => {
    setMadhabState(m)
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch (error) {
      console.error("Unable to save the madhab preference.", error)
    }
  }

  const madhabMeta = MADHABS.find((m) => m.code === madhab)
  if (!madhabMeta) throw new Error(`No madhab configuration found for "${madhab}".`)

  return (
    <MadhabContext.Provider value={{ madhab, madhabMeta, setMadhab }}>
      {children}
    </MadhabContext.Provider>
  )
}

// ── Hooks ────────────────────────────────────────────────────────────────────

export function useMadhab() {
  const ctx = useContext(MadhabContext)
  if (!ctx) throw new Error("useMadhab must be used within MadhabProvider")
  return ctx
}
