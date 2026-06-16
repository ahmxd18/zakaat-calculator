# Quick Start Guide - Phase 2

## What's New in Phase 2

✅ **11 Bug Fixes** - All layout, content, and UX issues resolved
✅ **Full Zakaat Calculation Engine** - Live real-time calculations with localStorage persistence
✅ **Centralized Architecture** - Shared layout components, constants, and utilities
✅ **Production-Ready Trust Signals** - Placeholder warnings, verification notices, form disclaimers

---

## Running the App

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Testing the Calculator

1. Navigate to http://localhost:5173/calculate
2. Select a currency (symbol updates in all fields)
3. Enter asset values - watch the sidebar update live
4. Try entering values below Nisaab (~£29,750 with current prices)
   - Should show "Below Nisaab threshold — no Zakaat due"
5. Enter values above Nisaab
   - Should calculate 2.5% Zakaat
6. Refresh the page - values should persist (localStorage)
7. Click Reset - should clear everything

---

## Key Files to Know

### Core Calculation
- `src/utils/zakaat.ts` - All calculation logic
- `src/utils/currency.ts` - Currency symbol mappings

### Pages
- `src/pages/Calculate.tsx` - Main calculator with full logic
- All pages now use `PageLayout` wrapper

### Layout System
- `src/constants/layout.ts` - Centralized layout constants
- `src/components/layout/PageLayout.tsx` - Shared page wrapper

### Content
- `src/constants/content.ts` - All user-facing text

---

## Architecture Principles

### 1. No Magic Numbers
❌ Bad: `className="pt-20"`
✅ Good: `import { LAYOUT } from '../constants/layout'` → use `LAYOUT.PAGE_TOP_PADDING`

### 2. Centralized Content
❌ Bad: Hardcoded strings in components
✅ Good: Import from `constants/content.ts`

### 3. Shared Components
❌ Bad: Duplicate `<main className="min-h-screen...">` in every page
✅ Good: `<PageLayout>` wrapper

### 4. Separation of Concerns
- **Business Logic:** `src/utils/zakaat.ts`
- **UI Components:** `src/pages/Calculate.tsx`
- **Styling:** Tailwind classes
- **State:** React hooks

---

## localStorage Schema

```typescript
// Key: "zakaat_calculator_data"
{
  "cash_on_hand": 0,
  "bank_savings": 0,
  "foreign_cash": 0,
  "gold_grams": 0,
  "silver_grams": 0,
  "stocks": 0,
  "crypto": 0,
  "pension": 0,
  "stock_inventory": 0,
  "receivables": 0,
  "debts_owed": 0,
  "bills_due": 0
}
```

**Privacy Note:** All data stored client-side only. Never sent to any server.

---

## Calculation Formula

```typescript
// 1. Calculate Nisaab (use lower of gold/silver)
goldNisaab = 85g × goldPricePerGram
silverNisaab = 595g × silverPricePerGram
nisaabThreshold = Math.min(goldNisaab, silverNisaab)

// 2. Calculate total assets
totalAssets = 
  cash_on_hand + bank_savings + foreign_cash +
  (gold_grams × goldPricePerGram) +
  (silver_grams × silverPricePerGram) +
  stocks + crypto + pension +
  stock_inventory + receivables

// 3. Calculate net wealth
netZakaatableWealth = totalAssets - (debts_owed + bills_due)

// 4. Calculate Zakaat
if (netZakaatableWealth >= nisaabThreshold) {
  zakaatDue = netZakaatableWealth × 0.025  // 2.5%
} else {
  zakaatDue = 0
}
```

---

## Next Steps (Phase 3)

See detailed guides:
- `API_INTEGRATION_GUIDE.md` - Live gold/silver prices
- `PERFORMANCE_NOTES.md` - Image optimization & build config

### Priority Enhancements:
1. **Optimize hero-pattern.png** (1.9MB → <20KB) - CRITICAL
2. **Integrate live metal prices API** (GoldAPI.io or Metals-API)
3. **Connect contact form** (Formspree or Resend)
4. **Add Nisaab standard toggle** (gold/silver/lower)
5. **Manual price override option**
6. **Payment gateway integration** (for Donate page)

---

## Development Tips

### Hot Reload
Vite's HMR is lightning-fast. Changes appear instantly without full page refresh.

### Type Safety
All calculation inputs/outputs are fully typed. TypeScript will catch errors.

### Component Structure
```
PageLayout (handles pt-20 padding)
  └─ Container (max-width + responsive padding)
      └─ Your content
```

### Adding a New Field
1. Add to `AssetValues` interface in `src/utils/zakaat.ts`
2. Add to `CALCULATE.sections` in `src/constants/content.ts`
3. Update `calculateTotalAssets()` or `calculateTotalDeductions()`
4. Update `getInitialValues()` in `Calculate.tsx`

That's it! The rest (state, persistence, calculation) happens automatically.

---

## Troubleshooting

### "Module not found" errors
```bash
npm install
```

### localStorage not working
Check browser privacy settings - localStorage may be disabled in private/incognito mode.

### Calculations seem wrong
1. Check console for errors
2. Verify `nisaabPrices` values (currently hardcoded to £50/£0.6)
3. Test with known values:
   - 85g gold @ £50/g = £4,250 (gold Nisaab)
   - 595g silver @ £0.60/g = £357 (silver Nisaab)
   - Lower = £357 → Any wealth ≥ £357 triggers Zakaat

### Pages not using PageLayout
All pages should now use `<PageLayout>` wrapper. Check imports.

---

## Code Quality

✅ No magic numbers
✅ Centralized constants
✅ Shared components
✅ Type-safe calculations
✅ Privacy-safe (localStorage only)
✅ Real-time updates
✅ Accessible forms
✅ Mobile-responsive

---

## Questions?

Check documentation:
- `PHASE_2_SUMMARY.md` - What changed
- `API_INTEGRATION_GUIDE.md` - Future enhancements
- `PERFORMANCE_NOTES.md` - Optimization tasks
