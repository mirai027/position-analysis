<template>
    <div class="chart-container">
        <div ref="column" v-loading="loading" class="chart" />
        <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    columnData: {
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
      data: []
    }
  },
  watch: {
    columnData: {
      handler() {
        this.data = this.columnData
        this.initColumn()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.column)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    initColumn() {
      setTimeout(() => {
        this.loading = false
      }, 300)

      var header = ['rank', 'nums', 'name']
      var rankArr = []
      var sign = 0
      this.data.forEach((item, index) => {
        if (index < 5) {
          sign = 100 - index * 15
        } else if (index < 10) {
          sign = 100 - index * 4
        } else {
          sign = 20
        }
        rankArr.unshift([sign, item.value, item.name])
      })
      rankArr.unshift(header)

      const option = {
        dataset: {
          source: rankArr
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: { containLabel: true },
        xAxis: { name: '数量' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['High', 'Low'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
          {
            name: '招聘信息数量',
            type: 'bar',
            encode: {
              x: 'nums',
              y: 'name'
            }
          }
        ]
      }

      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.chartDom])
    }

  }

}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    margin-top: 10px;
    width: 100%;
    height: 100%;
  }
 .title {
    @include title-line($pos-top: 0px, $pos-left: 30px);
  }
}
</style>
