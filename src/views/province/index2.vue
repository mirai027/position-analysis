<template>
  <div class="main-index">
    <map2 />
    <salary-exp />
    <companySize />
    <benefit />
  </div>
</template>

<script>
import map2 from './map'
import salaryExp from './salary-exp'
import companySize from './company-size'
import benefit from './benefit'
export default {
  components: {
    map2,
    salaryExp,
    companySize,
    benefit
  },
  mounted() {
  }
}
</script>

<style lang="scss" scope>
@import '~@/styles/index.scss';
.main-index {
  @include max-screen();
  overflow: hidden;
  overflow-y: scroll;
}
</style>
