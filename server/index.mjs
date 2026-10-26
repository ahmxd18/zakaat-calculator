import { createApp } from './app.mjs'
import { createPriceService } from './prices.mjs'
const port = Number(process.env.PORT ?? 8787)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT.')
const server = createApp({ getQuote: createPriceService({ apiKey: process.env.GOLD_API_KEY }) })
server.listen(port, process.env.HOST ?? '127.0.0.1', () => console.log(`Calculator server listening on port ${port}`))
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)))
