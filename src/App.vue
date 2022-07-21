<template>
  <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/TestAntDesignVue">TestAntDesignVue</router-link> |
    <router-link to="/TestApi">TestApi</router-link>
  </nav>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script setup>
//设置中文
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const locale = ref(zhCN)

let s = 'a'
let gg = 'bfdg'
if (s == gg) {
  console.log(78)
}
</script>

<style lang="less">
//引入重置样式
@import '@/assets/styles/reset.less';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
