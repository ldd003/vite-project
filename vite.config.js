import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

//自动引入（组件）插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

//自动导入（方法等）插件
import AutoImport from 'unplugin-auto-import/vite'

//打包
//-浏览器支持
import legacy from '@vitejs/plugin-legacy'
//-可视化分析
import { visualizer } from 'rollup-plugin-visualizer'
//-压缩
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('vite.config.js中的环境变量', command, mode, loadEnv(mode, process.cwd()).VITE_MY_VAR)

  const isProd = mode === 'production'
  return {
    plugins: [
      vue(),
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
      }),
      //打包相关
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      visualizer(),
      isProd
        ? compression({
            threshold: 10240 //超过10kb压缩
          })
        : null
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
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3003',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      manifest: isProd ? false : true,
      sourcemap: isProd ? false : true,
      minify: 'terser', //压缩方式
      chunkSizeWarningLimit: 1024, //chunk 大小警告的限制 500(kb)->1024(kb)
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].js',
          entryFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/')
              switch (arr[0]) {
                case '@vue':
                case 'vue-router':
                case 'ant-design-vue':
                case '@ant-design':
                case 'lodash-es':
                case 'axios':
                  return arr[0]
                default:
                  return 'vendor'
              }
            }
          }
        },
        brotliSize: false, // 不统计
        target: 'esnext',
        minify: 'esbuild' // 混淆器，terser构建后文件体积更小
      },

      //压缩方式为terser时生效
      terserOptions: {
        compress: isProd
          ? {
              drop_console: true,
              drop_debugger: true
            }
          : false
      }
    }
  }
})
