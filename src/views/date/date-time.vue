<template>
  <div ref="dateTime" class="date-time"></div>
</template>

<script>
import { getDateList, getDateBetween } from '@/utils/date'
import mirai from '@/views/components/test-mock/vcl-mock'
export default {
  data() {
    return {}
  },
  mounted() {
    // 获取昨天到 2020-02-19相隔多少天
    const dateNum = getDateBetween('2020-02-19', getDateList())
    // 获取昨天到 2020-02-19的日期
    const dateList = getDateList(dateNum + 1).reverse()

    const positionList = [
      '后端开发',
      '测试',
      '人工智能',
      '移动前端开发',
      '运维',
      '数据开发',
      '前端开发',
      '高端技术职位',
      '项目管理',
      '硬件开发',
      '企业软件',
      '产品经理',
      '运营'
    ]

    const service = positionList.map((item, index) => {
      // 获取随机颜色
      const color = `${Math.round(Math.random() * 255)}, ${Math.round(
        Math.random() * 255
      )}, ${Math.round(Math.random() * 255)}`
      // const data = dateList.map(() => {
      //   return Math.round(Math.random() * 2000 + 100)
      // })
      return {
        name: item,
        type: 'line',
        data: mirai.data[index].value,
        markPoint: {
          data: [
            {
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
          label: {
            formatter: function(params) {
              return `${item}: ${params.value}`
            }
          },
          precision: 0
        },
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 3,
        yAxisIndex: 0,
        color: `rgb(${color})`
        // areaStyle: {
        //   color: `rgba(${color}, .1)`
        // }
      }
    })
    console.log(mirai.data)

    const chart = this.$echarts.init(this.$refs.dateTime)
    const option = {
      legend: {
        data: [
          '后端开发',
          '测试',
          '人工智能',
          '移动前端开发',
          '运维',
          '数据开发',
          '前端开发',
          '高端技术职位',
          '项目管理',
          '硬件开发',
          '企业软件',
          '产品经理',
          '运营'
        ],
        top: '20px',
        left: '1%',
        selected: {
          后端开发: true,
          测试: true,
          人工智能: false,
          移动前端开发: false,
          运维: false,
          数据开发: false,
          前端开发: true,
          高端技术职位: false,
          项目管理: false,
          硬件开发: false,
          企业软件: false,
          产品经理: false,
          运营: false
        }
      },
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
        top: '12px'
      },
      grid: {
        top: '10%',
        right: '130px',
        bottom: '10%',
        left: '5%'
      },
      xAxis: {
        type: 'category',
        data: dateList,
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
        }
      },
      yAxis: {
        splitNumber: 10,
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
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 1,
          end: 30
        }
      ],
      series: service
    }
    chart.setOption(option)
    // chart.on('datazoom', function(res) {
    //   console.log(res)
    // })
    // console.log(chart)
  },
  activated() {}
}
</script>

<style lang="scss" scoped>
.date-time {
  width: 100%;
  // height: 400px;
  height: 100%;
  background: #fff;
}
</style>
