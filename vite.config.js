import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//自动引入插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

//自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      //因为自动导入，eslint会提示如ref等,no-undef,需要处理下错误提示
      eslintrc: {
        enabled: false, // Default `false`, 生成配置文件之后，可以再改成false
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dirs: ['src/components'], //公共组件自动引入
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ] //省去UI库的大量import语句
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        //ant-vue-design内置样式变量
        //https://github.com/vueComponent/ant-design-vue/blob/main/components/style/themes/default.less
        additionalData: `@import './src/assets/styles/variable.less';`, //引入全局变量
        //修改主题色
        modifyVars: {
          'primary-color': 'purple'
        },
        javascriptEnabled: true
      }
    }
  }
})
