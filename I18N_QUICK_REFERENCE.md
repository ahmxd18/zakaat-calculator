# i18n Quick Reference Card

## 🚀 Quick Start

### 1. Import the Hook
```typescript
import { useT } from '../contexts/i18n';
```

### 2. Use in Component
```typescript
function MyComponent() {
  const t = useT();
  return <h1>{t.home.hero.heading}</h1>;
}
```

### 3. Access Direction/Language
```typescript
import { useTranslation } from '../contexts/i18n';

const { language, direction, setLanguage } = useTranslation();
```

---

## 📖 Translation Keys

```typescript
t.nav.brand              // "Zakaat" | "زكاة" | etc.
t.nav.links.home         // "Home" | "الرئيسية" | etc.
t.home.hero.heading      // Homepage hero
t.calculate.heading      // Calculate page title
t.faqs.heading           // FAQs page title
t.about.mission          // About mission text
t.contact.heading        // Contact page title
t.donate.heading         // Donate page title
t.references.heading     // References page title
t.notFound.title         // 404 page title
t.common.loading         // "Loading..." etc.
```

See `src/locales/en.ts` for complete structure.

---

## 🔄 RTL Classes

### ❌ Wrong (Directional)
```typescript
className="ml-4 mr-2 pl-6 pr-3 left-0 right-0 text-left border-r-2"
```

### ✅ Right (Logical)
```typescript
className="ms-4 me-2 ps-6 pe-3 start-0 end-0 text-start border-e-2"
```

### Mapping
| Old | New | Meaning |
|-----|-----|---------|
| `ml-*` | `ms-*` | margin-start |
| `mr-*` | `me-*` | margin-end |
| `pl-*` | `ps-*` | padding-start |
| `pr-*` | `pe-*` | padding-end |
| `left-*` | `start-*` | position start |
| `right-*` | `end-*` | position end |
| `text-left` | `text-start` | align start |
| `text-right` | `text-end` | align end |

---

## 🔃 Icon Flipping

### Directional Icons (Need Flip)
```typescript
import { useTranslation } from '../contexts/i18n';
import { cn } from '../utils/cn';

const { direction } = useTranslation();

<ChevronRight className={cn(direction === 'rtl' && 'rotate-180')} />
<ArrowLeft className={cn(direction === 'rtl' && 'rotate-180')} />
```

### Non-Directional (Don't Flip)
- ✅ Moon, Star, Sun
- ✅ Heart, Info, Settings
- ✅ Home, Search, Menu

---

## 🌐 Language Codes

| Code | Language | Direction | Status |
|------|----------|-----------|--------|
| `en` | English | LTR | ✅ Complete |
| `ar` | Arabic | RTL | ✅ Complete |
| `ur` | Urdu (native) | RTL | ⚠️ Placeholder |
| `ur-rm` | Urdu (Roman) | LTR | ✅ Complete |

---

## 🎨 Fonts

```css
/* Auto-applied based on lang attribute */
[lang="ar"] { font-family: Amiri, ... }
[lang="ur"] { font-family: Noto Nastaliq Urdu, ... }
```

No manual font changes needed!

---

## 💾 Language-Independent Data

```typescript
import { INVARIANT_CONSTANTS } from '../constants/invariants';

INVARIANT_CONSTANTS.contact.email        // hello@zakaatcalculator.app
INVARIANT_CONSTANTS.contact.location     // London, United Kingdom
INVARIANT_CONSTANTS.currencies           // ['GBP', 'USD', ...]
INVARIANT_CONSTANTS.nisaab.goldGrams     // 85
INVARIANT_CONSTANTS.zakaatRate           // 2.5
```

---

## 🔧 Common Patterns

### Conditional Text
```typescript
const t = useT();
const message = isError ? t.common.error : t.common.loading;
```

### Dynamic Content
```typescript
<p>{t.calculate.summary.zakaatRate}</p>  // "2.5% of your wealth"
```

### Conditional Direction
```typescript
const { direction } = useTranslation();
<div className={direction === 'rtl' ? 'text-end' : 'text-start'} />
```

---

## 🐛 Debugging

### Check Current Language
```typescript
const { language } = useTranslation();
console.log('Current language:', language);
```

### Verify Translation
```typescript
const t = useT();
console.log('Home heading:', t.home.hero.heading);
```

### Check Direction
```typescript
const { direction } = useTranslation();
console.log('Direction:', direction);
console.log('HTML dir:', document.documentElement.dir);
```

---

## ⚡ Performance Tips

- ✅ `useT()` is lightweight - use freely
- ✅ Translations cached in context
- ✅ No re-renders on unrelated updates
- ⚠️ Avoid calling `setLanguage` in loops

---

## 🚫 Common Mistakes

### ❌ Static Imports
```typescript
import { HOME } from '../constants/content';
return <h1>{HOME.hero.heading}</h1>;  // NOT TRANSLATED
```

### ✅ Dynamic Translations
```typescript
const t = useT();
return <h1>{t.home.hero.heading}</h1>;  // ✓ TRANSLATED
```

---

### ❌ Hard-coded Direction
```typescript
<div className="text-left ml-4" />  // BREAKS IN RTL
```

### ✅ Logical Properties
```typescript
<div className="text-start ms-4" />  // ✓ WORKS IN RTL
```

---

### ❌ Forgetting Icon Flip
```typescript
<ArrowRight />  // POINTS WRONG WAY IN RTL
```

### ✅ Conditional Rotation
```typescript
const { direction } = useTranslation();
<ArrowRight className={cn(direction === 'rtl' && 'rotate-180')} />
```

---

## 📚 More Info

- Full structure: `src/locales/en.ts`
- Implementation guide: `I18N_IMPLEMENTATION.md`
- Testing checklist: `I18N_TESTING_CHECKLIST.md`
- Summary: `I18N_SUMMARY.md`

---

## 🎯 Migration Checklist

When translating a component:
- [ ] Import `useT()` or `useTranslation()`
- [ ] Remove static content imports
- [ ] Replace all text with `t.section.key`
- [ ] Check for directional classes (`ml`, `mr`, etc.)
- [ ] Replace with logical equivalents (`ms`, `me`, etc.)
- [ ] Check for directional icons
- [ ] Add conditional rotation for RTL
- [ ] Test in all 4 languages
- [ ] Verify RTL layout

---

**Remember:** The goal is that switching language should "just work" with zero layout bugs!
