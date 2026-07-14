/**
 * content.ts
 * Centralised text content for the Zakaat Calculator app.
 * All user-facing strings live here to enable easy i18n extraction later.
 * To add a new language, duplicate this file and replace the values.
 */

// ── Navigation ─────────────────────────────────────────────────────────────
export const NAV = {
  brand: "Zakaat",
  brandTagline: "Purify Your Wealth",
  links: [
    { label: "Home",       path: "/" },
    { label: "Calculate",  path: "/calculate" },
    { label: "Donate",     path: "/donate" },
    { label: "About",      path: "/about" },
    { label: "References", path: "/references" },
    { label: "Contact",    path: "/contact" },
    { label: "FAQs",       path: "/faqs" },
  ],
  ctaLabel: "Calculate Now",
} as const;

// ── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "Helping Muslims fulfil their obligation with clarity and ease.",
  copyright: `© ${new Date().getFullYear()} Zakaat Calculator. All rights reserved.`,
  disclaimer:
    "This tool is for educational purposes only. Please consult a qualified Islamic scholar for personal rulings.",
  socialLinks: [
    { label: "Twitter / X",  href: "#", icon: "twitter" },
    { label: "Instagram",    href: "#", icon: "instagram" },
    { label: "Facebook",     href: "#", icon: "facebook" },
    { label: "YouTube",      href: "#", icon: "youtube" },
  ],
  quickLinks: [
    { label: "Calculator",  path: "/calculate" },
    { label: "FAQs",        path: "/faqs" },
    { label: "References",  path: "/references" },
    { label: "About",       path: "/about" },
    { label: "Contact",     path: "/contact" },
    { label: "Donate",      path: "/donate" },
  ],
} as const;

// ── Home Page ───────────────────────────────────────────────────────────────
export const HOME = {
  hero: {
    eyebrow: "Bismillah ir-Rahman ir-Rahim",
    heading: "Purify Your Wealth,\nFulfil Your Obligation",
    subheading:
      "Zakaat is one of the Five Pillars of Islam — a divinely mandated act of worship and social welfare. Our calculator helps you fulfil it with precision, ease, and sincerity.",
    cta: "Calculate My Zakaat",
    secondaryCta: "Learn More",
    verse:
      "\"And establish prayer and give Zakah, and whatever good you put forward for yourselves — you will find it with Allah.\"",
    verseRef: "Qur'an 2:110",
  },
  intro: {
    heading: "What is Zakaat?",
    body:
      "Zakaat (also spelled Zakat or Zakat) is the third pillar of Islam — an obligatory annual charity paid by every eligible Muslim whose wealth exceeds the Nisaab threshold. It purifies one's remaining wealth, nurtures gratitude, and redistributes resources to those most in need.",
  },
  features: [
    {
      icon: "calculator",
      title: "Accurate Calculations",
      description:
        "Based on scholarly consensus and the latest gold/silver Nisaab values.",
    },
    {
      icon: "shield-check",
      title: "Scholarly Grounded",
      description:
        "Every formula is referenced against Qur'an, Hadith, and classical Fiqh.",
    },
    {
      icon: "heart-handshake",
      title: "Easy to Donate",
      description:
        "Find trusted charities and fulfil your Zakaat obligation in minutes.",
    },
  ],
  stats: [
    { value: "2.5%", label: "Standard Zakaat rate" },
    { value: "85g", label: "Gold Nisaab (approx.)" },
    { value: "595g", label: "Silver Nisaab (approx.)" },
    { value: "1 in 40", label: "Wealth shared with ummah" },
  ],
} as const;

