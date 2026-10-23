# Zakaat Calculation: Four Schools of Fiqh — Reference Document

> **Status:** Research reference and implementation guide. Phase 2 school-specific calculation logic is implemented in the calculator; scholarly verification remains recommended.
> **Scope:** Differences in Zakaat al-Māl (wealth zakaat). Zakaat al-Fitr, agricultural zakaat, and livestock zakaat are out of scope for Phase 1.

---

## Background: Why Schools Differ

The four Sunni schools (madhhabs) share the same primary sources — Qur'an, Sunnah, and Ijmā' (scholarly consensus). Differences arise from:
- **Different Hadith weighting** — each school prioritised certain chains of narration.
- **Different analogical reasoning (Qiyās)** — extending rulings to new categories of wealth.
- **Different interpretations of "prepared for use"** — this drives the jewellery disagreement most visibly.

The core structure is identical: Nisāb threshold → Hawl (one lunar year) → 2.5% on net zakatable wealth. The differences are in *what counts*, *what deducts*, and *how Nisāb is set*.

---

## 1. The Hanafi School (Imam Abu Hanifa, d. 767 CE)

**Geographical prevalence:** South Asia (Pakistan, India, Bangladesh), Central Asia, Turkey, much of the Arab world.

### Nisāb
- Uses **gold (87.48 g / 20 mithqāl)** or **silver (612.36 g / 200 dirhams)** — whichever the person primarily owns.
- Contemporary application: use the **lower of the two monetary values** (typically silver), making it the most inclusive threshold.
- Note: Some Hanafi scholars cite 85 g gold / 595 g silver based on contemporary scholarship (AAOIFI/OIC); the classical figures are 87.48 g / 612.36 g.

### Gold & Silver Jewellery
- **Zakaat is obligatory on ALL gold and silver jewellery** — worn, stored, or gifted.
- No exemption for personal-use jewellery. This is the strictest position.
- Source: *Fatāwā 'Ālamgīrī*, *Radd al-Muḥtār* (Ibn Ābidīn).

