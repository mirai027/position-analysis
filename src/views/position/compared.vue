<template>
  <div class="compared">
    <div class="analysis">
      <positionCopy class="position" :position-data="positionData" />
      <heat-map class="heat-map" :heat-map-data="heatMapData" title="预测薪资" />
      <columnBar class="company-size" :column-data="companySizeData" title="企业规模" />
      <columnBarSub class="education" :column-bar-data="educationData" title="学历要求" />
      <wordCloud class="word-cloud" :word-cloud-data="benefitData" title="薪资福利" />
      <pie class="finance-stage" :pie-data="financeStage" title="企业融资" />
    </div>
    <div class="analysis">
      <positionCopy class="position" :position-data="positionData" />
      <heat-map class="heat-map" :heat-map-data="heatMapData" title="预测薪资" />
      <columnBar class="company-size" :column-data="companySizeData" title="企业规模" />
      <columnBarSub class="education" :column-bar-data="educationData" title="学历要求" />
      <wordCloud class="word-cloud" :word-cloud-data="benefitData" title="薪资福利" />
      <pie class="finance-stage" :pie-data="financeStage" title="企业融资" />
    </div>
    <!-- <div class="analysis">
      <position class="position" :position-data="positionData" />
      <heat-map class="heat-map" :heat-map-data="heatMapData" />
      <columnBar class="company-size" :company-size-data="companySizeData" />
      <columnBarSub class="education" :education-data="educationData" />
      <wordCloud class="word-cloud" :benefit-data="benefitData" />
      <pie class="finance-stage" :finance-stage-data="financeStage" />
    </div> -->
  </div>
</template>

<script>
import positionCopy from './position-copy'
import heatMap from '@/components/charts/heat-map'
import columnBar from '@/components/charts/column-bar'
import columnBarSub from '@/components/charts/column-bar-sub'
import wordCloud from '@/components/charts/word-cloud'
import pie from '@/components/charts/pie'
import {
  getPosition,
  getPositionHeatmap,
  getCompanySize,
  getEducation,
  getBenefit,
  getFinanceStage
} from '@/api/position'
export default {
  components: {
    positionCopy,
    heatMap,
    columnBar,
    columnBarSub,
    wordCloud,
    pie
  },
  data() {
    return {
      positionData: {},
      heatMapData: [],
      companySizeData: [],
      educationData: [],
      benefitData: [],
      financeStage: []
    }
  },
  mounted() {
    this.getPositionData()
    this.getHeatmapData()
    this.getCompanySizeData()
    this.getEducationData()
    this.getBenefitData()
    this.getFinanceStageData()
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
    },
    async getBenefitData() {
      const { data } = await getBenefit()
      this.benefitData = data
    },
    async getFinanceStageData() {
      const { data } = await getFinanceStage()
      this.financeStage = data
    },
    async getPositionData() {
      const { data } = await getPosition()
      this.positionData = data
    }
  }
}
</script>
<style lang="scss" scoped>
.compared {
  width: 100%;
  height: 100%;
  // background: #fff;
  display: flex;
  .analysis {
    flex: 1;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &:first-child {
      margin-right: 20px;
    }
    .position {
      height: auto;
      background: #fff;
    }
    .heat-map {
      margin-top: 10px;
      height: 400px;
      background: #fff;
    }
    .company-size {
      margin-top: 10px;
      height: 400px;
      background: #fff;
    }
    .education {
      margin-top: 10px;
      height: 400px;
      background: #fff;
    }
    .word-cloud {
      margin-top: 10px;
      height: 400px;
      background: #fff;
    }
    .finance-stage {
      margin-top: 10px;
      height: 400px;
      background: #fff;
    }
  }
}
</style>
