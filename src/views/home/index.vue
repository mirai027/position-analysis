<template>
  <div class="view-container">
    <div class="main-index">
      <div class="row row-map magical-point">
        <div class="mirai-point-title">我系描点一</div>
        <div class="map-left">
          <mapTem />
        </div>
        <div class="map-right">
          <mapRightTop class="map-right-top" />
          <edu-pos class="edu-pos" />
        </div>
      </div>
      <div class="date-trend magical-point">
        <div class="mirai-point-title">我系描点二</div>
        <dateTrend />
      </div>
      <div class="position magical-point">
        <div class="mirai-point-title">我系描点三</div>
        <position />
      </div>
      <div class="row magical-point">
        <div class="mirai-point-title">我系描点四</div>
        <companySize class="company-size" />
        <benefit class="benefit" />
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
import { mapGetters } from 'vuex'
// import debounce from '@/utils/debounce.js'
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
  computed: {
    ...mapGetters(['pagePoint', 'pagePointIdx'])
  },
  watch: {
    pagePointIdx: {
      handler() {
        // console.log(12112)
        const viewContainer = document.querySelector('.view-container')
        viewContainer.scrollTop =
          this.pagePoint[this.pagePointIdx.idx].location - 10
      },
      deep: true
    }
  },
  mounted() {
    /**
     * 因为滚动条是属于组件内部的，所以不能直接监听 window的 scroll。请监听真正事件滚动的 .view-container
     * scrollTop获取当前滚动条的位置
     * 每次滚动循环 Vuex中 pagePoint里每个描点所存的位置 location，判断 scrollTop值是否小于描点的位置值。如果为 true,则代表当前滚动位置属于此描点位置，获取其 index
     * 为避免污染其他侧栏的 class类，添加 miraiMenuItem为自定义添加的侧栏导航 item类。每次滚动设置侧栏中添加了miraiMenuItem类的 item的类为默认值 'el-menu-item mirai-menu-item'。
     * 为 miraiMenuItem类中的第[index]个添加 elementui默认选中类 'is-active'
     */
    const viewContainer = document.querySelector('.view-container')
    viewContainer.addEventListener('scroll', () => {
      const scrollTop = viewContainer.scrollTop
      const miraiMenuItem = document.querySelectorAll('.mirai-menu-item')
      for (let index = 0; index < this.pagePoint.length; index++) {
        miraiMenuItem.forEach(element => {
          element.className = 'el-menu-item mirai-menu-item'
        })
        const { location } = this.pagePoint[index]
        if (scrollTop <= location) {
          miraiMenuItem[index].classList.add('is-active')
          return
        }
      }
    })

    /**
     * 临时性处理滚动联动
     * .magical-point 为唯一获取描点位置的类
     * .mirai-point-title 为描点文字，对应侧栏和顶部面包屑的标题
     * 获取到所有描点的位置和标题后，提交到vuex中，侧栏监听 pagePoint的变化来生成对应的侧栏子项
     */
    this.$nextTick(() => {
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
      this.$store.dispatch('pagePoint', point)
    })
  },
  activated() {},
  updated() {
    console.log(1233123123211111111111111111)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
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
}
</style>
