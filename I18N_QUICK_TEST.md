# Quick Test Guide - i18n Implementation

## 🏃 Quick Start

### 1. Start the Dev Server
```bash
cd "d:\Zakaat Calculator"
npm run dev
```

### 2. Open Browser
Navigate to `http://localhost:5173`

---

## ✅ What Should Work Now

### Test 1: Language Switcher (Desktop)
1. Look at the Navbar (top right)
2. You should see a language dropdown next to "Calculate Now" button
3. Click the dropdown
4. See 4 languages: English, العربية, اردو, Urdu (Roman)
5. Click "العربية" (Arabic)
6. **Expected:** 
   - Navbar text changes to Arabic
   - Layout flips to RTL
   - Mobile menu icon moves to left side
   - No errors in console

### Test 2: Language Switcher (Mobile)
1. Resize browser to mobile (< 768px) or open DevTools mobile view
2. Click hamburger menu (☰)
3. Scroll to bottom
4. See language selector grid (2×2)
5. Click any language
6. **Expected:**
   - Menu text updates
   - Menu closes
   - Language persists

### Test 3: Language Persistence
1. Switch to Arabic
2. Refresh the page (F5)
3. **Expected:**
   - Page loads in Arabic
   - RTL layout maintained
   - No flicker or layout shift

### Test 4: RTL Layout
1. Switch to Arabic (العربية)
2. **Expected:**
   - `<html dir="rtl">` in DOM inspector
   - Logo stays on the right (start side)
   - Menu items align to right
   - Language dropdown aligns to left
   - Mobile menu slides from left side

### Test 5: Fonts
1. Switch to Arabic
2. Inspect any text element
3. **Expected:**
   - Font family includes "Amiri" or "Noto Naskh Arabic"
   - Arabic characters render correctly

### Test 6: 404 Page Translation
1. Navigate to `/non-existent-page`
2. Switch language using top nav
3. **Expected:**
   - "Page not found" text translates
   - "Back to Home" button translates
   - "Go Back" button translates
   - Arrow flips in RTL mode

### Test 7: Currency Addition
1. Navigate to `/calculate`
2. Find currency dropdown
3. **Expected:**
   - INR (₹) visible in list
   - IDR (Rp) visible in list
   - Selecting INR updates symbols to ₹
   - Selecting IDR updates symbols to Rp

---

## ❌ What Won't Work Yet

### Known Limitations:
- ❌ Calculate page not translated (still English)
- ❌ Home page not translated (still English)
- ❌ FAQs page not translated (still English)
- ❌ About page not translated (still English)
- ❌ Contact page not translated (still English)
- ❌ Donate page not translated (still English)
- ❌ References page not translated (still English)
- ❌ Footer not translated (still English)

Only **Navbar** and **NotFound (404)** page are fully translated.

---

## 🐛 Troubleshooting

### Error: "useTranslation must be used within I18nProvider"
**Solution:** This should be fixed now. Clear browser cache and restart dev server.

### Language doesn't persist after reload
**Check:** 
1. Open DevTools → Application → Local Storage
2. Look for key `zakaat_language`
3. Should contain: `en`, `ar`, `ur`, or `ur-rm`
4. If missing, check browser privacy settings (localStorage might be disabled)

### RTL layout looks broken
**Check:**
1. Open DevTools → Elements
2. Find `<html>` tag
3. Should have `dir="rtl"` when Arabic/Urdu selected
4. If missing, check console for errors

### Fonts not loading
**Check:**
1. Open DevTools → Network
2. Filter by "font"
3. Should see Google Fonts requests (Amiri, Noto Naskh Arabic, Noto Nastaliq Urdu)
4. If 404 errors, check index.html font links

### Language dropdown not appearing
**Check:**
1. Screen width > 1024px for desktop view
2. Or hamburger menu on mobile
3. Check console for import errors

---

## 🧪 Manual Testing Checklist

### Desktop (≥1024px)
- [ ] Language dropdown visible
- [ ] Dropdown opens/closes correctly
- [ ] All 4 languages listed
- [ ] Selected language highlighted
- [ ] Switching updates Navbar text
- [ ] Switching updates 404 page text
- [ ] Arabic/Urdu switch to RTL
- [ ] English/Urdu(Roman) stay LTR
- [ ] No console errors

### Mobile (<768px)
- [ ] Hamburger menu opens
- [ ] Language grid visible at bottom
- [ ] 4 languages in 2×2 grid
- [ ] Touch targets comfortable
- [ ] Switching updates menu text
- [ ] Menu closes after language switch
- [ ] RTL/LTR switching works
- [ ] No console errors

### RTL Specific
- [ ] Arabic: `dir="rtl"`, `lang="ar"`
- [ ] Urdu native: `dir="rtl"`, `lang="ur"`
- [ ] Urdu Roman: `dir="ltr"`, `lang="ur-rm"`
- [ ] English: `dir="ltr"`, `lang="en"`
- [ ] Mobile menu slides from correct side
- [ ] Logo position correct
- [ ] No mirrored icons (except arrows)
- [ ] Back arrow in 404 page flips

### Persistence
- [ ] Refresh maintains language
- [ ] Navigate between pages maintains language
- [ ] Close and reopen tab maintains language
- [ ] Open in new tab uses saved language

---

## 📸 Visual Verification

### English (LTR)
```
[Logo] Home Calculate Donate About... [Lang ▼] [Calculate Now]
```

### Arabic (RTL)
```
[احسب الآن] [▼ اللغة] ...الرئيسية احسب تبرع عنا [Logo]
```

Mobile menu should slide from **right in LTR**, **left in RTL**.

---

## 🎯 Success Indicators

### All Green ✅
- Language switcher works (desktop & mobile)
- 4 languages available
- Navbar translates
- 404 page translates
- RTL layout correct
- Fonts load properly
- Persistence works
- No console errors

### Partially Working 🟡
- Some features work but others don't
- Check browser console for errors
- Review I18N_FINAL_STATUS.md

### Not Working ❌
- Many errors in console
- Language switcher not visible
- Translations don't update
- Review implementation, restart dev server

---

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation:**
   - `I18N_FINAL_STATUS.md` - Current status
   - `I18N_IMPLEMENTATION.md` - Technical details
   - `I18N_TESTING_CHECKLIST.md` - Full test list

2. **Check Console:**
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab for failed requests

3. **Check DOM:**
   - Inspect `<html>` tag
   - Verify `dir` and `lang` attributes
   - Check localStorage for `zakaat_language`

4. **Try Clean Start:**
   ```bash
   # Clear cache
   npm run build
   # Restart dev server
   npm run dev
   # Hard refresh browser (Ctrl+Shift+R)
   ```

---

## ✨ What's Next?

Once you verify everything works:

1. **Translate Calculate page** - Most important for users
2. **Translate Home page** - First impression
3. **Translate Footer** - Visible everywhere
4. **Test thoroughly** - All pages × 4 languages

See `I18N_FINAL_STATUS.md` for detailed roadmap.

---

**Expected Time:** 5-10 minutes to verify basic functionality

**Current Implementation:** ~20% complete (infrastructure + 2 components)

**Ready for:** Component migration and content translation
