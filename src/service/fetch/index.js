import axios from 'axios'

const CancelToken = axios.CancelToken
const pending = []
console.log('pending', pending)
const resolvePending = config => {
  for (let i in pending) {
    if (
      pending[i].u === `${config.method}${config.url}${JSON.stringify(config.params)}${JSON.stringify(config.data)}`
    ) {
      pending[i].c()
      pending.splice(i, 1)
    }
  }
}

//axios实例
const axiosInstance = axios.create({
  //baseURL: '/api'
  // withCredentials: true //
})

/* axiosInstance.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('token')}` */

//Add a request interceptor 请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request config', config)
    resolvePending(config)

    config.cancelToken = new CancelToken(c => {
      pending.push({
        u: `${config.method}${config.url}${JSON.stringify(config.params)}${JSON.stringify(config.data)}`,
        c
      })
    })

    return config
  },
  function (error) {
    // Do something with request error
    console.log('request error', error)

    return Promise.reject(error)
  }
)

// Add a response interceptor 响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response config', response.config)
    resolvePending(response.config)

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log('response error', error)

    return Promise.reject(error)
  }
)

export default axiosInstance
