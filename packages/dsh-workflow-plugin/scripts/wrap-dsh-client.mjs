import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'))
const rawCandidates = [
  resolve(packageDirectory, 'lib/client-raw/client.cjs'),
  resolve(packageDirectory, 'lib/client-raw/client.js'),
]
const rawFile = rawCandidates.find((candidate) => existsSync(candidate))
if (!rawFile) throw new Error('tsdown did not emit the raw CJS client bundle')

const source = readFileSync(rawFile, 'utf8')
if (source.includes('window.__ModuleLoader__.load(')) {
  throw new Error('refusing to wrap a client bundle that is already registered')
}

const wrapped = [
  'window.__ModuleLoader__.load({',
  `  id: ${JSON.stringify(packageJson.name)},`,
  '  factory(require) {',
  '    const module = { exports: {} };',
  '    const exports = module.exports;',
  source.split(/\r?\n/).map((line) => `    ${line}`).join('\n'),
  '    return module.exports;',
  '  },',
  '});',
  '',
].join('\n')

writeFileSync(resolve(packageDirectory, 'lib/client.js'), wrapped, 'utf8')
