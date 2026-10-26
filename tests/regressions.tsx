import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { calculateZakaat, calculateNisaab, EMPTY_VALUES } from '../src/utils/zakaat'
import { MADHAB_RULES, type Madhab } from '../src/constants/madhab'
import { fetchMetalPrices, validateQuote, PRICE_TTL_MS } from '../src/services/metalPrices'
import { emptySnapshot, loadSnapshot, SNAPSHOT_KEY } from '../src/utils/calculatorStorage'
import { ZakaatSummary } from '../src/components/calculate/ZakaatSummary'
import { LivePricesPanel } from '../src/components/calculate/LivePricesPanel'
import { AssetSection } from '../src/components/calculate/AssetSection'
import { Coins } from 'lucide-react'
import { en } from '../src/locales/en'
const prices = { goldPricePerGram: 76, silverPricePerGram: 0.83 }
const complete = { startDate: '2025-01-01', fellBelowNisaab: false }
const now = new Date(2026, 9, 26)
const calc = (values = {}, school: Madhab = 'default', hawl = complete) => calculateZakaat({ ...EMPTY_VALUES, ...values }, prices, undefined, school, hawl, now)

test('ordinary cash, asset interactions and debt arithmetic', () => {
  const result = calc({ cash_on_hand: 10000, stocks: 1000, gold_grams: 10, debts_owed: 500, bills_due: 250 })
  assert.equal(result.totalAssets, 11760)
  assert.equal(result.netZakaatableWealth, 11010)
  assert.equal(result.zakaatDue, 275.25)
  assert.equal(calc({ debts_owed: 100 }).netZakaatableWealth, 0)
})
for (const school of Object.keys(MADHAB_RULES) as Madhab[]) {
  test(`${school}: implemented jewellery/debt/default-standard policy`, () => {
    const rule = MADHAB_RULES[school]
    const result = calc({ cash_on_hand: 10000, worn_gold_grams: 10, worn_silver_grams: 10, debts_owed: 100 }, school)
    assert.equal(result.totalAssets, rule.jewelleryZakatable ? 10768.3 : 10000)
    assert.equal(result.deductionsApplied, rule.debtDeductionPermitted ? 100 : 0)
    assert.equal(result.nisaabThreshold, calculateNisaab(prices, rule.defaultNisaabStandard))
    assert.equal(calc({ cash_on_hand: 10000 }, school, { ...complete, fellBelowNisaab: true }).hawlStatus, rule.hawlResetsOnDip ? 'reset' : rule.requiresHawl ? 'complete' : 'not-required')
    assert.equal(calc({ cash_on_hand: 10000 }, school, { startDate: '', fellBelowNisaab: false }).zakaatDue, rule.requiresHawl ? 0 : 250)
  })
}
for (const standard of ['gold','silver','lower'] as const) {
  const p = { goldPricePerGram: 0.49, silverPricePerGram: 0.07 }
  const threshold = 41.65
  for (const [offset, below] of [[-0.01,true],[0,false],[0.01,false]] as const) test(`${standard}: boundary ${offset}`, () => {
    const result = calculateZakaat({ ...EMPTY_VALUES, cash_on_hand: threshold + offset }, p, standard)
    assert.equal(result.isBelowNisaab, below)
    assert.equal(result.nisaabThreshold, 41.65)
  })
}
test('exact decimal asset sum and subtraction preserve threshold equality', () => {
  const result = calculateZakaat({ ...EMPTY_VALUES, cash_on_hand: 41.6, bank_savings: 0.15, debts_owed: 0.1 }, { goldPricePerGram: 76, silverPricePerGram: 0.07 }, 'silver')
  assert.equal(result.netZakaatableWealth, 41.65)
  assert.equal(result.isBelowNisaab, false)
})
test('income shares retain documented 25% estimate and trade property is included', () => {
  assert.equal(calc({ income_stocks: 10000 }).zakaatDue, 62.5)
  assert.equal(calc({ trade_real_estate: 10000 }).totalAssets, 10000)
})
for (const value of [-1, NaN, Infinity, 1e308, undefined, '100']) test(`invalid asset ${String(value)} rejected`, () => {
  assert.throws(() => calc({ cash_on_hand: value }))
})
for (const value of [0,-1,NaN,Infinity,'76']) test(`invalid price ${String(value)} rejected`, () => {
  assert.throws(() => calculateZakaat(EMPTY_VALUES, { ...prices, goldPricePerGram: value as number }))
})
test('unknown assets and unsupported aggregate range are rejected', () => {
  assert.throws(() => calc({ typo: 1 }))
  assert.throws(() => calculateZakaat({ ...EMPTY_VALUES, gold_grams: 1e12 }, { ...prices, goldPricePerGram: 1e12 }))
})
test('hawl invalid dates, future dates, day boundary and dip reset', () => {
  for (const date of ['2025-02-30','bad','2027-01-01']) assert.equal(calc({cash_on_hand:10000},'hanafi',{startDate:date,fellBelowNisaab:false}).hawlStatus,'invalid')
  const start = new Date(2025,0,1)
  const date = new Date(2025,0,1 + 353)
  assert.equal(calculateZakaat({...EMPTY_VALUES,cash_on_hand:10000}, prices, 'lower', 'hanafi', {...complete,startDate:'2025-01-01'}, date).hawlStatus,'incomplete')
  start.setDate(start.getDate()+354)
  assert.equal(calculateZakaat({...EMPTY_VALUES,cash_on_hand:10000}, prices, 'lower', 'hanafi', {...complete,startDate:'2025-01-01'}, start).hawlStatus,'complete')
  assert.throws(() => calculateZakaat(EMPTY_VALUES,prices,undefined,'default',complete,new Date(NaN)))
})
function storage(data: Record<string,string>) { return { getItem: (key: string) => data[key] ?? null } }
test('snapshot round-trip keeps currency, values and hawl together', () => {
  const snapshot = {...emptySnapshot(),currency:'INR',values:{...EMPTY_VALUES,cash_on_hand:4000},hawl:complete}
  assert.deepEqual(loadSnapshot(storage({[SNAPSHOT_KEY]:JSON.stringify(snapshot)})),{snapshot,needsReview:false})
})
test('legacy migration fills new fields and requires review if currency is absent', () => {
  const result = loadSnapshot(storage({zakaat_calculator_data:'{"cash_on_hand":50}'}))
  assert.equal(result.needsReview,true)
  assert.equal(result.snapshot.values.cash_on_hand,50)
  assert.equal(result.snapshot.values.worn_gold_grams,0)
  assert.equal(loadSnapshot(storage({zakaat_calculator_data:'{"cash_on_hand":50}',zakaat_currency:'USD'})).needsReview,false)
})
for (const data of ['{','{"version":3}','null']) test(`corrupt snapshot ${data} rejected without writes`, () => {
  assert.throws(() => loadSnapshot(storage({[SNAPSHOT_KEY]:data})))
})
test('legacy negative values and inaccessible storage rejected', () => {
  assert.throws(() => loadSnapshot(storage({zakaat_calculator_data:'{"debts_owed":-1}'})))
  assert.throws(() => loadSnapshot({getItem:()=>{throw new Error('denied')}}))
})
test('quote currency, price shape, provider time and expiry validation', () => {
  const timestamp = Date.now()
  const quote = {currency:'INR',prices,updatedAt:timestamp}
  assert.equal(validateQuote(quote,'INR',timestamp).expiresAt,timestamp+PRICE_TTL_MS)
  for(const bad of [{...quote,currency:'GBP'},{...quote,updatedAt:timestamp-PRICE_TTL_MS},{...quote,updatedAt:timestamp+120000},{...quote,prices:{...prices,silverPricePerGram:'1'}},{...quote,prices:{...prices,silverPricePerGram:0}}]) assert.throws(()=>validateQuote(bad,'INR',timestamp))
})
test('browser price client uses only the same-origin endpoint and validates its quote', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/metal-prices?currency=INR')
      assert.equal(options?.headers, undefined)
      return {ok:true,json:async()=>({currency:'INR',prices,updatedAt:Date.now()})} as Response
    }
    assert.deepEqual((await fetchMetalPrices('INR')).prices,prices)
    globalThis.fetch = async () => ({ok:false}) as Response
    await assert.rejects(fetchMetalPrices('INR'))
    globalThis.fetch = async () => ({ok:true,json:async()=>({currency:'GBP',prices,updatedAt:Date.now()})}) as Response
    await assert.rejects(fetchMetalPrices('INR'))
    await assert.rejects(fetchMetalPrices('INVALID'))
  } finally {globalThis.fetch=original}
})
test('unavailable summary does not render a zero payable amount', () => {
  const html=renderToStaticMarkup(<ZakaatSummary result={null} formatCurrency={n=>`£${n.toFixed(2)}`} labels={en.calculate.summary} unavailable="Await verified prices" estimate="Estimate" />)
  assert.match(html,/Await verified prices/)
  assert.doesNotMatch(html,/£0.00/)
})
test('valid summary renders expected payable and policy notice', () => {
  const html=renderToStaticMarkup(<ZakaatSummary result={calc({cash_on_hand:10000})} formatCurrency={n=>`£${n.toFixed(2)}`} labels={en.calculate.summary} unavailable="Unavailable" estimate="Not certified" />)
  assert.match(html,/£250.00/)
  assert.match(html,/Not certified/)
})
test('unavailable price panel does not show invented prices', () => {
  const html=renderToStaticMarkup(<LivePricesPanel prices={null} status="error" lastUpdated={null} currencySymbol="₹" onRefresh={()=>{}} labels={en.calculate.prices} />)
  assert.doesNotMatch(html,/₹76/)
  assert.match(html,/Live prices unavailable/)
})
test('metal fields show grams rather than currency', () => {
  const html=renderToStaticMarkup(<AssetSection icon={Coins} label="Metals" description="" fields={[{id:'gold_grams',label:'Gold',placeholder:'grams'}]} index={0} currencySymbol="£" values={EMPTY_VALUES} onChange={()=>{}} direction="ltr" />)
  assert.doesNotMatch(html,/£/)
  assert.match(html,/>g</)
})
test('confirmed lunar anniversary overrides the approximate 354-day date', () => {
  const hawl={startDate:'2025-01-01',fellBelowNisaab:false,dueDate:'2025-12-22'}
  const values={...EMPTY_VALUES,cash_on_hand:10000}
  assert.equal(calculateZakaat(values,prices,'lower','hanafi',hawl,new Date(2025,11,21)).hawlStatus,'incomplete')
  assert.equal(calculateZakaat(values,prices,'lower','hanafi',hawl,new Date(2025,11,22)).hawlStatus,'complete')
  assert.equal(calculateZakaat(values,prices,'lower','hanafi',{...hawl,dueDate:'2025-02-30'},now).hawlStatus,'invalid')
  assert.equal(calculateZakaat(values,prices,'lower','hanafi',{...hawl,dueDate:'2024-12-31'},now).hawlStatus,'invalid')
})
test('seeded calculation invariants across school profiles', () => {
  let seed=1977
  for(const school of Object.keys(MADHAB_RULES) as Madhab[]) for(let i=0;i<50;i++) {
    seed=(seed*16807)%2147483647
    const cash=(seed%10000000)/100
    const debt=(seed%200000)/100
    const result=calc({cash_on_hand:cash,debts_owed:debt},school)
    assert.ok(Number.isFinite(result.zakaatDue) && result.zakaatDue>=0)
    assert.ok(result.netZakaatableWealth>=0)
    if(result.isBelowNisaab) assert.equal(result.zakaatDue,0)
    else assert.ok(Math.abs(result.zakaatDue-result.netZakaatableWealth*0.025)<1e-8)
    if(!MADHAB_RULES[school].debtDeductionPermitted) assert.equal(result.netZakaatableWealth,cash)
  }
})