### Debt Deduction
- **All immediately payable debts may be deducted** from zakatable wealth before calculating.
- This includes bills due, short-term loans, and immediate obligations.
- Long-term debts (e.g. mortgages beyond the current year's instalment) are **not** deductible.

### Hawl (Lunar Year)
- Zakaat becomes due at the **end** of the hawl. If wealth dropped below Nisāb mid-year but recovered by year-end, Zakaat is still due (majority Hanafi opinion).
- The hawl begins when wealth first reaches Nisāb.

### Business Assets
- **Trade goods (urūḍ al-tijāra)** are zakatable at current market value.
- Business premises and equipment used in the business are **not** zakatable.
- Receivables expected to be paid are zakatable.

### Cash & Savings
- All cash, bank savings, and foreign currency holdings at current exchange rate are zakatable.

### Investments / Stocks
- Shares held for **trading**: zakatable on full market value.
- Shares held for **income/dividends** (long-term): zakatable on the zakatable assets *within* the company's balance sheet, proportional to ownership — this is complex and a qualified scholar should advise.
- Contemporary position (AAOIFI): apply 25–40% of market value as a simplified rule for mixed portfolios.

### Cryptocurrency
- Contemporary scholars (AAOIFI, OIC Fiqh Academy): crypto is treated as trade assets (urūḍ al-tijāra).
- Zakatable at current market value if held for trading / storing value.

### Pension Funds
- **Accessible pension** (where you can withdraw): zakatable on the accessible portion.
- **Locked pension** (no access until retirement): opinion differs; cautious position is zakatable when accessible.

### Summary Table

| Category | Hanafi Rule |
|---|---|
| Nisāb standard | Silver (lower, more inclusive) — or gold if that's primary holding |
| Jewellery | **All** gold/silver zakatable regardless of use |
| Debt deduction | Yes — immediate debts deductible |
| Hawl drop mid-year | Zakaat still due if Nisāb met at start and end |
| Rate | 2.5% |

---

## 2. The Maliki School (Imam Malik ibn Anas, d. 795 CE)

**Geographical prevalence:** North Africa (Morocco, Algeria, Tunisia, Libya), West Africa, parts of the Gulf.

### Nisāb
- Uses **gold (85 g)** or **silver (595 g)** — standard contemporary figures.
- If a person holds mixed gold and silver, their combined value is assessed.

### Gold & Silver Jewellery
- **Zakaat is NOT due on jewellery intended for personal use** — worn regularly by women.
- Jewellery stored purely as wealth (not worn) is zakatable.
- This is the **lenient position** shared with Shafi'i and Hanbali on this point.
- Source: *al-Mudawwana* (Imam Malik), *Bidāyat al-Mujtahid* (Ibn Rushd).

### Debt Deduction
- **Debts may be deducted** — Maliki position is relatively permissive.
- Both immediate and some future-dated debts can be deducted, provided they are certain obligations.
- A debt to oneself (money owed by others) is counted as an asset if recovery is expected.

### Hawl (Lunar Year)
- If wealth drops below Nisāb during the year, **the hawl resets**. A fresh hawl begins when it meets Nisāb again.
- This is stricter than Hanafi (who allow a mid-year dip if endpoints are above Nisāb).

### Business Assets
- Trade goods zakatable at market value.
- Maliki scholars permit valuing inventory at either cost price or market price, depending on circumstance.

### Investments / Stocks
- Similar to Hanafi contemporary application — trade stocks at market value.

### Summary Table

| Category | Maliki Rule |
|---|---|
| Nisāb standard | Either gold or silver; combined holdings assessed together |
| Jewellery | Exempt if worn regularly for personal use |
| Debt deduction | Yes — immediate and certain future debts |
| Hawl drop mid-year | **Hawl resets** if wealth falls below Nisāb |
| Rate | 2.5% |

---

## 3. The Shafi'i School (Imam al-Shafi'i, d. 820 CE)

**Geographical prevalence:** Southeast Asia (Indonesia, Malaysia, Brunei, Philippines), East Africa, parts of Yemen, Egypt.

### Nisāb
- Uses **gold (85 g)** or **silver (595 g)** standard figures.
- If holding *only* gold → use gold Nisāb. If holding *only* silver → use silver Nisāb.
- Unlike Hanafi, mixed holdings are **not automatically combined** — each is assessed against its own Nisāb.

### Gold & Silver Jewellery
- **Zakaat is NOT due on jewellery in permissible personal use** (worn by women as adornment).
- Gold rings for men are generally not permissible in excess, so those are zakatable.
- Jewellery stored as wealth or for trade is zakatable.
- Source: *al-Majmūʿ* (Imam al-Nawawi), *Minhāj al-Ṭālibīn*.

### Debt Deduction
- **Shafi'i school does NOT generally permit debt deduction** from zakatable wealth.
- This is a distinctive and stricter position: your gross wealth is assessed, not net.
- Exception: some later Shafi'i scholars permit deducting debts for which you have pledged an asset (secured debts).

### Hawl (Lunar Year)
- Similar to Maliki: if wealth falls below Nisāb, **the hawl resets**.
- The start of the hawl is the date wealth first reaches Nisāb.

### Business Assets
- Trade inventory zakatable at market value at the end of hawl.
- The Shafi'i school uses *market value* (not cost) at the time of calculation.

### Conditions for Zakaat (distinctive emphasis)
- **Full ownership** (*tamālik tāmm*) is required — wealth held in trust or under encumbrance may not be zakatable.
- **Nisāb must be complete** at both the beginning and end of the hawl — unlike Hanafi.

### Summary Table

| Category | Shafi'i Rule |
|---|---|
| Nisāb standard | Gold or silver separately; Shafi'i often favour gold Nisāb |
| Jewellery | Exempt if in permissible personal use |
| Debt deduction | **No** — gross wealth assessed |
| Hawl drop mid-year | Hawl resets if wealth falls below Nisāb |
| Rate | 2.5% |

---

## 4. The Hanbali School (Imam Ahmad ibn Hanbal, d. 855 CE)

**Geographical prevalence:** Saudi Arabia, Qatar, parts of Iraq and Syria.

### Nisāb
- Uses **gold (85 g)** or **silver (595 g)**.
- If a person holds mixed gold and silver, scholars differ: some combine at gold-equivalent value, others assess separately.

### Gold & Silver Jewellery
- **Zakaat is NOT due on jewellery in permissible personal use** — the position is the same as Maliki and Shafi'i.
- Jewellery held as investment or not regularly worn is zakatable.
- The Hanbali school is more nuanced: it considers **intent** — if jewellery is acquired primarily as a store of value, Zakaat is due.
- Source: *al-Mughnī* (Ibn Qudāma), *Kashshāf al-Qinā'* (al-Bahūtī).

### Debt Deduction
- **Debts may be deducted** — similar to Hanafi and Maliki.
- Immediate debts and those falling due within the year are deductible.
- Long-term liabilities (e.g. mortgage principal beyond the current year) are not deductible.

### Hawl (Lunar Year)
- The Hanbali position is that **the hawl resets if wealth drops below Nisāb**, similar to Maliki/Shafi'i.
- However, Ibn Qudāma notes that a brief dip that immediately recovers may not reset the hawl in the dominant opinion.

### Business Assets
- Trade goods zakatable at market value.
- Hanbali scholars include **real estate acquired for trade** in zakatable assets — this is distinctive.

### Summary Table

| Category | Hanbali Rule |
|---|---|
| Nisāb standard | Gold or silver; intent matters for combined holdings |
| Jewellery | Exempt if in permissible use; intent determines if stored as wealth |
| Debt deduction | Yes — immediate and within-year debts |
| Hawl drop mid-year | Hawl resets if wealth falls below Nisāb |
| Rate | 2.5% |

---

## Cross-School Comparison Matrix

| Topic | Hanafi | Maliki | Shafi'i | Hanbali |
|---|---|---|---|---|
| **Nisāb default** | Silver (lower) | Either | Gold (each separately) | Either |
| **Jewellery (worn)** | ❌ Zakatable | ✅ Exempt | ✅ Exempt | ✅ Exempt (if worn) |
| **Debt deduction** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **Hawl reset on dip** | ❌ No (endpoints matter) | ✅ Yes | ✅ Yes | ✅ Yes |
| **Trade real estate** | ✅ Zakatable | ✅ Zakatable | ✅ Zakatable | ✅ Zakatable (distinctive emphasis) |
| **Business equipment** | ❌ Not zakatable | ❌ Not zakatable | ❌ Not zakatable | ❌ Not zakatable |
| **Receivables** | ✅ If recovery expected | ✅ If recovery expected | ✅ If recovery expected | ✅ If recovery expected |

---

## Contemporary Asset Rulings (Shared Across Schools)

These rulings have been issued by contemporary bodies (OIC Fiqh Academy, AAOIFI) and are broadly accepted across all four schools:

| Asset | Ruling | Notes |
|---|---|---|
| **Stocks (trade)** | Zakatable at market value | Held for capital gain / trading |
| **Stocks (income)** | Zakatable on zakatable assets within company | Complex; simplified: 25% of market value |
| **Cryptocurrency** | Zakatable as trade asset | Market value at calculation date |
| **Pension (accessible)** | Zakatable on accessible portion | Locked pensions: zakatable when accessible |
| **Gold ETFs** | Zakatable at full value | Treated as gold ownership |
| **Business inventory** | Zakatable at market value | Goods held for sale |
| **Personal home** | ❌ Not zakatable | Regardless of value |
| **Personal vehicle** | ❌ Not zakatable | Unless held for trade/resale |
| **Gems (non-gold/silver)** | ❌ Not zakatable | Diamonds, rubies etc. in personal use |

---

## Implementation Notes for the Calculator

### Phase 1: Madhab Selection and Nisāb Standard
- The selected madhab is persisted as `zakaat_madhab`.
- The Nisāb selector defaults to the selected madhab's recommended standard and remains manually overridable.
- `default` remains available as a no-school option and preserves the calculator's original lower-Nisāb, debt-deduction, and no-hawl-gate behavior.

### Phase 2: Full School-Specific Logic (implemented)
The calculator applies these rules per selected school:

```typescript
interface MadhabRules {
  // Jewellery
  jewelleryZakatable: boolean; // Hanafi: true; Maliki/Shafi'i/Hanbali: false (if worn)

  // Debt deduction
  debtDeductionPermitted: boolean; // All except Shafi'i: true

  // Hawl behaviour
  hawlResetsOnDip: boolean; // Hanafi: false; others: true

  // Nisāb standard default
  defaultNisaabStandard: 'lower' | 'gold' | 'silver';

  // Real estate for trade
  tradeRealEstateZakatable: boolean; // All: true (Hanbali emphasises this more)
}
```

The calculation form separately collects stored/non-worn and worn personal-use gold/silver, income-share market value, trade real estate, and hawl start/dip history. The income-share calculation uses the reference's simplified 25% estimate. The hawl date check approximates a lunar year as 354 days; the user supplies whether wealth dipped below Nisāb. Debt inputs must be limited by the user to obligations deductible under the selected school's rules. The Hanbali dip rule is represented as a reset when a dip is reported; the documented brief-dip nuance requires scholarly judgment and is not automated.

The `default` option intentionally does not require hawl inputs, matching the calculator's pre-Phase-2 behavior; it is not a madhab ruling. Personal-use jewellery remains included, debts are deducted, the lower Nisāb is selected by default, and trade real estate is included as a shared trade-asset rule.

### Phase 3 (future): Method-level variations
- **Majority (Jumhūr):** View shared by 3 of 4 schools
- **Conservative:** Most obligations, widest zakatable scope
- **Salafi:** Follows strongest Hadith directly, often close to Hanbali
- **Qur'an + Sunnah citations:** Each ruling cites the daleel (evidence)

---

## Key Sources

| Source | School | Description |
|---|---|---|
| *Fatāwā 'Ālamgīrī* | Hanafi | Comprehensive Hanafi legal encyclopedia |
| *Radd al-Muḥtār* (Ibn Ābidīn) | Hanafi | Authoritative Ottoman-era commentary |
| *al-Mudawwana* (Malik) | Maliki | Primary Maliki source compiled by Sahnun |
| *Bidāyat al-Mujtahid* (Ibn Rushd) | Maliki | Comparative fiqh across schools |
| *al-Majmūʿ* (al-Nawawi) | Shafi'i | Encyclopaedic Shafi'i reference |
| *Minhāj al-Ṭālibīn* (al-Nawawi) | Shafi'i | Standard Shafi'i manual |
| *al-Mughnī* (Ibn Qudāma) | Hanbali | Most comprehensive Hanbali work |
| *Kashshāf al-Qinā'* (al-Bahūtī) | Hanbali | Later authoritative Hanbali reference |
| AAOIFI Shari'ah Standard No. 35 | All | Contemporary standard for Zakaat on financial instruments |
| OIC Islamic Fiqh Academy Resolutions | All | Contemporary rulings on crypto, stocks, pensions |

---

## Verification Notice

⚠️ All scholarly rulings above are drawn from secondary sources and research. Before implementing school-specific calculation logic, every ruling should be verified against primary texts or reviewed by a qualified Islamic scholar. Particularly the contemporary asset rulings (crypto, pension, stocks) have ongoing scholarly discussion and are not yet fully settled in all schools.
