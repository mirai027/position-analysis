<template>
  <div class="chart-container">
    <div ref="update" v-loading="loading" class="chart"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
import getEchartXAxisName from '@/utils/getEchartXAxisName'
export default {
  props: {
    lineData: {
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
      data: [],
      chartDom: {},
      loading: true
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    },
    lineData: {
      handler() {
        this.data = this.lineData
        this.initUpdate()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.update)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    async initUpdate() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      const lineData = []
      const updateBarData = []
      const xAxisData = []
      for (let index = 1; index < this.data.length; index++) {
        const cty = this.data[index].value - this.data[index - 1].value
        lineData.push(this.data[index])
        updateBarData.push({ name: this.data[index].name, value: cty })
        xAxisData.push(this.data[index].name)
      }
      const colors = ['#d14a61', '#5793f3', '#675bba']
      const option = {
        color: colors,
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
          right: '6%',
          top: '3%'
        },
        legend: {
          data: ['全国总数据', '较昨日'],
          textStyle: {
            color: '#1c1c1c'
          },
          top: '4%',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          axisPointer: {
            animation: false,
            type: 'cross',
            label: {
              precision: '0'
            }
          },
          formatter: function(params) {
            /**
             * componentIndex === 0 line chart
             * componentIndex === 1 bar chart
             */
            const fm = {}
            params.forEach((element) => {
              const { componentIndex } = element
              if (componentIndex === 0) {
                const line = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${element.color};"></span>${element.name} 共 <span style="color: ${element.color};">${element.value}</span> 条招聘数据`
                fm.line = line
              }
              if (componentIndex === 1) {
                const style = () => {
                  if (element.value > 0) {
                    return {
                      value: `新增 ${element.value} `,
                      color: '#66ccff'
                    }
                  } else if (element.value < 0) {
                    return {
                      value: `减少 ${element.value} `,
                      color: '#F13000'
                    }
                  } else element.value === 0
                  return { value: ` 不变 `, color: '#39c5bb' }
                }
                const bar = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  element.color
                };"></span>${element.name} 共 <span style="color:${
                  style().color
                };">${style().value}</span> 条招聘数据`
                fm.bar = bar
              }
            })
            let res = ''
            if (Object.keys(fm).length === 2) {
              res = fm.line + '<br />' + fm.bar
            } else {
              fm.line ? (res = fm.line) : ''
              fm.bar ? (res = fm.bar) : ''
            }
            return res
          }
        },
        grid: {
          top: '15%',
          right: '5%',
          bottom: '10%',
          left: '5%'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
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
          },
          axisPointer: {
            label: {
              backgroundColor: '#67C23A'
            }
          }
          // boundaryGap: false
        },
        yAxis: [
          {
            // position: 'right',
            axisLabel: {
              formatter: '{value} 条'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#409EFF'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(239, 241, 244, .2)'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(239, 241, 244, .5)', '#FFF']
              }
            }
          },
          {
            axisLabel: {
              formatter: '{value} 条',
              color: '#F56C6C'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#F56C6C'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '全国总数据',
            data: lineData,
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 3,
            yAxisIndex: 0,
            color: '#409EFF', //线条样式
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(217, 236, 255, .3)'
                  },

                  {
                    offset: 1,
                    color: 'rgba(217, 236, 255, .3)'
                  }
                ],
                global: false, // 缺省为 false
                opacity: 0.1
              }
            }
          },
          {
            name: '较昨日',
            data: updateBarData,
            type: 'line',
            color: '#F56C6C',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 3,
            yAxisIndex: 1
          }
        ]
      }

      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.lineDom])
      this.chartDom.getZr().on('click', (params) => {
        // console.log(params.event.offsetY)
        if (params.event.offsetY > 60) {
          const name = getEchartXAxisName(this.chartDom, params)
          this.$router.push({
            path: '/date',
            query: { name }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
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
