<template>
  <div class="map">
    <div class="container">
      <div ref="map" class="left map echart" />
      <div class="right">
        <div class="month main-card">
          <div class="card">
            <p class="title">今日“优秀三好学生”省份</p>
            <p class="province">TOP1: <span>广东省</span></p>
            <p class="total">今日总数: <span>3939 条</span></p>
            <p class="total">今日新增: <span>272 条</span></p>
          </div>
          <div class="card">
            <p class="title">今日“优秀进步奖”省份</p>
            <p class="province">TOP1: <span>江苏省</span></p>
            <p class="total">今日总数: <span>2939 条</span></p>
            <p class="total">今日新增: <span>572 条</span></p>
          </div>
        </div>
        <div class="day main-card">
          <div class="card">
            <p class="title">月度“优秀三好学生”省份</p>
            <p class="province">TOP1: <span>广东省</span></p>
            <p class="total">月度总数: <span>39393 条</span></p>
            <p class="total">月度新增: <span>2721 条</span></p>
          </div>
          <div class="card">
            <p class="title">月度“优秀进步奖”省份</p>
            <p class="province">TOP1: <span>江苏省</span></p>
            <p class="total">月度总数: <span>29393 条</span></p>
            <p class="total">月度新增: <span>5721 条</span></p>
          </div>
        </div>
      </div>
    </div>
    <div ref="update" class="bottom update" />
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
export default {
  data() {
    return {}
  },
  mounted() {
    this.initMap()
    this.initUpdate()
  },
  methods: {
    initMap() {
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
            data: [
              {
                name: '上海',
                value: 137
              },
              {
                name: '云南',
                value: 11
              },
              {
                name: '北京',
                value: 39
              },
              {
                name: '四川',
                value: 48
              },
              {
                name: '天津',
                value: 7
              },
              {
                name: '安徽',
                value: 20
              },
              {
                name: '山东',
                value: 14
              },
              {
                name: '山西',
                value: 1
              },
              {
                name: '广东',
                value: 331
              },
              {
                name: '广西',
                value: 5
              },
              {
                name: '江苏',
                value: 99
              },
              {
                name: '江西',
                value: 8
              },
              {
                name: '河北',
                value: 1
              },
              {
                name: '河南',
                value: 4
              },
              {
                name: '浙江',
                value: 84
              },
              {
                name: '海南',
                value: 5
              },
              {
                name: '湖北',
                value: 60
              },
              {
                name: '湖南',
                value: 21
              },
              {
                name: '福建',
                value: 17
              },
              {
                name: '辽宁',
                value: 10
              },
              {
                name: '重庆',
                value: 16
              },
              {
                name: '陕西',
                value: 15
              },
              {
                name: '贵州',
                value: 10
              },
              {
                name: '青海',
                value: 6
              },
              {
                name: '甘肃',
                value: 7
              },
              {
                name: '西藏',
                value: 7
              },
              {
                name: '黑龙江',
                value: 7
              },
              {
                name: '宁夏',
                value: 7
              },
              {
                name: '内蒙古',
                value: 7
              },
              {
                name: '吉林',
                value: 7
              },
              {
                name: '新疆',
                value: 7
              },
              {
                name: '台湾',
                value: 7
              },
              {
                name: '澳门',
                value: 7
              },
              {
                name: '香港',
                value: 7
              },
              {
                name: '南海诸岛',
                value: 0
              }
            ],
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
      this.$echarts.init(this.$refs.map).setOption(option)
    },
    initUpdate() {
      const data = [
        { name: '2-10', value: 710 },
        { name: '2-11', value: 820 },
        { name: '2-12', value: 932 },
        { name: '2-13', value: 901 },
        { name: '2-14', value: 934 },
        { name: '2-15', value: 1290 },
        { name: '2-16', value: 1330 },
        { name: '2-17', value: 1320 },
        { name: '2-18', value: 1490 },
        { name: '2-19', value: 1530 },
        { name: '2-20', value: 1620 },
        { name: '2-21', value: 1790 },
        { name: '2-22', value: 1830 },
        { name: '2-23', value: 1920 },
        { name: '2-24', value: 2090 },
        { name: '2-25', value: 2130 },
        { name: '2-26', value: 2220 },
        { name: '2-27', value: 2932 },
        { name: '2-28', value: 2901 },
        { name: '2-29', value: 2934 },
        { name: '3-1', value: 3290 },
        { name: '3-2', value: 3330 },
        { name: '3-3', value: 3320 },
        { name: '3-4', value: 3490 },
        { name: '3-5', value: 3530 },
        { name: '3-6', value: 3620 },
        { name: '3-7', value: 3790 },
        { name: '3-8', value: 3830 },
        { name: '3-9', value: 3920 },
        { name: '3-10', value: 4090 },
        { name: '3-11', value: 4130 },
        { name: '3-12', value: 4220 }
      ]
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
      // console.log(this.$echarts.init(this.$refs.update))
      this.$echarts.init(this.$refs.update).setOption(option)
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
