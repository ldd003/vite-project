<template>
  <div class="test-unplugin-vue-components">
    <h1>Test unplugin-vue-components</h1>
    <Button>hello</Button>
    <a-button>world</a-button>
    <ComponentA />
  </div>
</template>

<script setup>
import { Button } from 'ant-design-vue'
</script>

<style lang="less" scoped>
.test-unplugin-vue-components {
  border: 1px dotted blue;
  margin-top: 20px;
}
</style>
