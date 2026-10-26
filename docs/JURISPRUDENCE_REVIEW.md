# Rule review register

Status: **implemented behaviour, not independently certified**. This register
makes review work concrete; it does not establish a ruling or attribute approval
to any author. `MADHAB_ZAKAAT_REFERENCE.md` is the project's research note, not
an independently verified authority. General book titles in the References page
are insufficient evidence for each executable decision.

| Executable decision | Current implementation | Exact review question | Acceptance evidence needed |
| --- | --- | --- | --- |
| `defaultNisaabStandard` | Lower for Default/Hanafi/Maliki/Hanbali; gold for Shafi‘i; manual override allowed | Which standard and combination of asset classes applies to each intended user case? | Specific edition, chapter/page or authoritative published ruling; scope and exceptions |
| `jewelleryZakatable` | Worn jewellery included for Default/Hanafi; excluded otherwise | What qualifies as permissible personal-use jewellery, including unusual quantities and intent? | Reviewed examples of exempt/non-exempt jewellery for each school |
| `debtDeductionPermitted` | All entered debts/bills deducted except for Shafi‘i | Which immediate, deferred, secured and recurring liabilities qualify? Is asset-class-specific handling required? | School-specific liability examples with expected deductions; overlap guidance |
| `requiresHawl` | Named schools gated; Default is an estimate without a gate | Who is eligible, and which ownership/accessibility/age/capacity exceptions apply? | Defined audience and explicit exclusions |
| `hawlResetsOnDip` | Dip ignored for Hanafi; resets for Maliki/Shafi‘i/Hanbali | Which dips reset the year, including total loss and brief-dip nuances? | Timeline examples with reset decisions and dates |
| Hawl calendar | 354-day approximation, or an explicit user-confirmed anniversary | Which trusted lunar calendar/date basis should users follow? | Reviewed anniversary examples including 355-day lunar years; no automatic claim from Gregorian elapsed days |
| Income shares | 25% of entered market value contributes to zakatable wealth | When is this estimate permissible, and when must company zakatable assets/dividends be used instead? | Attributed method with scope and alternatives; separate investment-intent cases |
| Receivables | User enters recoverable value | How do debt strength, disputes, recovery and past years vary by school? | Recoverability/collection scenarios; required timing |
| Pensions | User enters accessible portion | What counts as access/ownership and how are withdrawals treated? | Defined pension cases, restrictions and deductions |
| Trade property/inventory/crypto | User-entered eligible market value counted | What intent, valuation basis and classification rules apply? | Reviewed examples and exclusions; no unsupported universal consensus claim |
| Precious-metal weights | Inputs must be fine-metal grams | Which purity conversion and permissible valuation conventions apply? | Examples for 24k/22k/18k gold and alloy silver; clarify stone/nonmetal exclusion |

A reviewer should record their name/qualification, date, exact source, chosen
position, exceptions, and numerical examples. Review feedback must be translated
into approved table-driven expected results before changing school policy.

Tests in `tests/regressions.tsx` preserve the currently encoded policies. They
must not be relabelled as scholarly verification. The optional anniversary is a
user assertion, not automatic validation by the application.
