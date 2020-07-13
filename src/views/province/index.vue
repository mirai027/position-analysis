<template>
  <div class="view-container">
    <div class="main-index">
      <div class="head-box">
        <provMap class="prov-map box-left" :prov-data="data" :province="province"></provMap>
        <solidPie class="solid-pie box-right" @fromSonComp="getFromPie"></solidPie>
      </div>

    </div>
  </div>
</template>

<script>
import { getProvInfo } from '@/api/pro-pos'
import { mapGetters } from 'vuex'
import provMap from '@/components/charts/prov-map'
import solidPie from '@/components/charts/solid-pie'
export default {
  components: {
    provMap,
    solidPie
  },
  data() {
    return {
      loading: true,
      province: '',
      data: [],
      mapChart: {}
    }
  },
  computed: {
    ...mapGetters([
      'changedPage',
      'showingName'
    ])
  },
  mounted() {
    this._getProPos()
  },
  activated() {
    this.province = this.$route.query.name

    this.$store.dispatch('getName', ['prov-pie'])
    if (this.changedPage.includes('prov')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map((ele) => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'home')
    }
  },
  methods: {
    async _getProPos() {
      const res = await getProvInfo()
      this.data = res.data
      console.log(this.data)
    },
    getFromPie(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'prov-pie',
        chartDom: chartDom
      }])
    }
  }
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
  position: relative;
  .main-index {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    // background: red;
    .head-box {
      display: flex;
      height: 600px;
      .prov-map {
        background-color: white;
        height: 100%;
        width: 600px;
      }
      .solid-pie {
        flex: 1;
        background-color: white;
        height: 100%;
        width: 100%;
      }
      .prov-map:hover, .solid-pie:hover {
        box-shadow: 6px 10px 10px #c2c2d6;
      }
    }
  }
  .box {
      border-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
  .box-left {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
  .box-right {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
}
</style>
