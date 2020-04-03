<template>
  <div v-loading="mapLoading" class="map" element-loading-text="拼命加载中">
    <div ref="map" class="chart" />
    <el-breadcrumb separator="/" class="reset" @click.native="resize">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="item in location"
          :key="item.id"
          class="reset-item"
        >
          {{ item.name }}</el-breadcrumb-item
        >
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import 'echarts/map/js/china'
import 'echarts/map/js/china'
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
import { getAllProvince } from '@/api/map'
export default {
  data() {
    return {
      chart: null,
      mapLoading: false,
      location: [{ id: '001', name: '中国' }],
      canRun: 0 // 0为可下钻
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.map)
    this.initMap()
  },
  methods: {
    async initMap() {
      const res = await getAllProvince()
      const { data } = res
      let option = this.mapOption(undefined, data)
      this.chart.setOption(option)
      this.$store.dispatch('setChartDOM', [this.chart])
      this.chart.on('click', params => {
        console.log(params)
        if (!this.canRun) {
          const { name } = params
          this.chart.clear()
          option = this.mapOption(name, data)
          this.chart.setOption(option)
          setTimeout(() => {
            this.location.splice(1, 1)
            setTimeout(() => {
              this.location.push({ id: '002', name })
            }, 200)
          })
          this.canRun++
        }
      })
    },
    mapOption(province = 'china', data = []) {
      const colors = ['#5bc3f0', '#1ca2dc', '#0087dc']
      return {
        series: [
          {
            zoom: '1.1',
            type: 'map',
            mapType: province,
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
            data: data,
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
        ],
        color: colors,
        tooltip: {
          show: true
          // formatter: function(params) {
          //   return `${params.data.name}： ${params.data.value} 条`
          // }
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
        }
      }
    },
    resize() {
      this.chart.clear()
      const option = this.mapOption('china')
      this.chart.setOption(option)
      this.location.splice(1, 1)
      this.canRun = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .chart {
    width: 50%;
    height: 70%;
  }
  .reset {
    position: absolute;
    top: 10px;
    left: 0;
    width: 200px;
    // font-size: 18px;
    display: flex;
    cursor: pointer !important;
    .reset-item {
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
