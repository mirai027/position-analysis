<template>
  <div class="compared">
    <div class="analysis">
      <positionCopy
        class="position box"
        :position-data="leftData.positionData"
        action-type="setComparedLeftForm"
        :is-loading="leftData.isLoading"
      />
      <heat-map
        class="heat-map box"
        :heat-map-data="leftData.heatMapData"
        title="预测薪资"
        :is-loading="leftData.isLoading"
        @fromSonComp="getFromHeat"
      />
      <columnBar
        class="company-size box"
        :column-data="leftData.companySizeData"
        title="企业规模"
        :is-loading="leftData.isLoading"
        @fromSonComp="getFromBar"
      />
      <columnBarSub
        class="education box"
        :column-bar-data="leftData.educationData"
        title="学历要求"
        :is-loading="leftData.isLoading"
        @fromSonComp="getFromBarSub"
      />
      <wordCloud
        class="word-cloud box"
        :word-cloud-data="leftData.benefitData"
        title="薪资福利"
        :is-loading="leftData.isLoading"
        @fromSonComp="getFromWordCloud"
      />
      <pie
        class="finance-stage box"
        :pie-data="leftData.financeStage"
        title="企业融资"
        :is-loading="leftData.isLoading"
        @fromSonComp="getFromPie"
      />
    </div>
    <div class="analysis">
      <positionCopy
        class="position box-left"
        :position-data="rightData.positionData"
        action-type="setComparedRightForm"
        :is-loading="rightData.isLoading"
      />
      <heat-map
        class="heat-map box-left"
        :heat-map-data="rightData.heatMapData"
        title="预测薪资"
        :is-loading="rightData.isLoading"
        @fromSonComp="getFromHeat"
      />
      <columnBar
        class="company-size box-left"
        :column-data="rightData.companySizeData"
        title="企业规模"
        :is-loading="rightData.isLoading"
        @fromSonComp="getFromBar"
      />
      <columnBarSub
        class="education box-left"
        :column-bar-data="rightData.educationData"
        title="学历要求"
        :is-loading="rightData.isLoading"
        @fromSonComp="getFromBarSub"
      />
      <wordCloud
        class="word-cloud box-left"
        :word-cloud-data="rightData.benefitData"
        title="薪资福利"
        :is-loading="rightData.isLoading"
        @fromSonComp="getFromWordCloud"
      />
      <pie
        class="finance-stage box-left"
        :pie-data="rightData.financeStage"
        title="企业融资"
        :is-loading="rightData.isLoading"
        @fromSonComp="getFromPie"
      />
    </div>
  </div>
</template>

<script>
import positionCopy from './position-copy'
import heatMap from '@/components/charts/heat-map'
import columnBar from '@/components/charts/column-bar'
import columnBarSub from '@/components/charts/column-bar-sub'
import wordCloud from '@/components/charts/word-cloud'
import pie from '@/components/charts/pie'
import { mapGetters, mapActions } from 'vuex'
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
      leftData: {
        positionData: {},
        heatMapData: [],
        companySizeData: [],
        educationData: [],
        benefitData: [],
        financeStage: [],
        isLoading: true
      },
      rightData: {
        positionData: {},
        heatMapData: [],
        companySizeData: [],
        educationData: [],
        benefitData: [],
        financeStage: [],
        isLoading: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'comparedLeftForm',
      'comparedRightForm',
      'changedPage',
      'showingName'
    ])
  },
  watch: {
    comparedLeftForm: {
      handler() {
        // 用于设置子组件为 Loading 状态
        this.leftData.isLoading = !this.leftData.isLoading
        this.getLeftData(this.comparedLeftForm)
      },
      deep: true
    },
    comparedRightForm: {
      handler() {
        // 用于设置子组件为 Loading 状态
        this.rightData.isLoading = !this.rightData.isLoading
        this.getRightData(this.comparedRightForm)
      },
      deep: true
    }
  },
  created() {
    this.compArr = []
  },
  mounted() {
    this.getLeftData(this.comparedLeftForm)
    this.getRightData(this.comparedRightForm).then(() => {
      this.setChartDOM(this.compArr)
    })
  },
  activated() {
    this.getName([
      'compared-salaryExp',
      'compared-companySize',
      'compared-education',
      'compared-benefit',
      'compared-financeStage',
      '_compared-salaryExp',
      '_compared-companySize',
      '_compared-education',
      '_compared-benefit',
      '_compared-financeStage'
    ])
    if (this.changedPage.includes('compared')) {
      this.getShowingName()
      this.showingName.map((ele) => {
        ele.chartDom.resize()
      })
      this.deleteChangePage('compared')
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

    async getLeftData(form = {}) {
      const { data: heatmap } = await getPositionHeatmap(form)
      this.leftData.heatMapData = heatmap

      const { data: companySize } = await getCompanySize(form)
      this.leftData.companySizeData = companySize

      const { data: education } = await getEducation(form)
      this.leftData.educationData = education

      let { data: benefit } = await getBenefit(form)
      if (benefit.length === 0) {
        benefit = [
          { name: 'CodeRush', value: 2739 },
          { name: '大数据招聘分析平台', value: 2739 },
          { name: '广告位招租', value: 2739 }
        ]
      }
      this.leftData.benefitData = benefit

      const { data: financeStage } = await getFinanceStage(form)
      this.leftData.financeStage = financeStage

      const { data: position } = await getPosition(form)
      this.leftData.positionData = position
    },
    async getRightData(form = {}) {
      const { data: heatmap } = await getPositionHeatmap(form)
      this.rightData.heatMapData = heatmap

      const { data: companySize } = await getCompanySize(form)
      this.rightData.companySizeData = companySize

      const { data: education } = await getEducation(form)
      this.rightData.educationData = education

      let { data: benefit } = await getBenefit(form)
      if (benefit.length === 0) {
        benefit = [
          { name: 'CodeRush', value: 2739 },
          { name: '大数据招聘分析平台', value: 2739 },
          { name: '广告位招租', value: 2739 }
        ]
      }
      this.rightData.benefitData = benefit

      const { data: financeStage } = await getFinanceStage(form)
      this.rightData.financeStage = financeStage

      const { data: position } = await getPosition(form)
      this.rightData.positionData = position
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
    .box {
      border-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
      &:hover {
        box-shadow: 6px 10px 10px #c2c2d6;
      }
    }
    .box-left {
      border-radius: 20px;
      box-shadow: -3px 3px 5px #c2c2d6;
      &:hover {
        box-shadow: -6px 10px 10px #c2c2d6;
      }
    }
    flex: 1;
    height: auto;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    &:first-child {
      margin-right: 20px;
    }
    .position {
      height: auto;
      background: #fff;
    }
    .heat-map,
    .company-size,
    .education,
    .word-cloud,
    .finance-stage {
      margin-top: 10px;
      height: 400px;
      background: #fff;
      &:last-of-type {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
