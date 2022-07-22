<template>
  <div class="test-ant-design-vue">
    <h1>Test-ant-design-vue</h1>

    <Button>按钮1</Button>
    <div class="clearfix">
      <p class="float-left">测试自定义变量</p>
    </div>
    <a-button type="primary">按钮2</a-button>
    <br />
    <home-outlined />
    <br />
    <i class="iconfont icon-hua"></i>
    <br />
    <a-range-picker v-model:value="value1" />
  </div>
</template>

<script setup>
import { Button } from 'ant-design-vue'
// import { HomeOutlined } from '@ant-design/icons-vue'

const value1 = ref()
</script>

<style lang="less" scoped>
p {
  color: @success-color;
}
i {
  color: red;
}
</style>
