<template>
  <div class="test-api">
    <h1>Test api</h1>
    <a-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { api_list } from '@/service/api'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const dataSource = ref([])

onMounted(() => {
  api_list({
    pageNum: 1,
    pageSize: 5
  }).then(res => {
    let resData = res.data || []
    dataSource.value = resData
  })
})
</script>

<style lang="less" scoped>
.test-api {
  .ant-table-wrapper {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
