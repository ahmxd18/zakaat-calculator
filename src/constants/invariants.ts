/**
 * constants.ts
 * Language-independent constants (email, phone, URLs, codes, etc.)
 * These values should NOT be translated.
 */

export const INVARIANT_CONSTANTS = {
  contact: {
    email: "hello@zakaatcalculator.app",
    location: "London, United Kingdom",
    responseTime: "Within 2–3 business days",
  },
  
  social: {
    twitter: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
  
  currencies: ["GBP", "USD", "EUR", "AED", "SAR", "PKR", "BDT", "MYR", "INR", "IDR"] as const,
  
  nisaab: {
    goldGrams: 85,
    silverGrams: 595,
  },
  
  zakaatRate: 2.5,
  
  copyright: {
    year: new Date().getFullYear(),
    entity: "Zakaat Calculator",
  },
} as const;
