<template>
  <div class="main-index">
    <map2 />
    <eduPos />
  </div>
</template>

<script>
import eduPos from './edu-pos'
import map2 from './map'
export default {
  components: {
    eduPos,
    map2
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
