<template>
  <div class="position-container">
    <el-collapse v-model="activeNames" class="date-table">
      <el-collapse-item name="1">
        <template slot="title"><span class="title"><i class="el-icon-medal"></i>职位排行榜</span></template>
        <div class="position-main">
           <el-table
            :data="positionData"
            style="width: 100%; font-size: 20px "
            height="325"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="日期"
              width="300">
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="数量"
              width="300">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <verticalColumn class="top" :column-data="positionData" title="职位排行榜"></verticalColumn>
  </div>
</template>

<script>
import { getPosition } from '@/api/position'
import { TopFiveDate } from '@/utils/sortData'
import verticalColumn from '@/components/charts/vertical-column'
export default {
  components: {
    verticalColumn
  },
  data() {
    return {
      activeNames: ['1'],
      positionData: [],
      title: '时间排行榜'
    }
  },
  mounted() {
    this.getTop()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'first-row'
      }
      return ''
    },
    async getTop() {
      const { data } = await getPosition()
      const first = { name: data.desc.title, value: data.desc.total }
      this.positionData = [first, ...TopFiveDate(data.other).slice(0, 4)]
    }
  }
}
</script>

<style lang="scss">
.position-container {
  width: 100%;
  height: 100%;
  display: flex;
  .date-table {
    flex: 4;
    .title {
      font-size: 24px;
      margin-left: 20px;
    }
    .position-main {
      margin: 0 20px;
       .el-table .first-row {
        background: oldlace ;
      }
    }
  }
  .top {
    flex: 6;
    height: 400px;
    width: 100%;
    margin-top: 20px;
  }
}

</style>
