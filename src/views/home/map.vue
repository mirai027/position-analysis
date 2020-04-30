<template>
  <div class="map-container">
    <Map :map-data="mapData" title="全国省份信息" />
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
  mounted() {
    this.getMapData()
  },
  methods: {
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
