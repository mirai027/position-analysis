<template>
  <div class="main-index">
    <map2 />
    <position />
    <edu-pos />
    <salary-exp />
  </div>
</template>

<script>
import eduPos from './edu-pos'
import map2 from './map'
import position from './position'
import salaryExp from './salary-exp'
export default {
  components: {
    eduPos,
    map2,
    position,
    salaryExp
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
