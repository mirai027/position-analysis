<template>
  <el-button type="primary" size="small" @click="submit">提交</el-button>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDateBetween, getYesterday } from '@/utils/date'
export default {
  computed: {
    ...mapGetters(['tableForm'])
  },
  methods: {
    submit() {
      let { time, position, location } = this.tableForm
      !time && (time = ['2020-02-19', getYesterday()])
      !location && (location = '中国')
      !position.length &&
        (position = [
          '我全都要',
          '后端开发',
          '测试',
          '人工智能',
          '移动前端开发',
          '运维',
          '数据开发',
          '前端开发',
          '高端技术职位',
          '项目管理',
          '硬件开发',
          '企业软件',
          '产品经理',
          '运营'
        ])
      this.$store.dispatch('tableForm', {
        time,
        location,
        position
      })
      this.$store.dispatch('watchForm')
      console.log(getDateBetween(time[0], time[1]))
      console.log(time)
    }
  }
}
</script>

<style lang="scss" scoped></style>
