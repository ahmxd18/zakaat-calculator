# i18n Testing Checklist

## ✅ Language Switching

### Desktop
- [ ] Language dropdown visible in Navbar
- [ ] Dropdown shows current language
- [ ] Dropdown opens on click
- [ ] All 4 languages listed (English, العربية, اردو, Urdu (Roman))
- [ ] Current language highlighted/bold
- [ ] Clicking language closes dropdown and switches
- [ ] Clicking outside dropdown closes it
- [ ] Language switch updates all visible text (except invariants)

### Mobile
- [ ] Hamburger menu opens
- [ ] Language selector visible at bottom
- [ ] 4 languages in 2×2 grid
- [ ] Touch targets large enough (min 44×44px)
- [ ] Selected language highlighted
- [ ] Switching language works
- [ ] Menu doesn't overlap with language selector

### Persistence
- [ ] Selected language saved to localStorage
- [ ] Language persists after page reload
- [ ] Language persists across navigation
- [ ] Default is English on first visit
- [ ] Opening in new tab/window uses saved language

---

## ✅ RTL Layout

### Direction Switching
- [ ] Switching to Arabic sets `dir="rtl"` on `<html>`
- [ ] Switching to Urdu (native) sets `dir="rtl"`
- [ ] Switching to Urdu (Roman) sets `dir="ltr"`
- [ ] Switching to English sets `dir="ltr"`
- [ ] No layout shift when switching
- [ ] No scrollbar jump when switching
- [ ] No flicker when switching

### Navbar (RTL Mode)
- [ ] Logo stays on start side (right in RTL)
- [ ] Nav links properly spaced
- [ ] Language dropdown aligned correctly
- [ ] Mobile menu slides from start side (left in RTL)
- [ ] Mobile menu close button on correct side
- [ ] Mobile nav links aligned correctly
- [ ] Language grid in mobile menu aligned correctly

### Icons (RTL Mode)
- [ ] Back arrow flips in NotFound page
- [ ] Chevrons flip where needed
- [ ] Directional arrows flip appropriately
- [ ] Non-directional icons don't flip (Moon logo, etc.)

---

## ✅ Fonts

### Arabic (ar)
- [ ] Text displays in Amiri or Noto Naskh Arabic
- [ ] Font looks proper (not Latin fallback)
- [ ] Arabic script renders correctly
- [ ] No broken characters

### Urdu Native (ur)
- [ ] Text displays in Noto Nastaliq Urdu
- [ ] Urdu script renders correctly
- [ ] Nastaliq style apparent
- [ ] No broken characters

### Urdu Romanized (ur-rm)
- [ ] Text displays in Inter (Latin font)
- [ ] Same font as English
- [ ] Readable and consistent

### English (en)
- [ ] Text displays in Inter
- [ ] Display headings in Cormorant Garamond
- [ ] Consistent with original design

---

## ✅ Currency Support

### Selector
- [ ] INR (₹) appears in dropdown
- [ ] IDR (Rp) appears in dropdown
- [ ] All 10 currencies listed: GBP, USD, EUR, AED, SAR, PKR, BDT, MYR, INR, IDR

### Functionality (Calculate Page)
- [ ] Selecting INR updates input symbols to ₹
- [ ] Selecting IDR updates input symbols to Rp
- [ ] Symbol updates live (no refresh needed)
- [ ] Calculations work correctly with new currencies
- [ ] Summary shows correct currency symbol

---

## ✅ Translations

### Navbar (✅ Complete)
- [ ] Brand name translates
- [ ] Brand tagline translates
- [ ] All nav links translate
- [ ] CTA button translates
- [ ] Language label translates

### NotFound Page (✅ Complete)
- [ ] Page title translates
- [ ] Description translates
- [ ] "Back to Home" button translates
- [ ] "Go Back" button translates
- [ ] Arrow icon flips in RTL

### Remaining Pages (🔄 Pending)
- [ ] Calculate page
- [ ] Home page
- [ ] FAQs page
- [ ] About page
- [ ] Contact page
- [ ] Donate page
- [ ] References page
- [ ] Footer

---

## ✅ Language-Independent Content

### Should NOT Translate
- [ ] Email: hello@zakaatcalculator.app
- [ ] Location: London, United Kingdom
- [ ] Currency codes: GBP, USD, etc.
- [ ] Nisaab values: 85g, 595g
- [ ] Zakaat rate: 2.5%

### Verify in All Languages
- [ ] Email displays consistently
- [ ] Phone/contact info consistent
- [ ] Currency codes unchanged
- [ ] Numerical values unchanged

---

## ✅ Specific Page Tests

