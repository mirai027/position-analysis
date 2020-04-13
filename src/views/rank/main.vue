<template>
  <div class="main-rank">
    <date />
    <location />
    <position />
  </div>
</template>

<script>
import date from './date'
import location from './location'
import position from './position'
export default {
  components: {
    date,
    location,
    position
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
</style>
