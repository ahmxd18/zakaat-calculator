# Hanafi: implemented calculation and scholar review worksheet

**Purpose:** explain the software as it currently behaves, using a worked example.
**Review status:** not independently certified. This is not a statement that every
rule below is the authoritative Hanafi position. Please correct the implementation
assumptions, applicability and exceptions as needed.

Profile identifier: `hanafi`. The profile name selects a small set of policy flags, not a complete fiqh decision system.

## 1. Brief explanation of implemented rules

| Decision | Current software behaviour | Inline example |
| --- | --- | --- |
| Nisab choice | `lower` by default; user may explicitly override it. | 85 g gold = 850,000; 595 g silver = 59,500 INR. |
| Worn personal-use jewellery | Included. | 10 g worn gold + 50 g worn silver contributes 105,000 INR. |
| Debts and bills | Both entered totals are deducted. | 125,000 INR entered; 125,000 applied. |
| Hawl gate | A completed hawl is required before a positive payable amount is returned. | Missing start date returns `incomplete` and zero payable. |
| Below-nisab dip | The Boolean dip flag does not reset the hawl. | With otherwise completed dates and a dip flag, status becomes `complete`; the normal calculation continues. |
| Income shares | Only 25% of their entered market value is included for every profile. | 80,000 × 25% = 20,000 INR included, not 20,000 INR payable. |
| Trade property | Included at the entered eligible value. | 200,000 INR contributes 200,000 INR. |
| Rate | 2.5% of the entire eligible net wealth, not just the excess over nisab. | 1,350,000 × 0.025 = 33,750.00 INR. |

These are school-profile configuration decisions in
[`MADHAB_RULES`](../../src/constants/madhab.ts), applied by
[`calculateZakaat`](../../src/utils/zakaat.ts). A manual nisab override takes
precedence over the profile's initial recommendation; **Follow school default**
clears that override. A previously chosen override can survive a school change.
The worked example below assumes no override.

## 2. Assumed scenario and inputs

A person is reviewing eligible wealth on **26 October 2026**. Every monetary value
below is INR. Assumed gold price is **10,000 INR per gram** and silver price is
**100 INR per gram**. These are invented teaching values, not market quotations.
All amounts are assumed fully owned, eligible and non-overlapping; the software
does not establish those conditions independently.

Metal quantities are **fine-metal grams**, after purity adjustment and excluding
stones/nonmetal material. For example, 24 g of 22-karat gold metal corresponds to
22 g fine gold (24 × 22 ÷ 24). This example assumes an accurate purity declaration;
it does not implement a separate alloy-assessment rule.

| Input identifier | Meaning / assumption | Entered value |
| --- | --- | ---: |
| `cash_on_hand` | Cash held directly | 200,000 |
| `bank_savings` | Bank balances entered as eligible savings | 300,000 |
| `foreign_cash` | Foreign cash already converted to INR | 50,000 |
| `gold_grams` | Stored/non-worn pure gold equivalent | 20 g |
| `silver_grams` | Stored/non-worn pure silver equivalent | 100 g |
| `worn_gold_grams` | Worn personal-use pure gold equivalent | 10 g |
| `worn_silver_grams` | Worn personal-use pure silver equivalent | 50 g |
| `stocks` | Trading shares at the entered market value | 150,000 |
| `income_stocks` | Income-share market value before the fixed 25% estimate | 80,000 |
| `crypto` | Eligible cryptocurrency value | 30,000 |
| `pension` | Accessible pension portion entered by the user | 50,000 |
| `stock_inventory` | Trade inventory at the entered eligible value | 120,000 |
| `receivables` | Money expected to be recovered, entered once | 40,000 |
| `trade_real_estate` | Property held for trade/resale | 200,000 |
| `debts_owed` | Debts the user believes are eligible deductions | 100,000 |
| `bills_due` | Bills due now, excluding amounts already in debts | 25,000 |

Assumed hawl inputs:

