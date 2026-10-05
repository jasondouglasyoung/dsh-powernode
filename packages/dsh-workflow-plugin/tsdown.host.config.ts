import { defineConfig } from 'tsdown'
import { typertPlugin } from '@deepseek-ai/dsh-typert-generator/tsdown'

export default defineConfig({
  entry: ['lib/types/host/index.js'],
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
  deps: { neverBundle: [/^@deepseek-ai\//], onlyBundle: false },
  plugins: [typertPlugin({ mode: 'package', faces: ['host'] })],
})
