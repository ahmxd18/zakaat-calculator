/**
 * constants.ts
 * Language-independent constants (email, phone, URLs, codes, etc.)
 * These values should NOT be translated.
 */

import { SUPPORTED_CURRENCIES } from "../../shared/prices.mjs"

export const INVARIANT_CONSTANTS = {
  contact: {
    email: "hello@zakaatcalculator.app",
    location: "Hyderabad, India",
  },
  
  social: {
    twitter: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
  
  currencies: SUPPORTED_CURRENCIES,

  copyright: {
    year: new Date().getFullYear(),
    entity: "Zakaat Calculator",
  },
} as const;
