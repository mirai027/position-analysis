<template>
  <div class="benefit-container">
    <word-cloud class="benefit" :word-cloud-data="benefitData" title="薪资福利" @fromSonComp="getFromSon" />
</div>
</template>

<script>
import { getAllBenefit } from '@/api/benefit'
import wordCloud from '@/components/charts/word-cloud'
export default {
  components: {
    wordCloud
  },
  data() {
    return {
      benefitData: []
    }
  },
  computed: {},
  mounted() {
    this.getBenefit()
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'home-benefit',
        chartDom: chartDom
      }])
    },
    async getBenefit(form = {}) {
      const { data } = await getAllBenefit(form)
      this.benefitData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.benefit-container {
  width: 100%;
  height: 100%;
  // position: relative;
  // .heat-map {
  //     height: 400px;
  //     background: #fff;
  //   }
}

</style>
