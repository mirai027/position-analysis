<template>
  <div class="mirai-table-container">
    <el-table
      ref="tableDOM"
      :data="miraiData"
      border
      :row-class-name="tableRowClassName"
      :default-sort="{
        prop: ['date', 'jobNum', 'positionNum']
      }"
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
      <!-- <p v-if="show" slot="append" v-loading="false" class="bottom-line"></p> -->
      <p slot="append" v-loading="loading.flag" class="bottom-line">
        {{ loading.text }}
      </p>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from '@/utils/debounce'
// import {getDateList} from '@/utils/date'
export default {
  props: {
    tableHeight: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      miraiData: [],
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
      ],
      loading: {
        text: '我也是有底线的 🤪',
        flag: true,
        index: 0
      }
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
    },
    tableHeight: {
      handler() {
        /**
         * 加载时计算 table的高度能容纳多少条数据
         * 父级放回计算过后的 table剩余高度，每一条 column高度约等于 46
         * this.tableHeight / 46 一般会比实际多一条，再 +4。每次请求 table高度的 cloumn + 4的数量
         */
        const dataLength = Math.floor(this.tableHeight / 46) + 4
        for (let index = 0; index < dataLength; index++) {
          this.miraiData.push({
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
          })
        }
      }
    }
  },
  mounted() {
    // el-table__header会自动计算宽度,导致添加行时会造成滚动
    // console.log(this.$refs.tableDOM.bodyWrapper)
    const tabelDom = this.$refs.tableDOM.bodyWrapper
    tabelDom.addEventListener(
      'scroll',
      debounce(() => {
        console.log('我是Table组件的滚动')
        /**
         * 因为 table中 append的内容如果是中途加入的，会影响到设置了 fixed的 column。所以必须一开始就显示 append的 loading条
         * 折中方法，在没数据时，设置 loading消失，显示 “我也是有底线的” 提示用户已经没有数据了。在不影响 fixed的 column的同时，增加了用户体验。
         */
        const shouldShowHight =
          tabelDom.scrollTop + tabelDom.clientHeight >=
          tabelDom.scrollHeight - 200
        if (shouldShowHight) {
          this.loading.index++
          if (this.loading.index >= 4) {
            this.loading.flag = false
          } else {
            const dataLength = Math.floor(this.tableHeight / 46) + 4
            for (let index = 0; index < dataLength; index++) {
              this.miraiData.push({
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
              })
            }
          }
        }
      }, 1000)
    )
  },
  updated() {
    // 每一条数据的展开，都是对应日期的。也就是说，index对应的是每一个日期
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return 'success-row'
    }
  }
}
</script>

<style lang="scss" scoped>
.mirai-table-container {
  width: 100%;
  position: relative;
  .bottom-line {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    &::v-deep .el-loading-mask {
      background-color: #eff1f4;
    }
    &::v-deep .el-loading-spinner {
      height: 40px;
      background-color: #eff1f4;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &::v-deep .el-loading-spinner .circular {
      width: 30px;
      height: 30px;
    }
    // position: absolute;
    // bottom: 0;
  }
  // .loading {
  //   width: 100%;
  //   height: 40px;
  //   // background: red;

  //   &::v-deep .el-loading-spinner {

  //   }
  // }
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
