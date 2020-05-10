<template>
  <div ref="dateTime" class="date-time"></div>
</template>

<script>
import { getDateList, getDateBetween } from '@/utils/date'
// import mirai from '@/views/components/test-mock/vcl-mock'
import { mapGetters } from 'vuex'
import { getDateListData } from '@/api/mirai'

export default {
  data() {
    return {
      dateListData: []
    }
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName'])
  },
  mounted() {
    this._getDataListData()
      .then(() => {
        this.initDateTime()
      })
  },
  activated() {
    this.$store.dispatch('getName', ['date-date-time'])
    if (this.changedPage.includes('date')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'date')
    }
  },
  methods: {
    async _getDataListData() {
      const { data } = await getDateListData()
      this.dateListData = data
    },
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'date-date-time',
        chartDom: chartDom
      }])
      // console.log(this.chartDOM)
    },
    initDateTime() {
      // 获取昨天到 2020-03-30相隔多少天
      const dateNum = getDateBetween('2020-03-30', getDateList())
      // 获取昨天到 2020-03-30的日期
      const dateList = getDateList(dateNum + 1).reverse()

      const positionList = []
      //时间刻度默认显示的的职位
      const selectObj = {}
      this.dateListData.map((item) => {
        positionList.push(item.name)
      })
      //默认让前三个显示
      positionList.map((item, index) => {
        if (index < 3) {
          selectObj[item] = true
        } else {
          selectObj[item] = false
        }
      })

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
          data: this.dateListData[index].data,
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
      // console.log(mirai.data)

      const option = {
        legend: {
          data: positionList,
          top: '20px',
          left: '1%',
          selected: selectObj
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
      const _chartDom = this.$echarts.init(this.$refs.dateTime)
      _chartDom.setOption(option)
      this.getFromSon(_chartDom)
    // chart.on('datazoom', function(res) {
    //   console.log(res)
    // })
    // console.log(chart)
    }
  }
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
