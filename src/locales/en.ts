/**
 * en.ts
 * English translations (default language)
 */

export const en = {
  meta: {
    language: "English",
    dir: "ltr" as const,
  },
  
  nav: {
    brand: "Zakaat",
    brandTagline: "Purify Your Wealth",
    links: {
      home: "Home",
      calculate: "Calculate",
      donate: "Donate",
      about: "About",
      references: "References",
      contact: "Contact",
      faqs: "FAQs",
    },
    ctaLabel: "Calculate Now",
    languageLabel: "Language",
  },
  
  footer: {
    tagline: "Helping Muslims fulfil their obligation with clarity and ease.",
    copyright: "All rights reserved.",
    disclaimer: "This tool is for educational purposes only. Please consult a qualified Islamic scholar for personal rulings.",
    disclaimerTitle: "Disclaimer",
    quickLinksTitle: "Quick Links",
    madeWith: "Made with",
    forUmmah: "for the Ummah",
  },
  
  home: {
    hero: {
      eyebrow: "Bismillah ir-Rahman ir-Rahim",
      heading: "Purify Your Wealth,\nFulfil Your Obligation",
      subheading: "Zakaat is one of the Five Pillars of Islam — a divinely mandated act of worship and social welfare. Our calculator helps you fulfil it with precision, ease, and sincerity.",
      cta: "Calculate My Zakaat",
      secondaryCta: "Learn More",
      verse: "\"And establish prayer and give Zakah, and whatever good you put forward for yourselves — you will find it with Allah.\"",
      verseRef: "Qur'an 2:110",
    },
    intro: {
      eyebrow: "The Third Pillar",
      heading: "What is Zakaat?",
      body: "Zakaat (also spelled Zakat or Zakat) is the third pillar of Islam — an obligatory annual charity paid by every eligible Muslim whose wealth exceeds the Nisaab threshold. It purifies one's remaining wealth, nurtures gratitude, and redistributes resources to those most in need.",
      cta: "Start Calculating",
    },
    zakaat: {
      arabic: "زَكَاة",
      meaning: "From the Arabic root",
      root: "zakā",
      definition: "purity, growth, and blessing",
      meaningConnector: "meaning",
      badges: {
        rate: "2.5% rate",
        goldNisaab: "85g gold Nisaab",
        silverNisaab: "595g silver Nisaab",
      },
    },
    features: {
      eyebrow: "Why use our calculator",
      heading: "Clarity for a Sacred Obligation",
      subheading: "We've combined scholarly research with modern UX to make Zakaat calculation as clear and easy as possible.",
      accurate: {
        title: "Accurate Calculations",
        description: "Based on scholarly consensus and the latest gold/silver Nisaab values.",
      },
      scholarly: {
        title: "Scholarly Grounded",
        description: "Every formula is referenced against Qur'an, Hadith, and classical Fiqh.",
      },
      easy: {
        title: "Easy to Donate",
        description: "Find trusted charities and fulfil your Zakaat obligation in minutes.",
      },
    },
    stats: {
      rate: { value: "2.5%", label: "Standard Zakaat rate" },
      gold: { value: "85g", label: "Gold Nisaab (approx.)" },
      silver: { value: "595g", label: "Silver Nisaab (approx.)" },
      share: { value: "1 in 40", label: "Wealth shared with ummah" },
    },
    ctaBanner: {
      heading: "Ready to calculate your Zakaat?",
      subheading: "It takes only a few minutes. Enter your assets, and we'll calculate exactly what you owe.",
    },
  },
  
  calculate: {
    heading: "Calculate Your Zakaat",
    subheading: "Enter your assets below and we'll calculate your Zakaat obligation based on the current Nisaab threshold.",
    currencyLabel: "Currency",
    currencyNote: "All values in selected currency",
    resetBtn: "Reset Form",
    
    sections: {
      cash: {
        label: "Cash & Bank Savings",
        description: "Cash in hand, current accounts, savings accounts.",
        fields: {
          cashOnHand: "Cash on Hand",
          bankSavings: "Bank Savings",
          foreignCash: "Foreign Currency (converted)",
        },
      },
      goldSilver: {
        label: "Gold & Silver",
        description: "Enter stored/non-worn metal separately from permissible personal-use jewellery worn regularly. Put non-exempt or investment jewellery in the stored/non-worn field.",
        fields: {
          goldGrams: "Stored / non-worn gold (grams)",
          wornGoldGrams: "Worn personal-use gold (grams)",
          silverGrams: "Stored / non-worn silver (grams)",
          wornSilverGrams: "Worn personal-use silver (grams)",
        },
      },
      investments: {
        label: "Investments & Shares",
        description: "Enter the market value of each investment category.",
        fields: {
          stocks: "Trading stocks & shares",
          incomeStocks: "Income shares (market value; 25% counted)",
          crypto: "Cryptocurrency",
          pension: "Accessible pension portion",
        },
      },
      business: {
        label: "Business Assets",
        description: "Trade inventory, recoverable receivables, and property held for resale.",
        fields: {
          stockInventory: "Stock / Inventory",
          receivables: "Money Owed to You",
          tradeRealEstate: "Real estate held for trade",
        },
      },
      deductions: {
        label: "Liabilities & Deductions",
        description: "Enter only debts and bills relevant to the selected school.",
        fields: {
          debtsOwed: "Eligible debts you owe",
          billsDue: "Bills Due Now",
        },
      },
    },
    
    nisaabNote: "The Nisāb threshold uses the selected gold or silver standard. Its initial recommendation follows the selected madhab unless you choose an override.",
    
    nisaabStandard: {
      label: "Nisaab Standard",
      note: "Scholars differ on which standard to apply. Consult your madhab.",
      lower: "Lower (Conservative)",
      lowerDesc: "Whichever of gold or silver is worth less — most inclusive",
      gold: "Gold (85g)",
      goldDesc: "Preferred by Shafi'i & Hanbali schools",
      silver: "Silver (595g)",
      silverDesc: "Default Hanafi position — broader coverage",
    },

    schoolRules: {
      default: "Default (No School) keeps the original calculation: lower gold/silver Nisāb, all entered jewellery included, debt deductions applied, trade real estate included, and no hawl history gate.",
      hanafi: "Hanafi: worn gold and silver count; eligible immediate debts are deducted; a mid-year Nisāb dip does not reset the hawl. The calculator uses the lower Nisāb by default.",
      maliki: "Maliki: worn personal-use jewellery is excluded; eligible debts are deducted; a Nisāb dip resets the hawl. The calculator uses the lower Nisāb by default.",
      shafii: "Shafi'i: worn personal-use jewellery is excluded; debt deductions are not applied; a Nisāb dip resets the hawl. Gold Nisāb is selected by default.",
      hanbali: "Hanbali: worn personal-use jewellery is excluded; eligible debts are deducted; a Nisāb dip generally resets the hawl (brief dips may be treated differently). Trade real estate is included.",
    },

    hawl: {
      title: "Hawl (lunar-year) eligibility",
      description: "Enter the start date for the hawl being checked. A lunar year is approximated as 354 days; where the selected school resets the hawl after a dip, use the date Nisāb was reached again.",
      startDate: "Hawl start date (when wealth reached Nisāb)",
      dippedBelowNisaab: "My zakatable wealth fell below Nisāb during this hawl",
      hanafiNote: "For Hanafi calculations, use the date Nisāb was first reached for this hawl. A mid-year dip is ignored if Nisāb is met at the start and now.",
    },
    
    prices: {
      liveLabel: "Live Nisaab Prices",
      liveNote: "Updated hourly from market data",
      goldPerGram: "Gold per gram",
      silverPerGram: "Silver per gram",
      loading: "Fetching live prices…",
      error: "Could not load prices — using fallback values",
      fallbackNote: "Using fallback prices. Live data unavailable.",
      lastUpdated: "Last updated",
      refresh: "Refresh prices",
    },
    
    summary: {
      title: "Your Zakaat Summary",
      subtitle: "Calculated in real-time as you fill in the form",
      totalAssets: "Total Assets",
      totalDeductions: "Deductions applied",
      deductionsNotApplied: "Your reported debts were not subtracted because the selected school does not generally permit debt deductions.",
      netWealth: "Net Zakatable Wealth",
      nisaabThreshold: "Nisaab Threshold",
      hawl: "Hawl status",
      hawlIncomplete: "A full lunar year has not elapsed — no Zakaat due yet",
      hawlInvalid: "Enter a valid date when your wealth reached Nisāb",
      hawlReset: "Nisāb dip resets the hawl — no Zakaat due yet",
      hawlComplete: "Complete",
      zakaatDue: "Zakaat Due",
      belowNisaab: "Below Nisaab threshold — no Zakaat due",
      zakaatRate: "2.5% of your net zakatable wealth",
      payNowBtn: "Pay Zakaat Now →",
      disclaimer: "This is an estimate. Consult a qualified Islamic scholar for specific rulings.",
    },
    
    placeholders: {
      amount: "0.00",
      grams: "0",
    },
  },
  
  faqs: {
    heading: "Frequently Asked Questions",
    subheading: "Answers to the most common questions about Zakaat — from eligibility to how to pay.",
    knowledgeBase: "Knowledge Base",
    stillHaveQuestion: "Still have a question?",
    stillHaveQuestionText: "Our team and scholars are here to help. Reach out and we'll get back to you.",
    contactUs: "Contact Us",
    
    items: [
      {
        question: "Who is obligated to pay Zakaat?",
        answer: "Every eligible Muslim whose zakatable wealth reaches Nisāb may be obligated to pay Zakaat after a hawl, subject to the applicable school’s rules. Children and those who lack mental capacity are treated differently by the schools. Consult a qualified scholar for a personal ruling.",
      },
      {
        question: "What is the Nisaab threshold?",
        answer: "Nisaab is the minimum amount of wealth a Muslim must possess before Zakaat becomes obligatory. It is set at the value of either 85 grams of gold or 595 grams of silver. Scholars differ on which to use; using the silver standard is generally more inclusive and conservative.",
      },
      {
        question: "What is the Hawl (lunar year)?",
        answer: "The Hawl is approximately 354 days, beginning when zakatable wealth reaches Nisāb. School rules differ: the Hanafi position generally does not reset the year for a temporary mid-year dip if Nisāb is met at both endpoints; Maliki, Shafi'i, and Hanbali positions generally reset it after a dip. The calculator asks for your hawl history when a school is selected; consult a qualified scholar for your circumstances.",
      },
      {
        question: "What is the Zakaat rate?",
        answer: "The standard Zakaat rate on most wealth (gold, silver, cash, trade goods, investments) is 2.5% (1/40th). Agricultural produce and livestock have different rates based on classical Fiqh rulings.",
      },
      {
        question: "Is Zakaat due on my house or car?",
        answer: "No. Personal use assets such as your primary home, vehicle(s) used for personal transport, furniture, and clothing are exempt from Zakaat. Zakaat is only due on liquid or liquid-equivalent wealth above the Nisaab.",
      },
      {
        question: "Who are the eligible recipients of Zakaat?",
        answer: "The Qur'an (9:60) specifies eight categories: the poor (Al-Fuqaraa), the needy (Al-Masaakeen), Zakaat administrators (Amileen), those whose hearts are to be reconciled, those in bondage (Ar-Riqaab), debtors (Al-Gharimeen), in the cause of Allah (Fi Sabilillah), and the wayfarer (Ibn As-Sabeel).",
      },
      {
        question: "Can I pay Zakaat in advance?",
        answer: "Yes. Hanafi, Maliki, Shafi'i, and Hanbali scholars all permit paying Zakaat in advance (before the Hawl is complete), as long as the Nisaab has been reached and the wealth is anticipated to remain above it.",
      },
      {
        question: "Is Zakaat due on pension funds?",
        answer: "This depends on the type of pension and scholarly opinion. Generally, if you have immediate access and control over the funds, Zakaat may be due on the accessible portion. Consult a qualified scholar for your specific circumstances.",
      },
      {
        question: "What is the difference between Zakaat and Sadaqah?",
        answer: "Zakaat is obligatory (Fard) — a specific amount due on specific types of wealth. Sadaqah is voluntary charity with no fixed amount or type. Zakaat cannot be given to just anyone; it has prescribed recipients, whereas Sadaqah can be given to anyone.",
      },
      {
        question: "Can Zakaat be given to non-Muslims?",
        answer: "The majority of scholars hold that obligatory Zakaat should only be given to Muslims. However, voluntary Sadaqah may be given to non-Muslims. The exception is the category of 'those whose hearts are to be reconciled', where some scholars permit giving to non-Muslims.",
      },
    ],
  },
  
  about: {
    eyebrow: "Our Purpose",
    heading: "Our Mission",
    subheading: "Empowering Muslims to fulfil Zakaat with confidence and clarity.",
    mission: "We built this tool because Zakaat — despite being a pillar of Islam — can feel confusing in the modern financial landscape. Investments, cryptocurrencies, pensions, business assets: the classical texts didn't address these directly, and Muslims deserve clear, scholarly-grounded guidance.",
    vision: "Our vision is a world where every Muslim can calculate, understand, and fulfil their Zakaat obligation without barriers — and where Zakaat's transformative potential as an instrument of social justice is fully realised.",
    
    missionTitle: "Our Mission",
    visionTitle: "Our Vision",
    valuesEyebrow: "What guides us",
    valuesHeading: "Our Core Values",
    
    values: {
      scholarly: {
        title: "Scholarly Integrity",
        description: "Every calculation method is grounded in Qur'an, authentic Hadith, and scholarly consensus (Ijma). We cite our sources transparently.",
      },
      accessibility: {
        title: "Accessibility",
        description: "Complex Fiqh, made simple. We translate nuanced jurisprudential positions into clear, actionable guidance for everyday Muslims.",
      },
      trust: {
        title: "Trust & Transparency",
        description: "We don't sell your data. We don't profit from your Zakaat. This is a service built for the community, by the community.",
      },
      global: {
        title: "Global Reach",
        description: "Designed for Muslims worldwide — supporting multiple currencies, localised Nisaab values, and region-specific scholarly opinions.",
      },
    },
    
    teamEyebrow: "The people behind it",
    teamHeading: "Meet the Team",
    teamSubheading: "A cross-disciplinary group of scholars, developers, and designers united by a shared purpose.",
    teamPlaceholderWarning: "⚠️ Placeholder Content: Team member information below is placeholder content pending real team details. Do not treat these as real individuals.",
    
    disclaimerWarning: "⚠️ This calculator is provided for educational purposes only. All rulings are based on mainstream scholarly positions. For personal Zakaat queries, please consult a qualified Islamic scholar.",
  },
  
  contact: {
    eyebrow: "Get in Touch",
    heading: "Get in Touch",
    subheading: "Have a question, correction, or suggestion? We'd love to hear from you.",
    contactInfoTitle: "Contact Information",
    
    info: {
      email: "Email",
      location: "Based in",
      response: "Response",
    },
    
    form: {
      formComingSoonTitle: "Form Coming Soon",
      formComingSoonText: "This contact form is not yet connected to a backend service. Please reach out via email directly at",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      subjectLabel: "Subject",
      messageLabel: "Message",
      required: "*",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your@email.com",
      subjectPlaceholder: "Select a subject…",
      messagePlaceholder: "Write your message here...",
      submitLabel: "Send Message",
      disabledNotice: "Form currently disabled — email us directly instead.",
      privacyNotice: "By submitting this form, you agree to our privacy policy. We never share your data.",
      successTitle: "Message sent!",
      successText: "Thank you for reaching out. We aim to respond within 2–3 business days.",
      
      subjectOptions: {
        general: "General Enquiry",
        calculation: "Calculation Question",
        scholarly: "Scholarly / Fiqh Correction",
        technical: "Technical Issue",
        partnership: "Partnership / Collaboration",
        other: "Other",
      },
    },
    
    scholarlyNote: "🕌 Scholarly Queries",
    scholarlyNoteText: "For detailed Fiqh questions or corrections to our methodology, please mention \"Scholarly Query\" in the subject field and we'll route your message to our Fiqh committee.",
  },
  
  donate: {
    eyebrow: "Zakaat Eligible Charities",
    heading: "Give Your Zakaat",
    subheading: "Connect your Zakaat with trusted, transparent charities that reach those most in need.",
    note: "We do not process payments directly. All donations go through the charities' own secure platforms. We receive no commission.",
    
    filterLabel: "Filter:",
    donateBtn: "Donate",
    country: "Country",
    established: "Est.",
    
    categories: {
      all: "All",
      emergencyRelief: "Emergency Relief",
      education: "Education",
      foodWater: "Food & Water",
      orphans: "Orphans",
      healthcare: "Healthcare",
    },
    
    noResults: "No charities in this category yet.",
    noResultsSubtext: "Check back soon — we're adding more.",
    
    ctaHeading: "Know a trusted Zakaat-eligible charity?",
    ctaText: "We're always looking to expand our verified charity list. Suggest a charity for review.",
    ctaBtn: "Suggest a Charity",
    
    placeholderWarning: "⚠️ Note: Listed charities are placeholder examples pending verification and partnership agreements. We do not endorse any organization until formal vetting is complete. Always verify charity credentials independently.",
  },
  
  references: {
    eyebrow: "Scholarly Sources",
    heading: "References & Sources",
    subheading: "Every ruling and calculation in this tool is grounded in primary Islamic sources. We believe in full transparency.",
    
    categories: {
      quran: "Qur'an",
      hadith: "Hadith",
      fiqh: "Classical Fiqh",
      contemporary: "Contemporary Scholarship",
    },
    
    methodologyHeading: "Our Methodology",
    methodologyText: "Selecting a madhab applies its Nisāb recommendation and the school-specific rules shown on the calculator, including jewellery, debt, and hawl treatment. Nisāb can be overridden, and Default (No School) remains available. These calculations are estimates based on a research reference; consult a qualified scholar for personal rulings.",
    methodologyLink: "Spot an error or have a scholarly correction?",
    methodologyLinkText: "Contact our Fiqh committee →",
    
    verificationWarning: "⚠️ Verification Notice: All Hadith citations (book and number) are pending scholarly verification against verified sources (e.g., sunnah.com). Do not rely on exact citation numbers until independently confirmed.",
  },
  
  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    homeBtn: "Back to Home",
    backBtn: "Go Back",
  },
  
  common: {
    loading: "Loading...",
    error: "Error",
    tryAgain: "Try Again",
    close: "Close",
    open: "Open",
    search: "Search",
    placeholder: "—",
    scroll: "Scroll",
  },
} as const;

type Widen<T> =
  T extends "ltr" | "rtl" ? "ltr" | "rtl"
    : T extends string ? string
      : T extends number ? number
        : T extends boolean ? boolean
          : T extends readonly (infer Item)[] ? readonly Widen<Item>[]
            : T extends object ? { [Key in keyof T]: Widen<T[Key]> }
              : T

export type Translations = Widen<typeof en>
