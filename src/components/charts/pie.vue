<template>
  <div class="chart-container">
    <div ref="pie" v-loading="loading" class="chart" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    pieData: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
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
    pieData: {
      handler() {
        this.data = this.pieData
        this.initPie()
      }
    }
  },
  mounted() {
    this.chartDom = this.$echarts.init(this.$refs.pie)
    this.upLoad()
  },
  methods: {
    upLoad() {
      this.$emit('fromSonComp', this.chartDom)
    },

    initPie() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)
      const color = [
        '#0E7CE2',
        '#67C23A',
        '#FF8352',
        '#E271DE',
        '#409EFF',
        '#F8456B',
        '#00FFFF',
        '#4AEAB0'
      ]
      const formatNumber = function(num) {
        const reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      // const _this = this
      const option = {
        title: {
          text: '{name|' + '总量' + '}\n{val|' + formatNumber(12456) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#666666',
                padding: [10, 0]
              },
              val: {
                fontSize: 32,
                fontWeight: 'bold',
                color: '#333333'
              }
            }
          }
        },

        // backgroundColor: bgColor,
        color: color,
        legend: {
          orient: 'horizontal',
          bottom: '10',
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 12,
          align: 'left',
          textStyle: {
            rich: {
              name: {
                fontSize: 12
              },
              value: {
                fontSize: 16,
                padding: [0, 5, 0, 15]
              },
              unit: {
                fontSize: 12
              }
            }
          }
          // data: legendName
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['center', 'center'],
            // top: '50',
            data: this.data,
            itemStyle: {
              normal: {
                borderColor: '#FFF',
                borderWidth: 2
              }
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 120,
                lineStyle: {
                  color: '#C0C4CC'
                }
              }
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    '{icon|●}{name|' +
                    params.name +
                    '}{value|' +
                    formatNumber(params.value) +
                    '}'
                  )
                },
                padding: [0, -100, 25, -100],
                rich: {
                  icon: {
                    fontSize: 20
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 10, 0, 4],
                    color: '#666666'
                  },
                  value: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333333'
                  }
                }
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      this.chartDom.setOption(option)
      // this.$store.dispatch('setChartDOM', [this.pieDom])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
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
