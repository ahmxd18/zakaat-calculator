/**
 * charities.ts
 * Charity organization data - language independent
 * Names, descriptions, and URLs are in English as they represent actual organization names
 */

export interface CharityData {
  id: string;
  name: string;
  description: string;
  categoryKey: "emergencyRelief" | "education" | "foodWater" | "orphans" | "healthcare";
  country: string;
  established: number;
  badge: string;
  accent: "sage" | "blush";
  href: string;
}

export const CHARITIES: CharityData[] = [
  {
    id: "1",
    name: "Islamic Relief",
    description: "Global humanitarian relief providing emergency aid, education, and sustainable development.",
    categoryKey: "emergencyRelief",
    country: "UK",
    established: 1984,
    badge: "Verified",
    accent: "sage",
    href: "https://www.islamic-relief.org",
  },
  {
    id: "2",
    name: "Penny Appeal",
    description: "Poverty relief charity focused on clean water, food, orphan care, and emergency response.",
    categoryKey: "foodWater",
    country: "UK",
    established: 2009,
    badge: "Trusted",
    accent: "blush",
    href: "https://www.pennyappeal.org",
  },
  {
    id: "3",
    name: "Human Appeal",
    description: "International development and relief agency providing aid to vulnerable communities.",
    categoryKey: "emergencyRelief",
    country: "UK",
    established: 1991,
    badge: "Verified",
    accent: "sage",
    href: "https://www.humanappeal.org.uk",
  },
  {
    id: "4",
    name: "Al-Imdaad Foundation",
    description: "Supporting underprivileged communities through education, health, and welfare projects.",
    categoryKey: "education",
    country: "South Africa",
    established: 1992,
    badge: "Trusted",
    accent: "blush",
    href: "https://www.alimdaad.org",
  },
  {
    id: "5",
    name: "Orphans in Need",
    description: "Dedicated to the care, education, and support of orphaned children worldwide.",
    categoryKey: "orphans",
    country: "UK",
    established: 1996,
    badge: "Verified",
    accent: "sage",
    href: "https://www.orphansinneed.org.uk",
  },
  {
    id: "6",
    name: "Syria Relief",
    description: "Delivering life-saving aid to Syrian refugees and families affected by the crisis.",
    categoryKey: "emergencyRelief",
    country: "UK",
    established: 2011,
    badge: "Verified",
    accent: "sage",
    href: "https://www.syriarelief.org.uk",
  },
];
