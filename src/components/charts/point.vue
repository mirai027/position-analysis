<template>
  <div class="chart-container">
    <div ref="point" v-loading="loading" class="chart"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
var mock = [
  //前后两天
  [[16700, 25.23, 328, '后端开发', '昨日'], [14300, 17.54, 228, '移动前端开发', '昨日'], [7600, 12.30, 160, '测试', '昨日'], [6800, 15.46, 201, '运维', '昨日'], [10800, 3.61, 47, '数据开发', '昨日'], [18500, 6.77, 88, '人工智能', '昨日'], [14300, 9.23, 120, '前端开发', '昨日'], [15500, 2.00, 26, '企业软件', '昨日'], [10300, 3.23, 42, '硬件开发', '昨日'], [15600, 2.54, 33, '项目管理', '昨日']],
  [[17500, 29.58, 397, '后端开发', '今日'], [13500, 25.93, 348, '移动前端开发', '今日'], [8250, 10.21, 137, '测试', '今日'], [7300, 8.42, 113, '运维', '今日'], [12100, 4.84, 65, '数据开发', '今日'], [19800, 4.62, 62, '人工智能', '今日'], [13800, 4.10, 55, '前端开发', '今日'], [14400, 2.90, 39, '企业软件', '今日'], [12700, 2.38, 32, '硬件开发', '今日'], [16800, 2.38, 32, '项目管理', '今日']]
]
export default {
  props: {
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
      loading: true,
      chartDom: {}
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.point)
    this.initChart()
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },
    initChart() {
      var data = mock
      setTimeout(() => {
        this.loading = false
      }, 300)
      const option = {
        backgroundColor: this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          offset: 0,
          color: '#f7f8fa'
        }, {
          offset: 1,
          color: '#cdd0d5'
        }]),
        legend: {
          top: 10,
          right: 100,
          data: ['昨日', '今日']
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
            // show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          scale: true
        },
        series: [{
          name: '昨日',
          data: data[0],
          type: 'scatter',
          symbolSize: function(data) {
            return data[2] / 4 //1e2 = 100
          },
          emphasis: {
            label: {
              show: true,
              formatter: function(param) {
                return param.data[3]
              },
              position: 'top'
            }
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(251, 118, 123)'
            }, {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }])
          }
        }, {
          name: '今日',
          data: data[1],
          type: 'scatter',
          symbolSize: function(data) {
            return data[2] / 4 //1e2 = 100
          },
          emphasis: {
            label: {
              show: true,
              formatter: function(param) {
                return param.data[3]
              },
              position: 'top'
            }
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(129, 227, 238)'
            }, {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }])
          }
        }]
      }
      this.chartDom.setOption(option)
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
