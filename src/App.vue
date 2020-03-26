<template>
  <div id="app">
    <sidebar class="el-menu-vertical-demo" />
    <div class="container">
      <Navbar class="nav" />
      <router-view class="view" />
    </div>
  </div>
</template>

<script>
import Sidebar from './views/components/Sidebar/index'
import Navbar from './views/components/Navbar/index'
export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scope>
@import '~@/styles/reset.scss';
@import '~@/styles/index.scss';
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
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: solid 1px #e6e6e6;
      .close-nav {
        width: 20px;
        cursor: pointer;
        margin: 0 20px;
        transition: all 0.5s;
      }
      .breadcrumb {
        font-size: 14px;
      }
    }
    .view {
      position: absolute;
      top: 40px;
      right: 0;
      bottom: 0;
      left: 0;
      background: #eff1f4;
    }
  }
}
</style>

<style lang="scss">
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
</style>
