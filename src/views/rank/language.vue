<template>
  <div class="language-container">
    <stackedLine
      class="stacked-line"
      :stacked-line-legend="languageLegend"
      :stacked-line-xdata="languageXdata"
      title="热门编程语言"
      @fromSonComp="getFromSon"
    ></stackedLine>
    <el-collapse v-model="activeNames" class="date-table">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="title"><i class="el-icon-medal"></i>编程语言排行榜</span>
        </template>
        <div class="language-rank-main">
          <el-table
            :data="languageRank"
            style="width: 100%; font-size: 20px "
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="old"
              label="2019-4"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="new" label="2020-4" align="center">
            </el-table-column>
            <el-table-column label="编程语言" align="left">
              <template slot-scope="scope">
                <i class="el-icon-collection-tag"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="50" align="left">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.new - scope.row.old"
                  class="el-icon-arrow-up"
                  style="font-size: 24px; font-weight: 600; color: green"
                ></i>
                <i
                  v-else-if="scope.row.old - scope.row.new"
                  class="el-icon-arrow-down"
                  style="font-size: 24px; font-weight: 600; color: red"
                ></i>
              </template>
            </el-table-column>
            <el-table-column label="使用率" align="left">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column label="变化" align="left">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.change }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getLanguage } from '@/api/mirai'
import stackedLine from '@/components/charts/stacked-line'
import { mapGetters } from 'vuex'
export default {
  components: {
    stackedLine
  },
  data() {
    return {
      activeNames: ['1'],
      languageLegend: [],
      languageXdata: [],
      languageRank: [],
      title: '编程语言排行榜'
    }
  },
  computed: {
    ...mapGetters(['changedPage', 'showingName'])
  },
  mounted() {
    this._getLanguage()
  },
  activated() {
    this.$store.dispatch('getName', ['rank-language'])
    if (this.changedPage.includes('rank-language')) {
      this.$store.dispatch('getShowingName')
      this.showingName.map((ele) => {
        ele.chartDom.resize()
      })
      this.$store.dispatch('deleteChangePage', 'rank-language')
    }
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [
        {
          name: 'rank-language',
          chartDom: chartDom
        }
      ])
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) {
        return 'first-row'
      }
      return ''
    },
    async _getLanguage() {
      const { data } = await getLanguage()
      //以数组形式传入组件
      this.languageLegend = Object.keys(data.change)
      this.languageXdata = Object.values(data.change)
      // console.log(this.languageXdata)
      this.languageRank = data.rank
    }
  }
}
</script>

<style lang="scss" scoped>
.language-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .stacked-line {
    height: 400px;
    width: 90%;
  }
  .title {
    font-size: 24px;
    margin-left: 20px;
  }
  .language-rank-main {
    @media screen and (max-width: 1920px) and (min-width: 1440px) {
      width: 1400px;
    }
    @media screen and (max-width: 1440px) {
      width: 1000px;
    }
    @media screen and (max-width: 1100px) {
      width: 800px;
    }
    .el-table .first-row {
      background: oldlace;
    }
  }
}
</style>
