<template>
  <div class="mirai">
    <div class="mirai-select">
      <selectTime />
      <selectCity />
      <selectPosition />
    </div>
    <table2 />
  </div>
</template>

<script>
import selectTime from './select-time'
import selectCity from './select-city'
import selectPosition from './select-position'
import table2 from './table'
export default {
  components: {
    selectTime,
    table2,
    selectCity,
    selectPosition
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mirai {
  width: 100%;
  height: 100%;
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
