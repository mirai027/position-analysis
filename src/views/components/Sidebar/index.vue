<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="toggleSidebar"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
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
        <i class="el-icon-position"></i>
        <span slot="title">茵蒂克丝</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-date"></i>
        <span slot="title">时间刻度</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-toilet-paper"></i>
        <span slot="title">职位分析</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['toggleSidebar'])
  },
  mounted() {}
}
</script>

<style lang="scss" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) .el-submenu__title {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
  overflow: auto;
}
.el-menu-vertical-demo::-webkit-scrollbar {
  width: 0;
}
</style>
