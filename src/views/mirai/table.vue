<template>
  <el-table
    :data="miraiData"
    border
    :row-class-name="tableRowClassName"
    :default-sort="{
      prop: ['date', 'jobNum', 'positionNum']
    }"
    class="mirai-table-container"
    :max-height="tableHeight"
  >
    <el-table-column v-if="true" type="expand" width="50" fixed>
      <template slot-scope="props">
        <el-table
          :data="miraiHideData[props.row.index]"
          border
          :show-header="false"
          class="second-table mirai-table-container"
        >
          <!-- <transition-group name="breadcrumb" tag> -->
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
            :fixed="item.fixed"
          >
          </el-table-column>
          <!-- </transition-group> -->
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
      :fixed="item.fixed"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    tableHeight: {
      type: Number,
      default: 600
    }
  },
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
          positionHotLocation: '广东省、浙江省、上海市',
          positionCompanySize: '15-50人',
          positionBenefit: '福利一、福利二、福利三、福利四、福利五'
        },
        {
          index: 0,
          date: '2020-04-06',
          location: '广东省',
          jobNum: 99,
          jobSalary: '12580',
          jobHotLocation: '广东省、浙江省、上海市',
          jobCompanySize: '15-50人',
          jobBenefit: '福利一、福利二、福利三、福利四、福利五',
          positionName: '前端开发',
          positionNum: 33,
          positionSalary: '11024',
          positionHotLocation: '广东省、浙江省、上海市',
          positionCompanySize: '15-50人',
          positionBenefit: '福利一、福利二、福利三、福利四、福利五'
        },
        {
          index: 0,
          date: '2020-04-07',
          location: '广东省',
          jobNum: 99,
          jobSalary: '12580',
          jobHotLocation: '广东省、浙江省、上海市',
          jobCompanySize: '15-50人',
          jobBenefit: '福利一、福利二、福利三、福利四、福利五',
          positionName: '前端开发',
          positionNum: 33,
          positionSalary: '11024',
          positionHotLocation: '广东省、浙江省、上海市',
          positionCompanySize: '15-50人',
          positionBenefit: '福利一、福利二、福利三、福利四、福利五'
        }
      ],
      miraiHideData: [
        [
          {
            positionName: '后端开发',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            positionName: '测试',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            positionName: '移动前端开发',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            positionName: '运维',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            location: '广西省',
            jobNum: 99,
            jobSalary: '12580',
            jobHotLocation: '广东省、浙江省、上海市',
            jobCompanySize: '15-50人',
            jobBenefit: '福利一、福利二、福利三、福利四、福利五',
            positionName: '前端开发',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            positionName: '后端开发',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          },
          {
            positionName: '测试',
            positionNum: 33,
            positionSalary: '11024',
            positionHotLocation: '广东省、浙江省、上海市',
            positionCompanySize: '15-50人',
            positionBenefit: '福利一、福利二、福利三、福利四、福利五'
          }
        ]
      ],
      miraiColumn: [],
      miraiColumnAllShow: [
        {
          align: 'center',
          prop: 'date',
          label: '日期',
          sortable: true,
          width: 120,
          sot: true,
          fixed: true
        },
        {
          align: 'center',
          prop: 'location',
          label: '地区',
          width: 120,
          fixed: true
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
          // fixed: true
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
          prop: 'positionHotLocation',
          label: '岗位热门城市',
          width: 200,
          sot: true
        },
        {
          align: 'center',
          prop: 'positionCompanySize',
          label: '岗位主要公司规模',
          width: 160,
          sot: true
        },
        {
          align: 'center',
          prop: 'positionBenefit',
          label: '岗位公司福利',
          width: 200,
          sot: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['tableCheckboxTotal'])
  },
  watch: {
    tableCheckboxTotal: {
      handler() {
        // 过滤出需要显示的 column
        this.miraiColumn = this.miraiColumnAllShow.filter((item) => {
          return this.tableCheckboxTotal.some((cItem) => item.label === cItem)
        })
      }
    }
  },
  mounted() {
    // el-table__header会自动计算宽度,导致添加行时会造成滚动
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return 'success-row'
    }
  }
}
</script>

<style lang="scss">
.mirai-table-container {
  width: 100%;
}
</style>

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
.el-table::before {
  height: 0;
}
.el-table__empty-block {
  width: auto !important;
}
.second-table .el-table__body-wrapper {
  overflow: hidden;
}
// .el-table--scrollable-x .el-table__fixed {
//   transform: translateY(-2px) !important;
// }
.expanded .cell {
  height: 22px;
}
// .tbody .el-table__row {
//   &:last-child {
//     color: red;
//     background: red !important;
//   }
// }
.el-table__fixed,
.el-table__fixed-right {
  top: -0.5px;
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

body .el-table th.gutter {
  display: table-cell !important;
}
</style>
