<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 页码
      page: 1,
      // 每页大小
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResults({
          // 页数，不传默认为1
          page: this.page,
          // 每页数量，不传每页数量由后端决定
          per_page: this.perPage,
          // 搜索关键词
          q: this.searchText
        })
        // 2.将数据放到数据列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.关闭本次的loading
        this.loading = false
        // 4.判断是否还有数据
        //   如果有，则更新获取下一页数据的页码
        //   如果没有 则把finished 设置为true 关闭加载更多
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true

        // 加载失败了 loading 也要关闭
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
