<template>
  <div class="analysis">
    <position class="position" :position-data="positionData" />
    <heat-map class="heat-map" :heat-map-data="heatMapData" title="预测薪资" @fromSonComp="getFromHeat" />
    <div class="second-container">
      <columnBar class="company-size" :column-data="companySizeData" title="企业规模" @fromSonComp="getFromBar" />
      <columnBarSub class="education" :column-bar-data="educationData" title="学历要求" @fromSonComp="getFromBarSub" />
    </div>
    <div class="third-container">
        <wordCloud class="word-cloud" :word-cloud-data="benefitData" title="薪资福利" @fromSonComp="getFromWordCloud" />
        <pie class="finance-stage" :pie-data="financeStage" title="企业融资" @fromSonComp="getFromPie" />
      </div>
  </div>
</template>

<script>
import position from './position'
import heatMap from '@/components/charts/heat-map'
import columnBar from '@/components/charts/column-bar'
import columnBarSub from '@/components/charts/column-bar-sub'
import wordCloud from '@/components/charts/word-cloud'
import pie from '@/components/charts/pie'
import { mapGetters } from 'vuex'
// import debounce from '@/utils/debounce.js'
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
    position,
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
    this.isReady = false
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
    this.$store.dispatch('getName', ['analysis-salaryExp', 'analysis-companySize', 'analysis-education', 'analysis-benefit', 'analysis-financeStage'])
    if (this.changedPage.includes('analysis')) {
      this.$store.dispatch('getShowingName')

      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'analysis')
    }
  },

  methods: {
    getFromHeat(chartDom) {
      this.compArr.push({
        name: 'analysis-salaryExp',
        chartDom: chartDom
      })
    },
    getFromBar(chartDom) {
      this.compArr.push({
        name: 'analysis-companySize',
        chartDom: chartDom
      })
    },
    getFromBarSub(chartDom) {
      this.compArr.push({
        name: 'analysis-education',
        chartDom: chartDom
      })
    },
    getFromWordCloud(chartDom) {
      this.compArr.push({
        name: 'analysis-benefit',
        chartDom: chartDom
      })
    },
    getFromPie(chartDom) {
      this.compArr.push({
        name: 'analysis-financeStage',
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
.analysis {
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .position {
    height: auto;
    background: #fff;
  }
  .heat-map {
    margin-top: 10px;
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
  .third-container {
    margin-top: 10px;
    display: flex;
    .word-cloud {
      height: 400px;
      background: #fff;
    }
    .finance-stage {
      margin-left: 10px;
      height: 400px;
      background: #fff;
    }
  }
}
</style>
