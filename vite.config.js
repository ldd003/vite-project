import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

//自动引入插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

//自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

//打包，浏览器支持
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('vite.config.js中的环境变量', command, mode, loadEnv(mode, process.cwd()).VITE_MY_VAR)
  return {
    plugins: [
      vue(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        //因为自动导入，eslint会提示如ref等,no-undef,需要处理下错误提示
        eslintrc: {
          enabled: true, // Default `false`, 生成配置文件之后，可以再改成false
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
    build: {
      target: 'es2015' // 默认 "modules"
    },
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
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3003',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
