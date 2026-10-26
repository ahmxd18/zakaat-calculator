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
    schoolLabel: "Fiqhi Madhhab",
    schoolNames: {
      default: "Default (koi madhhab nahi)",
      hanafi: "Hanafi",
      maliki: "Maliki",
      shafii: "Shafi'i",
      hanbali: "Hanbali",
    },
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
        description: "Hisab documented assumptions aur verified metal prices par hai; ilmi review baqi hai.",
      },
      scholarly: {
        title: "Shari Bunyadon Par",
        description: "Research references maujood hain; har formula ki ilmi certification nahin.",
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
    safety: {
      externalChange: "Doosre tab ne saved inputs badle hain. Current inputs yahan barqarar hain. Saved data ke liye reload karein, ya in inputs ko save karne ke liye jaari rakhein.",
      invalidAmount: "Zero ya musbat raqam dein, zyada se zyada ek trillion.",
      schoolDefault: "Maslak ka default istemal karein",
      confirmCurrency: "Currency badlein aur inputs saaf karein",
      cancelCurrency: "Maujooda currency rakhein",
      "currencyChange": "Currency badalne se tamam raqam aur hawl history saaf hogi; conversion nahin hogi. Jaari rakhein?",
      "restoreWarning": "Saved data verify nahin hua. Raqam aur currency check karein ya reset karein. Jaari rakhne tak purana data mehfooz rahega.",
      "saveWarning": "Tabdeeliyan save nahin huin. Page khula rakhein ya inputs likh lein.",
      "acceptRestored": "Review kiye inputs se jaari rakhein",
      "manualNote": "Live prices na milein to selected currency mein per gram verified current prices dein. Yeh ek ghante baad expire hongi.",
      "useManual": "Yeh prices istemal karein",
      "manualActive": "Aap ki manually confirmed prices istemal ho rahi hain, live quote nahin.",
      "useLive": "Live prices istemal karein",
      "unavailable": "Calculation dastiyab nahin. Saved data, current prices aur raqam check karein.",
      "estimate": "Taleemi andaza, independently certified nahin. Income shares ka 25% shamil hai. Confirmed anniversary na ho to hawl 354 din hai. Default hawl eligibility verify nahin karta."
},
    resetBtn: "Reset Karein",
    
    sections: {
      cash: {
        label: "Naqdi Aur Bank Bachat",
        description: "Haath mein naqdi, jaari accounts, bachat accounts.",
        fields: {
          cashOnHand: "Haath Mein Naqdi",
          bankSavings: "Bank Bachat",
          foreignCash: "Baharla Currency (tabdeel shuda)",
        },
      },
      goldSilver: {
        label: "Sona Aur Chaandi",
        description: "Khalis metal grams dein (gold: metal weight × karat ÷ 24). Pathar nikaalein; stored metal aur personal jewellery alag rakhein.",
        fields: {
          goldGrams: "Mehfooz / ghair istemal sona (grams)",
          wornGoldGrams: "Istemal mein sona (grams)",
          silverGrams: "Mehfooz / ghair istemal chaandi (grams)",
          wornSilverGrams: "Istemal mein chaandi (grams)",
        },
      },
      investments: {
        label: "Sarmaayakari Aur Shares",
        description: "Har sarmaayakari qisam ki bazaar qeemat darj karein.",
        fields: {
          stocks: "Tijarati stocks aur shares",
          incomeStocks: "Aamdani wale shares (bazaar qeemat; 25% shamil)",
          crypto: "Cryptocurrency",
          pension: "Pension ka qabil-e-rasaai hissa",
        },
      },
      business: {
        label: "Tijarat Ke Maal",
        description: "Tijarati maal, wasool hone wali raqam, aur farookht ke liye rakhi jaidad.",
        fields: {
          stockInventory: "Stock / Maal",
          receivables: "Aapko Milne Wala Paisa",
          tradeRealEstate: "Tijarat ke liye rakhi jaidad",
        },
      },
      deductions: {
        label: "Zimmedariyan Aur Katootiyan",
        description: "Sirf muntakhib madhab ke mutabiq qarz aur bills darj karein.",
        fields: {
          debtsOwed: "Qabil-e-katoti qarz",
          billsDue: "Ab Adaa Hone Wale Bills",
        },
      },
    },
    
    nisaabNote: "Nisaab ki had muntakhib sone ya chaandi ke mayar se hisaab hoti hai. Ibtidai tajweez muntakhib madhab ke mutabiq hoti hai jab tak aap doosra mayar na chunein.",
    
    nisaabStandard: {
      label: "Nisaab Ka Mayar",
      note: "Ulamaa is mayar ke baare mein ikhtilaf rakhte hain. Apne madhab se mashwara karein.",
      lower: "Kam (Hifazati)",
      lowerDesc: "Sone ya chaandi mein se jo bhi kam qeemat ho — sabse zyada shamil",
      gold: "Sona (85g)",
      goldDesc: "Shafi'i aur Hanbali madhab ki tarjeeh",
      silver: "Chaandi (595g)",
      silverDesc: "Hanafi ka bunyadi mauqif — zyada wasee dayra",
    },

    schoolRules: {
      default: "Default (koi madhab nahi) pehla hisaab rakhta hai: sona ya chaandi mein se kam nisaab, darj tamam zevar shamil, qarz ki katooti, tijarati jaidad shamil, aur hawl ki tareekh ki shart nahi.",
      hanafi: "Hanafi: pehne hue sone aur chaandi par zakaat shamil hai; jaiz foran qarz minus hote hain; saal ke darmiyan nisaab se kam hona hawl dobara shuru nahi karta. Kam nisaab default hai.",
      maliki: "Maliki: zaati istemal ke pehne hue zevar shamil nahi; jaiz qarz minus hote hain; nisaab se kam hona hawl dobara shuru karta hai. Kam nisaab default hai.",
      shafii: "Shafi'i: zaati istemal ke pehne hue zevar shamil nahi; qarz minus nahi hote; nisaab se kam hona hawl dobara shuru karta hai. Sone ka nisaab default hai.",
      hanbali: "Hanbali: zaati istemal ke pehne hue zevar shamil nahi; jaiz qarz minus hote hain; nisaab se kam hona aam tor par hawl dobara shuru karta hai (mukhtasir kami ka hukm mukhtalif ho sakta hai). Tijarati jaidad bhi shamil hai.",
    },

    hawl: {
      anniversary: "Ikhtiyari: tasdeeq shuda hawl anniversary (Gregorian date)",
      anniversaryNote: "Motabar lunar calendar ya aalim se confirmed date dein. Khaali chhorne par 354 din ka andaza rahega. Reset ke baad maujooda hawl ki date dein.",
      title: "Hawl (qamri saal) ki ahliyat",
      description: "Jis hawl ka hisaab karna hai uski shuru ki tareekh darj karein. Qamri saal taqreeban 354 din hai; jin madhahib mein nisaab kam hone par hawl dobara shuru hota hai, wahan nisaab dobara pohanchne ki tareekh darj karein.",
      startDate: "Hawl shuru hone ki tareekh (maal nisaab tak pohanchne par)",
      dippedBelowNisaab: "Is hawl ke dauran mera zakaat ke qabil maal nisaab se kam hua",
      hanafiNote: "Hanafi hisaab ke liye is hawl mein pehli martaba nisaab tak pohanchne ki tareekh darj karein. Agar ibtida aur ab nisaab poora ho to darmiyan ki aarzi kami ka asar nahi hota.",
    },
    
    prices: {
      liveLabel: "Nisaab Ki Zinda Qeemtein",
      liveNote: "Prices ek ghante baad expire hoti hain; unavailable prices istemal nahin hotin.",
      goldPerGram: "Sona fی gram",
      silverPerGram: "Chaandi fی gram",
      loading: "Zinda qeemtein la raha hai…",
      error: "Live prices dastiyab nahin. Neeche verified prices dein.",
      fallbackNote: "Backup qeemtein istemal ho rahi hain. Zinda data dastiyab nahi.",
      lastUpdated: "Aakhri update",
      refresh: "Qeemtein refresh karein",
    },
    
    summary: {
      title: "Aapka Zakaat Ka Khulasa",
      subtitle: "Form bharte waqt real-time mein hisaab kiya jata hai",
      totalAssets: "Kul Maal",
      totalDeductions: "Laagu katootiyan",
      deductionsNotApplied: "Aapke darj qarz minus nahi kiye gaye kyun ke muntakhib madhab aam tor par qarz ki katooti ki ijazat nahi deta.",
      netWealth: "Saaf Zakaat Wali Daulat",
      nisaabThreshold: "Nisaab Ki Had",
      hawl: "Hawl ki surat-e-haal",
      hawlIncomplete: "Mukammal qamri saal nahi guzra — abhi zakaat wajib nahi",
      hawlInvalid: "Maal ke nisaab tak pohanchne ki durust tareekh darj karein",
      hawlReset: "Nisaab ki kami se hawl dobara shuru hota hai — abhi zakaat wajib nahi",
      hawlComplete: "Mukammal",
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
        answer: "Har ahl musalman ke zakaat ke qabil maal ke nisaab tak pohanchne aur hawl guzarnay par zakaat wajib ho sakti hai, mutaliqa madhab ke ahkaam ke mutabiq. Bachon aur zehni ahliyat na rakhne walon ke ahkaam madhahib mein mukhtalif hain. Apne halaat ke liye kisi mu'tabar aalim se mashwara karein.",
      },
      {
        question: "Nisaab ki had kya hai?",
        answer: "Nisaab woh kam se kam maal hai jo ek musalman ke paas hona chahiye zakaat farz hone se pehle. Yeh ya to 85 gram sone ya 595 gram chaandi ki qeemat par muqarrar hai. Ulamaa is mein ikhtilaf rakhte hain ke kaunsa istemal kiya jaye; chaandi ka mayar aam tor par zyada shamil aur mehfooz hai.",
      },
      {
        question: "Hawl (qamri saal) kya hai?",
        answer: "Hawl taqreeban 354 din hota hai aur zakaat ke qabil maal ke nisaab tak pohanchne se shuru hota hai. Madhahib ke ahkaam mukhtalif hain: Hanafi mauqif mein ibtida aur ikhtitam par nisaab ho to darmiyan ki aarzi kami aam tor par hawl dobara shuru nahi karti; Maliki, Shafi'i aur Hanbali mauqif mein kami ke baad aam tor par hawl dobara shuru hota hai. Madhab chunne par calculator hawl ki maloomat poochta hai; apne halaat ke liye kisi mu'tabar aalim se mashwara karein.",
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
        description: "Hum current assumptions wazeh karte hain; dini authority ke dawe se pehle qualified independent review darkar hai.",
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
    
    reviewEyebrow: "Ilmi Jaiza",
    reviewHeading: "Ilmi jaize ka amal jaari hai",
    reviewSubheading: "Kisi aalim ko himaayat karne wale ke taur par dikhane se pehle hum calculator ke tareeqa-e-kaar, hisaabaat aur hawalon ke jaize ke liye ahl ulamaa se rabta kar rahe hain.",
    reviewNotice: "Abhi tak kisi aalim ne is website ka jaiza nahi liya aur na hi iski manzoori di hai. Neeche diye gaye tamam profiles farzi namoone hain: naam, maqamaat, madhabi nisbat aur ibtidayi huroof sirf misaal ke liye hain. Yeh haqeeqi reviewers nahi aur in se kisi qisam ki himaayat murad nahi.",
    sampleProfile: "Farzi namoona",
    jurisprudence: "Madhab",
    location: "Namoona maqam",
    schools: {
      hanafi: "Hanafi (namoona)",
      maliki: "Maliki (namoona)",
      shafii: "Shafi'i (namoona)",
      hanbali: "Hanbali (namoona)",
      independent: "Zikar nahi (namoona)",
    },
    creatorLabel: "Creator ke baare mein",
    creatorName: "Habeeb Ahmed Shuaib",
    creatorRole: "Developer aur Creator · Web development · React / Next.js",
    creatorBio: "Main software developer hoon aur ba-maqsad digital tajurbe banane ka shauq rakhta hoon jo haqeeqi masail hal karein. Maine yeh Zakaat calculator apni technical maharat Muslim community ki khidmat mein istemal karne aur Zakaat ke hisaab ko samajhna aur hasil karna aasan banane ke liye banaya. Meri tawajju soch samajh kar design, saaf hisaabaat aur ehtiyaat se tehqeeq kiye gaye Islami hawalon par hai. Yeh software ka project hai, deeni authority ka daawa nahi; iske mazmoon ko abhi ahl ulamaa ke jaize ki zaroorat hai.",
    creatorSkills: ["Software development", "UI/UX design", "Innovation", "Islami technology"],
    
    disclaimerWarning: "Yeh calculator taleemi tool hai, deeni authority nahi. Ahl ulamaa ne abhi iske hisaabaat ya hawalon ka jaiza le kar manzoori nahi di. Zaati rehnumai ke liye kisi mu'tabar aalim se mashwara karein.",
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
      locationValue: "Hyderabad, India",
      responseValue: "2-3 karobaari dinon ke andar",
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
      successTitle: "Paigham bhej diya gaya!",
      successText: "Hum se rabta karne ka shukriya. Hum 2-3 karobaari dinon mein jawab dene ki koshish karte hain.",
      
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
    scholarlyNoteText: "Ilmi sawal ya islah ke liye developer ko email karein. Fiqh committee ya scholarly endorsement ka dawa nahin.",
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
    
    translationLabel: "Aasaan Roman Urdu mein mafhoom",
    translationNote: "Qur'an aur Hadees ke yeh mukhtasar tashreehi mafahim is safhe ke liye tayyar kiye gaye hain, kisi khaas shaya shuda tarjume se naqal nahi. Tafseeli mutale ke liye mo'tabar makhaz dekhein.",
    quranSource: "Arabi matn ko AlQuran.cloud par dastiyab Quran Academy ke Uthmani matn se milaya gaya hai.",
    readVerse: "Ayat parhein",
    quranTranslations: {
      alBaqarah43: "Namaz qayam karo, zakaat ada karo aur ruku karne walon ke saath ruku karo.",
      alBaqarah110: "Namaz qayam karo aur zakaat ada karo. Jo neki tum apne liye aage bhejoge use Allah ke paas paoge; beshak Allah tumhare aamaal dekhta hai.",
      alBaqarah267: "Aye imaan walo, apni paakeeza kamaai aur zameen se tumhare liye nikali hui cheezon mein se kharch karo. Aisi kharaab cheez dene ka irada na karo jise tum khud bhi dil ki na-khushi ke baghair na lo. Jaan lo ke Allah be-niyaaz aur khoobiyon wala hai.",
      atTawbah60: "Sadaqaat fuqara, mohtaaj, unke kaam par muqarrar afraad, jin ki dil joi maqsood ho, gardanein azaad karane, qarzdaaron, Allah ki raah aur musafir ke liye hain; yeh Allah ki taraf se muqarrar farz hai, aur Allah jaanne wala, hikmat wala hai.",
      atTawbah71: "Momin mard aur momin auratein ek doosre ke madadgaar hain; neki ka hukm dete, buraai se rokte, namaz qayam karte, zakaat dete aur Allah aur uske Rasool ki ita'at karte hain. Allah un par reham farmayega; beshak woh ghaalib, hikmat wala hai.",
      atTawbah103: "Unke maal mein se sadaqah lein jiske zariye aap unhein paak karein aur unka tazkiyah karein, aur unke liye dua karein; aapki dua unke liye sukoon hai. Allah sunne wala, jaanne wala hai.",
      anNur56: "Namaz qayam karo, zakaat ada karo aur Rasool ki ita'at karo taa-ke tum par reham kiya jaye.",
      arRum39: "Jo maal tum sood ke taur par dete ho taa-ke logon ke maal mein barhe, woh Allah ke haan nahi barhta; aur jo zakaat tum Allah ki raza chahte hue dete ho, wohi ajr ko kai guna karne wale hain.",
    },
    quranNotes: {
      generalGiving: "Yeh ayat paakeeza kamaai aur paidawaar mein se aam kharch ka zikr karti hai; iska sadaqah se talluq hai, magar yeh akeli zakaat ke tamam ahkaam nahi batati.",
      zakahMeaning: "Lafz zakaat aur uske siyaaq ki mukhtalif tafaseer hain; yeh mukhtasar mafhoom fiqhi fatwa nahi.",
    },
    hadithMeaningLabel: "Mukhtasar mafhoom",
    hadithTranslations: {
      bukhari1395: "Jab Nabi ﷺ ne Mu'az (RA) ko Yemen bheja to unhein bataya ke Allah ne logon ke maal mein zakaat farz ki hai, jo unke maal-daaron se le kar unke mohtaajon ko di jaye.",
      bukhari1403: "Nabi ﷺ ne maal ki zakaat ada na karne wale ke liye tanbeeh farmayi ke Qayamat ke din uska maal saanp ki soorat mein aayega aur kahega: main tera maal hoon, main tera khazana hoon.",
      bukhari1448: "Agar oonton ki zakaat ke liye muqarrara umr ka jaanwar na ho to aglay umr ka jaanwar khaas farq ke saath liya ja sakta hai.",
      bukhari1450: "Abu Bakr (RA) ki hidayaat mein zakaat se bachne ke liye alag maalikon ke maweshiyon ko jama ya mushtarka maweshiyon ko taqseem karne se mana kiya gaya hai.",
      bukhari1454: "Abu Bakr (RA) ki tehreeri hidayaat mein oonton aur bheiron ki zakaat ki tafseel aur chaandi par chaleeswan hissa (2.5%) muqarrar hone ka zikr hai.",
      bukhari1460: "Nabi ﷺ ne un maweshiyon ki zakaat ada na karne par tanbeeh farmayi ke Qayamat ke din woh apne malik ko rondenge aur seeng maarenge.",
      muslim979a: "Paanch wasq se kam paidawaar, paanch oonton aur paanch uqiyyah chaandi se kam par zakaat nahi.",
      muslim987a: "Is tafseeli riwayat mein sone, chaandi, oonton, gaayon aur bheiron ki wajib zakaat rokne par tanbeeh hai.",
      tirmidhi617: "Abu Dharr (RA) se riwayat hai ke oonton aur gaayon ki zakaat rokne wale ke jaanwar Qayamat ke din use rondenge aur seeng maarenge.",
      tirmidhi618: "Nabi ﷺ ne farmaya ke jo apne maal ki zakaat ada kar de, usne apne zimmah ki zimmedari poori kar di.",
    },
    authenticityGrades: {
      sahih: "Sahih",
      hasan: "Hasan",
      gharib: "Ghareeb",
      mashhur: "Mash-hoor",
    },
    readHadith: "Hadees parhein",
    hadithFilterLabel: "Darja ya riwayat ki qisam ke mutabiq",
    fiqhFilterLabel: "Madhhab ke mutabiq",
    filterAll: "Sab",
    madhhabs: {
      hanafi: "Hanafi",
      maliki: "Maliki",
      shafii: "Shafi'i",
      hanbali: "Hanbali",
    },
    noFilterResults: "Is filter ke mutabiq koi hawala nahi mila.",
    methodologyHeading: "Hamara Manhaj",
    methodologyText: "Madhab chunne se tajweez shuda nisaab aur calculator mein dikhaye gaye school-specific ahkaam laagu hote hain, jin mein zevar, qarz aur hawl ke usool shamil hain. Nisaab ko override kiya ja sakta hai aur Default (koi madhab nahi) ka option bhi maujood hai. Yeh hisaabaat research reference par mabni andazay hain; zaati hukm ke liye kisi mu'tabar aalim se mashwara karein.",
    methodologyLink: "Koi ghalti dekhi ya koi ilmi islah hai?",
    methodologyLinkText: "Ilmi islah bhejein →",
    
    verificationWarning: "Yeh hawale aur mukhtasar mafahim taleemi mutale ke liye hain, aur calculator ki ilmi tasdeeq nahi. Zaati ahkaam ke liye kisi ahl aalim se rujoo karein.",
  },
  
  notFound: {
    title: "Safha nahi mila",
    description: "Jo safha aap dhoondh rahe hain woh maujood nahi ya muntaqil kar diya gaya hai.",
    homeBtn: "Ghar Wapis",
    backBtn: "Wapis Jayen",
  },
  
  common: {
    languageLoadError: "Zabaan load nahin hui. Maujooda zabaan barqarar hai.",
    loading: "Load ho raha hai...",
    error: "Ghalti",
    tryAgain: "Dobara Koshish Karein",
    close: "Band Karein",
    open: "Kholein",
    search: "Talaash",
    placeholder: "—",
    scroll: "Neeche Jaein",
  },
};
