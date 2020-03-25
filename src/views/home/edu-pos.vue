<template>
  <div class="edu-pos-container">
    <div ref="EDUPOSChart" class="edu-pos chart" />
    <p class="title">全国职位趋势图</p>
  </div>
</template>

<script>
import { getAllEduPos } from '@/api/edu-pos'
import getEchartXAxisName from '@/utils/getEchartXAxisName'
export default {
  data() {
    return {}
  },
  mounted() {
    this.ininEduPos()
  },
  methods: {
    async ininEduPos() {
      const {
        data: { position: categoryData, jc: JCBarData, rcc: RCCBarData }
      } = await getAllEduPos()
      const xCategory = []
      categoryData.forEach(item => {
        xCategory.push(item.name)
      })
      const colors = ['#5793f3', '#d14a61', '#675bba']

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.4)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0'
            }
          }
          // formatter(prams) {
          //   console.log(prams)
          // }
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
          right: '1.1%',
          top: '0'
        },
        legend: {
          data: ['职位招聘数量', '大专及以下', '本科及以上'],
          textStyle: {
            color: '#1c1c1c'
          },
          top: '1%'
        },
        grid: {
          containLabel: true,
          top: '12%',
          left: '2%',
          right: '2%',
          bottom: '2%'
        },
        xAxis: {
          data: xCategory,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: [
          {
            position: 'right',
            axisLabel: {
              formatter: params => {
                return `${params / 1000}K`
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
              formatter: params => {
                return `${params / 1000}K`
              }
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
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
            name: '职位招聘数量',
            type: 'bar',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            yAxisIndex: 1,
            barWidth: '27',
            data: categoryData
          },
          {
            name: '大专及以下',
            data: JCBarData,
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 3,
            yAxisIndex: 1,
            color: '#67C23A', //线条样式
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
            name: '本科及以上',
            data: RCCBarData,
            type: 'line',
            color: '#F56C6C',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 3
          }
        ]
      }
      const chart = this.$echarts.init(this.$refs.EDUPOSChart)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])

      chart.getZr().on('click', params => {
        console.log()
        if (params.event.offsetY > 100) {
          const name = getEchartXAxisName(chart, params)
          console.log(name)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.edu-pos-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 6px, $pos-left: 33px, $font-size: 16px);
  }
}
</style>