- Start date: `2025-10-01`.
- Optional confirmed anniversary: `2026-09-21`.
- Reported dip below nisab during this current hawl: `false`.
- Calculation date: `2026-10-26`.

The anniversary is **assumed supplied and independently confirmed by the user**;
this worksheet does not claim that those Gregorian dates are an authoritative
Hijri conversion. It deliberately illustrates a 355-day interval. Without an
anniversary, the software instead adds exactly **354 days** to the start date.

## 3. Step-by-step result

### Step 1 — Validate the inputs

All 16 known asset fields must contain finite nonnegative numbers, each no more
than 1 trillion. Both prices must be positive finite numbers within that limit.
Unknown fields, missing fields and invalid numbers are rejected; computed values
above 100 trillion are rejected. Financial-input errors block the UI result
rather than establishing zero payable.

The browser price pipeline separately requires a complete same-currency quote,
no older than one hour, or explicitly confirmed manual prices. Manual prices
expire after one hour and are not saved across reloads. The pure calculation
function receives numbers; it does not fetch prices or independently inspect
quote provenance or religious eligibility.

### Step 2 — Add cash and bank balances

```text
cash = 200,000 + 300,000 + 50,000 = 550,000 INR
       cash      bank      already-converted foreign cash
```

### Step 3 — Value gold and silver

```text
stored gold   = 20 g × 10,000 = 200,000 INR
stored silver = 100 g × 100  =  10,000 INR
stored metals total         = 210,000 INR

worn gold     = 10 g × 10,000 = 100,000 INR
worn silver   = 50 g × 100    =   5,000 INR
worn metals total           = 105,000 INR before the profile inclusion rule
```

For `hanafi`, worn jewellery contributes **105,000 INR**.

### Step 4 — Add investments

```text
income-share amount included = 80,000 × 0.25 = 20,000 INR
investments = 150,000 trading shares + 20,000 income-share estimate
            + 30,000 crypto + 50,000 accessible pension
            = 250,000 INR
```

The 25% figure estimates the **asset amount included**, not the Zakaat rate. This
is a shared, fixed simplification needing scholarly review. The engine does not
read company balance sheets, identify investment intent or establish pension
accessibility; the user classifies these amounts before entry.

### Step 5 — Add business assets

```text
business = 120,000 inventory + 40,000 recoverable receivables
         + 200,000 trade property = 360,000 INR
```

Personal-use homes, vehicles and other non-eligible property should not be entered
in these trade fields. Recoverability, intention and valuation are user assertions.

### Step 6 — Aggregate assets and apply deductions

```text
totalAssets = 550,000 cash + 210,000 stored metals
            + 105,000 included worn metals
            + 250,000 investments + 360,000 business
            = 1,475,000 INR

totalDeductions    = 100,000 debts + 25,000 bills = 125,000 INR
deductionsApplied = 125,000 INR  # this profile permits deductions
netWealth         = max(0, 1,475,000 - 125,000) = 1,350,000 INR
```

The engine does not decide which individual liability qualifies. It subtracts the complete entered debt/bill totals, so eligible obligations must be classified before entry.
Do not enter one obligation in both debt and bill totals.

### Step 7 — Determine and compare nisab

```text
gold threshold   = 85 g × 10,000 = 850,000 INR
silver threshold = 595 g × 100   =  59,500 INR
selected standard = "lower"
threshold         = 59,500 INR
1,350,000 < 59,500 is false → isBelowNisaab = false
```

Equality is eligible under the implemented comparison: only wealth **strictly
below** the threshold is excluded. The comparison uses exact decimal arithmetic;
it is not made against the rounded display or merely the amount exceeding nisab.

### Step 8 — Apply hawl eligibility

The start is a real calendar date and is not in the future. The supplied
anniversary is a real date after the start. The calculation date is after that
anniversary, so date status is `complete`. Because the dip flag is `false`, final
`hawlStatus = "complete"`.

The engine validates the anniversary's calendar format and ordering; it **does
not verify** that the date is a correct lunar-year anniversary. An invalid date
returns `invalid`; no start returns `incomplete`. For named schools, date status
is checked before the dip flag: an unfinished hawl returns `incomplete` before a
possible reset is evaluated.

