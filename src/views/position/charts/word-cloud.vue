<template>
  <div class="wordcloud-container">
    <div ref="wordcloud" v-loading="loading" class="chart" />
  </div>
</template>

<script>
require('echarts-wordcloud')

export default {
  props: {
    benefitData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: true,
      wordcloudDom: {},
      data: []
    }
  },
  watch: {
    benefitData: {
      handler() {
        this.data = this.benefitData
        this.initBenefit()
      }
    }
  },
  mounted() {
    this.wordcloudDom = this.$echarts.init(this.$refs.wordcloud)
  },
  methods: {
    initBenefit() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      const option = {
        backgroundColor: '#FFF',
        tooltip: {
          show: true
        },
        series: [
          {
            width: '98%',
            height: '90%',
            name: '热点分析', //数据提示窗标题
            type: 'wordCloud',
            sizeRange: [10, 127], //画布范围，如果设置太大会出现少词（溢出屏幕）
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
            data: this.data
          }
        ]
      }

      this.wordcloudDom.setOption(option)
      this.$store.dispatch('setChartDOM', [this.wordcloudDom])
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
