<template>
  <div class="map">
    <div class="container">
      <div ref="map" class="left map echart" />
      <div class="right">
        <div v-if="Object.keys(monthBest).length" class="month main-card">
          <div class="card" @click="getName(monthBest.best.title)">
            <p class="title">今日“优秀三好学生”省份</p>
            <p class="province">
              {{ monthBest.best.rank }}: <span>{{ monthBest.best.title }}</span>
            </p>
            <p class="total">
              今日总数: <span>{{ monthBest.best.total }} 条</span>
            </p>
            <p class="total">
              今日新增: <span>{{ monthBest.best.new }} 条</span>
            </p>
          </div>
          <div class="card" @click="getName(monthBest.better.title)">
            <p class="title">今日“优秀进步奖”省份</p>
            <p class="province">
              {{ monthBest.better.rank }}:
              <span>{{ monthBest.better.title }}</span>
            </p>
            <p class="total">
              今日总数: <span>{{ monthBest.better.total }} 条</span>
            </p>
            <p class="total">
              今日新增: <span>{{ monthBest.better.new }} 条</span>
            </p>
          </div>
        </div>
        <div v-if="Object.keys(dayBest).length" class="day main-card">
          <div class="card" @click="getName(dayBest.best.title)">
            <p class="title">月度“优秀三好学生”省份</p>
            <p class="province">
              {{ dayBest.best.rank }}: <span>{{ dayBest.best.title }}</span>
            </p>
            <p class="total">
              月度总数: <span>{{ dayBest.best.total }} 条</span>
            </p>
            <p class="total">
              月度新增: <span>{{ dayBest.best.new }} 条</span>
            </p>
          </div>
          <div class="card" @click="getName(dayBest.better.title)">
            <p class="title">月度“优秀进步奖”省份</p>
            <p class="province">
              {{ dayBest.better.rank }}: <span>{{ dayBest.better.title }}</span>
            </p>
            <p class="total">
              月度总数: <span>{{ dayBest.better.total }} 条</span>
            </p>
            <p class="total">
              月度新增: <span>{{ dayBest.better.new }} 条</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div ref="update" class="bottom update" />
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
import {
  getAllProvince,
  getAllUpdate,
  getAllDayBest,
  getAllMonthBest
} from '@/api/map'
import getEchartXAxisName from '@/utils/getEchartXAxisName'
export default {
  data() {
    return {
      dayBest: {},
      monthBest: {}
    }
  },
  mounted() {
    this.initMap()
    this.initUpdate()
    this.initBest()
  },
  methods: {
    async initMap() {
      const res = await getAllProvince()
      const { data } = res
      const colors = ['#39C5BB', '#66CCFF', '#ffff00', '#ee0000']
      const option = {
        color: colors,
        tooltip: {
          show: true,
          formatter: function(params) {
            return `${params.data.name}： ${params.data.value} 条`
          }
        },
        legend: false,
        visualMap: {
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: ['高', '低'],
          showLabel: true,
          seriesIndex: [0],
          inRange: {
            color: colors
          },
          textStyle: {
            color: '#7B93A7'
          },
          bottom: '10%',
          left: '5%'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle: {
              // areaColor: '#0E0A26',
              borderWidth: 1
              // borderColor: '#382F93'
            },
            label: {
              show: true,
              color: '#282C34',
              fontSize: 12
            },
            data: data,
            emphasis: {
              label: {
                show: true,
                color: '#fff'
              },
              itemStyle: {
                // areaColor: '#FF733D'
              }
            }
          }
        ]
      }
      const chart = this.$echarts.init(this.$refs.map)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
      chart.on('click', params => {
        console.log(params.name)
      })
    },
    async initUpdate() {
      const res = await getAllUpdate()
      const { data } = res
      const lineData = []
      const updateBarData = []
      const xAxisData = []
      for (let index = 1; index < data.length; index++) {
        const cty = data[index].value - data[index - 1].value
        lineData.push(data[index])
        updateBarData.push({ name: data[index].name, value: cty })
        xAxisData.push(data[index].name)
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
          right: '7%',
          top: '0'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          axisPointer: {
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
            params.forEach(element => {
              const { componentIndex } = element
              if (componentIndex === 0) {
                const line = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${element.color};"></span>${element.name} 共 <span style="color: #F13000;">${element.value}</span> 条招聘数据`
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
          containLabel: true,
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: [
          {
            position: 'right',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[0]
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
            symbolSize: 8,
            yAxisIndex: 1,
            color: colors[1]
          },
          {
            name: '较昨日',
            data: updateBarData,
            type: 'bar',
            color: colors[0]
          }
        ],
        legend: {
          data: ['全国总数据', '较昨日'],
          textStyle: {
            color: '#1c1c1c'
          },
          left: '7%'
        }
      }
      const chart = this.$echarts.init(this.$refs.update)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
      chart.getZr().on('click', params => {
        console.log(getEchartXAxisName(chart, params))
      })
    },
    async initBest() {
      const day = await getAllDayBest()
      const month = await getAllMonthBest()
      this.dayBest = day.data
      this.monthBest = month.data
    },
    getName(name) {
      console.log(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .container {
    width: 100%;
    height: 65%;
    display: flex;
    .left {
      width: 45%;
      height: 120%;
      position: relative;
      transform: translateY(-10%);
      // transform: scale(1.1);
    }
    .right {
      width: 55%;
      height: auto;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      .main-card {
        width: auto;
        height: 50%;
        display: flex;
        padding: 20px 0 0 20px;
        .card {
          width: 50%;
          margin-right: 20px;
          border: 1px solid rgb(241, 241, 241);
          border-radius: 4px;
          box-shadow: 0px 0px 12px 1px #ddd;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-size: 22px;
            padding-left: 10px;
          }
          .province {
            font-size: 20px;
            padding-left: 10px;
          }
          .total {
            font-size: 18px;
            padding-left: 10px;
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
  }
  .bottom {
    width: auto;
    height: 35%;
  }
}
</style>
