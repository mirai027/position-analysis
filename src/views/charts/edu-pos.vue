<template>
  <div class="test">
    <div ref="testChart" class="chart" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.$refs.testChart)
    // Generate data
    const category = [
      'Java',
      'C++',
      'PHP',
      '数据挖掘',
      '搜索算法',
      '精准推荐',
      'C',
      'C#',
      '全栈工程师',
      '.NET',
      'Hadoop',
      'Python',
      'Delphi',
      'VB',
      'Perl',
      'Ruby',
      'Node.js',
      'Go',
      'ASP',
      'Shell',
      '区块链'
    ]
    // let dottedBase = []
    const lineData = []
    const JCbarData = [
      1600,
      1000,
      1500,
      1500,
      1500,
      1500,
      1900,
      12500,
      14000,
      11500,
      13200,
      14450,
      15250,
      13300,
      1600,
      1000,
      1500,
      1500,
      1500,
      1500,
      1900
    ]
    const RCCbarData = [
      4600,
      5000,
      5500,
      6500,
      7500,
      8500,
      9900,
      12500,
      14000,
      21500,
      23200,
      24450,
      25250,
      33300,
      4600,
      5000,
      5500,
      6500,
      7500,
      8500,
      9900
    ]
    const colors = ['#5793f3', '#d14a61', '#675bba']
    JCbarData.forEach((element, index) => {
      lineData.push(JCbarData[index] + RCCbarData[index])
    })

    // option
    const option = {
      // toolbox: {
      //   show: true
      // },
      color: colors,
      title: {
        text: '要求的学历对比职位的需求',
        x: 'center',
        y: 0,
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
        data: category,
        axisLine: {
          lineStyle: {
            color: colors[0]
          }
        }
      },
      yAxis: [
        {
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
          data: lineData
        },
        {
          name: '大专及以下',
          type: 'bar',
          data: JCbarData
        },
        {
          name: '本科及以上',
          type: 'bar',
          data: RCCbarData
        }
      ]
    }
    this.$echarts.init(this.$refs.testChart).setOption(option)
  }
}
</script>

<style lang="scss" spoce>
.test {
  width: 100vw;
  height: 100vh;
  // background: rgb(221, 221, 221);
  overflow: hidden;
  // overflow-y: scroll;
  display: flex;
  justify-content: center;
  .chart {
    width: 100vw;
    height: 100vh;
  }
}
</style>
