<template>
  <div class="analysis">
    <heat-map class="heat-map" :heat-map-data="heatMapData" />
  </div>
</template>

<script>
import heatMap from './charts/heatmap'
import { getPositionHeatmap } from '@/api/position/heatmap'
export default {
  components: {
    heatMap
  },
  data() {
    return {
      heatMapData: []
    }
  },
  mounted() {
    this.getHeatmapData()
  },
  activated() {},
  methods: {
    async getHeatmapData() {
      const { data } = await getPositionHeatmap()
      this.heatMapData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  height: 100%;
  .heat-map {
    width: 100%;
    height: 400px;
    background: #fff;
  }
}
</style>
