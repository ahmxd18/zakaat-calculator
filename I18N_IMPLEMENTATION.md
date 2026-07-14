# i18n Implementation Guide

## Overview

Complete multi-language support with RTL handling for:
- **English** (en) - LTR - Default
- **Arabic** (ar) - RTL
- **Urdu native script** (ur) - RTL - Placeholder
- **Urdu romanized** (ur-rm) - LTR

## What Was Implemented

### 1. Translation System ✅

**Files Created:**
- `src/locales/en.ts` - English translations (complete)
- `src/locales/ar.ts` - Arabic translations (complete)
- `src/locales/ur.ts` - Urdu native (placeholder, falls back to English)
- `src/locales/ur-rm.ts` - Urdu romanized (complete)
- `src/locales/index.ts` - Barrel exports
- `src/contexts/i18n.tsx` - i18n provider and hooks
- `src/constants/invariants.ts` - Language-independent constants

**Key Features:**
- TypeScript-enforced translation keys (build-time checking)
- All locales must implement the same `Translations` interface
- Missing translations caught at compile time
- Language-independent data (email, phone, currency codes) separated

### 2. Currency Expansion ✅

Added to `src/utils/currency.ts`:
- **INR** (₹) - Indian Rupee
- **IDR** (Rp) - Indonesian Rupiah

Complete list: GBP, USD, EUR, AED, SAR, PKR, BDT, MYR, INR, IDR

### 3. RTL Support ✅

**Document-level direction:**
- `dir="rtl"` or `dir="ltr"` set on `<html>` element
- Automatically updated when language changes
- No layout shift or flicker

**Directional classes audited:**
- `left-*` → `start-*`
- `right-*` → `end-*`
- `ml-*` → `ms-*`
- `mr-*` → `me-*`
- `pl-*` → `ps-*`
- `pr-*` → `pe-*`

**Components updated:**
- ✅ Navbar - Full RTL support with mobile menu sliding from correct side
- 🔄 Other components need audit (see checklist below)

### 4. Language Switcher ✅

**Desktop:**
- Dropdown in Navbar with language icon
- Compact button with chevron indicator
- Positioned between nav links and CTA

**Mobile:**
- Integrated into hamburger menu
- Grid of 4 language buttons at bottom
- Clear, touch-friendly targets
- No overlap or cramping

**Persistence:**
- Language choice saved to `localStorage`
- Key: `zakaat_language`
- Survives page reload
- Defaults to English on first visit

### 5. Font Support ✅

**Fonts added:**
- Amiri (Arabic)
- Noto Naskh Arabic (Arabic fallback)
- Noto Nastaliq Urdu (Urdu native script)

**CSS Rules:**
```css
[lang="ar"], [lang="ar"] * {
  font-family: var(--font-arabic), var(--font-body);
}

[lang="ur"], [lang="ur"] * {
  font-family: var(--font-urdu), var(--font-body);
}
```

Urdu romanized (`ur-rm`) uses default Latin fonts.

---

## Usage

### Using Translations in Components

```typescript
import { useT } from '../contexts/i18n';

function MyComponent() {
  const t = useT();
  
  return (
    <div>
      <h1>{t.nav.brand}</h1>
      <p>{t.home.hero.heading}</p>
    </div>
  );
}
```

### Accessing Language/Direction

```typescript
import { useTranslation } from '../contexts/i18n';

function MyComponent() {
  const { language, direction, setLanguage } = useTranslation();
  
  return (
    <div dir={direction}>
      <p>Current language: {language}</p>
      <button onClick={() => setLanguage('ar')}>Switch to Arabic</button>
    </div>
  );
}
```

### Using Language-Independent Constants

```typescript
import { INVARIANT_CONSTANTS } from '../constants/invariants';

function Contact() {
  return (
    <a href={`mailto:${INVARIANT_CONSTANTS.contact.email}`}>
      {INVARIANT_CONSTANTS.contact.email}
    </a>
  );
}
```

---

## Components Needing Translation

### ✅ Completed
- App.tsx - Wrapped with I18nProvider
- Navbar.tsx - Full translation + RTL support

### 🔄 Pending
- [ ] Calculate.tsx
- [ ] Contact.tsx
- [ ] Donate.tsx
- [ ] References.tsx
- [ ] About.tsx
- [ ] FAQs.tsx
- [ ] Home.tsx
- [ ] NotFound.tsx
- [ ] Footer.tsx

### Migration Pattern

**Before:**
```typescript
import { HOME } from '../constants/content';

<h1>{HOME.hero.heading}</h1>
```

**After:**
```typescript
import { useT } from '../contexts/i18n';

const t = useT();
<h1>{t.home.hero.heading}</h1>
```

---

## RTL Audit Checklist

### Critical Classes to Replace

