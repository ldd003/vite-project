import fetch from '../fetch'

//server
//列表
export function api_list(p = {}) {
  return fetch({
    url: '/api/list',
    method: 'get',
    params: p
  })
}

//登录
export function api_login(p) {
  return fetch({
    url: '/api/login',
    method: 'post',
    data: p
  })
}

//jsonplaceholder
//列表获取
export function api_get_posts(p = {}) {
  return fetch({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    params: p
  })
}
//列表
export function api_post_posts(p = {}) {
  return fetch({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    data: p
  })
}
