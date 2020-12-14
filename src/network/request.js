// 封装一个网络请求模块 但是功能要有 成功、失败要把结果回调出去
// 封装的好处，对用户使用透明 axios 万一后面不使用axios框架 改起来就方便

import axios from 'axios'

// 创建一个实例
const instance = axios.create({
  baseURL: 'http://152.136.185.210:8000/api/w6',
  timeout: 30000
})


// 2.axios的拦截器

// 2.1.请求拦截的作用
instance.interceptors.request.use(config => {
  return config
}, err => {
  // console.log(err);
})

// 2.2.响应拦截
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err);
})

// 简写
export function request(config) {
  // 发送真正的请求 大脑理解下  instance返回的也是promise
  return instance(config)
}