### Step 9 — Calculate payable and display

```text
payable = 0 if below nisab OR hawl not complete, otherwise net wealth × 0.025
        = 1,350,000 × 0.025
        = 33,750.00 INR
```

| Returned field | Worked example result |
| --- | ---: |
| `totalAssets` | 1,475,000.00 |
| `totalDeductions` | 125,000.00 |
| `deductionsApplied` | 125,000.00 |
| `netZakaatableWealth` | 1,350,000.00 |
| `nisaabThreshold` | 59,500.00 |
| `isBelowNisaab` | `false` |
| `hawlStatus` | `complete` |
| `zakaatDue` | **33,750.00 INR** |

Exact decimal fractions are retained through the eligibility decision and
arithmetic. Results are converted to JavaScript numbers at the output boundary;
the UI shows two decimal places. Display rounding is not an extra deduction.

## 4. Useful variations to discuss with the scholar

| Change to the scenario | Current software consequence |
| --- | --- |
| Keep all money/metal inputs, but set dip flag to `true` | No reset is applied by the Boolean flag; payable remains 33,750.00 INR. |
| Remove the start and anniversary dates | `hawlStatus = "incomplete"`; payable becomes 0, while net wealth and nisab remain unchanged. |
| Cash only: 75,000 INR; every other asset and deduction zero; dates complete; no dip | Above the automatic lower nisab of 59,500 INR: payable 75,000 × 2.5% = 1,875 INR. |
| Explicitly choose gold nisab for that 75,000 INR cash-only variation | Threshold becomes 850,000 INR, so payable becomes 0. |
| A bill is also included in debts | It is deducted twice if the user duplicates it; the engine cannot detect overlap in aggregate inputs. |

## 5. Questions and corrections for the reviewer

Please assess the actual software choices rather than approving the profile name
as a whole. Particularly review:

- Nisab standard, weights and combining different asset classes.
- Worn-jewellery eligibility, purity conventions and exceptions.
- Scope and timing of deductible liabilities and avoiding overlap.
- Hawl start conditions, reset rules, total loss/brief dips, and the source of an exact anniversary.
- The fixed 25% income-share estimate, receivable recovery timing, pension access,
  trade intent, ownership and other unmodelled eligibility conditions.
- Whether household members, children, incapacity or other special cases require
  exclusions or separate rules not represented in this software.

| Review detail | Scholar's notes |
| --- | --- |
| Reviewer name and qualification | |
| Date and school/position reviewed | |
| Intended audience / excluded cases | |
| Overall status: pending / approved with scope / changes required | |

| Rule / example step | Current behaviour accepted? | Correction or exception | Exact source: edition, chapter/page, URL or ruling | Revised numerical example / expected result |
| --- | --- | --- | --- | --- |
| Nisab | | | | |
| Jewellery | | | | |
| Debts and bills | | | | |
| Hawl / dip / anniversary | | | | |
| Income shares | | | | |
| Other asset categories / eligibility | | | | |

### Additional notes and suggested wording

_Write edits here, or edit the relevant explanation directly. Separate a religious
ruling change from a mathematical or programming correction._

### Agreed follow-up

- [ ] Record precise sources and applicability.
- [ ] Agree corrected example values and expected outputs.
- [ ] Add approved cases to automated tests before changing the school rules.
- [ ] Record reviewer/date and review scope; do not imply approval of unreviewed cases.

## Implementation references

- [School policy flags](../../src/constants/madhab.ts)
- [Calculation functions and hawl checks](../../src/utils/zakaat.ts)
- [Shared weights, rate and price contract](../../shared/prices.mjs)
- [Exact-decimal arithmetic](../../src/utils/decimal.ts)
- [Project-wide review register](../JURISPRUDENCE_REVIEW.md)
- [Research notes requiring independent validation](../../MADHAB_ZAKAAT_REFERENCE.md)
