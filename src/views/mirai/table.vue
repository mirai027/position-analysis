<template>
  <el-table
    :data="miraiData"
    class="mirai-table"
    border
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="expand" width="50">
      <template>
        <el-table :data="miraiHideData" border :show-header="false">
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="location" label="地区" width="120">
          </el-table-column>
          <el-table-column prop="jobNum" label="地区数量" width="120">
          </el-table-column>
          <el-table-column prop="positionName" label="岗位" width="120">
          </el-table-column>
          <el-table-column prop="positionNum" label="岗位数量" width="120">
          </el-table-column>
          <el-table-column
            prop="positionSalary"
            label="岗位平均薪资"
            width="120"
          ></el-table-column>
          <el-table-column prop="benefit" label="岗位福利"> </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" width="120"> </el-table-column>
    <el-table-column prop="location" label="地区" width="120">
    </el-table-column>
    <el-table-column prop="jobNum" label="地区数量" width="120">
    </el-table-column>
    <el-table-column prop="positionName" label="岗位" width="120">
    </el-table-column>
    <el-table-column prop="positionNum" label="岗位数量" width="120">
    </el-table-column>
    <el-table-column
      prop="positionSalary"
      label="岗位平均薪资"
      width="120"
    ></el-table-column>
    <el-table-column prop="benefit" label="岗位福利"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      miraiData: [
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        }
      ],
      miraiHideData: [
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        },
        {
          date: '2016-05-02',
          location: '广东省',
          jobNum: 9999,
          positionNum: 3333,
          positionName: '前端开发',
          companySize: '15-50人',
          positionSalary: '10k',
          benefit: '福利一、福利二、福利三'
        }
      ]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return 'warning-row'
      // } else if (rowIndex === 3) {
      //   return 'success-row'
      // }
      return 'success-row'
    }
  }
}
</script>

<style>
.el-table__expanded-cell[class*='cell'] {
  padding: 0;
  padding-left: 50px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #ecf5ff;
}
</style>
