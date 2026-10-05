import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { client: 'src/client/index.tsx' },
  outDir: 'lib/client-raw',
  format: ['cjs'],
  platform: 'browser',
  target: 'es2024',
  fixedExtension: true,
  dts: false,
  clean: false,
  deps: {
    neverBundle: [/^@deepseek-ai\//, 'react', 'react-dom', 'react/jsx-runtime'],
    alwaysBundle: ['zod'],
    onlyBundle: false,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env.MODE': '"production"',
  },
})
