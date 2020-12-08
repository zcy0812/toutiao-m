/* 
参考文档：https://dayjs.gitee.io/docs/zh-CN/display/format
*/
import Vue from 'vue'
import dayjs from 'dayjs'

// dayjs 默认语言是英文 我们这里配置为中文

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器 然后就可以在任何组件的模板中使用了
// 请求过滤器就相当于一个全局可以用的方法 (仅供模板使用)
// 参数1：过滤器名称
// 参数2： 过滤器函数
// 使用方法： ({ 表达式 | 过滤器名称 })
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
    // console.log(value)
    return dayjs().to(dayjs(value))
})

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs().to(dayjs('2019')))
// dayjs().from(dayjs('1990')) // 31年内
// dayjs().from(dayjs(), true) // 2 年

// dayjs().fromNow()

// dayjs().to(dayjs()) 多少年前

// dayjs().toNow()
