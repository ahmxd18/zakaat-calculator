export type Madhab = "default" | "hanafi" | "maliki" | "shafii" | "hanbali"

export type NisaabStandard = "lower" | "gold" | "silver"

export interface MadhabMeta {
  code: Madhab
  name: string
  founder: string
  regions: string
  defaultNisaabStandard: NisaabStandard
  debtDeductionPermitted: boolean
  jewelleryZakatable: boolean
  hawlResetsOnDip: boolean
  requiresHawl: boolean
  tradeRealEstateZakatable: boolean
}

export const MADHAB_RULES: Record<Madhab, MadhabMeta> = {
  default: {
    code: "default",
    name: "Default (No School)",
    founder: "—",
    regions: "Universal",
    defaultNisaabStandard: "lower",
    debtDeductionPermitted: true,
    jewelleryZakatable: true,
    hawlResetsOnDip: false,
    requiresHawl: false,
    tradeRealEstateZakatable: true,
  },
  hanafi: {
    code: "hanafi",
    name: "Hanafi",
    founder: "Imam Abu Hanifa (d. 767 CE)",
    regions: "South Asia, Turkey, Central Asia",
    defaultNisaabStandard: "lower",
    debtDeductionPermitted: true,
    jewelleryZakatable: true,
    hawlResetsOnDip: false,
    requiresHawl: true,
    tradeRealEstateZakatable: true,
  },
  maliki: {
    code: "maliki",
    name: "Maliki",
    founder: "Imam Malik ibn Anas (d. 795 CE)",
    regions: "North & West Africa",
    defaultNisaabStandard: "lower",
    debtDeductionPermitted: true,
    jewelleryZakatable: false,
    hawlResetsOnDip: true,
    requiresHawl: true,
    tradeRealEstateZakatable: true,
  },
  shafii: {
    code: "shafii",
    name: "Shafi'i",
    founder: "Imam al-Shafi'i (d. 820 CE)",
    regions: "Southeast Asia, East Africa, Egypt",
    defaultNisaabStandard: "gold",
    debtDeductionPermitted: false,
    jewelleryZakatable: false,
    hawlResetsOnDip: true,
    requiresHawl: true,
    tradeRealEstateZakatable: true,
  },
  hanbali: {
    code: "hanbali",
    name: "Hanbali",
    founder: "Imam Ahmad ibn Hanbal (d. 855 CE)",
    regions: "Saudi Arabia, Qatar",
    defaultNisaabStandard: "lower",
    debtDeductionPermitted: true,
    jewelleryZakatable: false,
    hawlResetsOnDip: true,
    requiresHawl: true,
    tradeRealEstateZakatable: true,
  },
}

export const MADHABS = Object.values(MADHAB_RULES)
