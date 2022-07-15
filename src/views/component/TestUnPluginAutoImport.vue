<template>
  <div class="test-unplugin-auto-import">
    <h1>Test unplugin-auto-import</h1>
    <p>{{ count }}</p>
    <p>age: {{ age }}</p>
    <button @click="handleClick">点击</button>
  </div>
</template>

<script setup>
//setup 语法糖，不用一个一个的把变量和方法都 return 出去，就能在模板上使用
//然而对于一些常用的VueAPI，比如 ref、computed、watch 等，还是每次都需要我们在页面上手动进行 import
// 我们可以通过 unplugin-auto-import 实现自动导入，无需 import 即可在文件里使用Vue的API
// import { ref } from 'vue' //安装unplugin-auto-import后，无需手动引入

import { useUser } from '@/store/storeA'

let count = ref(90)
const handleClick = () => {
  count.value++
}

onMounted(() => {
  console.log('current router', useRouter())
  console.log('current route', useRoute())
})

const store = useUser()
let { age } = storeToRefs(store)
</script>

<style lang="less" scoped>
.test-unplugin-auto-import {
  border: 1px dotted pink;
  margin-top: 20px;
}
</style>
