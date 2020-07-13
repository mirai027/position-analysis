<template>
  <div class="chart-container">
    <div ref="solidPie" v-loading="loading" class="chart" />
  </div>
</template>

<script>
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
      data: [
        {
          name: 'java',
          value: 23
        },
        {
          name: 'python',
          value: 45
        },
        {
          name: 'js',
          value: 32
        }
      ],
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
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['product', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7'],
            ['C++', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 65.6],
            ['Pyhton', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 88.7],
            ['Java', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 76],
            ['JavaScript', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 55.9]
          ]
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
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@7-1} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '7-1',
              tooltip: '7-1'
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
//   .title {
//     @include title-line($pos-top: 10px, $pos-left: 30px);
//   }
}
</style>
