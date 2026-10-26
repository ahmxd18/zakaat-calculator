import './dom-setup.cjs'
import test, { afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { render, renderHook, fireEvent, screen, cleanup, act, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MadhabProvider } from '../src/contexts/madhab'
import { I18nProvider } from '../src/contexts/i18n'
import { Calculate } from '../src/pages/Calculate'
import { useMetalPrices } from '../src/hooks/useMetalPrices'
import { useGeoLocation } from '../src/hooks/useGeoLocation'
import { emptySnapshot, SNAPSHOT_KEY } from '../src/utils/calculatorStorage'
import { AssetField } from '../src/components/calculate/AssetField'
const originalFetch = globalThis.fetch
const wrapper = ({children}: {children: React.ReactNode}) => <MemoryRouter><I18nProvider><MadhabProvider>{children}</MadhabProvider></I18nProvider></MemoryRouter>
function prepare() {
  localStorage.clear();sessionStorage.clear()
  localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(emptySnapshot()))
  globalThis.fetch = async () => ({ok:false}) as Response
}
afterEach(async () => { await act(async()=>{}); cleanup(); globalThis.fetch=originalFetch; localStorage.clear();sessionStorage.clear() })
async function manual() {
  fireEvent.change(screen.getByLabelText('Gold per gram (GBP/g)'),{target:{value:'76'}})
  fireEvent.change(screen.getByLabelText('Silver per gram (GBP/g)'),{target:{value:'0.07'}})
  fireEvent.click(screen.getByRole('button',{name:'Use these prices'}))
}
test('calculator: manual prices, exact boundary, invalid drafts, currency cancel/confirm and reset', async () => {
  prepare();render(<Calculate/>,{wrapper});await act(async()=>{});await manual()
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'41.65'}})
  assert.ok(screen.getByText('£1.04'))
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'-10'}})
  assert.ok(screen.getByText(/Calculation unavailable/))
  assert.equal((screen.getByLabelText('Cash on Hand') as HTMLInputElement).value,'-10')
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'41.65'}})
  assert.ok(screen.getByText('£1.04'))
  fireEvent.change(screen.getByRole('combobox',{name:'Currency'}),{target:{value:'INR'}})
  fireEvent.click(screen.getByRole('button',{name:'Keep current currency'}))
  assert.equal((screen.getByLabelText('Cash on Hand') as HTMLInputElement).value,'41.65')
  fireEvent.change(screen.getByRole('combobox',{name:'Currency'}),{target:{value:'INR'}})
  await act(async()=>{fireEvent.click(screen.getByRole('button',{name:'Change currency and clear inputs'}))})
  assert.equal((screen.getByLabelText('Cash on Hand') as HTMLInputElement).value,'')
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).currency,'INR')
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'-1'}})
  fireEvent.click(screen.getByRole('button',{name:'Reset Form'}))
  assert.equal((screen.getByLabelText('Cash on Hand') as HTMLInputElement).value,'')
})
test('calculator: selected-school override reset and fractional gram input', async () => {
  prepare();localStorage.setItem('zakaat_madhab','shafii');render(<Calculate/>,{wrapper});await act(async()=>{});await manual()
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'10000'}})
  fireEvent.change(screen.getByLabelText('Hawl start date (when wealth reached Nisāb)'),{target:{value:'2025-01-01'}})
  assert.ok(screen.getByText('£250.00'))
  fireEvent.click(screen.getByRole('button',{name:/Silver \(595g\)/}))
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).nisaabOverride,'silver')
  fireEvent.click(screen.getByRole('button',{name:'Follow school default'}))
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).nisaabOverride,null)
  fireEvent.change(screen.getByLabelText('Stored / non-worn gold (grams)'),{target:{value:'0.001'}})
  assert.equal((screen.getByLabelText('Stored / non-worn gold (grams)') as HTMLInputElement).getAttribute('aria-invalid'),'false')
})
test('calculator: malformed saved data is preserved until reviewed', async () => {
  prepare();localStorage.setItem(SNAPSHOT_KEY,'{broken');render(<Calculate/>,{wrapper});await act(async()=>{})
  assert.equal(localStorage.getItem(SNAPSHOT_KEY),'{broken')
  assert.ok(screen.getByRole('alert'))
  fireEvent.click(screen.getByRole('button',{name:'Continue with reviewed inputs'}))
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).currency,'GBP')
})
test('calculator: saved valid inputs survive remount with their currency', async () => {
  prepare();const view=render(<Calculate/>,{wrapper});await act(async()=>{})
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'1234.56'}})
  view.unmount();render(<Calculate/>,{wrapper});await act(async()=>{})
  assert.equal((screen.getByLabelText('Cash on Hand') as HTMLInputElement).value,'1234.56')
})
test('asset field accepts fractional grams and signals invalid input', () => {
  const states:boolean[]=[];const amounts:number[]=[]
  render(<AssetField id="weight" label="Weight" placeholder="g" currencySymbol="g" value={0} onChange={n=>amounts.push(n)} onValidityChange={v=>states.push(v)} direction="ltr"/>)
  fireEvent.change(screen.getByLabelText('Weight'),{target:{value:'0.001'}})
  fireEvent.change(screen.getByLabelText('Weight'),{target:{value:'-1'}})
  assert.deepEqual(amounts,[0.001]);assert.deepEqual(states,[true,false])
})
test('price hook ignores a late quote after switching currency', async () => {
  const pending = new Map<string,(r:Response)=>void>()
  globalThis.fetch = url => new Promise(resolve=>pending.set(String(url),resolve))
  const view=renderHook(({currency})=>useMetalPrices(currency),{initialProps:{currency:'AED'}})
  view.rerender({currency:'SAR'})
  await act(async()=>{pending.get('/api/metal-prices?currency=SAR')!({ok:true,json:async()=>({currency:'SAR',prices:{goldPricePerGram:100,silverPricePerGram:2},updatedAt:Date.now()})} as Response)})
  await waitFor(()=>assert.equal(view.result.current.prices?.goldPricePerGram,100))
  await act(async()=>{pending.get('/api/metal-prices?currency=AED')!({ok:true,json:async()=>({currency:'AED',prices:{goldPricePerGram:999,silverPricePerGram:9},updatedAt:Date.now()})} as Response)})
  assert.equal(view.result.current.prices?.goldPricePerGram,100)
})
test('geo hook validates cache and skips lookups for existing sessions', async () => {
  sessionStorage.setItem('zakaat_geo_currency','{"currency":"INVALID","detected":true,"countryCode":"XX"}')
  let calls=0;globalThis.fetch=async()=>{calls++;return {ok:true,json:async()=>({currency:'INR',country_code:'IN'})} as Response}
  const view=renderHook(()=>useGeoLocation())
  await waitFor(()=>assert.equal(view.result.current.currency,'INR'))
  view.unmount();renderHook(()=>useGeoLocation(false));assert.equal(calls,1)
})
test('storage quota failures produce a visible warning', async () => {
  prepare()
  const prototype=Object.getPrototypeOf(localStorage)
  const original=prototype.setItem
  prototype.setItem=()=>{throw new Error('quota')}
  try {
    render(<Calculate/>,{wrapper});await act(async()=>{})
    assert.ok(screen.getByText(/Your changes could not be saved/))
  } finally {prototype.setItem=original}
})
test('an expired quote is removed and refresh failure cannot revive cached prices', async () => {
  let calls=0
  globalThis.fetch=async()=>{
    calls++
    return calls===1 ? {ok:true,json:async()=>({currency:'MYR',prices:{goldPricePerGram:100,silverPricePerGram:1},updatedAt:Date.now()-3600000+100})} as Response : {ok:false} as Response
  }
  const view=renderHook(()=>useMetalPrices('MYR'))
  await waitFor(()=>assert.equal(view.result.current.status,'live'))
  await waitFor(()=>assert.equal(view.result.current.status,'error'))
  assert.equal(view.result.current.prices,null)
  assert.equal(calls,2)
})
test('another tab changing financial data blocks silent overwrites',async()=>{
  prepare();render(<Calculate/>,{wrapper});await act(async()=>{})
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'50'}})
  const other={...emptySnapshot(),values:{...emptySnapshot().values,cash_on_hand:999}}
  localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(other))
  act(()=>window.dispatchEvent(new window.StorageEvent('storage',{key:SNAPSHOT_KEY,newValue:JSON.stringify(other),storageArea:localStorage})))
  assert.ok(screen.getByText(/Another tab changed/))
  fireEvent.change(screen.getByLabelText('Cash on Hand'),{target:{value:'60'}})
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).values.cash_on_hand,999)
  fireEvent.click(screen.getByRole('button',{name:'Continue with reviewed inputs'}))
  assert.equal(JSON.parse(localStorage.getItem(SNAPSHOT_KEY)!).values.cash_on_hand,60)
})
