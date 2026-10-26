# Scholar calculation review pack

These worksheets document **implemented software behaviour**, not certified
religious rulings. Each file is self-contained so it can be sent to the relevant
reviewer without the other school worksheets. Each includes policy descriptions,
all 16 input values, complete arithmetic, hawl behaviour, variations, source-code
links, and editable review tables.

The same invented INR scenario is used in every file to make differences visible.
Gold is assumed 10,000 INR/g and silver 100 INR/g; these are not market prices.
Calculation date is 26 October 2026. The anniversary is user-confirmed for the
example, not a claimed authoritative Hijri conversion. No manual nisab override
or dip is used in the principal scenario.

| Worksheet | Automatic nisab | Assets (INR) | Deductions applied (INR) | Net wealth (INR) | Payable (INR) |
| --- | --- | ---: | ---: | ---: | ---: |
| [Hanafi](hanafi.md) | lower; 59,500 | 1,475,000 | 125,000 | 1,350,000 | 33,750.00 |
| [Maliki](maliki.md) | lower; 59,500 | 1,370,000 | 125,000 | 1,245,000 | 31,125.00 |
| [Shafi‘i](shafii.md) | gold; 850,000 | 1,370,000 | 0 | 1,370,000 | 34,250.00 |
| [Hanbali](hanbali.md) | lower; 59,500 | 1,370,000 | 125,000 | 1,245,000 | 31,125.00 |
| [Default / No School](default.md) | lower; 59,500 | 1,475,000 | 125,000 | 1,350,000 | 33,750.00 |

Default is included for completeness; **it is not a fifth school** and does not
establish hawl eligibility. Do not infer that a lower payable amount makes a
profile preferable or more correct. Differences reflect current configuration
choices that need review, not a ranking of schools.

Ask each reviewer to record the position they intend, exact source, exceptions
and revised numerical examples. Preserve the current-behaviour tests separately
from new tests asserting independently approved policy.

See the [review register](../JURISPRUDENCE_REVIEW.md) for the wider unresolved questions
