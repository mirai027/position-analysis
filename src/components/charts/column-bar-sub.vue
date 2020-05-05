<template>
  <div class="chart-container">
    <div ref="companySize" v-loading="loading" class="chart" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    columnBarData: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: null
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
    columnBarData: {
      handler() {
        this.data = this.columnBarData
        this.initColumnBar()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.companySize)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    initColumnBar() {
      /**
       * 阶梯瀑布图
       * 其实就是两个叠在一起（stack 相同）的 bar的组合
       * 为了他的连续性，应从右往做算。右边第一个 sub bar的 value = 0（x)，往后的 value值为 x + (x + 1)。只需计算 data.length - 1个。
       */

      const subData = [0]
      let subSum = 0
      for (let index = this.data.length - 1; index > 0; index--) {
        subSum += this.data[index].value
        subData.unshift(subSum)
      }

      const xData = this.data.map((item) => item.name)
      // console.log(subData)

      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          formatter(params) {
            const { name, color, value } = params[1]
            const line = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>学历为: ${name} 共${value} 条招聘数据`
            return line
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          },
          right: '5%',
          top: '5%'
        },
        grid: {
          bottom: '40',
          left: '10',
          right: '20'
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#303133',
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(239, 241, 244, .2'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(239, 241, 244, .6)', '#FFF']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#E9E9EB'
              }
            },
            splitNumber: 7
          }
        ],
        series: [
          {
            stack: '企业规模',
            type: 'bar',
            // barWidth: '50%',
            barMaxWidth: '200',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: subData
          },
          {
            stack: '企业规模',
            type: 'bar',
            // barWidth: '50%',
            barMaxWidth: '200',
            color: '#409EFF',
            data: this.data,
            label: {
              show: true,
              position: 'inside',
              formatter(params) {
                const { value } = params
                return value + '条'
              }
            }
          }
        ]
      }
      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.companySizepDom])
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
