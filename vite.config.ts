import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/frontend-tools/',
  plugins: [
    vue(),
    VueI18nPlugin({
      include: path.resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@/components/base': path.resolve(__dirname, './src/components/base'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@locales': path.resolve(__dirname, './src/locales')
    }
  }
})
