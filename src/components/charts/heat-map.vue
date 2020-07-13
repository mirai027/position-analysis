<template>
  <div class="chart-container">
    <div ref="heatmap" v-loading="loading" class="heatmap"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    heatMapData: {
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
      salary: [
        // 暂时性定死
        '3k及以下',
        '4k',
        '6k',
        '8k',
        '10k',
        '12k',
        '14k',
        '16k',
        '20k',
        '24k',
        '28k',
        '30K及以上'
      ],
      workYears: [
        // 暂时性定死
        '不限',
        '应届毕业生',
        '1年以下',
        '1-3年',
        '3-5年',
        '5-10年',
        '10年以上'
      ],
      data: []
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    },
    heatMapData: {
      handler() {
        this.data = this.heatMapData
        this.initHeatmap()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.heatmap)
    this.upLoad()
  },
  activated() {},
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    initHeatmap() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      // const mirai = this.workYears.map((item) => {
      //   return {
      //     name: item,
      //     value: this.salary.map(() => {
      //       return Math.round(Math.random() * 100)
      //     })
      //   }
      // })

      const data = []

      /**
       * 热力图坐标计算 [x, y, value]
       *  eg. [0, 1, 36] [21, 0, 90]
       * 第一个代表 x轴为 0，y轴为 1的方块，值为 36
       * 第二个代表 x轴为 21，y轴为 0的方块，值为 90
       */
      this.data.forEach((item, idx) => {
        item.value.forEach((element, index) => {
          data.push([index, idx, element])
        })
      })

      const option = {
        animation: true,
        grid: {
          bottom: '20',
          left: '10',
          right: '20',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.salary,
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#303133'
          },
          axisLine: {
            lineStyle: {
              color: '#E9E9EB'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.workYears,
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#606266'
          },
          axisLine: {
            lineStyle: {
              color: '#606266'
            }
          }
        },
        // tooltip: {
        //   trigger: 'axis',
        //   backgroundColor: 'rgba(0,0,0,0.3)',
        //   axisPointer: {
        //     type: 'cross',
        //     label: {
        //       precision: '0'
        //     }
        //   }
        // },
        visualMap: {
          type: 'piecewise',
          pieces: [
            { gte: 200, color: '#0087dc' },
            { gt: 120, lte: 200, color: '#1ca2dc' },
            { gt: 40, lte: 120, color: '#5bc3f0' },
            {
              gt: 20,
              lte: 40,
              color: '#A0CFFF'
            },
            { lte: 20, color: '#C6E2FF' }
          ],
          // max: 999000,
          // color: ['#0087dc', '#1ca2dc', '#5bc3f0', '#A0CFFF', '#C6E2FF'],
          textStyle: {
            color: '#606266'
          },
          orient: 'horizontal',
          left: 'center',
          top: '27'
        },
        series: {
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      }
      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.heatMapDom])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.chart-container {
  position: relative;
  .heatmap {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 10px, $pos-left: 30px);
  }
}
</style>
