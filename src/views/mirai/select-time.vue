<template>
  <div class="block">
    <el-date-picker
      v-model="timeValue"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
      format="yyyy 年 MM 月 dd 日"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          const mirai = new Date('2020-02-19 00:00:00').getTime()
          return time.getTime() < mirai || time.getTime() > Date.now() - 8.64e7
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      timeValue: ['2020-02-19', '']
    }
  },
  created() {
    var day = new Date()
    day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
    var s = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
    this.timeValue[1] = s
    console.log(this.timeValue)
  }
}
</script>

<style lang="scss" scoped></style>
