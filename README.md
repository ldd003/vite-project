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
