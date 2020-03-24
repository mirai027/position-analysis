<template>
  <div id="app">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航二</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="container">
      <div class="nav">
        <img
          ref="close"
          class="close-nav"
          src="@/assets/close.svg"
          @click="handleClose"
        />
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/province' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view class="view" />
    </div>
  </div>
</template>

<script>
// import debounce from '@/utils/debounce.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      withoutAnimation: false
    }
  },
  computed: {
    ...mapGetters(['gChartDOM'])
  },
  watch: {},
  methods: {
    handleClose(key, keyPath) {
      let num = 0
      this.isCollapse && (num = 180)
      this.$refs.close.style.transform = `rotate(${num}deg)`
      this.isCollapse = !this.isCollapse
      setTimeout(() => {
        this.gChartDOM.forEach(ele => {
          ele.resize()
        })
      }, 1000)
    }
  }
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-submenu__title {
    width: 200px;
  }
  .el-menu-vertical-demo {
    height: 100%;
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
