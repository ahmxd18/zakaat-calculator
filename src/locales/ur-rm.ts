/**
 * ur-rm.ts
 * Urdu transliteration (Latin alphabet, LTR)
 */

import type { Translations } from './en';

export const urRm: Translations = {
  meta: {
    language: "Urdu (Roman)",
    dir: "ltr",
  },
  
  nav: {
    brand: "Zakaat",
    brandTagline: "Apni Daulat Ko Paak Karein",
    links: {
      home: "Ghar",
      calculate: "Hisaab Karein",
      donate: "Khairat Karein",
      about: "Hamare Baare Mein",
      references: "Hawale",
      contact: "Rabta Karein",
      faqs: "Sawalat",
    },
    ctaLabel: "Ab Hisaab Karein",
    languageLabel: "Zubaan",
  },
  
  footer: {
    tagline: "Musalmaanon ki madad kar rahe hain apni zimmedari wazeh aur aasaan tareeqe se ada karne mein.",
    copyright: "Tamaam haqooq mehfooz hain.",
    disclaimer: "Yeh tool sirf talimi maqasid ke liye hai. Shakhsi ahkaam ke liye kisi mujaaz Islamic scholar se mashwara karein.",
    disclaimerTitle: "Dast-bardari",
    quickLinksTitle: "Tez Links",
    madeWith: "Banaya gaya",
    forUmmah: "Ummah ke liye",
  },
  
  home: {
    hero: {
      eyebrow: "Bismillah ir-Rahman ir-Rahim",
      heading: "Apni Daulat Ko Paak Karein,\nApni Zimmedari Ada Karein",
      subheading: "Zakaat Islam ke Paanch Arkan mein se ek hai — ek farz ibadat aur samaji rehnumai. Hamara calculator aapko isey drust, aasaan, aur ikhlaas se ada karne mein madad karta hai.",
      cta: "Mera Zakaat Hisaab Karein",
      secondaryCta: "Mazeed Janein",
      verse: "\"Aur namaz qaim karo aur zakaat do, aur jo kuch tumhara apne liye aage bhejna hai tumhe Allah ke paas milega.\"",
      verseRef: "Qur'an 2:110",
    },
    intro: {
      eyebrow: "Teesra Rukn",
      heading: "Zakaat Kya Hai?",
      body: "Zakaat Islam ka teesra rukn hai — har saal adaa kiya jane wala wajib sadqa jo har musalman par farz hai jis ki daulat nisaab se zyada ho. Yeh baqi daulat ko paak karta hai, shukr ki tarbiyat karta hai, aur zarooratmandon tak maal pohanchata hai.",
      cta: "Hisaab Shuru Karein",
    },
    zakaat: {
      arabic: "زَکٰوة",
      meaning: "Arabi jad se",
      root: "zakā",
      definition: "paakizagi, taraqqi, aur barkat",
      meaningConnector: "matlab",
      badges: {
        rate: "2.5% ki dar",
        goldNisaab: "85g sone ki nisaab",
        silverNisaab: "595g chaandi ki nisaab",
      },
    },
    features: {
      eyebrow: "Hamara calculator kyun istemaal karein",
      heading: "Ek Muqaddas Zimmedari Ke Liye Wazaahat",
      subheading: "Humne ilmi tehqeeq ko jadeed UX ke saath milaya hai taake zakaat ka hisaab jitna wazeh aur aasaan ho sake banaya jaye.",
      accurate: {
        title: "Sahi Hisaab",
        description: "Ulamaa ki ittifaq aur taza sone/chaandi ki nisaab qeematon par mabni.",
      },
      scholarly: {
        title: "Shari Bunyadon Par",
        description: "Har formula Quran, Hadees, aur purani Fiqh se murajaat kiya gaya hai.",
      },
      easy: {
        title: "Aasan Khairat",
        description: "Qabile aitbaar khairat ke idaron ko dhoondein aur apna zakaat minute mein ada karein.",
      },
    },
    stats: {
      rate: { value: "2.5%", label: "Qiyasi zakaat ki dar" },
      gold: { value: "85g", label: "Sone ki nisaab (taqreeban)" },
      silver: { value: "595g", label: "Chaandi ki nisaab (taqreeban)" },
      share: { value: "1 mein se 40", label: "Ummah ke saath baanti gayi daulat" },
    },
    ctaBanner: {
      heading: "Apna zakaat hisaab karne ke liye tayyar hain?",
      subheading: "Sirf kuch minute lagte hain. Apne maal daalein, aur hum aapke liye theek raqam nikaal denge.",
    },
  },
  
  calculate: {
    heading: "Apna Zakaat Hisaab Karein",
    subheading: "Neeche apne maal daalein aur hum aapki zakaat ki zimmedari maujuda nisaab ke mutabiq hisaab kar denge.",
    currencyLabel: "Currency",
    currencyNote: "Tamaam qeemtein muntakhib currency mein",
    resetBtn: "Reset Karein",
    
    sections: {
      cash: {
        label: "💰 Naqdi Aur Bank Bachat",
        description: "Haath mein naqdi, jaari accounts, bachat accounts.",
        fields: {
          cashOnHand: "Haath Mein Naqdi",
          bankSavings: "Bank Bachat",
          foreignCash: "Baharla Currency (tabdeel shuda)",
        },
      },
      goldSilver: {
        label: "🪙 Sona Aur Chaandi",
        description: "Haqeeqi sona/chaandi aur bachat ke liye rakhe gaye zevar.",
        fields: {
          goldGrams: "Sona (grams)",
          silverGrams: "Chaandi (grams)",
        },
      },
      investments: {
        label: "📈 Sarmaayakari Aur Shares",
        description: "Stocks, shares, sarmaayakari funds (zakaat wala hissa).",
        fields: {
          stocks: "Stocks Aur Shares",
          crypto: "Cryptocurrency",
          pension: "Qabil-e-Rasaai Pension",
        },
      },
      business: {
        label: "🏪 Tijarat Ke Maal",
        description: "Farookht ke liye stock/maal, tijarat ke qarzay.",
        fields: {
          stockInventory: "Stock / Maal",
          receivables: "Aapko Milne Wala Paisa",
        },
      },
      deductions: {
        label: "➖ Zimmedariyan Aur Katootiyan",
        description: "Mukhtasir muddat ke qarzay, qamri saal mein adaa hone wale bills.",
        fields: {
          debtsOwed: "Aap Par Qarz",
          billsDue: "Ab Adaa Hone Wale Bills",
        },
      },
    },
    
    nisaabNote: "Nisaab sone (85g) ya chaandi (595g) ki kam qeemat se hisaab kiya jata hai. Hum bazaar ki qeemtein muntazim tor par update karte hain.",
    
    summary: {
      title: "Aapka Zakaat Ka Khulasa",
      subtitle: "Form bharte waqt real-time mein hisaab kiya jata hai",
      totalAssets: "Kul Maal",
      totalDeductions: "Kul Katootiyan",
      netWealth: "Saaf Zakaat Wali Daulat",
      nisaabThreshold: "Nisaab Ki Had",
      zakaatDue: "Wajib Zakaat",
      belowNisaab: "Nisaab ki had se kam — koi zakaat wajib nahi",
      zakaatRate: "Aapki saaf zakaat wali daulat ka 2.5%",
      payNowBtn: "Ab Zakaat Ada Karein →",
      disclaimer: "Yeh andaza hai. Khaas ahkaam ke liye kisi mujaaz Islamic scholar se mashwara karein.",
    },
    
    placeholders: {
      amount: "0.00",
      grams: "0",
    },
  },
  
  faqs: {
    heading: "Aam Sawalat",
    subheading: "Zakaat ke baare mein sabse aam sawaalat ke jawaabaat — ahliyet se lekar ada karne tak.",
    knowledgeBase: "Ilm Ka Khazana",
    stillHaveQuestion: "Abhi bhi koi sawal hai?",
    stillHaveQuestionText: "Hamari team aur ulamaa madad ke liye hazir hain. Rabta karein aur hum aapko jawab denge.",
    contactUs: "Hum Se Rabta Karein",
    
    items: [
      {
        question: "Zakaat ada karne ki zimmedari kis par hai?",
        answer: "Har musalman jo samajhdar, baligh (buloogh ki umar ko pohanchne ke baad), azaad hai, aur nisaab se zyada daulat ek mukammal qamri saal (hawl) ke liye rakhta hai us par zakaat farz hai. Zakaat bachon ya dimaaghi ahliyyat na rakhne walon par farz nahi.",
      },
      {
        question: "Nisaab ki had kya hai?",
        answer: "Nisaab woh kam se kam maal hai jo ek musalman ke paas hona chahiye zakaat farz hone se pehle. Yeh ya to 85 gram sone ya 595 gram chaandi ki qeemat par muqarrar hai. Ulamaa is mein ikhtilaf rakhte hain ke kaunsa istemal kiya jaye; chaandi ka mayar aam tor par zyada shamil aur mehfooz hai.",
      },
      {
        question: "Hawl (qamri saal) kya hai?",
        answer: "Hawl Islami qamri saal hai (354 din). Aapki daulat nisaab se oopar ek mukammal hawl tak rehni chahiye zakaat wajib hone se pehle. Zakaat ka saal us din se shuru hota hai jab aapki daulat pehli baar nisaab tak pohanchti hai.",
      },
      {
        question: "Zakaat ki dar kya hai?",
        answer: "Zyada tar daulat (sona, chaandi, naqdi, tijarat ka maal, sarmaayakari) par qiyasi zakaat ki dar 2.5% (1/40) hai. Kheti ki paydawar aur maweshi ke liye purani Fiqh ki bunyadon par mukhtalif darein hain.",
      },
      {
        question: "Kya mere ghar ya gaadi par zakaat wajib hai?",
        answer: "Nahi. Shakhsi istemaal ke maal jaise aapka bunyadi ghar, shakhsi safar ke liye gaadi(yan), furniture, aur kapde zakaat se muaf hain. Zakaat sirf nisaab se zyada rawan ya rawan ke barabar daulat par wajib hai.",
      },
      {
        question: "Zakaat ke mustahiq kaun hain?",
        answer: "Quran (9:60) aath qismon ka zikar karta hai: fuqara, masakeen, zakaat par kaam karne wale, jinke dil jodne hain, ghulamon ki azaadi, qarzdar, Allah ki raah mein, aur musafir.",
      },
      {
        question: "Kya zakaat peshgi ada ki ja sakti hai?",
        answer: "Haan. Hanafi, Maliki, Shafi'i, aur Hanbali ulamaa sab zakaat peshgi ada karne ki ijazat dete hain (hawl mukammal hone se pehle), jab tak nisaab tak pohanchai gayi ho aur daulat ke us se zyada rehne ki tawaqqu ho.",
      },
      {
        question: "Kya pension funds par zakaat wajib hai?",
        answer: "Yeh pension ki qism aur ulamaa ki rai par nirbhar karta hai. Aam tor par, agar aapko funds tak fauri rasaai aur control hai, to qabil-e-rasaai hisse par zakaat wajib ho sakti hai. Apne khaas halaat ke liye kisi mujaaz scholar se mashwara karein.",
      },
      {
        question: "Zakaat aur Sadqa mein kya farq hai?",
        answer: "Zakaat farz (wajib) hai — khaas qismon ki daulat par ek muqarrar raqam. Sadqa ikhtiyari hai bina kisi muqarrar raqam ya qism ke. Zakaat kisi ko bhi nahi di ja sakti; iske muqarrar mustahiq hain, jabke sadqa kisi ko bhi di ja sakti hai.",
      },
      {
        question: "Kya zakaat ghair muslims ko di ja sakti hai?",
        answer: "Jumhoor ulamaa ka khayal hai ke farz zakaat sirf musalmaanon ko di jani chahiye. Lekin ikhtiyari sadqa ghair muslims ko di ja sakti hai. Mustasna 'jinke dil jodne hain' ka giroh hai, jahan kuch ulamaa ghair muslims ko dene ki ijazat dete hain.",
      },
    ],
  },
  
  about: {
    eyebrow: "Hamara Maqsad",
    heading: "Hamara Mission",
    subheading: "Musalmaanon ko aitmaad aur wazahat ke saath zakaat ada karne ki taqat dena.",
    mission: "Humne yeh tool is liye banaya kyunke zakaat — Islam ka rukn hone ke bawajood — aaj ke mali manzar mein mushkil lag sakti hai. Sarmaayakari, cryptocurrencies, pensions, tijarat ke maal: purani kitabon ne in ko seedha bayaan nahi kiya, aur musalman wazeh, shari bunyadon par mabni rehnumai ke mustahiq hain.",
    vision: "Hamara tasawwur ek duniya hai jahan har musalman apni zakaat ki zimmedari bina rukaawat ke hisaab kar sake, samajh sake, aur ada kar sake — aur jahan zakaat ki samaji insaaf ke aala ke tor par tabdeeli ki salahiyat poori tarah se haqeeqat bane.",
    
    missionTitle: "Hamara Mission",
    visionTitle: "Hamara Tasawwur",
    valuesEyebrow: "Jo hamein rahnumai karta hai",
    valuesHeading: "Hamare Bunyadi Usool",
    
    values: {
      scholarly: {
        title: "Ilmi Diyaanat",
        description: "Har hisaab ka tareeqa Quran, sahih Hadees, aur ulamaa ki ittifaq mein bunyadon rakhta hai. Hum apne hawale saaf tor par zikar karte hain.",
      },
      accessibility: {
        title: "Qabil-e-Rasaai",
        description: "Paichida Fiqh, aasan banaya gaya. Hum bareek fiqhi mawaqif ko wazeh, qabil-e-amal rehnumai mein aam musalmaanon ke liye tarjuma karte hain.",
      },
      trust: {
        title: "Aitmaad Aur Wazahat",
        description: "Hum aapka data nahi bechte. Hum aapki zakaat se faida nahi uthate. Yeh khadmat jamaaat ke liye jamaaat ki taraf se banai gayi hai.",
      },
      global: {
        title: "Aalmi Rasaai",
        description: "Poori duniya ke musalmaanon ke liye dizain kiya gaya — mukhtalif currencies, maqami nisaab ki qeemtein, aur ilaqaai khaas ilmi raaye ko support karta hai.",
      },
    },
    
    teamEyebrow: "Peeche wale log",
    teamHeading: "Team Se Milein",
    teamSubheading: "Ulamaa, developers, aur designers ka ek mukhtalif majmua jo ek mushtarka maqsad se juda hai.",
    teamPlaceholderWarning: "⚠️ Placeholder Content: Neeche team ke aazon ki maloomaat placeholder content hai haqeeqi team ki tafseel ka intezar hai. In ko haqeeqi ashkhaas ki tarah na samjhein.",
    
    disclaimerWarning: "⚠️ Yeh calculator sirf talimi maqasid ke liye muhaiya kiya gaya hai. Tamaam ahkaam mainstream ilmi mawaqif par mabni hain. Shakhsi zakaat ke sawaalaat ke liye, kisi mujaaz Islamic scholar se mashwara karein.",
  },
  
  contact: {
    eyebrow: "Hum Se Rabta Karein",
    heading: "Hum Se Rabta Karein",
    subheading: "Koi sawal, islah, ya mashwara hai? Hum aap se sunna pasand karenge.",
    contactInfoTitle: "Rabte Ki Maloomaat",
    
    info: {
      email: "Email",
      location: "Hamara Markaz",
      response: "Jawab",
    },
    
    form: {
      formComingSoonTitle: "Form Jald Aa Raha Hai",
      formComingSoonText: "Yeh rabta form abhi kisi backend service se nahi juda. Baraahe meharbani seedha email par rabta karein",
      nameLabel: "Mukammal Naam",
      emailLabel: "Email Address",
      subjectLabel: "Mauzu",
      messageLabel: "Paigham",
      required: "*",
      namePlaceholder: "Aapka mukammal naam",
      emailPlaceholder: "your@email.com",
      subjectPlaceholder: "Ek mauzu chune...",
      messagePlaceholder: "Yahan apna paigham likhein...",
      submitLabel: "Paigham Bhejein",
      disabledNotice: "Form abhi band hai — hamein seedha email karein.",
      privacyNotice: "Is form ko jama karke, aap hamari privacy policy se ittifaq karte hain. Hum kabhi aapka data share nahi karte.",
      
      subjectOptions: {
        general: "Aam Istefsaar",
        calculation: "Hisaab Ka Sawal",
        scholarly: "Ilmi / Fiqhi Islah",
        technical: "Takneeki Masla",
        partnership: "Shirkat / Taaun",
        other: "Doosra",
      },
    },
    
    scholarlyNote: "🕌 Ilmi Sawaalat",
    scholarlyNoteText: "Tafsili Fiqh ke sawaalaat ya hamare manhaj ki islah ke liye, baraahe meharbani mauzu ke khaane mein \"Ilmi Sawal\" ka zikar karein aur hum aapka paigham apni Fiqh committee tak pohanchaenge.",
  },
  
  donate: {
    eyebrow: "Zakaat Ke Mustahiq Khairat Ke Idare",
    heading: "Apna Zakaat Dein",
    subheading: "Apni zakaat ko qabile aitbaar, saaf khairat ke idaron se jodein jo sabse zyada zarooratmandon tak pohanchte hain.",
    note: "Hum seedha payments nahi karte. Tamaam khairat khairat ke idaron ke apne mehfooz platforms ke zariye jati hai. Hamein koi commission nahi milta.",
    
    filterLabel: "Filter:",
    donateBtn: "Khairat Karein",
    country: "Mulk",
    established: "Qaim",
    
    categories: {
      all: "Sab",
      emergencyRelief: "Fauri Imdaad",
      education: "Taleem",
      foodWater: "Khana Aur Paani",
      orphans: "Yateem",
      healthcare: "Sehat Ki Dekhbhaal",
    },
    
    noResults: "Is qism mein abhi koi khairat ke idare nahi.",
    noResultsSubtext: "Jald check karein — hum mazeed daal rahe hain.",
    
    ctaHeading: "Koi qabile aitbaar zakaat ke mustahiq khairat ke idare ko jaante hain?",
    ctaText: "Hum hamesha apni tasdeeq shuda khairat ke idaron ki fehrist ko badhane ki koshish kar rahe hain. Jaiza ke liye ek khairat ke idare ki tajweez dein.",
    ctaBtn: "Khairat Ke Idare Ki Tajweez Dein",
    
    placeholderWarning: "⚠️ Noti: Darj khairat ke idare tasdeeq aur shirkat ke samjhotoun ka intezar karte huye placeholder misaalen hain. Hum kisi tanzeem ki tazkeya tab tak nahi karte jab tak rasmi jaanchne mukammal na ho. Hamesha khairat ke idaron ki sanad ki khud se tasdeeq karein.",
  },
  
  references: {
    eyebrow: "Ilmi Hawale",
    heading: "Hawale Aur Makhaz",
    subheading: "Is tool mein har hukm aur hisaab bunyadi Islami makhaz mein bunyadon rakhta hai. Hum mukammal wazahat mein yaqeen rakhte hain.",
    
    categories: {
      quran: "Qur'an",
      hadith: "Hadees",
      fiqh: "Purani Fiqh",
      contemporary: "Asr-e-Hazir Ki Scholarship",
    },
    
    methodologyHeading: "Hamara Manhaj",
    methodologyText: "Hamare hisaabaat Hanafi school ke chaandi ki nisaab ko default tor par istemaal karne ka tareeqa ikhtyaar karte hain, jabke sone ke mayar par switch karne ka ikhtiyar bhi dete hain. Tamaam ahkaam char badi schools of jurisprudence (Hanafi, Maliki, Shafi'i, Hanbali) aur asr-e-hazir ke ilmi idaron ke mutabiq cross-check kiye gaye hain.",
    methodologyLink: "Koi ghalti dekhi ya koi ilmi islah hai?",
    methodologyLinkText: "Hamari Fiqh committee se rabta karein →",
    
    verificationWarning: "⚠️ Tasdeeq Ki Noti: Tamaam Hadees ke hawale (kitaab aur number) tasdeeq shuda makhaz (jaise sunnah.com) ke khilaaf ilmi tasdeeq ka intezar kar rahe hain. Theek hawalon ke numbers par tab tak aitbaar na karein jab tak azadi se tasdeeq na ho.",
  },
  
  notFound: {
    title: "Safha nahi mila",
    description: "Jo safha aap dhoondh rahe hain woh maujood nahi ya muntaqil kar diya gaya hai.",
    homeBtn: "Ghar Wapis",
    backBtn: "Wapis Jayen",
  },
  
  common: {
    loading: "Load ho raha hai...",
    error: "Ghalti",
    tryAgain: "Dobara Koshish Karein",
    close: "Band Karein",
    open: "Kholein",
    search: "Talaash",
    placeholder: "—",
  },
};
