/* 
 PostCSS配置文件
*/

module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer插件
    // 这里又配置了一遍 所以产生冲突了
    // 所以要注释掉
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转换为 rem
    'postcss-pxtorem': {
      // lib-flexable 的 REM 适配方案：把一行分为10份 每份就是十分之一
      // 所以 rootValue 应该设置为你的设计稿的十分之一
      // 我们的设计稿是 750 所以应该设置为 750 / 10 = 75
      // 但是Vant建议设置为 37.5。 为甚？ 因为Vant是基于375写的
      // 所以必须设置为37.5 唯一的缺点就是使用我们设计稿的尺寸都必须 /2
      // 有没有更好的办法？
      // 如果是 Vant 的样式 就按照 37.5 来转换
      // 如果是 我们自己的 的样式 就按照 75 来转换
      // 经过查阅文档 我们发现 rootValue 支持两种类型
      //   数字：固定的数值
      //   函数：可以动态处理返回
      // rootValue: 75,
      // postcss-pxtorem 处理每个css文件的时候都会来调用这个函数
      // 它会把被处理的CSS文件相关的信息通过参数传递给该函数
      rootValue({ file }) {
        // console.log('处理的Css文件：', file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // 配置要转换的CSS属性
      // * 表示所有
      propList: ['*'],
      // 配置不要转换的样式
      exclude: 'github-markdown'
    }
  }
}
