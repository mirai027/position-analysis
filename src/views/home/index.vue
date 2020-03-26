<template>
  <div class="main-index">
    <div class="row row-map">
      <div class="map-left">
        <mapTem />
      </div>
      <div class="map-right">
        <mapRightTop class="map-right-top" />
        <edu-pos class="edu-pos" />
      </div>
    </div>
    <div class="date-trend">
      <dateTrend />
    </div>
    <!-- <dateTrend class="date-trend" /> -->
    <position class="position" />
    <!-- <div class="edu-pos"></div> -->
    <!-- <div class="salary-exp"></div> -->
    <div class="row">
      <companySize class="company-size" />
      <!-- <div class="benefit"></div> -->
      <benefit class="benefit" />
      <!-- <benefit v-if="false" /> -->
    </div>
  </div>
</template>

<script>
import mapTem from './map'
import position from './position'
// import salaryExp from './salary-exp'
import companySize from './company-size'
import benefit from './benefit'
import dateTrend from './date-trend'
import eduPos from './edu-pos'
import mapRightTop from './map-right-top'
// import { mapGetters } from 'vuex'
// import debounce from '@/utils/debounce.js'
export default {
  components: {
    // eduPos: () => import('./edu-pos'),
    mapTem,
    position,
    // salaryExp,
    companySize,
    benefit,
    dateTrend,
    eduPos,
    mapRightTop
  },
  computed: {
    // ...mapGetters(['gChartDOM'])
  },
  mounted() {
    // window.onresize = debounce(() => {
    //   this.gChartDOM.forEach(ele => {
    //     ele.resize()
    //   })
    // }, 800)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.main-index {
  width: auto;
  // background: #ff0;
  padding: 10px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  .date-trend {
    width: auto;
    height: 400px;
    background: #fff;
    // 有坑，但不知道怎么解决
    // overflow: hidden;
  }
  .position {
    width: auto;
    // height: auto;
    padding: 20px;
    background: #fff;
    margin: 15px 0;
  }
  .row {
    // width: auto;
    display: flex;
    .company-size {
      width: 50%;
      height: 400px;
      background: #fff;
      margin-right: 7px;
    }
    .benefit {
      width: 50%;
      height: 400px;
      background: #fff;
      margin-left: 7px;
      overflow: hidden;
    }
    .map-left {
      width: 600px;
      height: 500px;
      background: #fff;
      // margin-right: 7px;
      overflow: hidden;
    }
    .map-right {
      width: calc(100% - 607px);
      height: 500px;
      // margin-left: 7px;
      background: #fff;
      display: flex;
      flex-direction: column;
      .map-right-top {
        width: auto;
        height: 140px;
        // background: red;
      }
      .edu-pos {
        width: 100%;
      }
    }
  }
  .row-map {
    margin-bottom: 15px;
  }
}
</style>
