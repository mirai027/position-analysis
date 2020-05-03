<template>
  <div class="language-container">
    <stackedLine class="stacked-line" :stacked-line-legend="languageLegend" :stacked-line-xdata="languageXdata" title="热门编程语言"></stackedLine>
    <el-collapse v-model="activeNames" class="date-table">
      <el-collapse-item name="1">
        <template slot="title"><span class="title"><i class="el-icon-medal"></i>编程语言排行榜</span></template>
        <div class="language-rank-main">
           <el-table
            :data="languageRank"
            style="width: 100%; font-size: 20px "
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="new"
              label="2020-4"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="old"
              label="2019-4"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              label="编程语言"
              width="300"
              align="center">
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="50"
              align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.new - scope.row.old" class="el-icon-arrow-up" style="font-size: 24px; font-weight: 600; color: green"></i>
                <i v-else-if="scope.row.old - scope.row.new" class="el-icon-arrow-down" style="font-size: 24px; font-weight: 600; color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="使用率"
              width="300"
              align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.value }}%</span>
              </template>
            </el-table-column>
            <el-table-column
              label="变化"
              width="200"
              align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.change }}%</span>
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
  mounted() {
    this._getLanguage()
  },
  methods: {
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
      this.languageRank = data.rank
    }
  }
}
</script>

<style lang="scss">
.language-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .stacked-line {
    height: 400px;
    width: 1600px;
  }
  .title {
    font-size: 24px;
    margin-left: 20px;
  }
  .language-rank-main {
    .el-table .first-row {
        background: oldlace ;
      }
  }

}

</style>
