<template>
  <div class="company-size">
    <div ref="companySizeChart" class="echart" />
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
        // title: {
        //   text: '企业规模统计',
        //   x: 20,
        //   y: 50,
        //   textStyle: {
        //     color: '#1c1c1c',
        //     fontSize: 16,
        //     fontWeight: 'normal'
        //   }
        // },
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
            barWidth: '30%',
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
@import '~@/styles/index.scss';
// $main-text-color: red;
.company-size {
  .echart {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .title {
    position: absolute;
    top: 4%;
    left: 2%;
    color: $main-text-color;
    font-size: 18px;
    &::before {
      content: '';
      width: 3px;
      height: 20px;
      background: #409eff;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-20px, -50%);
    }
  }
}
</style>
