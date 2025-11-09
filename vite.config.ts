import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import dts from 'vite-plugin-dts'
import paths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    paths(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: 'tsconfig.build.json',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'hooks-tool-pack',
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['react'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'test/setupTest.ts',
    include: ['test/**/*.test.{ts,tsx}'],
    reporters: ['default', 'html'],
    coverage: {
      reporter: ['lcov', 'text'],
      exclude: [
        'node_modules',
        '**/*.config.*',
        'src/main.tsx',
        'src/App.tsx',
        'html/**',
        'coverage/**',
        'dist/**',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
