<template>
  <div class="map-container">
    <Map :map-data="mapData" title="全国省份信息" @fromSonComp="getFromSon" />
  </div>
</template>

<script>
import { getAllProvince } from '@/api/map'
import Map from '@/components/charts/map'

export default {
  components: {
    Map
  },
  data() {
    return {
      mapData: [],
      nation: 'china'
    }
  },
  computed: {},
  mounted() {
    this.getMapData()
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'home-map',
        chartDom: chartDom
      }])
      // console.log(this.chartDOM)
    },
    async getMapData() {
      const { data } = await getAllProvince()
      this.mapData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
