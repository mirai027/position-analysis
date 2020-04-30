<template>
    <div class="funnel-container">
        <div ref="funnel" v-loading="loading" class="chart" />
        <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    funnelData: {
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
      funnelDom: {},
      data: []
    }
  },
  watch: {
    funnelData: {
      handler() {
        this.data = this.funnelData
        this.initFunnel()
      }
    }
  },
  mounted() {
    this.funnelDom = this.$echarts.init(this.$refs.funnel)
  },
  methods: {
    initFunnel() {
      setTimeout(() => {
        this.loading = false
      }, 300)

      var dataArr = []
      var dataObj = {}
      const nameArr = []
      this.funnelData.forEach((item, index) => {
        dataObj = {
          value: 100 - index * 20,
          name: item.name
        }
        dataArr.push(dataObj)
        nameArr.push(item.name)
      })

      console.log(dataArr)
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: nameArr
        },

        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: dataArr
          }
        ]
      }

      this.funnelDom.setOption(option)
      this.$store.dispatch('setChartDOM', [this.funnelDom])
    }

  }

}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.funnel-container {
  width: 100%;
  height: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
 .title {
    @include title-line($pos-top: 0px, $pos-left: 30px);
  }
}
</style>
