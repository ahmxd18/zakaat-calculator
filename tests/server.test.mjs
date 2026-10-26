import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'
import { createApp } from '../server/app.mjs'
import { createPriceService } from '../server/prices.mjs'
import { PRICE_TTL_MS } from '../shared/prices.mjs'

test('price server coalesces requests, caches valid quotes and revalidates after expiry',async()=>{
 let calls=0,time=Date.now()
 const service=createPriceService({apiKey:'private-test-key',now:()=>time,fetchImpl:async(url,options)=>{
  calls++;assert.equal(options.headers['x-access-token'],'private-test-key')
  return {ok:true,json:async()=>({currency:'INR',price_gram_24k:url.includes('XAU')?100:1,timestamp:time/1000})}
 }})
 const values=await Promise.all(Array.from({length:20},()=>service('INR')))
 assert.equal(calls,2);assert.deepEqual(values[0],values[19]);await service('INR');assert.equal(calls,2)
 time+=PRICE_TTL_MS;await service('INR');assert.equal(calls,4)
 await assert.rejects(service('INVALID'))
 assert.equal(calls,4)
})
test('provider failures/partial responses are not cached as successful quotes; backoff applies',async()=>{
 let calls=0,time=Date.now()
 const service=createPriceService({apiKey:'test',now:()=>time,fetchImpl:async url=>{calls++;return {ok:url.includes('XAU'),json:async()=>({currency:'GBP',price_gram_24k:76,timestamp:time/1000})}}})
 await assert.rejects(service('GBP'));await assert.rejects(service('GBP'));assert.equal(calls,2)
 time+=30001;await assert.rejects(service('GBP'));assert.equal(calls,4)
 await assert.rejects(createPriceService({apiKey:''})('GBP'))
})
test('HTTP integration: quotes, SPA routes, static files, invalid requests, secrets and rate limit',async()=>{
 const dist=await mkdtemp(join(tmpdir(),'zakaat-http-'))
 await writeFile(join(dist,'index.html'),'<html>Calculator</html>')
 await mkdir(join(dist,'assets'));await writeFile(join(dist,'assets/app.js'),'console.log("app")')
 let calls=0
 const server=createApp({dist,getQuote:async currency=>{calls++;return {currency,prices:{goldPricePerGram:100,silverPricePerGram:1},updatedAt:Date.now(),expiresAt:Date.now()+3600000}}})
 server.listen(0,'127.0.0.1');await once(server,'listening')
 const base=`http://127.0.0.1:${server.address().port}`
 try {
  const res=await fetch(base+'/api/metal-prices?currency=GBP');assert.equal(res.status,200);assert.equal((await res.json()).currency,'GBP')
  assert.equal((await fetch(base+'/calculate')).status,200)
  assert.equal((await fetch(base+'/assets/app.js')).headers.get('content-type'),'text/javascript; charset=utf-8')
  for(const path of ['/.env','/api/unknown','/assets/missing.js']) assert.equal((await fetch(base+path)).status,404)
  assert.equal((await fetch(base+'/api/metal-prices?currency=INVALID')).status,400)
  assert.equal((await fetch(base+'/api/metal-prices?currency=GBP&url=https://example.com')).status,400)
  assert.equal((await fetch(base+'/api/metal-prices?currency=GBP',{method:'POST'})).status,405)
  assert.equal((await fetch(base+'/api/metal-prices?currency=GBP',{headers:{Origin:'https://other.example'}})).status,403)
  assert.equal(calls,1)
  for(let i=0;i<60;i++) await fetch(base+'/api/metal-prices?currency=GBP')
  assert.equal((await fetch(base+'/api/metal-prices?currency=GBP')).status,429)
 } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await rm(dist,{recursive:true,force:true})}
})
test('each metal timestamp is validated, including a future timestamp hidden by a current pair minimum',async()=>{
 const time=Date.now()
 const service=createPriceService({apiKey:'test',now:()=>time,fetchImpl:async url=>({ok:true,json:async()=>({currency:'GBP',price_gram_24k:10,timestamp:(time+(url.includes('XAU')?86400000:0))/1000})})})
 await assert.rejects(service('GBP'))
})
