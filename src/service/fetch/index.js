import axios from 'axios'

//axios实例
const axiosInstance = axios.create({
  //baseURL: '/api'
})

/* axiosInstance.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('token')}` */

//Add a request interceptor 请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error)
  }
)

// Add a response interceptor 响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error)
  }
)

export default axiosInstance
