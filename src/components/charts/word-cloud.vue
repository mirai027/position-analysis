<template>
  <div class="chart-container">
    <div ref="wordcloud" v-loading="loading" class="chart" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
require('echarts-wordcloud')

export default {
  props: {
    wordCloudData: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: true,
      chartDom: {},
      data: []
    }
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    },
    wordCloudData: {
      handler() {
        this.data = this.wordCloudData
        this.initBenefit()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.wordcloud)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    initBenefit() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      const option = {
        // backgroundColor: '#FFF',
        tooltip: {
          show: true
        },
        series: [
          {
            width: '95%',
            height: '88%',
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

      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.chartDom])
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
  .chart {
    width: 100%;
    height: 100%;
  }
  .title {
    @include title-line($pos-top: 10px, $pos-left: 30px);
  }
}
</style>
