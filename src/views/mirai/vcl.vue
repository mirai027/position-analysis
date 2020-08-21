<template>
  <div v-loading="loading" class="vcl-container">
    <el-switch
      v-model="runFlag"
      active-text="开始"
      inactive-text="暂停"
      class="run"
      @click.native="handleRun"
    >
    </el-switch>
    <div class="title">
      <p class="sub-title">截止至当前时间招聘最火热的职位是:</p>
      <p v-if="data.length != 0">{{ data[data.length - 1].name }}</p>
    </div>
    <div class="chart">
      <p class="time">{{ dateList[index] }}</p>
      <div ref="vcl" class="vcl"></div>
    </div>
  </div>
</template>

<script>
import { getDateList, getDateBetween } from '@/utils/date'
// require('./vcl-mock')
// import mirai from '@/views/components/test-mock/vcl-mock'
import { mapGetters } from 'vuex'
import { getDateListData } from '@/api/mirai'
export default {
  data() {
    return {
      vclData: [],
      option: [],
      index: 0,
      data: [],
      positionList: [],
      positionColors: [], // 可合并，但太赶了下次再说
      dateList: [],
      timer: null,
      runFlag: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName', 'forwardList'])
  },
  mounted() {
    /**
     * 技术说明
     * ---------------------------------------------------------------------------
     * 1. 通过定时器每秒计算出相邻的两天数据的差值
     * 2. 计算出的差值 / 10, 即每 100毫秒需要往图表添加更新的数据 (100毫秒动画看着流畅).每秒必须清空内部定时器(内部 insideIndex, insideTimer控制)
     * 3. positionColors 用于存储每个职位对应的颜色,用于区分职位.当前颜色由随机函数生成
     * 4. 柱状图 bar和 y轴颜色由 echart提供的 formatter / color的回调函数配合 positionColors.find 当前颜色生成
     * 5. index用于控制当前展示的是哪天的日期数据
     * 6. timer用于控制定时器的开关(暂停/开始功能)
     * 7. 当日期到了最终数据后(即 index === data.length - 1), 清空定时器 timer,设置当前数据为请求数据的最后一项（确保精度问题）,重置按钮样式 runFlag
     * 8. 根据按钮 runFlag的值来判断是 开始(true), 还是暂停(flag).如果 (index === data.length - 1), 重置 (index = 0)
     * 9. { getDateList, getDateBetween }获取昨天到 2020-02-19 所有的 YY-MM-DD 日期数组, 提交到后端以获取数据
     * ---------------------------------------------------------------------------
     *
     *
     * 可增加的新功能
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * 1.后期可添加日期范围选择
     * 2.根据日期数据搜索
     * 3. 如果想 职位名称在 bar里面，value在 bar外面。可给每个 bar叠加一个 bar。一个 bar.label.position：'inside'。一个 bar.label.position: 'right'
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     */
    this.temporary()
  },
  activated() {
    console.log('vcl upupup')
    // this.ininChart()
    this.$store.dispatch('getName', ['vcl'])
    if (this.changedPage.includes('vcl')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map((ele) => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'vcl')
    }
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [
        {
          name: 'vcl',
          chartDom: chartDom
        }
      ])
      // console.log(this.chartDOM)
    },
    getData(dataIndex) {
      // 获取索引的数据，用于更新图标数据
      const newData = this.vclData.map((item) => {
        return { name: item.name, value: item.data[dataIndex] }
      })
      // 图表数据排序
      this.data = newData.sort(function(a, b) {
        return a.value - b.value
      })
      // 图标 y轴名称随排序更换
      this.positionList = this.data.map((item) => {
        return item.name
      })
    },
    run(chart, num) {
      /**
       * chart 图表 DOM元素
       * num 每秒更新次数
       */

      // 旧数据(上一次的数据)
      const oldData = this.data

      // 每次 index自增
      ++this.index

      // 自增后的新数据
      const newData = this.vclData.map((item) => {
        return { name: item.name, value: item.data[this.index] }
      })

      // 计算出每秒(每天)新增各多少数据(与旧数据同样顺序)
      const computeData = oldData.map((item, index) => {
        // 按照旧数据的排序，重新获取新数据中对应旧数据第 index个的索引
        const newIndex = newData.findIndex((el) => el.name === item.name)
        return {
          name: item.name,
          value: newData[newIndex].value - oldData[index].value
        }
      })

      // 每次更新 添加多少数据
      const numData = computeData.map((item) => {
        return { name: item.name, value: Math.round(item.value / num) }
      })

      // 设置内置定时器计数器
      let insideIndex = 0
      const timer = setInterval(() => {
        // 旧数据中，每项的 value加 numData中对应的每项的 value（即速度）
        oldData.forEach((item, index) => {
          item.value += numData[index].value
        })

        // // ************************ Test Begin
        // this.data = oldData

        // this.data.sort(function(a, b) {
        //   return a.value - b.value
        // })
        // // 获取对比后的(即更新后正确的排序) y轴的文本
        // this.positionList = newData.map((item) => {
        //   return item.name
        // })
        // // ************************ Test End

        // 重新渲染图表，但不刷新 y轴文本的位置
        this.option = this.getOption(this.positionList, oldData)
        chart.setOption(this.option)
        // 每次执行相加，内置定时器计数器 +1
        insideIndex++
        // 当计数器到达阈值时，重新更新图表为当前日期的最新数据并删除定时器
        if (insideIndex === num) {
          if (this.index === this.dateList.length - 1) {
            // 重置开关且清除定时器
            this.runFlag = false
            clearInterval(this.timer)
          }
          clearInterval(timer)
          // 给 数据从小到大排序
          newData.sort(function(a, b) {
            return a.value - b.value
          })

          this.data = newData

          // 获取对比后的(即更新后正确的排序) y轴的文本
          this.positionList = newData.map((item) => {
            return item.name
          })
          /**
           * 重新更新 Echart图表
           * 因为上文计算的每次自增会存在精度不准确问题，因此在切换下一日期前，直接替换成新数据
           */
          this.option = this.getOption(this.positionList, newData)
          chart.setOption(this.option)
        }
      }, 1000 / num)
    },
    getOption(positionList, data) {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0'
            }
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          }
        },
        yAxis: {
          // 没空弄了，下次再来填坑吧
          show: false,
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 18,
            color: (params) => {
              const name = params
              const color = this.positionColors.find(
                (item) => item.name === name
              ).color
              return color
            }
          },
          data: positionList
        },
        series: [
          {
            name: this.dateList[0],
            type: 'bar',
            data: data,
            barMaxWidth: 21,
            label: {
              show: true,
              position: 'insideRight',
              fontSize: 21,
              offset: [0, -10],
              formatter: function(params) {
                const { name, value } = params
                return `${name}: ${value} 条`
              }
            },
            itemStyle: {
              barBorderRadius: [0, 7, 7, 0],
              color: (params) => {
                const { name } = params
                const color = this.positionColors.find(
                  (item) => item.name === name
                ).color
                return color
              }
            }
          }
        ]
      }
    },
    handleRun() {
      if (this.index === this.dateList.length - 1) {
        this.index = 0
        this.ininChart()
      }
      if (this.runFlag) {
        const chart = this.$echarts.init(this.$refs.vcl)
        this.timer = setInterval(() => {
          this.run(chart, 10)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    ininChart() {
      // 获取昨天到 2020-02-19相隔多少天
      const dateNum = getDateBetween('2020-02-19', getDateList())
      // 获取昨天到 2020-02-19的日期
      const dateList = getDateList(dateNum + 1).reverse()
      this.dateList = dateList
      /**
       * 根据传入的索引获取对应索引（日期）的数据的函数
       */
      // 根据传入的索引获取对应索引（日期）的数据
      this.getData(this.index)
      const chart = this.$echarts.init(this.$refs.vcl)
      this.positionColors = this.positionList.map((item) => {
        const color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)})`
        return { name: item, color }
      })
      // 更新 option里的数据的函数
      // 更新 option里的数据
      this.option = this.getOption(this.positionList, this.data)
      // 渲染图表
      chart.setOption(this.option)
      this.getFromSon(chart)
    },
    async temporary() {
      // 获取昨天到 2020-03-30相隔多少天
      const dateNum = getDateBetween('2020-02-19', getDateList())
      // 获取昨天到 2020-03-30的日期
      const dateList = getDateList(dateNum + 1).reverse()
      const { data } = await getDateListData({ time: dateList, position: this.forwardList })
      this.loading = false
      console.log(data)
      this.vclData = data
      this.ininChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.vcl-container {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  .run {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .title {
    padding: 10px 20px;
    font-size: 24px;
    display: flex;
    align-items: flex-end;
    color: #606266;
    .sub-title {
      font-size: 20px;
      color: #909399;
      margin-right: 10px;
    }
  }
  .chart {
    flex: 1;
    position: relative;
    .vcl {
      width: 100%;
      height: 100%;
    }
    .time {
      position: absolute;
      right: 40px;
      bottom: 50px;
      font-size: 37px;
    }
  }
}
</style>
