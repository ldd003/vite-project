import fetch from '../fetch'

//登录
export function api_login(p) {
  return fetch({
    url: '/login',
    method: 'post',
    data: p
  })
}
//列表
export function api_list(p) {
  return fetch({
    url: '/list',
    method: 'get',
    params: p
  })
}
