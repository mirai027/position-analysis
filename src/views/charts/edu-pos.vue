<template>
  <div ref="EDUPOSChart" class="edu-pos echart" />
</template>

<script>
import { getAllEduPos } from '@/api/edu-pos'
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
        // toolbox: {
        //   show: true
        // },
        color: colors,
        title: {
          text: '要求的学历对比职位的需求',
          x: 20,
          y: 50,
          textStyle: {
            color: '#1c1c1c',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
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
          right: '5%',
          top: '5%'
        },
        legend: {
          data: ['职位招聘数量', '大专及以下', '本科及以上'],
          textStyle: {
            color: '#1c1c1c'
          },
          top: '7%'
        },
        grid: {
          top: '14%'
        },
        xAxis: {
          data: xCategory,
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          }
        },
        yAxis: [
          {
            position: 'right',
            max: '55000',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} 条'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            }
          },
          {
            max: '55000',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} 条'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            }
          }
        ],
        series: [
          {
            name: '职位招聘数量',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            yAxisIndex: 1,
            data: categoryData
          },
          {
            name: '大专及以下',
            type: 'bar',
            data: JCBarData
          },
          {
            name: '本科及以上',
            type: 'bar',
            data: RCCBarData
          }
        ]
      }
      const chart = this.$echarts.init(this.$refs.EDUPOSChart)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
    }
  }
}
</script>

<style lang="scss" spoce>
.echart {
  width: 100%;
  height: 100%;
}
</style>
