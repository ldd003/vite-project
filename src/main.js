import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局注册ant-design-vue
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router).use(store).mount('#app')
