<template>
  <div class="location-rank-container">
    <el-collapse v-model="activeNames" class="location-table">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="title"> <i class="el-icon-medal"></i>地区排行榜</span>
        </template>
        <div class="location-rank-main">
          <el-table
            :data="locationData"
            style="width: 100%; font-size: 20px "
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" width="50" align="right">
            </el-table-column>
            <el-table-column label="省份" align="center">
              <template slot-scope="scope">
                <i class="el-icon-location-information"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数量" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <verticalColumn
      class="top"
      :column-data="locationData"
      title="地区排行榜"
      @fromSonComp="getFromSon"
    ></verticalColumn>
  </div>
</template>

<script>
import { getAllProvince } from '@/api/map'
import { TopFiveDate } from '@/utils/sortData'
import verticalColumn from '@/components/charts/vertical-column'
export default {
  components: {
    verticalColumn
  },
  data() {
    return {
      activeNames: ['1'],
      locationData: []
    }
  },
  mounted() {
    this.getTop()
  },
  methods: {
    getFromSon(chartDom) {
      this.$store.dispatch('setChartDOM', [
        {
          name: 'rank-location',
          chartDom: chartDom
        }
      ])
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'first-row'
      }
      return ''
    },
    async getTop() {
      const { data } = await getAllProvince()
      this.locationData = TopFiveDate(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.location-rank-container {
  width: 100%;
  height: 100%;
  display: flex;
  .location-table {
    flex: 4;
    .title {
      font-size: 24px;
      margin-left: 20px;
    }
    .location-rank-main {
      margin: 0 20px;
      .el-table .first-row {
        background: oldlace;
      }
    }
  }
  .top {
    flex: 6;
    height: 400px;
    width: 100%;
    // margin-top: 20px;
  }
}
</style>
