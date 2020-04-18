<template>
  <el-menu
    ref="sidebarMenu"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="toggleSidebar"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </template>
      <el-menu-item
        v-for="(item, idx) in homeRoutes"
        :key="idx"
        :index="`1-${idx}`"
        class="mirai-menu-item"
        @click="handlePointIdx(idx)"
        >{{ item }}</el-menu-item
      >
    </el-submenu>
    <el-submenu
      v-for="route in routes"
      :key="route.path"
      :index="`${route.path}`"
    >
      <template slot="title">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{ route.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="child in route.children"
        :key="child.path"
        :index="`${child.path}`"
        @click="$router.push(child.path)"
      >
        {{ child.meta.title }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      homeRoutes: [
        '全国省份信息',
        '招聘数据趋势',
        '职位招聘信息',
        '企业规模-薪资福利'
      ],
      routes: [
        {
          path: '/position',
          name: 'Position',
          meta: {
            title: '职位前景',
            icon: 'el-icon-toilet-paper'
          },
          children: [
            {
              path: '/position/analysis',
              name: 'Analysis',
              meta: { title: '职位分析' }
            },
            {
              path: '/position/compared',
              name: 'Compared',
              meta: { title: '职位对比' }
            }
          ]
        },
        {
          path: '/date',
          name: 'Date',
          meta: {
            title: '时间刻度',
            icon: 'el-icon-date'
          },
          children: [
            {
              path: '/date/dateTime',
              name: 'DateTime',
              meta: { title: 'DateTime' }
            }
          ]
        },
        {
          path: '/rank',
          name: 'Rank',
          meta: {
            title: '排行榜',
            icon: 'el-icon-medal'
          },
          children: [
            {
              path: '/rank/default',
              name: 'Default',
              meta: { title: 'Default' }
            },
            {
              path: '/rank/language',
              name: 'Language',
              meta: { title: '编程语言排行榜' }
            }
          ]
        },
        {
          path: '/mirai',
          name: 'Mirai',
          meta: {
            title: '实验室',
            icon: 'el-icon-trophy-1'
          },
          children: [
            {
              path: '/mirai/table',
              name: 'Table',
              meta: { title: 'Table表格' }
            },
            {
              path: '/mirai/vcl',
              name: 'Vcl',
              meta: { title: '数据可视化' }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['toggleSidebar'])
  },
  watch: {
    $route() {
      if (this.$route.name === 'Home') {
        this.$refs.sidebarMenu.open('1')
      }
    }
  },
  mounted() {},
  methods: {
    handlePointIdx(idx) {
      if (this.$route.path === '/') {
        this.$store.dispatch('pagePointIdx', idx)
      } else {
        this.$router.push('/')
        setTimeout(() => {
          this.$store.dispatch('pagePointIdx', idx)
        }, 1200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
// .el-menu-item:focus,
// .el-menu-item:hover {
//   background-color: transparent !important;
// }
.mirai-menu-item:hover {
  background-color: #ecf5ff !important;
}
.mirai-menu-item-active {
  background-color: #ecf5ff !important;
}
</style>
