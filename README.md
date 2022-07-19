1. 安装 vite, 选择 vue，名字为 vite-project
   `npm create vite`
2. 用 vuecli5 创建一个 vue3 项目，选 features 时选中 Router Vuex CSS Processors(less)
   `vue create demovue3`
   - 把 vite-project 的 src 替换为 demovue3 的 src
3. 安装 core-js（模块化标准库） vue-router（路由） pinia(vuex,新状态管理) less(样式预处理器)
   `npm i core-js vue-router pinia`
   `npm i less -D`
   - 在 vite.config.js 中，配置路径别名 alias，@
     `resolve: { alias: { "@": resolve(__dirname, "src"), }, }`
   * router 中 createRouter 的 history,没有 process, 改为
     `history: createWebHistory("/")`
   * 引入 pinia，写 pinia 定义和使用 demo
4. 添加 eslint，prettier，husky，lint-staged 构建代码质检，格式统一，提交把控的工作流

- 参考
  [vue3+ts+vite 项目中使用 eslint+prettier+husky 指南]('https://juejin.cn/post/7118294114734440455')
  [实战--为 vite-vue3-ts 项目添加 eslint + prettier + lint-staged 项目规范](https://juejin.cn/post/7043702363156119565)

* 安装 eslint 和 prettier 插件
  `{
  //安装了 eslint 插件,才有红色波浪线提示，以及可以保存时就自动 fix
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
  }
  //安装了 prettier 插件，可以保存时就自动 format
  //"editor.formatOnSave": true, // 开启自动保存
  //"editor.defaultFormatter": "esbenp.prettier-vscode" // 默认格式化工具选择 prettier

  //eslint 和 prettier，因为 eslint 也会有对代码‘风格’的校验，如果 2 者要求不一致，就会不兼容，冲突
  //可通过 eslint-config-prettier+eslint-plugin-prettier 解决。让 eslint 专注语法和问题校验，prettier 全权负责代码风格
  //eslint-config-prettier：关闭 eslint 中与 prettier 相互冲突的规则
  //eslint-plugin-prettier：赋予 eslint 用 prettier 格式化代码的能力
  }
  `

* eslint - 代码质量(语法，问题)检查

  - 安装
    `npm i eslint -D`
  - 初始化,生成配置文件.eslint.js
    `npx eslint --init`，按提示选择下来后，会要求并顺带安装`eslint-plugin-vue`
  - 在 package.json 的 script 添加 lint 命令
    `{ "scripts": { // eslint . 为指定lint当前项目中的文件 // --ext 为指定lint哪些后缀的文件 // --fix 开启自动修复（能自动修复的才会自动修复，如引号什么的，不能修复的如全等，定义了变量未使用）、 //"rules": { // "eqeqeq": 2, // "quotes": 2 // } "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix" } }`

* prettier - 统一代码风格
  - 安装
    `npm i prettier -D`
    - 可以执行命令如`npx prettier --write ./**/*.{vue,html,css,less,js,json,md}`格式化，想要格式化的对应文件
    - 也可以安装完 prettier 插件后，右键选择格式当前文件的方式为 prettier 进行格式化
  - 新建配置文件.prettierrc.js
    `module.exports = { printWidth: 120, //行长度 默认80 singleQuote: true, //单引号 默认双引号 semi: false, //末尾分号 默认true trailingComma: 'none', //尾逗号 默认es5 arrowParens: 'avoid', //箭头函数参数括号 默认all endOfLine: 'auto' }`

- 安装 eslint-config-prettier 和 eslint-plugin-prettier
  `npm i eslint-config-prettier eslint-plugin-prettier -D`

  - 在.eslint.js 的 extends 追加一个配置`plugin:prettier/recommended`，重启 vscode，使之生效。至此解决了 eslint 和 prettier 冲突问题

- 安装 husky 和 lint-staged，确保提交的代码符合规范（保证不会提交未校验的，同时只校验当前暂存区要提交的）
  `npm i husky lint-staged -D`
  - 生成.husky 文件。prepare 脚本，在安装依赖如`npm i`之后，自动执行
    `{ "script":{ "prepare": "husky install" } }`
  - 添加 pre-commit 钩子
    `npx husky add .husky/pre-commit`
    再在 pre-commit 中加入`npx --no-install lint-staged`命令

5. 引入 ant-design-vue
   `npm i ant-design-vue`

   - 全局注册方式
     ` import Antd from 'ant-design-vue' import 'ant-design-vue/dist/antd.css'`

   * 按需加载方式

     - 安装自动引入插件 unplugin-vue-components
       `npm i unplugin-vue-components -D`
     - 在 vite.config.js 中配置
       `import Components from 'unplugin-vue-components/vite' import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'`
       `Components({ dirs: ['src/components'], //公共组件自动引入 resolvers: [AntDesignVueResolver()] //省去UI库的大量import语句 })`

6. 引入 unplugin-auto-import

   - 安装自动导入插件
     `npm i unplugin-auto-import -D`
   - 在 vite.config.js 中配置
     `AutoImport({ imports: ['vue', 'vue-router', 'pinia'], //因为自动导入，eslint会提示如ref等,no-undef,需要处理下错误提示 eslintrc: { enabled: false, // Default `false`, 生成配置文件之后，可以再改成false filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json` globalsPropValue: true // Default`true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable') } })`

7. 样式，图标，字体

   - 主题色 在 vite.config.js 中配置
     `css: { preprocessorOptions: { less: { //ant-vue-design内置样式变量 //https://github.com/vueComponent/ant-design-vue/blob/main/components/style/themes/default.less additionalData: `@import './src/assets/styles/variable.less';`, //引入全局变量 //修改主题色 modifyVars: { 'primary-color': 'purple' }, javascriptEnabled: true } } } })`

   * 图标组件
     `//引入ant-design-vue Icon import * as Icons from '@ant-design/icons-vue' for (const [k, component] of Object.entries(Icons)) { app.component(k, component) }`

   * 自定义图标

     `//引入自定义图标 import '@/assets/fonts/iconfont.css'`

8. 接口处理

   - server 文件夹-》用 node 写几个接口 demo 备用。如果用到接口服务，需要先启动 server。即进入 server 文件夹，安装并启动它

   - service 文件夹-》封装 axios 和 api，环境配置

9. 打包

   - 兼容性
     `npm i @vitejs/plugin-legacy@1.8.2 -D`
   - 分析可视化
     `npm i rollup-plugin-visualizer -D`，执行打包后会生成 stats.html 文件，打开查看
   - 合并和分拆
     `output: { chunkFileNames: 'static/js/[name].[hash].js', entryFileNames: 'static/js/[name].[hash].js', assetFileNames: 'static/[ext]/[name].[hash].[ext]', // manualChunks(id) { // if (id.includes('node_modules')) { // return id.toString().split('node_modules/')[1].split('/')[0].toString() // } // } }`
   - gizp 压缩
     `npm i vite-plugin-compression -D`

   * 去掉 console 和 debugger
     `//压缩方式为terser时生效 terserOptions: { compress: { drop_console: true, drop_debugger: true } }`
