<template>
  <div class="view-container">
    <div class="main-index">
      <div class="row row-map magical-point">
        <div class="mirai-point-title">全国省份信息</div>
        <div class="map-left box-left">
          <mapTem />
        </div>
        <div class="map-right box-right">
          <mapRightTop class="map-right-top" />
          <edu-pos class="edu-pos" />
        </div>
      </div>
      <div class="date-trend magical-point box">
        <div class="mirai-point-title">招聘数据趋势</div>
        <dateTrend />
      </div>
      <div class="position magical-point box">
        <div class="mirai-point-title">职位招聘信息</div>
        <position :position-data="positionData" :is-loading="_isLoading" />
      </div>
      <div class="row magical-point">
        <div class="mirai-point-title">企业规模-薪资福利</div>
        <companySize class="company-size box" />
        <benefit class="benefit box" />
      </div>
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
import { mapGetters, mapActions } from 'vuex'
import debounce from '@/utils/debounce.js'
import { getPosition } from '@/api/position'
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
  data() {
    return {
      positionData: {},
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'pagePoint',
      'pagePointIdx',
      'changedPage',
      'showingName',
      'positionForm'
    ]),
    _isLoading() {
      return this.isLoading
    }
  },
  watch: {
    pagePointIdx: {
      handler() {
        const point = this.getPointLocation()
        const viewContainer = document.querySelector('.view-container')
        viewContainer.scrollTop = point[this.pagePointIdx.idx].location - 10
      },
      deep: true
    },
    positionForm: {
      handler() {
        // 用于设置子组件为 Loading 状态
        this.isLoading = !this.isLoading
        this.getPositionData(this.positionForm)
      },
      deep: true
    }
  },
  activated() {
    this.getName([
      'home-benefit',
      'home-companySize',
      'home-dateTrend',
      'home-map',
      'home-eduPos'
    ])
    if (this.changedPage.includes('home')) {
      this.getShowingName()
      this.showingName.map(ele => {
        ele.chartDom.resize()
      })
      this.deleteChangePage('home')
    }
  },
  mounted() {
    //   .querySelectorAll('.mirai-menu-item')[0]
    //   .classList.add('is-active', 'mirai-menu-item-active')
    this.getPositionData()
    /**
     * 因为滚动条是属于组件内部的，所以不能直接监听 window的 scroll。请监听真正事件滚动的 .view-container
     * scrollTop获取当前滚动条的位置
     * 每次滚动循环 Vuex中 pagePoint里每个描点所存的位置 location，判断 scrollTop值是否小于描点的位置值。如果为 true,则代表当前滚动位置属于此描点位置，获取其 index
     * 为避免污染其他侧栏的 class类，添加 miraiMenuItem为自定义添加的侧栏导航 item类。每次滚动设置侧栏中添加了miraiMenuItem类的 item的类为默认值 'el-menu-item mirai-menu-item'。
     * 为 miraiMenuItem类中的第[index]个添加 elementui默认选中类 'is-active'
     * 为方便滚动时控制样式，重写（覆盖）了 elementui中原始的 fouse, hover的样式。
     */
    const viewContainer = document.querySelector('.view-container')
    viewContainer.addEventListener(
      'scroll',
      debounce(this.selectPointIndex, 397)
    )
    this.selectPointIndex()

    // this.$store.dispatch('pagePoint', point)
    // console.log(this.getPointLocation())
  },
  deactivated() {
    // 因为在mounted中使用了 selectPointIndex方法，导致选中的 item会一直用用 is-active样式。所以在离开组件时重置样式
    const miraiMenuItem = document.querySelectorAll('.mirai-menu-item')
    miraiMenuItem.forEach(element => {
      element.className = 'el-menu-item mirai-menu-item'
      element.style.backgroundColor = '#FFF'
    })
  },
  updated() {},
  methods: {
    ...mapActions([
      'pagePointTitle',
      'deleteChangePage',
      'getShowingName',
      'getName',
      'setForwardList'
    ]),
    async getPositionData(form = { region: '中国', level: 1, type: 'Month' }) {
      const { data } = await getPosition(form)
      this.positionData = data
      const list = data.other.slice(0, 10).map(item => {
        return item.name
      })
      this.setForwardList(list)
    },
    getPointLocation() {
      /**
       * 临时性处理滚动联动
       * .magical-point 为唯一获取描点位置的类
       * .mirai-point-title 为描点文字，对应侧栏和顶部面包屑的标题
       * 获取到所有描点的位置和标题后，提交到vuex中，侧栏监听 pagePoint的变化来生成对应的侧栏子项
       */
      const pointListLoc = []
      const pointListTitle = []
      document.querySelectorAll('.magical-point').forEach(el => {
        pointListLoc.push(el.offsetTop)
      })
      document.querySelectorAll('.mirai-point-title').forEach(el => {
        pointListTitle.push(el.innerText)
      })
      const point = []
      pointListTitle.forEach((el, idx) => {
        point.push({
          location: pointListLoc[idx],
          title: pointListTitle[idx]
        })
      })
      return point
    },
    selectPointIndex() {
      // console.log('我是Home组件的滚动')
      const viewContainer = document.querySelector('.view-container')
      const point = this.getPointLocation()
      const scrollTop = viewContainer.scrollTop
      const miraiMenuItem = document.querySelectorAll('.mirai-menu-item')
      for (let index = 0; index < point.length; index++) {
        miraiMenuItem.forEach(element => {
          element.className = 'el-menu-item mirai-menu-item'
          element.style.backgroundColor = '#FFF'
        })
        const { location } = point[index]
        if (scrollTop <= location) {
          miraiMenuItem[index].classList.add('is-active')
          miraiMenuItem[index].style.backgroundColor = '#ecf5ff'
          this.pagePointTitle(point[index].title)
          return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.view-container {
  width: auto;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .main-index {
    height: auto;
    padding: 10px;
    .magical-point {
      position: relative;
      .mirai-point-title {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
      }
    }
    .date-trend {
      flex: 1;
      width: auto;
      height: 400px;
      background: #fff;
      flex-shrink: 0;
    }
    .position {
      width: auto;
      // height: auto;
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

  .box {
    border-radius: 20px;
    box-shadow: 3px 3px 5px #c2c2d6;
    &:hover {
      box-shadow: 6px 10px 10px #c2c2d6;
    }
  }
  .box-left {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 3px 3px 5px #c2c2d6;
    &:hover {
      box-shadow: 6px 10px 10px #c2c2d6;
    }
  }
  .box-right {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 3px 3px 5px #c2c2d6;
    &:hover {
      box-shadow: 6px 10px 10px #c2c2d6;
    }
  }
}
</style>
