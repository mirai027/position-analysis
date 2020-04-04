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
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
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
