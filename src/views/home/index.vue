<template>
  <div class="main-index">
    <div class="map"></div>
    <position class="position" />
    <div class="edu-pos"></div>
    <div class="salary-exp"></div>
    <el-row type="flex" class="row">
      <el-col :span="12" class="company-size">
        <companySize />
      </el-col>
      <el-col :span="12" class="benefit">
        <benefit />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import map2 from './map'
import position from './position'
// import salaryExp from './salary-exp'
import companySize from './company-size'
import benefit from './benefit'
// import { mapGetters } from 'vuex'
// import debounce from '@/utils/debounce.js'
export default {
  components: {
    // eduPos: () => import('./edu-pos'),
    // map2,
    position,
    // salaryExp,
    companySize,
    benefit
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

<style lang="scss" scope>
@import '~@/styles/index.scss';
.main-index {
  width: auto;
  height: 100%;
  background: #ff0;
  padding: 10px;
  overflow: auto;
  .position {
    width: auto;
    height: auto;
    padding: 20px;
    background: #fff;
  }
  .row {
    margin-top: 15px;
    .company-size {
      height: 400px;
      background: #fff;
      margin-right: 7px;
    }
    .benefit {
      height: 400px;
      background: #fff;
      margin-left: 7px;
    }
  }
}
</style>
