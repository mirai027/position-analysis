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
import { mapGetters } from 'vuex'
export default {
  components: {
    date,
    location,
    position
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName'])
  },
  mounted() {},
  activated() {
    this.$store.dispatch('getName', ['rank-date', 'rank-location', 'rank-position'])
    if (this.changedPage.includes('rank')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'rank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
</style>
