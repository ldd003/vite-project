<template>
  <div class="test-api">
    <h1>Test api</h1>
  </div>
</template>

<script setup>
import { api_list } from '@/service/api'
onMounted(() => {
  api_list().then(res => {
    console.log(123, res)
  })
})
</script>

<style lang="less" scoped></style>
