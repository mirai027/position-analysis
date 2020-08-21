<template>
  <div class="chart-container">
    <div ref="radar" v-loading="loading" class="chart"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
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
    this.chartDom = this.$echarts.init(this.$refs.radar)
    this.initChart()
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },
    async initChart() {
      setTimeout(() => {
        this.loading = false
      }, 300)

      const option = {
        tooltip: {},
        legend: {
          data: ['国内水平', '当地水平'],
          right: 20,
          top: 5
        },
        radar: {
        // shape: 'circle',
          // radius: 150,
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '薪资', max: 6500 },
            { name: '学历', max: 16000 },
            { name: '经验', max: 30000 },
            { name: '性质', max: 38000 },
            { name: '融资', max: 52000 },
            { name: '规模', max: 25000 }
          ]
        },
        series: [{
          name: '全国 vs 当地',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '国内水平'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '当地水平'
            }
          ]
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
