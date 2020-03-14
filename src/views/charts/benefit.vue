<template>
  <div ref="wordcloud" class="wordcloud" />
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
        title: {
          text: '词云', //标题
          x: 'center',
          textStyle: {
            fontSize: 23
          }
        },
        backgroundColor: '#F7F7F7',
        tooltip: {
          show: true
        },
        series: [
          {
            name: '热点分析', //数据提示窗标题
            type: 'wordCloud',
            sizeRange: [6, 66], //画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [-45, 90], //数据翻转范围
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
      this.$echarts.init(this.$refs.wordcloud).setOption(option)
    }
  }
}
</script>

<style>
.wordcloud {
  width: 100vw;
  height: 100vh;
}
</style>
