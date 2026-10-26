import ts from 'typescript'
import { mkdtemp, rm, mkdir, readdir, readFile, writeFile, symlink, cp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
const directory = await mkdtemp(join(tmpdir(), 'zakaat-tests-'))
async function compile(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const file = join(folder, entry.name)
    if (entry.isDirectory()) await compile(file)
    else if (/\.(ts|tsx)$/.test(file) && !file.endsWith('.d.ts')) {
      const source = (await readFile(file, 'utf8'))
      const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } })
      const output = join(directory, file.replace(/\.(ts|tsx)$/, '.js'))
      await mkdir(dirname(output), { recursive: true })
      await writeFile(output, result.outputText)
    }
  }
}
try {
  await symlink(resolve('node_modules'), join(directory, 'node_modules'))
  await compile('src')
  await compile('tests')
  await cp('shared', join(directory, 'shared'), { recursive: true })
  await cp('tests/dom-setup.cjs', join(directory, 'tests/dom-setup.cjs'))
  const result = spawnSync(process.execPath, ['--test', join(directory, 'tests/regressions.js'), join(directory, 'tests/interactions.js'), 'tests/server.test.mjs'], { stdio: 'inherit' })
  process.exitCode = result.status ?? 1
} finally { await rm(directory, { recursive: true, force: true }) }