**Spacing:**
- `ml-*` → `ms-*` (margin-left → margin-start)
- `mr-*` → `me-*` (margin-right → margin-end)
- `pl-*` → `ps-*` (padding-left → padding-start)
- `pr-*` → `pe-*` (padding-right → padding-end)

**Positioning:**
- `left-*` → `start-*`
- `right-*` → `end-*`

**Borders:**
- `border-l-*` → `border-s-*`
- `border-r-*` → `border-e-*`

**Text:**
- `text-left` → `text-start`
- `text-right` → `text-end`

**Rounded corners (if needed):**
- `rounded-l-*` → `rounded-s-*`
- `rounded-r-*` → `rounded-e-*`

### Icon Flipping

Directional icons need to flip in RTL:
- Chevrons (→ should become ←)
- Arrows
- Back buttons

**Implementation:**
```typescript
import { useTranslation } from '../contexts/i18n';

const { direction } = useTranslation();

<ChevronRight className={cn(direction === 'rtl' && 'rotate-180')} />
```

---

## Translation Keys Structure

```typescript
{
  meta: { language, dir },
  nav: { brand, brandTagline, links, ctaLabel, languageLabel },
  footer: { tagline, copyright, disclaimer, quickLinksTitle },
  home: { hero, intro, features, stats, ctaBanner },
  calculate: { heading, sections, summary, nisaabNote, ... },
  faqs: { heading, items },
  about: { heading, values, team, ... },
  contact: { heading, info, form },
  donate: { heading, categories, ... },
  references: { heading, categories, methodology, ... },
  notFound: { title, description, homeBtn, backBtn },
  common: { loading, error, tryAgain, ... }
}
```

---

## Testing Checklist

### Language Switching
- [ ] Switch to Arabic - all text updates except email/phone
- [ ] Switch to Urdu (Roman) - all text updates
- [ ] Switch to Urdu (native) - currently falls back to English
- [ ] Default is English on first load
- [ ] Language persists across page reload
- [ ] Language persists across route navigation

### RTL Layout
- [ ] Arabic renders RTL
- [ ] Urdu native renders RTL
- [ ] Urdu romanized renders LTR
- [ ] English renders LTR
- [ ] No layout shift when switching
- [ ] No scrollbar jump when switching
- [ ] Navbar mobile menu slides from correct side (RTL: left, LTR: right)
- [ ] All spacing/margins respect direction
- [ ] Text alignment respects direction
- [ ] Icons flip appropriately in RTL

### Navbar
- [ ] Desktop language dropdown works
- [ ] Mobile language selector works (4 buttons in grid)
- [ ] Language dropdown closes on selection
- [ ] Language dropdown closes on outside click
- [ ] Mobile menu closes on route change
- [ ] No overlap between language selector and other elements

### Fonts
- [ ] Arabic displays with Amiri/Noto Naskh Arabic
- [ ] Urdu native displays with Noto Nastaliq Urdu
- [ ] Urdu romanized displays with Inter (Latin)
- [ ] English displays with Inter

### Currencies
- [ ] INR (₹) appears in currency selector
- [ ] IDR (Rp) appears in currency selector
- [ ] Selecting INR updates input symbols
- [ ] Selecting IDR updates input symbols

---

## Known Issues / TODOs

### High Priority
1. **Complete Urdu native translations** - Currently placeholder fallback
2. **Translate all page components** - Only Navbar done
3. **Audit all components for RTL** - Replace directional classes
4. **Flip directional icons** - Chevrons, arrows in RTL mode

### Medium Priority
5. **Test sticky positioning in RTL** - Donate/References pages
6. **Test Calculate form in RTL** - Input fields, summary sidebar
7. **Test mobile layouts in RTL** - All pages

### Low Priority
8. **Add language-specific number formatting** - Arabic numerals vs Latin
9. **Consider date/time formatting** - RTL contexts
10. **Add keyboard navigation** - Language dropdown

---

## File Structure

```
src/
├── locales/
│   ├── en.ts           # English (complete)
│   ├── ar.ts           # Arabic (complete)
│   ├── ur.ts           # Urdu native (placeholder)
│   ├── ur-rm.ts        # Urdu romanized (complete)
│   └── index.ts        # Exports
├── contexts/
│   └── i18n.tsx        # Provider + hooks
├── constants/
│   └── invariants.ts   # Language-independent data
└── utils/
    └── currency.ts     # Updated with INR/IDR
```

---

## Next Steps

1. **Translate remaining components** (Calculate, Contact, Donate, etc.)
2. **Audit all components for RTL classes**
3. **Complete Urdu native translations**
4. **Test thoroughly in all 4 languages**
5. **Fix any layout issues discovered**

---

## Migration Script Example

To help migrate components, search for:
- `import { [A-Z_]+ } from "../constants/content"`
- Replace with `const t = useT();`
- Update all references

**VS Code regex find:**
```
([A-Z_]+)\.([a-z]+)
```

**Replace with:**
```
t.$1.$2
```

(Note: Manual verification still required)
