<template>
  <div class="chart-container">
    <div ref="map" v-loading="loading" class="map-main" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
import 'echarts/map/js/china'
export default {
  props: {
    mapData: {
      type: Array,
      default: function() {
        return []
      }
    },
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
      chartDom: {},
      data: []
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    },
    mapData: {
      handler() {
        this.data = this.mapData
        this.initMap()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.map)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    async initMap() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      const colors = ['#5bc3f0', '#1ca2dc', '#0087dc']
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
          // show: false,
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
            color: '#303133',
            fontSize: '10'
            // textShadowOffsetY: 10
          },
          bottom: '10%',
          left: '4%'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        series: [
          {
            zoom: '1.1',
            type: 'map',
            mapType: 'china',
            width: '500px',
            // height: '100%',
            roam: false,
            itemStyle: {
              // areaColor: '#F00',
              borderWidth: 0.7,
              borderColor: '#e3e6ec'
            },
            label: {
              show: true,
              color: '#606266',
              fontSize: 10
            },
            data: this.data,
            emphasis: {
              label: {
                show: true,
                color: '#fff'
              },
              itemStyle: {
                areaColor: '#ff8454'
              }
            }
          }
        ]
      }

      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.mapDom])
      this.chartDom.on('click', (params) => {
        const { name } = params
        this.$router.push({
          path: '/province',
          query: { name }
        })
        // console.log(params.name)
      })
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
  .map-main {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 10px, $pos-left: 30px);
  }
}
</style>
