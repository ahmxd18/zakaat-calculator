import { createServer } from 'node:http'
import { readFile, realpath } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { SUPPORTED_CURRENCIES } from '../shared/prices.mjs'

const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.jpeg':'image/jpeg', '.json':'application/json' }
export function createApp({ getQuote, dist = resolve('dist'), now = Date.now }) {
  const requests = new Map()
  function limited(ip) {
    const time = now()
    for (const [key, value] of requests) if (value.until <= time) requests.delete(key)
    let record = requests.get(ip)
    if (!record) {
      if (requests.size >= 1000) return true
      record = { count: 0, until: time + 60_000 }
      requests.set(ip, record)
    }
    return ++record.count > 60
  }
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.setHeader('X-Frame-Options', 'DENY')
    const json = (status, body) => {
      res.writeHead(status, { 'Content-Type':'application/json', 'Cache-Control':'no-store' })
      res.end(JSON.stringify(body))
    }
    try {
      const url = new URL(req.url ?? '/', 'http://localhost')
      if (url.pathname === '/api/metal-prices') {
        if (req.method !== 'GET') { res.setHeader('Allow','GET'); return json(405,{error:'Method not allowed.'}) }
        if (req.headers['sec-fetch-site'] === 'cross-site' || (req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`)) return json(403,{error:'Cross-origin request denied.'})
        if (limited(req.socket.remoteAddress ?? 'unknown')) {res.setHeader('Retry-After','60');return json(429,{error:'Too many requests.'})}
        const currency = url.searchParams.get('currency')
        if (!SUPPORTED_CURRENCIES.includes(currency) || url.searchParams.size !== 1) return json(400,{error:'Unsupported request.'})
        try { return json(200, await getQuote(currency)) }
        catch { return json(503,{error:'Live prices unavailable. Use verified manual prices.'}) }
      }
      if (url.pathname.startsWith('/api/')) return json(404,{error:'Not found.'})
      if (!['GET','HEAD'].includes(req.method)) { res.setHeader('Allow','GET, HEAD');return json(405,{error:'Method not allowed.'}) }
      const pathname = decodeURIComponent(url.pathname)
      if (pathname.includes('\\') || pathname.split('/').some(part => part.startsWith('.'))) return json(404,{error:'Not found.'})
      const root = await realpath(dist)
      let file = resolve(root, `.${pathname}`)
      if (file !== root && !file.startsWith(root + sep)) return json(404,{error:'Not found.'})
      if (!extname(pathname)) file = resolve(root,'index.html')
      file = await realpath(file)
      if (!file.startsWith(root + sep)) return json(404,{error:'Not found.'})
      const body = await readFile(file)
      res.writeHead(200, {'Content-Type':MIME[extname(file)] ?? 'application/octet-stream','Cache-Control':file.endsWith('index.html')?'no-cache':pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'public, max-age=3600'})
      res.end(req.method === 'HEAD' ? undefined : body)
    } catch { if (!res.headersSent) json(404,{error:'Not found.'}); else res.end() }
  })
}