// ── Calculate Page ──────────────────────────────────────────────────────────
export const CALCULATE = {
  heading: "Calculate Your Zakaat",
  subheading:
    "Enter your assets below and we'll calculate your Zakaat obligation based on the current Nisaab threshold.",
  sections: [
    {
      id: "cash",
      label: "💰 Cash & Bank Savings",
      description: "Cash in hand, current accounts, savings accounts.",
      fields: [
        { id: "cash_on_hand",   label: "Cash on Hand",    placeholder: "0.00" },
        { id: "bank_savings",   label: "Bank Savings",    placeholder: "0.00" },
        { id: "foreign_cash",   label: "Foreign Currency (converted)", placeholder: "0.00" },
      ],
    },
    {
      id: "gold_silver",
      label: "🪙 Gold & Silver",
      description: "Physical gold/silver and gold/silver jewellery held for saving.",
      fields: [
        { id: "gold_grams",     label: "Gold (grams)",   placeholder: "0" },
        { id: "silver_grams",   label: "Silver (grams)", placeholder: "0" },
      ],
    },
    {
      id: "investments",
      label: "📈 Investments & Shares",
      description: "Stocks, shares, investment funds (zakatable portion).",
      fields: [
        { id: "stocks",         label: "Stocks & Shares",        placeholder: "0.00" },
        { id: "crypto",         label: "Cryptocurrency",         placeholder: "0.00" },
        { id: "pension",        label: "Accessible Pension",     placeholder: "0.00" },
      ],
    },
    {
      id: "business",
      label: "🏪 Business Assets",
      description: "Stock/inventory intended for sale, trade receivables.",
      fields: [
        { id: "stock_inventory",label: "Stock / Inventory",      placeholder: "0.00" },
        { id: "receivables",    label: "Money Owed to You",      placeholder: "0.00" },
      ],
    },
    {
      id: "deductions",
      label: "➖ Liabilities & Deductions",
      description: "Short-term debts, bills due within the lunar year.",
      fields: [
        { id: "debts_owed",     label: "Debts You Owe",          placeholder: "0.00" },
        { id: "bills_due",      label: "Bills Due Now",          placeholder: "0.00" },
      ],
    },
  ],
  nisaabNote:
    "Nisaab is calculated using the lower of gold (85g) or silver (595g) value. We update market prices regularly.",
  currencyLabel: "Currency",
  calculateBtn: "Calculate My Zakaat",
  resetBtn: "Reset Form",
} as const;

// ── FAQs Page ───────────────────────────────────────────────────────────────
export const FAQS = {
  heading: "Frequently Asked Questions",
  subheading:
    "Answers to the most common questions about Zakaat — from eligibility to how to pay.",
  items: [
    {
      question: "Who is obligated to pay Zakaat?",
      answer:
        "Every Muslim who is sane, adult (past the age of puberty), free, and possesses wealth above the Nisaab threshold for a complete lunar year (Hawl) is obligated to pay Zakaat. Zakaat is not required of children or those who lack mental capacity.",
    },
    {
      question: "What is the Nisaab threshold?",
      answer:
        "Nisaab is the minimum amount of wealth a Muslim must possess before Zakaat becomes obligatory. It is set at the value of either 85 grams of gold or 595 grams of silver. Scholars differ on which to use; using the silver standard is generally more inclusive and conservative.",
    },
    {
      question: "What is the Hawl (lunar year)?",
      answer:
        "The Hawl is the Islamic lunar year (354 days). Your wealth must have remained above the Nisaab for a complete Hawl before Zakaat becomes due. The Zakaat year begins on the day your wealth first reaches the Nisaab.",
    },
    {
      question: "What is the Zakaat rate?",
      answer:
        "The standard Zakaat rate on most wealth (gold, silver, cash, trade goods, investments) is 2.5% (1/40th). Agricultural produce and livestock have different rates based on classical Fiqh rulings.",
    },
    {
      question: "Is Zakaat due on my house or car?",
      answer:
        "No. Personal use assets such as your primary home, vehicle(s) used for personal transport, furniture, and clothing are exempt from Zakaat. Zakaat is only due on liquid or liquid-equivalent wealth above the Nisaab.",
    },
    {
      question: "Who are the eligible recipients of Zakaat?",
      answer:
        "The Qur'an (9:60) specifies eight categories: the poor (Al-Fuqaraa), the needy (Al-Masaakeen), Zakaat administrators (Amileen), those whose hearts are to be reconciled, those in bondage (Ar-Riqaab), debtors (Al-Gharimeen), in the cause of Allah (Fi Sabilillah), and the wayfarer (Ibn As-Sabeel).",
    },
    {
      question: "Can I pay Zakaat in advance?",
      answer:
        "Yes. Hanafi, Maliki, Shafi'i, and Hanbali scholars all permit paying Zakaat in advance (before the Hawl is complete), as long as the Nisaab has been reached and the wealth is anticipated to remain above it.",
    },
    {
      question: "Is Zakaat due on pension funds?",
      answer:
        "This depends on the type of pension and scholarly opinion. Generally, if you have immediate access and control over the funds, Zakaat may be due on the accessible portion. Consult a qualified scholar for your specific circumstances.",
    },
    {
      question: "What is the difference between Zakaat and Sadaqah?",
      answer:
        "Zakaat is obligatory (Fard) — a specific amount due on specific types of wealth. Sadaqah is voluntary charity with no fixed amount or type. Zakaat cannot be given to just anyone; it has prescribed recipients, whereas Sadaqah can be given to anyone.",
    },
    {
      question: "Can Zakaat be given to non-Muslims?",
      answer:
        "The majority of scholars hold that obligatory Zakaat should only be given to Muslims. However, voluntary Sadaqah may be given to non-Muslims. The exception is the category of 'those whose hearts are to be reconciled', where some scholars permit giving to non-Muslims.",
    },
  ],
} as const;

