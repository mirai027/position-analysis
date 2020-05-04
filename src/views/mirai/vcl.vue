<template>
  <div class="vcl-container">
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
import mirai from '@/views/components/test-mock/vcl-mock'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      vclData: mirai.data,
      option: [],
      index: 0,
      data: [],
      positionList: [],
      positionColors: [], // 可合并，但太赶了下次再说
      dateList: [],
      timer: null,
      runFlag: false
    }
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName'])
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
     * 7. 当日期到了最终数据后(即 index === data.length - 1), 清空定时器 timer,重置按钮样式 runFlag
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
    this.ininChart()
  },
  activated() {
    console.log('vcl upupup')
    // this.ininChart()
    this.$store.dispatch('getName', ['vcl'])
    if (this.changedPage.includes('vcl')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'vcl')
    }
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'vcl',
        chartDom: chartDom
      }])
      // console.log(this.chartDOM)
    },
    getData(dataIndex) {
      // 获取索引的数据，用于更新图标数据
      const newData = this.vclData.map((item) => {
        return { name: item.name, value: item.value[dataIndex] }
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
    run(chart) {
      // 每次执行计算出相间的两组数据的数据差
      const oldData = this.data

      this.getData(++this.index)

      const newData = this.data
      const mirai = []
      for (let index = 0; index < newData.length; index++) {
        let speed = (newData[index].value - oldData[index].value) / 10
        speed = Math.round(speed)
        mirai.push({ name: newData[index].name, speed })
      }

      let insideIndex = 0

      const insideTimer = setInterval(() => {
        insideIndex++
        // 获取每一秒各职位在一毫秒时的增速
        for (let index = 0; index < this.data.length; index++) {
          const { speed } = mirai.find((item) => {
            return item.name === this.data[index].name
          })
          this.data[index].value += speed
        }

        // 图表数据排序
        this.data.sort(function(a, b) {
          return a.value - b.value
        })

        // 图标 y轴名称随排序更换
        this.positionList = this.data.map((item) => {
          return item.name
        })

        this.option = this.getOption(this.positionList, this.data)
        chart.setOption(this.option, this.data)

        /**
         * 每秒钟清除自身定时器
         * 如果到了最末尾的数据，设置当前数据为请求数据的最后一项（确保精度问题），并清空定时器
         */
        if (insideIndex === 10) {
          if (this.index === this.dateList.length - 1) {
            this.getData(this.dateList.length - 1)
            this.option = this.getOption(this.positionList, this.data)
            chart.setOption(this.option, this.data)

            // 重置开关状态
            this.runFlag = false
            clearInterval(this.timer)
          }
          clearInterval(insideTimer)
        }
      }, 100)
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
          show: true,
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
      const chart = this.$echarts.init(this.$refs.vcl)
      if (this.index === this.dateList.length - 1) {
        this.index = 0
        this.ininChart()
      }
      if (this.runFlag) {
        this.timer = setInterval(() => {
          this.run(chart)
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
      chart.setOption(this.option, this.data)
      this.getFromSon(chart)
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
