<template>
  <div class="test-api">
    <h1>Test api</h1>
    <a-button @click="getLocalList" style="margin-bottom: 20px">获取本地接口list，测试取消请求</a-button>
    <div class="search-form">
      <a-form
        ref="formRef"
        name="advanced_search"
        class="ant-advanced-search-form"
        :model="formState"
        @finish="handleSearch"
      >
        <a-row :gutter="24">
          <template v-for="i in 4" :key="i">
            <a-col v-show="expand || i <= 3" :span="8">
              <template v-if="i === 1">
                <a-form-item :name="`field-${i}`" label="关键字" :rules="[{ required: true, message: '请输入关键字' }]">
                  <a-input v-model:value="formState[`field-${i}`]" placeholder="请输入"></a-input>
                </a-form-item>
              </template>
              <template v-else>
                <a-form-item :name="`field-${i}`" :label="`field-${i}`">
                  <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></a-input>
                </a-form-item>
              </template>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="handleReset">重置</a-button>
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
              Collapse
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="search-list">
      <a-table
        row-key="id"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pageConfig"
        :loading="loading"
        @change="handleTableChange"
        bordered
      >
        <template #bodyCell="{ index, column }">
          <template v-if="index === 0 && column.key === 'operation'">
            <a @click="handleAdd">假新增</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { api_list, api_get_posts, api_post_posts } from '@/service/api'

// import { message } from 'ant-design-vue'
// import 'ant-design-vue/es/message/style/css' //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

const { proxy } = getCurrentInstance()

const expand = ref(false)
const formRef = ref()
const formState = reactive({})

//列表相关
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    fixed: 'left',
    customRender: ({ index }) => `第${index + 1}行`,
    width: '80px'
  },
  {
    title: '帖子id',
    dataIndex: 'id',
    sorter: true,
    width: '10%'
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: '10%'
  },
  {
    title: '标题',
    dataIndex: 'title',
    sorter: true,
    ellipsis: true
  },
  {
    title: '内容',
    dataIndex: 'body',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100
  }
]
const dataSource = ref([])
const loading = ref(false)

const getLocalList = () => {
  //前后端联调mock
  api_list({
    pageNum: 1,
    pageSize: 15
  })
    .then(res => {
      let resData = res.data || []
      // dataSource.value = resData
      console.log('api_list resData', resData)
    })
    .catch(err => {
      console.log('api_list err', err)
    })
}

//-参数
const pageConfig = reactive({
  total: 0,
  current: 1,
  pageSize: 5,
  field: '',
  order: '',
  showQuickJumper: true,
  showTotal: total => `共${total}条`
})

//-分页、排序、筛选变化时触发
const handleTableChange = ({ current, pageSize }, filters, { field = '', order = '' }) => {
  //分页
  pageConfig.current = current
  //pageSize变化后 current重置为第一页
  if (pageConfig.pageSize !== pageSize) {
    pageConfig.current = 1
  }
  pageConfig.pageSize = pageSize

  //排序
  pageConfig.field = field
  pageConfig.order = order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : ''
  getList()
}

// watch(
//   () => pageConfig.pageSize,
//   (n, o) => {
//     pageConfig.current = 1
//   }
// )

//-查询
const handleSearch = values => {
  console.log('form...', values, formState)
  pageConfig.current = 1
  getList()
}
//-重置
const handleReset = () => {
  formRef.value.resetFields()
  pageConfig.current = 1
  getList()
}

//-获取
const getListAll = () => {
  return new Promise(resolve => {
    api_get_posts({
      _page: 1,
      _limit: 101,
      q: formState['field-1'] || ''
    })
      .then(res => {
        let resData = res.data || []
        resolve(resData.length)
      })
      .catch(() => {
        resolve(0)
      })
  })
}
const getList = async () => {
  loading.value = true
  let total = await getListAll()

  api_get_posts({
    _page: pageConfig.current,
    _limit: pageConfig.pageSize,
    _sort: pageConfig.field,
    _order: pageConfig.order,
    q: formState['field-1'] || ''
  })
    .then(res => {
      loading.value = false
      let resData = res.data || []
      dataSource.value = resData
      pageConfig.total = total
    })
    .catch(() => {
      loading.value = false
    })
}
getList()

//编辑
const handleAdd = () => {
  api_post_posts({
    title: 'foo',
    body: 'bar',
    userId: 1
  }).then(res => {
    let resStr = JSON.stringify(res.data)

    proxy.$message.success(`新建成功，${resStr}`)
  })
}
</script>

<style lang="less" scoped>
.test-api {
  .search-form,
  .search-list {
    width: 80%;
    margin: 0 auto;
  }
  .search-form {
    margin-bottom: 20px;
  }
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
</style>