// ── About Page ──────────────────────────────────────────────────────────────
export const ABOUT = {
  heading: "Our Mission",
  subheading: "Empowering Muslims to fulfil Zakaat with confidence and clarity.",
  mission:
    "We built this tool because Zakaat — despite being a pillar of Islam — can feel confusing in the modern financial landscape. Investments, cryptocurrencies, pensions, business assets: the classical texts didn't address these directly, and Muslims deserve clear, scholarly-grounded guidance.",
  vision:
    "Our vision is a world where every Muslim can calculate, understand, and fulfil their Zakaat obligation without barriers — and where Zakaat's transformative potential as an instrument of social justice is fully realised.",
  values: [
    {
      icon: "book-open",
      title: "Scholarly Integrity",
      description:
        "Every calculation method is grounded in Qur'an, authentic Hadith, and scholarly consensus (Ijma). We cite our sources transparently.",
    },
    {
      icon: "accessibility",
      title: "Accessibility",
      description:
        "Complex Fiqh, made simple. We translate nuanced jurisprudential positions into clear, actionable guidance for everyday Muslims.",
    },
    {
      icon: "shield",
      title: "Trust & Transparency",
      description:
        "We don't sell your data. We don't profit from your Zakaat. This is a service built for the community, by the community.",
    },
    {
      icon: "globe-2",
      title: "Global Reach",
      description:
        "Designed for Muslims worldwide — supporting multiple currencies, localised Nisaab values, and region-specific scholarly opinions.",
    },
  ],
  team: [
    { name: "Dr. Aisha Rahman", role: "Islamic Finance Scholar", initials: "AR" },
    { name: "Yusuf Al-Ameen",   role: "Lead Developer",          initials: "YA" },
    { name: "Fatima Khalid",    role: "UX & Product Design",     initials: "FK" },
    { name: "Ibrahim Osei",     role: "Fiqh Researcher",         initials: "IO" },
  ],
} as const;

// ── Contact Page ────────────────────────────────────────────────────────────
export const CONTACT = {
  heading: "Get in Touch",
  subheading:
    "Have a question, correction, or suggestion? We'd love to hear from you.",
  form: {
    namePlaceholder:    "Your full name",
    emailPlaceholder:   "your@email.com",
    subjectPlaceholder: "e.g. Zakaat calculation question",
    messagePlaceholder: "Write your message here...",
    subjectOptions: [
      "General Enquiry",
      "Calculation Question",
      "Scholarly / Fiqh Correction",
      "Technical Issue",
      "Partnership / Collaboration",
      "Other",
    ],
    submitLabel: "Send Message",
  },
  info: [
    { icon: "mail",       label: "Email",    value: "hello@zakaatcalculator.app" },
    { icon: "map-pin",    label: "Based in", value: "London, United Kingdom" },
    { icon: "clock",      label: "Response", value: "Within 2–3 business days" },
  ],
} as const;

