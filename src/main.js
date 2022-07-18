import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

//全局注册ant-design-vue
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

//引入ant-design-vue Icon
import * as Icons from '@ant-design/icons-vue'
for (const [k, component] of Object.entries(Icons)) {
  app.component(k, component)
}

//引入自定义图标
import '@/assets/fonts/iconfont.css'

console.log(123, import.meta, import.meta.env)

app.use(router).use(store).mount('#app')
