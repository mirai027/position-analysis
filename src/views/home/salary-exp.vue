<template>
  <div ref="EDUPOSChart" class="edu-pos echart" />
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // Generate data
    const category = [
      '不限',
      '应届毕业生',
      '1年以下',
      '1-3年',
      '3-5年',
      '5-10年',
      '10年以上'
    ]
    // let dottedBase = []
    const POSITION_NUM = []
    const JCbarData = [8600, 1000, 1500, 4500, 5500, 6500, 7900] // 大专及以下
    const RCCbarData = [4600, 5000, 5500, 6500, 7500, 8500, 9900] // 本科及以上
    const EXP_SALARY = [7000, 4000, 5000, 10000, 15000, 20000, 30000] // 薪资平均值
    const colors = ['#5793f3', '#d14a61', '#675bba', '#39c5bb']
    JCbarData.forEach((element, index) => {
      POSITION_NUM.push(JCbarData[index] + RCCbarData[index])
    })

    // option
    const option = {
      // toolbox: {
      //   show: true
      // },
      color: colors,
      title: {
        text: '要求的学历对比职位的需求',
        x: 10,
        y: 20,
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
        data: ['职位招聘数量', '大专及以下', '本科及以上', '薪资平均值'],
        textStyle: {
          color: '#1c1c1c'
        },
        top: '7%'
      },
      grid: {
        top: '14%'
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: colors[0]
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '职位招聘数量',
          position: 'left',
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} 条'
          },
          splitLine: {
            show: false
          }
        },
        {
          max: '40000',
          name: '薪资平均值',
          type: 'value',
          offset: 80,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} 元'
          },
          splitLine: {
            show: false
          }
        },
        {
          max: '17000',
          type: 'value',
          name: '大专及以下',
          position: 'right',
          offset: 80,
          axisLine: {
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {
            formatter: '{value} 条'
          },
          splitLine: {
            show: false
          }
        },
        {
          max: '17000',
          type: 'value',
          name: '本科及以上',
          position: 'right',
          axisLine: {
            lineStyle: {
              color: colors[3]
            }
          },
          axisLabel: {
            formatter: '{value} 条'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '职位招聘数量',
          type: 'line',
          smooth: true,
          // showAllSymbol: true,
          // symbol: 'emptyCircle',
          yAxisIndex: 0,
          data: POSITION_NUM
        },

        {
          name: '薪资平均值',
          type: 'line',
          // smooth: true,
          // showAllSymbol: true,
          // symbol: 'emptyCircle',
          yAxisIndex: 1,
          data: EXP_SALARY
        },
        {
          name: '大专及以下',
          type: 'bar',
          yAxisIndex: 2,
          data: JCbarData
        },
        {
          name: '本科及以上',
          type: 'bar',
          yAxisIndex: 3,
          data: RCCbarData
        }
      ]
    }
    const chart = this.$echarts.init(this.$refs.EDUPOSChart)
    chart.setOption(option)
    this.$store.dispatch('setChartDOM', [chart])
  }
}
</script>

<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
