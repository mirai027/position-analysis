<template>
  <div class="nav">
    <img
      ref="close"
      :class="['close-nav', { 'navbar-active': toggleSidebar }]"
      src="@/assets/close.svg"
      @click="handleToggle"
    />
    <el-breadcrumb
      v-if="$route.name"
      separator-class="el-icon-arrow-right"
      class="breadcrumb"
    >
      <!-- 曲线救国，特殊对待 -->
      <transition-group v-if="$route.name === 'Home'" name="breadcrumb">
        <el-breadcrumb-item :key="$route.matched[0].path" class="main-title">
          {{ $route.matched[0].meta.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in pagePointTitle"
          :key="item"
          class="info-title"
        >
          {{ item }}
        </el-breadcrumb-item>
      </transition-group>

      <transition-group v-else-if="$route.name === 'Province'" name="breadcrumb">
        <el-breadcrumb-item :key="$route.path" class="main-title">
          {{ $route.meta.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :key="$route.query.name" class="info-title">
          {{ $route.query.name }}
        </el-breadcrumb-item>
      </transition-group>

      <transition-group v-else name="breadcrumb">
        <el-breadcrumb-item :key="$route.matched[0].path" class="main-title">
          {{ $route.matched[0].meta.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :key="$route.path" class="info-title">
          {{ $route.meta.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from '@/utils/debounce.js'
export default {
  data() {
    return {
      routeWatch: ''
    }
  },
  computed: {
    ...mapGetters(['toggleSidebar', 'showingName', 'pagePointTitle'])
  },
  watch: {
    $route(to, from) {},
    pagePointTitle() {}
  },
  mounted() {},
  methods: {
    handleToggle: debounce(function() {
      this.$store.dispatch('toggleSideBar')
      this.$store.dispatch('getShowingName')
      this.$store.dispatch('getChangedPage', ['home', 'analysis', 'compared', 'rank', 'rank-language', 'date', 'vcl'])
      const that = this
      setTimeout(() => {
        that.showingName.map(ele => {
          ele.chartDom.resize()
        // console.log(ele.chartDom)
        })
      }, 1000)
    }, 10)
  }
}
</script>

<style lang="scss" scoped>
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
    .main-title span {
      color: #303133;
    }
    .info-title span {
      color: #909399;
    }
  }
  .navbar-active {
    transform: rotate(180deg);
  }
}
</style>

<style lang="scss">
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
