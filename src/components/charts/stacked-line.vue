<template>
    <div class="chart-container">
        <div ref="stackedLine" v-loading="loading" class="stacked-line-main" />
        <p class="title">{{ title }}</p>
    </div>
</template>

<script>
export default {
  props: {
    stackedLineXdata: {
      type: Array,
      default: function() {
        return []
      }
    },
    stackedLineLegend: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      chartDom: {},
      xData: [],
      legend: []
    }
  },
  watch: {
    stackedLineXdata: {
      handler() {
        this.xData = this.stackedLineXdata[0]
        this.legend = this.stackedLineLegend
        // console.log(this.legend)
        this.initstackedLine()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.stackedLine)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    async initstackedLine() {
      setTimeout(() => {
        this.loading = false
      }, 300)

      const _xData = []
      const yData = []
      this.xData.forEach(item => {
        _xData.push(item.date)
        yData.push(item.value)
      })

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross'
          },
          formatter: function(params) {
            return params[0].name + '<br />' + params[0].value + '%'
          }
        },
        legend: {
          data: [this.legend[0]],
          textStyle: {
            fontSize: 18
          }
        },
        xAxis: {
          name: '时间',
          nameTextStyle: { fontSize: 20 },
          type: 'category',
          data: _xData,
          axisLabel: {
            interval: 10,
            formatter: function(value) {
              // var a = new Set(value)
              return value.split('-')[0]
              // console.log(value)
            }
          }
        },
        yAxis: {
          name: '使用率',
          nameTextStyle: { fontSize: 20 },
          type: 'value',
          splitLine: { show: false },
          axisLabel: {
            formatter: function(val) {
              return val + '%'
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return params.value.toFixed(2) + '%'
              }
            }
          }
        },
        series: [{
          name: 'Java',
          data: yData,
          type: 'line',
          lineStyle: {
            width: 4
          },
          smooth: true
        }]
      }

      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.chartDom])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  .stacked-line-main {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 0px, $pos-left: 30px);
  }
}
</style>
