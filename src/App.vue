<template>
  <div id="app">
    <sidebar class="el-menu-vertical-demo" />
    <div class="container">
      <Navbar class="nav" />
      <div class="view">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './views/components/Sidebar/index'
import Navbar from './views/components/Navbar/index'
import debounce from '@/utils/debounce.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['showingName'])
  },
  watch: {},
  mounted() {
    window.onresize = debounce(() => {
      this.$store.dispatch('getShowingName')
      this.$store.dispatch('getChangedPage', ['home', 'analysis', 'compared', 'rank', 'rank-language', 'date', 'vcl'])
      this.showingName.map(ele => {
        ele.chartDom.resize()
        // console.log(ele.chartDom)
      })
    }, 1000)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .el-menu-vertical-demo {
    height: 100%;
    overflow: auto;
  }
  .container {
    // width: 1200px;
    // width: 800px;
    // 自动计算会卡顿，固定width则不会？？？
    flex: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .nav {
      height: 39px;
      border-bottom: solid 1px #eff1f4;
    }
    .view {
      position: absolute;
      top: 40px;
      right: 0;
      bottom: 0;
      left: 0;
      background: #eff1f4;
      overflow: hidden;
    }
  }
}
</style>

<style lang="scss">
@import '~@/styles/reset.scss';
@import '~@/styles/index.scss';
//滚动条的宽度
::-webkit-scrollbar {
  width: 10px;
}

//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: rgba(71, 71, 71, 0.3);
  border-radius: 10px;
}
// ::-webkit-scrollbar-track {// 轨道}
// ::-webkit-scrollbar-corner {// 边角}
body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>
