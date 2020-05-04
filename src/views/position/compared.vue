<template>
  <div class="compared">
    <div class="analysis">
      <positionCopy class="position" :position-data="positionData" />
      <heat-map class="heat-map" :heat-map-data="heatMapData" title="预测薪资" @fromSonComp="getFromHeat" />
      <columnBar class="company-size" :column-data="companySizeData" title="企业规模" @fromSonComp="getFromBar" />
      <columnBarSub class="education" :column-bar-data="educationData" title="学历要求" @fromSonComp="getFromBarSub" />
      <wordCloud class="word-cloud" :word-cloud-data="benefitData" title="薪资福利" @fromSonComp="getFromWordCloud" />
      <pie class="finance-stage" :pie-data="financeStage" title="企业融资" @fromSonComp="getFromPie" />
    </div>
    <div class="analysis">
      <positionCopy class="position" :position-data="positionData" />
      <heat-map class="heat-map" :heat-map-data="heatMapData" title="预测薪资" @fromSonComp="_getFromHeat" />
      <columnBar class="company-size" :column-data="companySizeData" title="企业规模" @fromSonComp="_getFromBar" />
      <columnBarSub class="education" :column-bar-data="educationData" title="学历要求" @fromSonComp="_getFromBarSub" />
      <wordCloud class="word-cloud" :word-cloud-data="benefitData" title="薪资福利" @fromSonComp="_getFromWordCloud" />
      <pie class="finance-stage" :pie-data="financeStage" title="企业融资" @fromSonComp="_getFromPie" />
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['changedPage', 'showingName'])
  },
  created() {
    this.compArr = []
  },
  mounted() {
    this.getPositionData()
    this.getHeatmapData()
    this.getCompanySizeData()
    this.getEducationData()
    this.getBenefitData()
    this.getFinanceStageData()
      .then(() => {
        this.$store.dispatch('setChartDOM', this.compArr)
      })
  },
  activated() {
    this.$store.dispatch('getName', ['compared-salaryExp', 'compared-companySize', 'compared-education', 'compared-benefit', 'compared-financeStage', '_compared-salaryExp', '_compared-companySize', '_compared-education', '_compared-benefit', '_compared-financeStage'])
    if (this.changedPage.includes('compared')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'compared')
    }
  },
  methods: {
    getFromHeat(chartDom) {
      this.compArr.push({
        name: 'compared-salaryExp',
        chartDom: chartDom
      })
    },
    getFromBar(chartDom) {
      this.compArr.push({
        name: 'compared-companySize',
        chartDom: chartDom
      })
    },
    getFromBarSub(chartDom) {
      this.compArr.push({
        name: 'compared-education',
        chartDom: chartDom
      })
    },
    getFromWordCloud(chartDom) {
      this.compArr.push({
        name: 'compared-benefit',
        chartDom: chartDom
      })
    },
    getFromPie(chartDom) {
      this.compArr.push({
        name: 'compared-financeStage',
        chartDom: chartDom
      })
    },
    _getFromHeat(chartDom) {
      this.compArr.push({
        name: '_compared-salaryExp',
        chartDom: chartDom
      })
    },
    _getFromBar(chartDom) {
      this.compArr.push({
        name: '_compared-companySize',
        chartDom: chartDom
      })
    },
    _getFromBarSub(chartDom) {
      this.compArr.push({
        name: '_compared-education',
        chartDom: chartDom
      })
    },
    _getFromWordCloud(chartDom) {
      this.compArr.push({
        name: '_compared-benefit',
        chartDom: chartDom
      })
    },
    _getFromPie(chartDom) {
      this.compArr.push({
        name: '_compared-financeStage',
        chartDom: chartDom
      })
    },

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
