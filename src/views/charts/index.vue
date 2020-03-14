<template>
  <div class="main-index">
    <map2 />
    <position />
    <edu-pos />
    <salary-exp />
    <companySize />
    <benefit />
  </div>
</template>

<script>
import map2 from './map'
import position from './position'
import salaryExp from './salary-exp'
import companySize from './company-size'
import benefit from './benefit'
export default {
  components: {
    eduPos: () => import('./edu-pos'),
    map2,
    position,
    salaryExp,
    companySize,
    benefit
  },
  mounted() {}
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
