export type QuranVerseKey =
  | "alBaqarah43"
  | "alBaqarah110"
  | "alBaqarah267"
  | "atTawbah60"
  | "atTawbah71"
  | "atTawbah103"
  | "anNur56"
  | "arRum39"

export type QuranNoteKey = "generalGiving" | "zakahMeaning"
export type HadithKey =
  | "bukhari1395"
  | "bukhari1403"
  | "bukhari1448"
  | "bukhari1450"
  | "bukhari1454"
  | "bukhari1460"
  | "muslim979a"
  | "muslim987a"
  | "tirmidhi617"
  | "tirmidhi618"
export type HadithClassification = "sahih" | "hasan" | "gharib" | "mashhur"
export type Madhhab = "hanafi" | "maliki" | "shafii" | "hanbali"

export type ReferenceCategoryId = "quran" | "hadith" | "fiqh" | "contemporary"

interface QuranReference {
  type: "quran"
  id: QuranVerseKey
  ref: string
  arabic: string
  sourceUrl: string
  noteKey?: QuranNoteKey
}

interface TextReference {
  type: "text"
  id: string
  ref: string
  text: string
  note?: string
}

interface HadithReference {
  type: "hadith"
  id: HadithKey
  ref: string
  sourceUrl: string
  classifications: readonly HadithClassification[]
}

interface FiqhReference {
  type: "fiqh"
  id: string
  ref: string
  text: string
  madhhab: Madhhab
}

export type ReferenceItem = QuranReference | HadithReference | FiqhReference | TextReference

export interface ReferenceCategory {
  id: ReferenceCategoryId
  icon: "book" | "scroll" | "library" | "graduation-cap"
  refs: readonly ReferenceItem[]
}

