<template>
  <div class="test-api">
    <h1>Test api</h1>
    <a-table
      :columns="columns"
      row-key="id"
      :data-source="dataSource"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { api_list, api_get_posts } from '@/service/api'
import { reactive } from 'vue'

//表格数据
const columns = [
  {
    title: '帖子id',
    dataIndex: 'id',
    width: '20%'
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: '20%'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'body'
  }
]
const dataSource = ref([])

//前后端联调mock
api_list({
  pageNum: 1,
  pageSize: 5
}).then(res => {
  let resData = res.data || []
  // dataSource.value = resData
  console.log('api_list result', resData)
})

//列表相关
//pageSize变化的回调
const onShowSizeChange = (current, size) => {
  pagination.current = 1
  pagination.pageSize = size
  console.log(123, pagination)
  getList()
}
const onChange = page => {
  pagination.current = page
  console.log(456, pagination)
  getList()
}
//分页、排序、筛选变化时触发
const handleTableChange = () => {}

//-参数
const pagination = reactive({
  total: 100,
  current: 1,
  pageSize: 10,
  onShowSizeChange,
  onChange
})

//-获取
const getList = () =>
  api_get_posts({
    _page: pagination.current,
    _limit: pagination.pageSize
  }).then(res => {
    let resData = res.data || []
    dataSource.value = resData
  })
getList()
</script>

<style lang="less" scoped>
.test-api {
  .ant-table-wrapper {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
