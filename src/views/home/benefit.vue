<template>
  <div class="wordcloud-container">
    <div ref="wordcloudChart" class="chart" />
  </div>
</template>

<script>
require('echarts-wordcloud')
import { getAllBenefit } from '@/api/benefit'

export default {
  mounted() {
    this.initBenefit()
  },
  methods: {
    async initBenefit() {
      const { data } = await getAllBenefit()
      const option = {
        // title: {
        //   text: '词云', //标题
        //   x: 'center',
        //   textStyle: {
        //     fontSize: 23
        //   }
        // },
        backgroundColor: '#FFF',
        tooltip: {
          show: true
        },
        series: [
          {
            width: '90%',
            height: '90%',
            name: '热点分析', //数据提示窗标题
            type: 'wordCloud',
            sizeRange: [6, 70], //画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [-45, 120], //数据翻转范围
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: data
          }
        ]
      }
      const chart = this.$echarts.init(this.$refs.wordcloudChart)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
    }
  }
}
</script>

<style lang="scss" scoped>
.wordcloud-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
