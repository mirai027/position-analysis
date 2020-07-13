<template>
  <div class="chart-container">
    <div ref="prov" v-loading="loading" class="map-main" />
  </div>
</template>

<script>
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/aomen'
import 'echarts/map/js/province/beijing'
import 'echarts/map/js/province/chongqing'
import 'echarts/map/js/province/fujian'
import 'echarts/map/js/province/gansu'
import 'echarts/map/js/province/guangdong'
import 'echarts/map/js/province/guangxi'
import 'echarts/map/js/province/guizhou'
import 'echarts/map/js/province/hainan'
import 'echarts/map/js/province/hebei'
import 'echarts/map/js/province/heilongjiang'
import 'echarts/map/js/province/henan'
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/hunan'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/province/jiangxi'
import 'echarts/map/js/province/jilin'
import 'echarts/map/js/province/liaoning'
import 'echarts/map/js/province/neimenggu'
import 'echarts/map/js/province/ningxia'
import 'echarts/map/js/province/qinghai'
import 'echarts/map/js/province/shandong'
import 'echarts/map/js/province/shanghai'
import 'echarts/map/js/province/shanxi'
import 'echarts/map/js/province/shanxi1'
import 'echarts/map/js/province/sichuan'
import 'echarts/map/js/province/taiwan'
import 'echarts/map/js/province/tianjin'
import 'echarts/map/js/province/xianggang'
import 'echarts/map/js/province/xinjiang'
import 'echarts/map/js/province/xizang'
import 'echarts/map/js/province/yunnan'
import 'echarts/map/js/province/zhejiang'
// import pinyin from 'js-pinyin'
export default {
  components: {},
  props: {
    provData: {
      type: Array,
      default: function() {
        return []
      }
    },
    province: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      data: []
    }
  },
  computed: {
    title() {
      return `${this.province}招聘数据`
    }
  },
  watch: {
    provData: {
      handler() {
        this.data = this.provData
        this.initMap()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.prov)
    this.upLoad()
  },
  deactivated() {
    this.chartDom.clear()
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
          right: '4%'
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
            mapType: this.province,
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
      this.chartDom.on('click', (params) => {
        console.log(params)
        // this.$router.push({
        //   path: '/province',
        //   query: { name }
        // })
        // console.log(params.name)
      })
      // this.$store.dispatch('setChartDOM', [this.mapDom])
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
  // .title {
  //   @include title-line($pos-top: 10px, $pos-left: 30px);
  // }
}
</style>
