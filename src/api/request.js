import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import { getItem, removeItem } from '@/utils/localStorage'
const vm = new Vue()

// 跳转登录页面
const toLogin = () => {
  router.replace({
    path: '/login'
  })
}
// 请求失败后的错误处理
const errorHandle = (status, other) => {
  console.log(status)
  // 状态码
  switch (status) {
    case 401:
      vm.$Message.warning('登录过期，请重新登录')
      toLogin()
      removeItem('Authentication')
      removeItem('username')
      break
    case 403:
      vm.$msg.warning('登录过期，请重新登录')
      removeItem('Authentication')
      break
    case 404:
      vm.$msg.warning('请求的资源不存在')
      break
    case 500:
      vm.$msg.warning('服务器升级维护中...请稍后再试！！')
      break
    case 502:
      vm.$msg.warning('服务器升级维护中...请稍后再试！！')
      break
    default:
      break
  }
}
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})
// 设置POST请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 国际化标识
instance.defaults.headers.lang = 'zh_CN'
// 请求拦截
instance.interceptors.request.use(config => {
  const token = getItem('Authentication')
  token && (config.headers['Authentication'] = token)
  return config
}, error => Promise.error(error)
)
// 响应拦截
instance.interceptors.response.use(res => {
  // console.log(res)
  if (res.data.code == '1401') {
    toLogin()
    removeItem('Authentication')
    removeItem('username')
  }
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }
}, error => {
  const { response } = error
  if (response) {
    errorHandle(response.status)
    // return Promise.reject(response)
  } else {
    // console.error('网络链接失败了')
  }
})

export default instance
