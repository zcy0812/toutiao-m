<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        // 禁止背景点击
        forbidClick: true,
        // 持续展示
        duration: 0
      })
      
      try {
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })

        // 更新视图
        this.$emit('input', localGender)

        // 关闭弹层
        this.$emit('close')

        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('修改昵称失败')
        // console.log(err)
      }
    },

    onPickerChange(picker, value, index) {
        // console.log(picker, value, index)
        this.localGender = index
    }
  }
}
</script>

<style lang="less" scoped></style>