// ── Donate Page ─────────────────────────────────────────────────────────────
export const DONATE = {
  heading: "Give Your Zakaat",
  subheading:
    "Connect your Zakaat with trusted, transparent charities that reach those most in need.",
  note:
    "We do not process payments directly. All donations go through the charities' own secure platforms. We receive no commission.",
  categories: ["All", "Emergency Relief", "Education", "Food & Water", "Orphans", "Healthcare"],
  charities: [
    {
      id: 1,
      name: "Islamic Relief",
      category: "Emergency Relief",
      description:
        "One of the world's largest Islamic charities, working in 40+ countries with full Zakaat-eligible programmes.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "1984",
      href: "#",
      accent: "sage",
    },
    {
      id: 2,
      name: "Human Appeal",
      category: "Emergency Relief",
      description:
        "Delivering emergency aid and sustainable development across conflict zones and vulnerable communities.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "1991",
      href: "#",
      accent: "blush",
    },
    {
      id: 3,
      name: "Penny Appeal",
      category: "Food & Water",
      description:
        "Providing clean water, food, shelter, and education to the world's poorest communities.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "2009",
      href: "#",
      accent: "sage",
    },
    {
      id: 4,
      name: "Orphans in Need",
      category: "Orphans",
      description:
        "Dedicated to supporting orphaned children and vulnerable families across 30+ countries.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "2015",
      href: "#",
      accent: "blush",
    },
    {
      id: 5,
      name: "Helping Hands",
      category: "Healthcare",
      description:
        "Delivering medical aid, surgeries, and healthcare to those who cannot afford it.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "2003",
      href: "#",
      accent: "sage",
    },
    {
      id: 6,
      name: "Al-Mustafa Welfare Trust",
      category: "Education",
      description:
        "Empowering communities through education, skills training, and sustainable livelihoods.",
      badge: "Zakaat Eligible",
      country: "UK / Global",
      established: "2001",
      href: "#",
      accent: "blush",
    },
  ],
} as const;

