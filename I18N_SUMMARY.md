# i18n + RTL Implementation Summary

## ✅ What's Complete

### 1. Core Infrastructure
- ✅ Translation system with TypeScript type safety
- ✅ 4 languages: English, Arabic, Urdu (2 variants)
- ✅ i18n context provider and hooks
- ✅ localStorage persistence for language choice
- ✅ Automatic `dir` and `lang` attributes on `<html>`

### 2. Currencies
- ✅ Added INR (₹) and IDR (Rp)
- ✅ Total: 10 currencies supported

### 3. Fonts
- ✅ Arabic fonts: Amiri, Noto Naskh Arabic
- ✅ Urdu font: Noto Nastaliq Urdu
- ✅ Automatic font switching via CSS `[lang]` selectors

### 4. Language Switcher
- ✅ Desktop dropdown in Navbar
- ✅ Mobile grid selector in hamburger menu
- ✅ Persists to localStorage
- ✅ No layout shift when switching

### 5. RTL Support (Navbar)
- ✅ Mobile menu slides from correct side
- ✅ Directional classes updated (`start`/`end`)
- ✅ Icons and animations respect direction

### 6. Translation Files
- ✅ `en.ts` - English (100% complete)
- ✅ `ar.ts` - Arabic (100% complete)
- ✅ `ur-rm.ts` - Urdu romanized (100% complete)
- ⚠️ `ur.ts` - Urdu native (placeholder, needs translation)

---

## 🔄 What's Pending

### Components Needing Translation
All components still import from `constants/content.ts`. They need to:
1. Import `useT` hook
2. Replace static imports with dynamic translations
3. Audit for directional classes (RTL)

**Priority order:**
1. Calculate.tsx (most used)
2. Home.tsx (entry point)
3. FAQs.tsx, About.tsx, Contact.tsx
4. Donate.tsx, References.tsx
5. NotFound.tsx, Footer.tsx

### RTL Class Audit
Search codebase for:
- `ml-*`, `mr-*`, `pl-*`, `pr-*` → Replace with `ms-*`, `me-*`, `ps-*`, `pe-*`
- `left-*`, `right-*` → Replace with `start-*`, `end-*`
- Directional icons (chevrons, arrows) → Add RTL flip logic

### Urdu Native Translation
Complete translations for `ur.ts` (currently falls back to English)

---

## 📖 Usage

### In Components
```typescript
import { useT } from '../contexts/i18n';

function MyComponent() {
  const t = useT();
  return <h1>{t.nav.brand}</h1>;
}
```

### Get Language/Direction
```typescript
import { useTranslation } from '../contexts/i18n';

const { language, direction, setLanguage } = useTranslation();
```

### Language-Independent Data
```typescript
import { INVARIANT_CONSTANTS } from '../constants/invariants';

const email = INVARIANT_CONSTANTS.contact.email;
```

---

## 🧪 Testing

**Working:**
- ✅ Language switcher (desktop & mobile)
- ✅ Language persistence
- ✅ Navbar RTL layout
- ✅ Font switching
- ✅ Currency symbols (INR, IDR)

**Needs Testing:**
- ⏳ Calculate page in RTL
- ⏳ Sticky elements in RTL (Donate, References)
- ⏳ All page components in all languages
- ⏳ Mobile layouts in RTL

---

## 🚀 Next Actions

1. **Translate Calculate.tsx** - Highest priority, most complex
2. **Translate Home.tsx** - First page users see
3. **Audit remaining components** - Replace directional classes
4. **Complete Urdu native** - Or remove if not needed
5. **Test exhaustively** - All pages × 4 languages × 2 directions

---

## 📂 Key Files

```
src/
├── locales/              # Translation files
├── contexts/i18n.tsx     # Provider & hooks
├── constants/invariants.ts  # Non-translated constants
├── utils/currency.ts     # 10 currencies
└── components/layout/Navbar.tsx  # Fully translated
```

---

## ⚡ Quick Commands

**Search for directional classes:**
```bash
# Find problematic classes
grep -r "ml-\|mr-\|pl-\|pr-\|left-\|right-" src/
```

**Find untranslated components:**
```bash
# Find imports from content.ts
grep -r "from.*constants/content" src/pages/
```

---

## 📝 Notes

- **Direction change is instant** - No page reload needed
- **Fonts load from Google Fonts** - May have initial flash
- **Type safety enforced** - All locales must match `Translations` interface
- **RTL tested on Navbar only** - Other components pending
- **Urdu native is placeholder** - Currently falls back to English

---

## ✅ Ready for Phase 3

Once remaining components are translated and RTL-audited, the i18n system is production-ready. Current implementation provides:
- Solid foundation
- Type-safe translations
- Proper RTL support (partial)
- Language persistence
- Font support

Focus next on completing translations and RTL audit across all pages.
