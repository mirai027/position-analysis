<template>
  <el-table
    :data="miraiData"
    border
    :row-class-name="tableRowClassName"
    :default-sort="{
      prop: ['date', 'jobNum', 'positionNum']
    }"
  >
    <el-table-column v-if="true" type="expand" width="50">
      <template slot-scope="props">
        <el-table
          :data="miraiHideData[props.row.index]"
          border
          :show-header="false"
          class="second-table"
        >
          <el-table-column
            v-for="item in miraiColumn"
            v-show="false"
            :key="item.prop"
            :align="item.align"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sortable"
            :show-overflow-tooltip="item.sot"
            :type="item.type"
          >
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in miraiColumn"
      v-show="false"
      :key="item.prop"
      :align="item.align"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :sortable="item.sortable"
      :show-overflow-tooltip="item.sot"
      :type="item.type"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      miraiData: [
        {
          index: 0,
          date: '2020-04-05',
          location: '广东省',
          jobNum: 99,
          jobSalary: '12580',
          jobHotLocation: '广东省、浙江省、上海市',
          jobCompanySize: '15-50人',
          jobBenefit: '福利一、福利二、福利三、福利四、福利五',
          positionName: '前端开发',
          positionNum: 33,
          positionSalary: '11024',
          positionHotCity: '广东省、浙江省、上海市',
          positionCompanySize: '15-50人',
          positionBenefit: '福利一、福利二、福利三、福利四、福利五'
        },
        {
          index: 0,
          date: '2020-04-05',
          location: '广东省',
          jobNum: 99,
          jobSalary: '12580',
          jobHotLocation: '广东省、浙江省、上海市',
          jobCompanySize: '15-50人',
          jobBenefit: '福利一、福利二、福利三、福利四、福利五',
          positionName: '前端开发',
          positionNum: 33,
          positionSalary: '11024',
          positionHotCity: '广东省、浙江省、上海市',
          positionCompanySize: '15-50人',
          positionBenefit: '福利一、福利二、福利三、福利四、福利五'
        }
      ],
      miraiHideData: [
        [
          {
            // date: '',
            // location: '',
            // jobNum: '',
            // jobSalary: '',
            jobHotLocation: '',
            positionName: '前端开发',
            positionNum: 3333,
            positionCompanySize: '15-50人',
            positionSalary: '11024',
            positionBenefit: '福利一、福利二、福利三'
          },
          {
            // date: '',
            // location: '',
            // jobNum: '',
            // jobSalary: '',
            // jobHotLocation: '',
            positionName: '前端开发',
            positionNum: 3333,
            positionCompanySize: '15-50人',
            positionSalary: '11024',
            positionBenefit: '福利一、福利二、福利三'
          },
          {
            // date: '',
            // location: '',
            // jobNum: '',
            // jobSalary: '',
            // jobHotLocation: '',
            positionName: '前端开发',
            positionNum: 3333,
            positionCompanySize: '15-50人',
            positionSalary: '11024',
            positionBenefit: '福利一、福利二、福利三'
          },
          {
            // date: '',
            // location: '',
            // jobNum: '',
            // jobSalary: '',
            // jobHotLocation: '',
            location: '广西省',
            jobNum: 99,
            jobSalary: '12580',
            jobHotLocation: '广东省、浙江省、上海市',
            jobCompanySize: '15-50人',
            jobBenefit: '福利一、福利二、福利三、福利四、福利五',
            positionName: '前端开发',
            positionNum: 3333,
            positionCompanySize: '15-50人',
            positionSalary: '11024',
            positionBenefit: '福利一、福利二、福利三'
          }
        ]
      ],
      miraiColumn: [
        {
          align: 'center',
          prop: 'date',
          label: '日期',
          sortable: true,
          width: 120,
          sot: true
        },
        {
          align: 'center',
          prop: 'location',
          label: '地区',
          width: 120
        },
        {
          align: 'center',
          prop: 'jobNum',
          label: '地区数量',
          width: 120,
          sortable: true
        },
        {
          align: 'center',
          prop: 'jobSalary',
          label: '地区平均薪资',
          width: 140,
          sortable: true
        },
        {
          align: 'center',
          prop: 'jobHotLocation',
          label: '地区热门城市',
          width: 200,
          sot: true
        },
        {
          align: 'center',
          prop: 'jobCompanySize',
          label: '地区主要公司规模',
          width: 160,
          sot: true
        },
        {
          align: 'center',
          prop: 'jobBenefit',
          label: '地区公司福利',
          width: 200,
          sot: true
        },
        {
          align: 'center',
          prop: 'positionName',
          label: '岗位',
          width: 120,
          sot: true
        },
        {
          align: 'center',
          prop: 'positionNum',
          label: '岗位数量',
          width: 120,
          sortable: true
        },
        {
          align: 'center',
          prop: 'positionSalary',
          label: '岗位平均薪资',
          width: 140,
          sortable: true
        },
        {
          align: 'center',
          prop: 'positionBenefit',
          label: '岗位福利',
          width: 200,
          sot: true
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

<style lang="scss">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #ecf5ff;
}
.el-table th {
  padding: 5px 0;
}

.el-table {
  background: #eff1f4;
}

.el-table__expanded-cell[class*='cell'] {
  padding: 0;
  padding-left: 49px;
}

// 滚动条的宽度
.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; // 横向滚动条
  height: 10px; // 纵向滚动条 必写
}
// 滚动条的滑块
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

.el-table--border {
  border: none;
}

.el-table__empty-block {
  width: auto;
  background: #fff;
}
.el-table--scrollable-x .el-table__body-wrapper {
  // overflow: hidden;
}
.el-table::before {
  height: 0;
}
.el-table__empty-block {
  width: auto !important;
}
.second-table .el-table__body-wrapper {
  overflow: hidden;
}
// .el-table__empty-block,
// .el-table__empty-text {
//   height: 40px !important;
//   line-height: 40px;
// }
</style>
