<template>
  <div class="analysis">
    <heat-map class="heat-map" :heat-map-data="heatMapData" />
    <div class="second-container">
      <columnBar class="company-size" :company-size-data="companySizeData" />
      <columnBarSub class="education" :education-data="educationData" />
    </div>
  </div>
</template>

<script>
import heatMap from './charts/heat-map'
import columnBar from './charts/column-bar'
import columnBarSub from './charts/column-bar-sub'
import {
  getPositionHeatmap,
  getCompanySize,
  getEducation
} from '@/api/position'
export default {
  components: {
    heatMap,
    columnBar,
    columnBarSub
  },
  data() {
    return {
      heatMapData: [],
      companySizeData: [],
      educationData: []
    }
  },
  mounted() {
    this.getHeatmapData()
    this.getCompanySizeData()
    this.getEducationData()
  },
  activated() {},
  methods: {
    async getHeatmapData() {
      const { data } = await getPositionHeatmap()
      this.heatMapData = data
    },
    async getCompanySizeData() {
      const { data } = await getCompanySize()
      this.companySizeData = data
    },
    async getEducationData() {
      const { data } = await getEducation()
      this.educationData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
  .heat-map {
    width: 100%;
    height: 400px;
    background: #fff;
  }
  .second-container {
    margin-top: 10px;
    display: flex;
    .company-size {
      height: 400px;
      background: #fff;
    }
    .education {
      margin-left: 10px;
      height: 400px;
      background: #fff;
    }
  }
}
</style>
