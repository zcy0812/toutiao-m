// 请求模块

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

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
  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }

      // axios 默认会在内部这样处理后端返回的数据
      // return JSON.parse(data)
    }
  ]
})

// 参考文档：https://github.com/axios/axios
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
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
  },
  function(error) {
    // 如果请求出错了 (还没有发出去) 会进入这里
    return Promise.reject(error)
  }
)

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // 响应成功进入这里
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async function(error) {
    // 请求响应失败进入这里
    // 超过 2xx 的状态码都会进入这里

    // console.dir(error)
    const status = error.response.status

    if (status === 400) {
      // 客户端请求参数错误
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      // token 无效
      // 如果没有 user 或者 user.token 直接去登录
      const { user } = store.state
      if (!user || !user.token) {
        // 直接跳转到登录页
        return redirectLogin()
      }

      // 使用 refresh_token 请求获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 拿到新的 token 之后把它更新到容器中
        // console.log(data)
        user.token = data.data.token
        store.commit('setUser', user)

        // 把失败的请求重新发出去
        // error.config 是本次请求的相关配置信息对象
        // 这里使用 request 发请求 它会走自己的拦截器
        // 它的请求拦截器中通过 store 容器访问 token 数据
        return request(error.config)
      } catch (err) {
        // 刷新 token 都失败了 直接跳转登录页
        redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限操作
      Toast.fail('没有权限')
    } else if (status === 404) {
      Toast.fail('访问路径错误')
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail('服务端异常，请稍后重试')
    }

    // 抛出异常
    return Promise.reject(error)
  }
)

function redirectLogin() {
  router.replace({
    name: '/login',
    // 传递查询参数 查询参数会以 ？ 作为分隔符放到 url 后面
    query: {
      // 数据名是自己起的
      // router.currentRoute 和我们在组件中获取的this.$route是一个东西
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
