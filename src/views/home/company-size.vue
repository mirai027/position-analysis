<template>
  <div class="company-size-container">
    <columnBar :column-data="companySizeData" title="企业规模"></columnBar>
  </div>
</template>

<script>
import { getAllCompanySize } from '@/api/company-size'
import columnBar from '@/components/charts/column-bar'
export default {
  components: {
    columnBar
  },
  data() {
    return {
      companySizeData: []
    }
  },
  mounted() {
    this.getCompanySizeData()
  },
  methods: {
    async getCompanySizeData() {
      const { data } = await getAllCompanySize()
      this.companySizeData = data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
// $main-text-color: red;
.company-size-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
