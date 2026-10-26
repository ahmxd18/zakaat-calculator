# Zakaat Calculator

React 19, TypeScript and Vite calculator with English, Arabic, Urdu and Roman
Urdu interfaces, four school profiles, local financial-data persistence, and
validated live or manually entered metal prices.

This is an educational estimate. Its jurisprudential policies have not received
independent scholarly certification. See [the rule review register](docs/JURISPRUDENCE_REVIEW.md)
and [the research notes](MADHAB_ZAKAAT_REFERENCE.md).

## Local setup

Use Node **22.22.2+**, **24.15+**, or **26+**, matching the test runtime dependencies.
The supported Node 22 LTS line is recommended.

```sh
npm ci
cp .env.example .env
```

Run two terminals:

```sh
npm run server
```

```sh
npm run dev
```

Vite forwards `/api` to the local server on port 8787. Without an API key or a
valid quote, the calculator remains usable with explicitly confirmed current
manual prices in the selected currency. Unavailable prices never imply zero due.

## Verification

```sh
npm run check
npm run audit
```

The check runs engine regressions, rendered interaction tests, HTTP integration
tests, TypeScript checking and a production build. CI runs the same checks on
Node 22. Browser geometry/animation is not simulated by the DOM interaction
tests; check responsive layout in a real browser before release. Tests require
permission to bind an ephemeral localhost port.

## Production

```sh
npm run build
npm start
```

The Node server serves `dist`, handles SPA route fallbacks and exposes only
`GET /api/metal-prices?currency=CODE`. Put it behind an HTTPS reverse proxy in
production. The default bind address is localhost; set `HOST` deliberately for
your hosting environment. Keep `.env` outside public assets.

Static hosting is still supported for the frontend: deploy all of `dist`, add
an index.html fallback for application routes, and route `/api/metal-prices` to
an equivalent server endpoint. Without an endpoint, manual prices work. HTML is
revalidated; hashed assets can be cached immutably. Retain previous hashed assets
briefly during deployments so already-open clients can finish loading routes.

The server caches a valid pair per supported currency, coalesces simultaneous
requests, times out upstream requests, and backs off after failures. It accepts
no provider URLs or financial inputs. Per-process limits are 60 API requests per
socket address per minute, with bounded in-memory counters. Behind a reverse
proxy, that address may be shared: configure edge rate limiting for real clients.
Do not trust arbitrary forwarded-IP headers. Multiple server instances need a
shared cache or provider quota controls at the hosting layer.

## Structure

- `src/utils/zakaat.ts`, `decimal.ts`: pure calculations and exact-decimal eligibility.
- `src/constants/madhab.ts`: existing school policies.
- `src/utils/calculatorStorage.ts`: validated snapshot/legacy migration.
- `src/hooks/useCalculator.ts`: calculator state, persistence and time coordination.
- `src/components/calculate/`: form, stable typed asset metadata and presentation.
- `src/services/metalPrices.ts`: same-origin browser price client.
- `shared/prices.mjs`: shared quote validation and financial constants.
- `server/`: credentialed provider client, bounded cache and HTTP/static server.
- `src/routes/AppRoutes.tsx`: lazy-loaded pages.
- `src/locales/`: localized content; language/madhab preferences use React Context.

## Data and calculation boundaries

Financial inputs are stored in browser localStorage, not transmitted to the
price server. Use a private device/browser profile for sensitive balances. A
first untouched visit may contact ipapi.co to suggest a supported currency;
returning saved sessions do not need that lookup. The price provider sees the
server's requests and currency, not the entered balances. Neither service is an
analytics integration. Storage failures are visible, and invalid snapshots are
preserved until the user reviews or resets them.

Amounts, currency, hawl and nisab override share one versioned snapshot. Legacy
entries migrate without deleting the old entries. Missing legacy currency must
be reviewed. Changing currency requires confirmation before clearing amounts;
it does not convert balances. Manual prices are session-only, labelled and expire
after one hour. Live quotes expire using provider time and are never replaced by
historical prices from another currency.

Inputs are nonnegative and bounded at 1 trillion; computed values above 100
trillion are rejected. Exact decimal arithmetic determines nisab eligibility;
display uses two decimals. Metal weights must be **fine-metal grams**, excluding
stones and other material. Foreign cash must already be converted to the selected
currency. Avoid overlapping cash, investments, receivables, bills and debts.

School differences are preserved. Income shares still use the documented 25%
estimate. Hawl uses the existing 354-day approximation unless the user enters a
confirmed lunar anniversary as a Gregorian date. Default mode does not establish
hawl eligibility. Obtain qualified advice for disputed or unsupported cases.

The contact form is an explicitly disabled placeholder. Charity links navigate
to external sites; the application does not process payments.

## Release order

1. Review the new unstaged changes separately from the already-staged immediate fixes.
2. Commit those reviewable units, then open a PR against `main` and require CI.
3. Validate deployment routing, API configuration, cold/warm quotes, manual fallback,
   storage recovery, all languages and mobile layout in staging.
4. Complete the rule-review register and approved numerical fixtures before
   presenting results as an authoritative obligation.
5. Merge the combined branch after those gates; archive source branches only after
   verifying the final PR. No branch merge or deletion is performed by these scripts.
