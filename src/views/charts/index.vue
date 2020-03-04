<template>
  <div class="main-index">
    <map2 />
    <position />
    <edu-pos />
    <salary-exp />
    <companySize />
  </div>
</template>

<script>
// import eduPos from './edu-pos'
import map2 from './map'
import position from './position'
import salaryExp from './salary-exp'
import companySize from './company-size'
export default {
  components: {
    eduPos: () => import('./edu-pos'),
    map2,
    position,
    salaryExp,
    companySize
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
