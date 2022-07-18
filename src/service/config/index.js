// console.log('项目中的环境变量', process.env.NODE_ENV, import.meta.env.MODE)
//使用process.env.NODE_ENV 或者import.meta.env.MODE判断
if (process.env.NODE_ENV === 'production') {
  //生产环境
  console.log('生产开发', import.meta.env.VITE_MY_VAR)
} else if (process.env.NODE_ENV === 'test') {
  //测试环境
  console.log('测试', import.meta.env.VITE_MY_VAR)
} else {
  //开发环境
  console.log('开发', import.meta.env.VITE_MY_VAR)
}
