<template>
  <div ref="EDUPOSChart" class="edu-pos echart" />
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // Generate data
    const category = [
      '15人以下',
      '15-50人',
      '50-150人',
      '150-500人',
      '500-2000人',
      '2000人以上'
    ]
    // let dottedBase = []
    const data = []
    // const colors = ['#5793f3', '#d14a61', '#675bba']
    category.forEach((element, index) => {
      data.push(Math.floor(Math.random() * 12000) + 900)
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
      legend: {
        data: ['企业规模'],
        textStyle: {
          color: '#1c1c1c'
        },
        top: '7%'
      },
      grid: {
        top: '14%'
      },
      xAxis: [
        {
          type: 'category',
          data: category,
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
          name: '企业规模',
          type: 'bar',
          barWidth: '60%',
          data: data
        }
      ]
    }
    this.$echarts.init(this.$refs.EDUPOSChart).setOption(option)
  }
}
</script>

<style lang="scss" spoce>
.echart {
  width: 100%;
  height: 100%;
}
</style>
