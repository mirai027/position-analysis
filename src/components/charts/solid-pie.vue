<template>
  <div class="chart-container">
    <div ref="solidPie" v-loading="loading" class="chart" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
var mock = [
  { date: '7-28', value: 387, type: '后端开发' },
  { date: '7-29', value: 301, type: '后端开发' },
  { date: '7-30', value: 400, type: '后端开发' },
  { date: '7-31', value: 465, type: '后端开发' },
  { date: '8-1', value: 392, type: '后端开发' },
  { date: '8-2', value: 388, type: '后端开发' },
  { date: '8-3', value: 428, type: '后端开发' },
  { date: '7-28', value: 376, type: '前端开发' },
  { date: '7-29', value: 351, type: '前端开发' },
  { date: '7-30', value: 400, type: '前端开发' },
  { date: '7-31', value: 365, type: '前端开发' },
  { date: '8-1', value: 392, type: '前端开发' },
  { date: '8-2', value: 318, type: '前端开发' },
  { date: '8-3', value: 388, type: '前端开发' },
  { date: '7-28', value: 287, type: '测试' },
  { date: '7-29', value: 201, type: '测试' },
  { date: '7-30', value: 160, type: '测试' },
  { date: '7-31', value: 165, type: '测试' },
  { date: '8-1', value: 192, type: '测试' },
  { date: '8-2', value: 128, type: '测试' },
  { date: '8-3', value: 178, type: '测试' },
  { date: '7-28', value: 139, type: '运维' },
  { date: '7-29', value: 121, type: '运维' },
  { date: '7-30', value: 140, type: '运维' },
  { date: '7-31', value: 88, type: '运维' },
  { date: '8-1', value: 96, type: '运维' },
  { date: '8-2', value: 101, type: '运维' },
  { date: '8-3', value: 110, type: '运维' },
  { date: '7-28', value: 89, type: '数据开发' },
  { date: '7-29', value: 101, type: '数据开发' },
  { date: '7-30', value: 70, type: '数据开发' },
  { date: '7-31', value: 98, type: '数据开发' },
  { date: '8-1', value: 106, type: '数据开发' },
  { date: '8-2', value: 99, type: '数据开发' },
  { date: '8-3', value: 108, type: '数据开发' }
]
export default {
  props: {
    pieData: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: true,
      chartDom: {},
      mockList: [],
      name: ''
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    }
  },
  created() {
    console.time('test')
    var dateList = ['date']
    var typeList = []
    var valueList = []
    mock.map((item, index) => {
      valueList.push(item.value)
      if (!dateList.includes(item.date)) {
        dateList.push(item.date)
      }
      if (!typeList.includes(item.type)) {
        typeList.push(item.type)
      }
    })
    for (let i = 0; i < typeList.length; i++) {
      if (i === 0) {
        this.mockList.push(dateList)
      }
      var currArr = valueList.slice(i * 7, i * 7 + 7)
      currArr.unshift(typeList[i])
      this.mockList.push(currArr)
    }
    console.log(this.mockList)
    console.timeEnd('test')
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.solidPie)
    this.initPie()
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },
    initPie() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)
      // const _this = this
      const option = {
        legend: {
          right: 20,
          top: 5
        },
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: this.mockList
        },
        xAxis: {
          type: 'category',
          axisTick: false,
          axisLine: {
            lineStyle: {
              // color: 'FFF'
            }
          }
        },
        yAxis: {
          gridIndex: 0,
          axisTick: false,
          axisLine: {
            lineStyle: {
              // color: 'FFF'
            }
          }
        },
        grid: { top: '55%' },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@7-28} ({d}%)'
            },
            encode: {
              itemName: 'date',
              value: '7-28',
              tooltip: '7-28'
            }
          }
        ]
      }

      this.chartDom.on('updateAxisPointer', (event) => {
        var xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1
          this.chartDom.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })

      this.chartDom.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 10px, $pos-left: 30px);
  }
}
</style>
