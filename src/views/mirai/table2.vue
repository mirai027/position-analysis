<template>
  <div class="mirai">
    <div class="mirai-select">
      <div class="block">
        <el-date-picker
          v-model="endTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <el-select
        v-model="positionValue"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option-group
          v-for="group in cityOptions"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-option-group>
      </el-select>
    </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
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
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      beginTime: '',
      endTime: '',
      options: [
        {
          value: '选项1',
          label: '前端开发'
        },
        {
          value: '选项2',
          label: '后端开发'
        },
        {
          value: '选项3',
          label: '大数据'
        },
        {
          value: '选项4',
          label: '劈里啪啦'
        },
        {
          value: '选项5',
          label: '阿里里'
        }
      ],
      positionValue: [],
      cityOptions: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      value: ''
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

<style lang="scss" scoped>
.mirai {
  width: 100%;
  height: 100%;
  .mirai-table {
  }
  .mirai-select {
    display: flex;
  }
}
</style>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

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