export const REFERENCE_CATEGORIES = [
  {
    id: "quran",
    icon: "book",
    refs: [
      {
        type: "quran",
        id: "alBaqarah43",
        ref: "Qur'an 2:43",
        arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
        sourceUrl: "https://quran.com/2/43",
      },
      {
        type: "quran",
        id: "alBaqarah110",
        ref: "Qur'an 2:110",
        arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ ۚ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ ۗ إِنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ",
        sourceUrl: "https://quran.com/2/110",
      },
      {
        type: "quran",
        id: "alBaqarah267",
        ref: "Qur'an 2:267",
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ ۖ وَلَا تَيَمَّمُوا الْخَبِيثَ مِنْهُ تُنفِقُونَ وَلَسْتُم بِآخِذِيهِ إِلَّا أَن تُغْمِضُوا فِيهِ ۚ وَاعْلَمُوا أَنَّ اللَّهَ غَنِيٌّ حَمِيدٌ",
        sourceUrl: "https://quran.com/2/267",
        noteKey: "generalGiving",
      },
      {
        type: "quran",
        id: "atTawbah60",
        ref: "Qur'an 9:60",
        arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
        sourceUrl: "https://quran.com/9/60",
      },
      {
        type: "quran",
        id: "atTawbah71",
        ref: "Qur'an 9:71",
        arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ ۚ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ وَيُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَيُطِيعُونَ اللَّهَ وَرَسُولَهُ ۚ أُولَٰئِكَ سَيَرْحَمُهُمُ اللَّهُ ۗ إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ",
        sourceUrl: "https://quran.com/9/71",
      },
      {
        type: "quran",
        id: "atTawbah103",
        ref: "Qur'an 9:103",
        arabic: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ",
        sourceUrl: "https://quran.com/9/103",
        noteKey: "zakahMeaning",
      },
      {
        type: "quran",
        id: "anNur56",
        ref: "Qur'an 24:56",
        arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَطِيعُوا الرَّسُولَ لَعَلَّكُمْ تُرْحَمُونَ",
        sourceUrl: "https://quran.com/24/56",
      },
      {
        type: "quran",
        id: "arRum39",
        ref: "Qur'an 30:39",
        arabic: "وَمَا آتَيْتُم مِّن رِّبًا لِّيَرْبُوَ فِي أَمْوَالِ النَّاسِ فَلَا يَرْبُو عِندَ اللَّهِ ۖ وَمَا آتَيْتُم مِّن زَكَاةٍ تُرِيدُونَ وَجْهَ اللَّهِ فَأُولَٰئِكَ هُمُ الْمُضْعِفُونَ",
        sourceUrl: "https://quran.com/30/39",
        noteKey: "zakahMeaning",
      },
    ],
  },
  {
    id: "hadith",
    icon: "scroll",
    refs: [
      {
        type: "hadith",
        id: "bukhari1395",
        ref: "Sahih al-Bukhari 1395",
        sourceUrl: "https://sunnah.com/bukhari:1395",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "bukhari1403",
        ref: "Sahih al-Bukhari 1403",
        sourceUrl: "https://sunnah.com/bukhari:1403",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "bukhari1448",
        ref: "Sahih al-Bukhari 1448",
        sourceUrl: "https://sunnah.com/bukhari:1448",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "bukhari1450",
        ref: "Sahih al-Bukhari 1450",
        sourceUrl: "https://sunnah.com/bukhari:1450",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "bukhari1454",
        ref: "Sahih al-Bukhari 1454",
        sourceUrl: "https://sunnah.com/bukhari:1454",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "bukhari1460",
        ref: "Sahih al-Bukhari 1460",
        sourceUrl: "https://sunnah.com/bukhari:1460",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "muslim979a",
        ref: "Sahih Muslim 979a",
        sourceUrl: "https://sunnah.com/muslim:979",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "muslim987a",
        ref: "Sahih Muslim 987a",
        sourceUrl: "https://sunnah.com/muslim:987",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "tirmidhi617",
        ref: "Jami` at-Tirmidhi 617",
        sourceUrl: "https://sunnah.com/tirmidhi:617",
        classifications: ["sahih"],
      },
      {
        type: "hadith",
        id: "tirmidhi618",
        ref: "Jami` at-Tirmidhi 618",
        sourceUrl: "https://sunnah.com/tirmidhi:618",
        classifications: ["hasan", "gharib"],
      },
    ],
  },
  {
    id: "fiqh",
    icon: "library",
    refs: [
      {
        type: "fiqh",
        id: "al-hidayah",
        ref: "Al-Hidayah (Hanafi)",
        text: "The Nisaab for gold is 20 Dinars (approximately 85 grams). For silver, it is 200 Dirhams (approximately 595 grams). Zakah is due at 2.5% on wealth above this threshold held for one lunar year.",
        madhhab: "hanafi",
      },
      {
        type: "fiqh",
        id: "badai-al-sanai",
        ref: "Bada'i al-Sana'i (Hanafi)",
        text: "Al-Kasani's extensive Hanafi work arranges Zakah discussions by the conditions that make it due and by categories of wealth.",
        madhhab: "hanafi",
      },
      {
        type: "fiqh",
        id: "radd-al-muhtar",
        ref: "Radd al-Muhtar (Hanafi)",
        text: "Ibn 'Abidin's commentary on Hanafi law includes detailed treatment of Zakah rulings and their practical applications.",
        madhhab: "hanafi",
      },
      {
        type: "fiqh",
        id: "al-mudawwanah",
        ref: "Al-Mudawwanah al-Kubra (Maliki)",
        text: "A foundational Maliki legal compendium that records discussions of Zakah obligations, eligible recipients, and rules across types of wealth.",
        madhhab: "maliki",
      },
      {
        type: "fiqh",
        id: "risala-ibn-abi-zayd",
        ref: "Al-Risalah of Ibn Abi Zayd (Maliki)",
        text: "A concise primer of Maliki belief and law, with a dedicated section introducing the rules of Zakah.",
        madhhab: "maliki",
      },
      {
        type: "fiqh",
        id: "mukhtasar-khalil",
        ref: "Mukhtasar Khalil (Maliki)",
        text: "Khalil ibn Ishaq's influential Maliki manual summarizes rulings on Zakah among its chapters of worship and transactions.",
        madhhab: "maliki",
      },
      {
        type: "fiqh",
        id: "reliance-traveller",
        ref: "Reliance of the Traveller (Shafi'i)",
        text: "Zakah on trade goods is calculated based on their current market value at the end of the Hawl, regardless of original purchase price.",
        madhhab: "shafii",
      },
      {
        type: "fiqh",
        id: "al-umm",
        ref: "Al-Umm (Shafi'i)",
        text: "Imam al-Shafi'i's legal work discusses Zakah in its treatment of obligatory worship, including assessments of relevant reports and legal principles.",
        madhhab: "shafii",
      },
      {
        type: "fiqh",
        id: "minhaj-al-talibin",
        ref: "Minhaj al-Talibin (Shafi'i)",
        text: "Al-Nawawi's central Shafi'i manual provides a compact reference to the school's Zakah rulings.",
        madhhab: "shafii",
      },
      {
        type: "fiqh",
        id: "al-mughni",
        ref: "Al-Mughni (Hanbali)",
        text: "A major Hanbali legal work with detailed discussions of Zakah, including its conditions, rates, and the types of wealth subject to it.",
        madhhab: "hanbali",
      },
      {
        type: "fiqh",
        id: "zad-al-mustaqni",
        ref: "Zad al-Mustaqni (Hanbali)",
        text: "A concise Hanbali legal text that outlines Zakah rules in a structured chapter on obligatory charity.",
        madhhab: "hanbali",
      },
      {
        type: "fiqh",
        id: "kashshaf-al-qina",
        ref: "Kashshaf al-Qina (Hanbali)",
        text: "Al-Buhuti's commentary expands on Hanbali legal positions, including the conditions and categories relevant to Zakah.",
        madhhab: "hanbali",
      },
    ],
  },
  {
    id: "contemporary",
    icon: "graduation-cap",
    refs: [
      {
        type: "text",
        id: "aaoifi-standards",
        ref: "AAOIFI Shari'ah Standard No. 35: Zakah",
        text: "A dedicated standard on Zakah in Islamic financial institutions, setting out guidance for determining and disclosing Zakah obligations.",
      },
      {
        type: "text",
        id: "oic-fiqh-council",
        ref: "International Islamic Fiqh Academy (OIC)",
        text: "The Academy publishes collective fiqh resolutions addressing contemporary questions. Its resolutions are useful references, while their application to an individual case may require qualified guidance.",
      },
      {
        type: "text",
        id: "fiqh-al-zakah",
        ref: "Fiqh al-Zakah — Yusuf al-Qaradawi",
        text: "A broad modern study of Zakah, its evidences, eligible wealth, recipients, and place in Muslim social life.",
      },
      {
        type: "text",
        id: "monzer-kahf-zakah",
        ref: "Studies on Zakah — Monzer Kahf",
        text: "Contemporary economic research examines Zakah's institutional and social dimensions alongside its established legal foundations.",
      },
      {
        type: "text",
        id: "nzf-zakat-guide",
        ref: "National Zakat Foundation — Zakat Guide",
        text: "A practical guide that helps readers organize common personal wealth categories for a Zakah review.",
      },
      {
        type: "text",
        id: "islamic-relief-zakat-guide",
        ref: "Islamic Relief — Zakat Guide",
        text: "An accessible overview of common Zakah questions and calculation concepts for contemporary readers.",
      },
      {
        type: "text",
        id: "nzf-zakat-handbook",
        ref: "National Zakat Foundation — Zakat Handbook",
        text: "A longer reference for reviewing assets and liabilities, with explanations of issues that can vary by scholarly opinion.",
      },
      {
        type: "text",
        id: "islamic-finance-zakat",
        ref: "Islamic Finance and Zakat Research",
        text: "Research in Islamic finance explores how classical Zakah principles are discussed in relation to modern financial products and institutions.",
      },
    ],
  },
] as const satisfies readonly ReferenceCategory[]
