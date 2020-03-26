<template>
  <div class="nav">
    <img
      ref="close"
      :class="['close-nav', { 'navbar-active': toggleSidebar }]"
      src="@/assets/close.svg"
      @click="handleToggle"
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
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from '@/utils/debounce.js'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['toggleSidebar', 'chartDOM'])
  },
  methods: {
    handleToggle: debounce(function() {
      this.$store.dispatch('toggleSideBar')
      setTimeout(() => {
        this.chartDOM.forEach(ele => {
          ele.resize()
        })
      }, 200)
    })
  }
}
</script>

<style lang="scss" scope>
.nav {
  width: 100%;
  height: 100%;
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
  .navbar-active {
    transform: rotate(180deg);
  }
}
</style>
