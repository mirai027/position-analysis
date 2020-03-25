<template>
  <div ref="map" class="map-main chart" />
</template>

<script>
import 'echarts/map/js/china.js'
import { getAllProvince } from '@/api/map'
export default {
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      const res = await getAllProvince()
      const { data } = res
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
        ]
      }
      const chart = this.$echarts.init(this.$refs.map)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
      chart.on('click', params => {
        const { name } = params
        this.$router.push({
          path: '/province',
          query: { name }
        })
        console.log(params.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  // background: rgb(255, 25, 25);
}
</style>
