<template>
    <div class="column-container">
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
      columnDom: {},
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
    this.columnDom = this.$echarts.init(this.$refs.column)
  },
  methods: {
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
      console.log(rankArr)
      const option = {
        dataset: {
          source: rankArr
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
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'nums',
              // Map the "product" column to Y axis
              y: 'name'
            }
          }
        ]
      }

      this.columnDom.setOption(option)
      this.$store.dispatch('setChartDOM', [this.columnDom])
    }

  }

}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.column-container {
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
