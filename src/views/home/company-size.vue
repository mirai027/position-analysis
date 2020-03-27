<template>
  <div class="company-size-container">
    <div ref="companySizeChart" class="chart" />
    <p class="title">企业规模统计</p>
  </div>
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
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.4)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0',
              backgroundColor: '#409EFF'
            }
          },
          formatter: function(params) {
            const { name, color, value } = params[0]
            const line = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${name}公司共发出 ${value} 条招聘数据`
            return line
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
        grid: {
          top: '20%',
          right: '5%',
          bottom: '10%',
          left: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#303133'
            },
            axisLine: {
              lineStyle: {
                color: '#E9E9EB'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#303133'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(239, 241, 244, .2'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(239, 241, 244, .6)', '#FFF']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#E9E9EB'
              }
            }
          }
        ],
        series: [
          {
            // name: '企业规模',
            type: 'bar',
            barWidth: '30%',
            color: '#409EFF',
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

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.company-size-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 23px, $pos-left: 33px);
  }
}
</style>
