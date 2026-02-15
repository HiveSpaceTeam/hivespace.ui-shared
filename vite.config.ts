import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false
        }
      }
    }),
    vueJsx(),
    tailwindcss(),  // ✅ Add Tailwind Vite plugin
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      rollupTypes: false,
      cleanVueFileName: true,
      exclude: ['**/*.stories.*', '**/*.test.*'],
      copyDtsFiles: true,
      staticImport: true
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@hivespace/shared': fileURLToPath(new URL('./src/internal.ts', import.meta.url))
    }
  },
  build: {
    lib: {
      // Entry point for your library
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'HivespaceShared',
      fileName: 'index',
      formats: ['es'] // ES module format for modern bundlers
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: (id) => {
        // Treat absolute paths starting with /images/ as external resources
        if (id.startsWith('/images/')) {
          return true
        }
        return ['vue', 'vue-i18n', 'pinia'].includes(id)
      },
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n'
        },
        preserveModules: false,
        // Preserve the export structure
        exports: 'named'
      }
    },
    cssMinify: true,
    cssCodeSplit: false,
    sourcemap: true,
    // Clear output directory before building
    emptyOutDir: true
  }
})