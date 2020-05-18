<template>
  <div class="date-trend-container">
    <line-chart :line-data="lineData" title="招聘数据趋势" @fromSonComp="getFromSon" />
  </div>
</template>

<script>
import { getAllUpdate } from '@/api/map'
import lineChart from '@/components/charts/line'
export default {
  components: {
    lineChart
  },
  data() {
    return {
      lineData: []
    }
  },
  computed: {},
  mounted() {
    this.getUpdate()
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'home-dateTrend',
        chartDom: chartDom
      }])
      // console.log(this.chartDOM)
    },
    async getUpdate() {
      const { data } = await getAllUpdate()
      this.lineData = data.reverse()
      console.log(this.lineData)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
.date-trend-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
