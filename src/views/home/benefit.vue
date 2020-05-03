<template>
  <div class="benefit-container">
    <word-cloud class="benefit" :word-cloud-data="benefitData" title="薪资福利" />
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

  mounted() {
    // this.initBenefit()
    this.getBenefit()
  },
  methods: {
    async getBenefit() {
      const { data } = await getAllBenefit()
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
