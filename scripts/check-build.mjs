import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { parseEnv } from 'node:util'
let secrets = [process.env.GOLD_API_KEY, process.env.VITE_GOLD_API_KEY].filter(Boolean)
try {
  const env = parseEnv(await readFile('.env','utf8'))
  secrets.push(env.GOLD_API_KEY,env.VITE_GOLD_API_KEY)
} catch (error) { if (error.code !== 'ENOENT') throw error }
secrets = secrets.filter(value => typeof value === 'string' && value.length >= 8)
async function scan(folder) {
  for(const entry of await readdir(folder,{withFileTypes:true})) {
    const file=join(folder,entry.name)
    if(entry.isDirectory()) await scan(file)
    else if(/\.(html|js|css|map)$/.test(file)) {
      const text=await readFile(file,'utf8')
      if(/VITE_GOLD_API_KEY|x-access-token|goldapi\.io\/api/.test(text) || secrets.some(secret=>text.includes(secret))) throw new Error('Credential/provider internals found in browser output.')
    }
  }
}
await scan('dist')
if((await stat('dist/images/hero-pattern.jpg')).size>150000) throw new Error('Hero image exceeds its delivery budget.')
console.log('Browser build contains no configured price credentials/provider headers; image budget passed.')