// ── References Page ─────────────────────────────────────────────────────────
export const REFERENCES = {
  heading: "References & Sources",
  subheading:
    "Every ruling and calculation in this tool is grounded in primary Islamic sources. We believe in full transparency.",
  categories: [
    {
      id: "quran",
      label: "Qur'an",
      icon: "book",
      refs: [
        {
          ref:    "Qur'an 2:177",
          arabic: "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ",
          text:
            "\"And gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveller, those who ask [for help], and for freeing slaves.\"",
          note:   "Establishes the principle of obligatory giving from wealth.",
        },
        {
          ref:    "Qur'an 2:110",
          arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ",
          text:
            "\"And establish prayer and give Zakah, and whatever good you put forward for yourselves — you will find it with Allah.\"",
          note:   "One of the most frequently cited Zakaat injunctions in the Qur'an.",
        },
        {
          ref:    "Qur'an 9:60",
          arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ",
          text:
            "\"Zakah expenditures are only for the poor and for the needy and for those employed to collect [Zakah] and for bringing hearts together [for Islam] and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveller.\"",
          note:   "The definitive verse specifying the eight categories of Zakaat recipients.",
        },
        {
          ref:    "Qur'an 9:103",
          arabic: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ",
          text:
            "\"Take from their wealth a charity by which you purify them and cause them increase, and invoke [Allah's blessings] upon them.\"",
          note:   "The purification aspect of Zakaat; the root for the word 'Zakaat' (زكاة) means both purity and growth.",
        },
      ],
    },
    {
      id: "hadith",
      label: "Hadith",
      icon: "scroll",
      refs: [
        {
          ref:    "Sahih al-Bukhari 1496",
          arabic: "",
          text:
            "\"Islam is built upon five pillars: testifying that there is no god except Allah and that Muhammad is the Messenger of Allah, establishing prayer, paying Zakaat, performing Hajj, and fasting in Ramadan.\"",
          note:   "Narrated by Ibn Umar (RA). Establishes Zakaat as one of the Five Pillars.",
        },
        {
          ref:    "Sahih al-Bukhari 1395",
          arabic: "",
          text:
            "\"[The Prophet ﷺ] sent Mu'adh to Yemen and said: 'Inform them that Allah has made Zakaat obligatory upon them, to be taken from their wealthy and given to their poor.'\"",
          note:   "The basis for the redistributive purpose of Zakaat and the Zakaat on trade goods.",
        },
        {
          ref:    "Sunan Abu Dawud 1573",
          arabic: "",
          text:
            "\"There is no Zakaat on wealth until a year passes over it.\"",
          note:   "Narrated by Ali (RA). Primary source for the Hawl (lunar year) condition.",
        },
        {
          ref:    "Musnad Ahmad 2/12",
          arabic: "",
          text:
            "\"There is no Zakaat on less than five awqiyyah of silver.\"",
          note:   "Narrated by Abu Sa'eed al-Khudri (RA). Basis for the silver Nisaab threshold.",
        },
      ],
    },
    {
      id: "fiqh",
      label: "Classical Fiqh",
      icon: "library",
      refs: [
        {
          ref:    "Al-Mabsut — Imam al-Sarakhsi (Hanafi)",
          arabic: "",
          text:
            "The Hanafi school holds that Zakaat is due on gold, silver, trade goods, livestock, and agricultural produce. The silver Nisaab (595g) is the primary threshold used by Hanafi jurists.",
          note:   "Vol. 2, Chapter on Zakaat. Al-Sarakhsi (d. 1090 CE).",
        },
        {
          ref:    "Al-Mudawwana — Imam Malik (Maliki)",
          arabic: "",
          text:
            "The Maliki school's foundational text codifying rulings on Zakaat, including Zakaat al-Fitr and the treatment of business assets.",
          note:   "Compiled by Sahnun from the teachings of Imam Malik (d. 795 CE).",
        },
        {
          ref:    "Al-Umm — Imam al-Shafi'i (Shafi'i)",
          arabic: "",
          text:
            "Imam al-Shafi'i's comprehensive legal compendium detailing Zakaat conditions, Nisaab, and recipients, including the ruling that gold Nisaab (85g) is the primary threshold.",
          note:   "Imam al-Shafi'i (d. 820 CE).",
        },
        {
          ref:    "Al-Mughni — Ibn Qudama (Hanbali)",
          arabic: "",
          text:
            "The encyclopaedic Hanbali Fiqh reference covering all major rulings on Zakaat, including Zakaat on debts, investments, and jointly owned assets.",
          note:   "Ibn Qudama al-Maqdisi (d. 1223 CE).",
        },
      ],
    },
    {
      id: "contemporary",
      label: "Contemporary Scholarship",
      icon: "graduation-cap",
      refs: [
        {
          ref:    "Fiqh al-Zakaat — Yusuf al-Qaradawi",
          arabic: "",
          text:
            "The most comprehensive modern treatment of Zakaat jurisprudence, covering contemporary financial instruments including stocks, bonds, salaries, and rental income.",
          note:   "English translation available. An essential reference for modern Zakaat calculations.",
        },
        {
          ref:    "AAOIFI Shari'a Standard No. 35 (Zakaat)",
          arabic: "",
          text:
            "The Accounting and Auditing Organisation for Islamic Financial Institutions' standard on Zakaat, widely adopted by Islamic banks and financial institutions.",
          note:   "Bahrain, 2010. Reference for institutional Zakaat calculation methods.",
        },
        {
          ref:    "IslamQA / Islamweb Fatawa Database",
          arabic: "",
          text:
            "A curated database of fatwas from verified scholars on contemporary Zakaat questions including cryptocurrencies, pensions, and joint assets.",
          note:   "Used as a cross-reference for edge cases in this calculator.",
        },
      ],
    },
  ],
} as const;