### Calculate Page
- [ ] Currency selector translated
- [ ] Section labels translated
- [ ] Field labels translated
- [ ] Placeholders translated
- [ ] Summary sidebar translated
- [ ] Info notes translated
- [ ] Button labels translated
- [ ] RTL: Input fields aligned correctly
- [ ] RTL: Currency symbol on correct side
- [ ] RTL: Summary sidebar on correct side

### Home Page
- [ ] Hero section translated
- [ ] Feature cards translated
- [ ] Stats section translated
- [ ] CTA banner translated
- [ ] RTL: Hero text aligned
- [ ] RTL: Feature cards laid out correctly

### FAQs Page
- [ ] Page heading translated
- [ ] All questions translated
- [ ] All answers translated
- [ ] CTA section translated
- [ ] RTL: Accordions work correctly
- [ ] RTL: Text alignment proper

### Contact Page
- [ ] Form labels translated
- [ ] Placeholders translated
- [ ] Submit button translated
- [ ] Info section translated
- [ ] Disclaimer translated
- [ ] RTL: Form fields aligned
- [ ] RTL: Info cards aligned

### Donate Page
- [ ] Category filters translated
- [ ] Charity cards translated
- [ ] CTA section translated
- [ ] Disclaimer translated
- [ ] RTL: Filter pills aligned
- [ ] RTL: Cards laid out correctly

### References Page
- [ ] Category tabs translated
- [ ] Methodology section translated
- [ ] Reference cards content (keep Arabic/citations)
- [ ] RTL: Tabs aligned
- [ ] RTL: Cards laid out correctly

### About Page
- [ ] Mission/vision translated
- [ ] Values section translated
- [ ] Team section translated
- [ ] Disclaimers translated
- [ ] RTL: Value cards aligned
- [ ] RTL: Team grid aligned

---

## ✅ Performance

- [ ] No visible delay when switching languages
- [ ] Fonts load without FOUT (Flash of Unstyled Text)
- [ ] No layout thrashing
- [ ] localStorage operations don't block UI
- [ ] Google Fonts load properly

---

## ✅ Accessibility

- [ ] Language switcher keyboard-accessible
- [ ] Dropdown can be opened with Enter/Space
- [ ] Language options can be navigated with arrow keys
- [ ] `lang` attribute set correctly on `<html>`
- [ ] Screen readers announce language change
- [ ] Focus management works in RTL
- [ ] Tab order correct in RTL

---

## ✅ Edge Cases

- [ ] Switching language mid-form doesn't lose data
- [ ] Language preference survives browser close/reopen
- [ ] Works in private/incognito mode (localStorage available)
- [ ] Works with JavaScript disabled (graceful degradation)
- [ ] Long text doesn't break layout in any language
- [ ] Mixed LTR/RTL content handles correctly (if any)

---

## ✅ Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## ✅ Responsive Design

### Desktop (≥1024px)
- [ ] Language dropdown fits
- [ ] All nav links visible
- [ ] No wrapping or overflow

### Tablet (768-1023px)
- [ ] Language dropdown works
- [ ] Layout adapts correctly

### Mobile (≤767px)
- [ ] Hamburger menu works
- [ ] Language grid fits
- [ ] Touch targets appropriate
- [ ] No horizontal scroll

---

## 🐛 Known Issues to Fix

1. **Urdu native translations** - Currently falls back to English
2. **Remaining pages untranslated** - 7 pages still use static content
3. **RTL not fully audited** - Only Navbar + NotFound have RTL fixes
4. **Icon flipping incomplete** - Many directional icons need conditional rotation
5. **Sticky positioning in RTL** - Need to verify Donate/References pages

---

## 📋 Testing Protocol

1. **Start with English** - Verify everything works
2. **Switch to Arabic** - Check RTL layout and translations
3. **Switch to Urdu (Roman)** - Verify LTR with Urdu text
4. **Switch to Urdu (native)** - Check RTL and fonts (currently placeholder)
5. **Switch back to English** - Verify no residual issues
6. **Test on mobile** - Repeat above on small screen
7. **Test persistence** - Reload, navigate, close/reopen browser

---

## ✅ Sign-off Criteria

Before marking i18n as production-ready:
- [ ] All pages translated
- [ ] All pages RTL-audited
- [ ] All icons flip correctly
- [ ] No layout bugs in any language
- [ ] Fonts load properly
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Mobile thoroughly tested
- [ ] Documentation complete

---

**Status: 🟡 Partially Complete**
- ✅ Infrastructure: 100%
- ✅ Navbar: 100%
- ✅ NotFound: 100%
- 🔄 Other Pages: 0%
- 🔄 RTL Audit: ~20%
- ⚠️  Urdu Native: Placeholder
