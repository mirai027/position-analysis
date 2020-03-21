<template>
  <div ref="companySizeChart" class="echart" />
</template>

<script>
import { getAllCompanySize } from '@/api/company-size'
export default {
  data() {
    return {}
  },
  mounted() {
    this.initCompanySize()
  },
  methods: {
    async initCompanySize() {
      const { data } = await getAllCompanySize()
      const xData = []
      data.forEach(ele => {
        xData.push(ele.name)
      })
      const option = {
        color: ['#3398DB'],
        title: {
          text: '企业规模统计',
          x: 20,
          y: 50,
          textStyle: {
            color: '#1c1c1c',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.4)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0'
            }
          }
        },
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
          right: '5%',
          top: '5%'
        },
        // legend: {
        //   data: ['企业规模'],
        //   textStyle: {
        //     color: '#1c1c1c'
        //   },
        //   top: '7%'
        // },
        grid: {
          top: '14%'
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            // name: '企业规模',
            type: 'bar',
            barWidth: '60%',
            data: data
          }
        ]
      }
      const chart = this.$echarts.init(this.$refs.companySizeChart)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
    }
  }
}
</script>

<style lang="scss" spoce>
.echart {
  width: 100%;
  height: 100%;
}
</style>
