import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//
import AutoImport from 'unplugin-auto-import/vite'

//自动引入插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    }),
    Components({
      dirs: ['src/components'], //公共组件自动引入
      resolvers: [AntDesignVueResolver()] //省去UI库的大量import语句
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
