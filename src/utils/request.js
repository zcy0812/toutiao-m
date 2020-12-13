// 请求模块

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// 举例 JSONBig 的用法
// const jsonStr = '{ "art_id": 1245953273786007552}'
// console.log(JSON.parse(jsonStr)) // 1245953273786007600
// JSON.stringify()

// 与上面方法的区别: JSONBig 可以处理超出 JavaScript 安全整数范围的问题
// console.log(JSONBig.parse(jsonStr)) // 把 JSON 格式的字符串转换为 JavaScript 对象

// 使用的时候需要把 BigNumber 类型的数据转换为字符串来使用
// console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

// console.log(JSON.stringify(JSONBig.parse(jsonStr))) // 字符串 "1245953273786007552"
// JSONBig.stringify() 把 JavaScript 对象 转换为 JSON 格式的字符串
// console.log(JSONBig.stringify(JSONBig.parse(jsonStr))) // 数字 1245953273786007552

const request = axios.create({
    // 接口的基准路径
    baseURL: 'http://ttapi.research.itcast.cn/',

    // 自定义后端返回的原始数据
    // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
    transformResponse: [function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }

      // axios 默认会在内部这样处理后端返回的数据
      // return JSON.parse(data)
    }]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里、
    // config：本次请求的配置对象
    // console.log(config)
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)

    // 注意：这里务必要返回config配置对象 否则请求就停在这里出不去了
    return config
  }, function (error) {
    // 如果请求出错了 (还没有发出去) 会进入这里
    return Promise.reject(error)
  })
// 响应拦截器

export default request
