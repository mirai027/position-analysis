<template>
  <div class="main-index">
    <map2 />
    <position />
    <eduPos />
  </div>
</template>

<script>
import eduPos from './edu-pos'
import map2 from './map'
import position from './position'
export default {
  components: {
    eduPos,
    map2,
    position
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
