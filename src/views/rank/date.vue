<template>
  <div class="date-rank-container">
    <el-collapse v-model="activeNames" class="date-table">
      <el-collapse-item name="1">
        <template slot="title"><span class="title"><i class="el-icon-medal"></i>日期排行榜</span></template>
        <div class="date-rank-main">
           <el-table
            :data="updateData"
            style="width: 100%; font-size: 24px "
            height="325">
            <el-table-column
              prop="name"
              label="日期"
              width="350">
            </el-table-column>
            <el-table-column
              prop="value"
              label="数量"
              width="350">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <funnel class="top" :funnel-data="updateData" title="日期排行榜"></funnel>
  </div>
</template>

<script>
import { getAllUpdate } from '@/api/map'
import { TopFiveDate } from '@/utils/sortData'
import funnel from '@/components/charts/funnel'
export default {
  components: {
    funnel
  },
  data() {
    return {
      activeNames: ['1'],
      updateData: [],
      title: '时间排行榜'
    }
  },
  mounted() {
    this.getTop()
  },
  methods: {
    async getTop() {
      const { data } = await getAllUpdate()
      this.updateData = TopFiveDate(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.date-rank-container {
  width: 100%;
  height: 100%;
  display: flex;
  .date-table {
    flex: 1;
    .title {
      font-size: 24px;
      margin-left: 20px;
    }
    .date-rank-main {
      margin: 0 20px;
    }
  }
  .top {
    flex: 1;
    height: 400px;
    width: 100%;
  }
}

</style>
