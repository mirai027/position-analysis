<template>
  <div class="analysis">
    <position
      class="position box"
      :position-data="positionData"
      :is-loading="isLoading"
    />
    <heat-map
      class="heat-map box"
      :heat-map-data="heatMapData"
      title="预测薪资"
      :is-loading="isLoading"
      @fromSonComp="getFromHeat"
    />
    <div class="second-container">
      <columnBar
        class="company-size box"
        :column-data="companySizeData"
        title="企业规模"
        :is-loading="isLoading"
        @fromSonComp="getFromBar"
      />
      <columnBarSub
        class="education box"
        :column-bar-data="educationData"
        title="学历要求"
        :is-loading="isLoading"
        @fromSonComp="getFromBarSub"
      />
    </div>
    <div class="third-container">
      <wordCloud
        class="word-cloud box"
        :word-cloud-data="benefitData"
        title="薪资福利"
        :is-loading="isLoading"
        @fromSonComp="getFromWordCloud"
      />
      <pie
        class="finance-stage box"
        :pie-data="financeStage"
        title="企业融资"
        :is-loading="isLoading"
        @fromSonComp="getFromPie"
      />
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
import { mapGetters, mapActions } from 'vuex'
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
      financeStage: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName', 'positionForm'])
  },
  watch: {
    positionForm: {
      handler() {
        // 用于设置子组件为 Loading 状态
        this.isLoading = !this.isLoading
        this.getPositionData(this.positionForm)
        this.getHeatmapData(this.positionForm)
        this.getCompanySizeData(this.positionForm)
        this.getEducationData(this.positionForm)
        this.getBenefitData(this.positionForm)
        this.getFinanceStageData(this.positionForm)
      },
      deep: true
    }
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
    this.getFinanceStageData().then(() => {
      this.setChartDOM(this.compArr)
    })
  },
  activated() {
    this.getName([
      'analysis-salaryExp',
      'analysis-companySize',
      'analysis-education',
      'analysis-benefit',
      'analysis-financeStage'
    ])
    if (this.changedPage.includes('analysis')) {
      this.getShowingName()

      this.showingName.map((ele) => {
        ele.chartDom.resize()
      })
      this.deleteChangePage('analysis')
    }
  },

  methods: {
    ...mapActions([
      'deleteChangePage',
      'getShowingName',
      'setChartDOM',
      'getName'
    ]),
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

    async getHeatmapData(form = {}) {
      const { data } = await getPositionHeatmap(form)
      this.heatMapData = data
    },
    async getCompanySizeData(form = {}) {
      const { data } = await getCompanySize(form)
      this.companySizeData = data
    },
    async getEducationData(form = {}) {
      const { data } = await getEducation(form)
      this.educationData = data
    },
    async getBenefitData(form = {}) {
      let { data } = await getBenefit(form)
      if (data.length === 0) {
        data = [
          { name: 'CodeRush', value: 2739 },
          { name: '大数据招聘分析平台', value: 2739 },
          { name: '广告位招租', value: 2739 }
        ]
      }
      this.benefitData = data
    },
    async getFinanceStageData(form = {}) {
      const { data } = await getFinanceStage(form)
      this.financeStage = data
    },
    async getPositionData(form = {}) {
      const { data } = await getPosition(form)
      this.positionData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  height: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  .box {
    border-radius: 20px;
    box-shadow: 3px 3px 5px #c2c2d6;
    &:hover {
      box-shadow: 6px 10px 10px #c2c2d6;
    }
  }
}
</style>
