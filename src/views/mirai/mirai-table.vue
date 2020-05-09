<template>
  <div ref="miraiDOM" class="mirai">
    <div ref="selectDOM" class="mirai-select">
      <selectTime class="select" />
      <selectCity class="select" />
      <selectPosition class="select" />
      <selectSubmit class="select" />
    </div>
    <div ref="checkboxDOM" class="mirai-checkbox">
      <locationCheckbox class="checkbox-item" />
      <positionCheckbox class="checkbox-item" />
    </div>
    <div class="mirai-table">
      <miraiTable :table-height="tableHeight" />
    </div>
  </div>
</template>

<script>

import selectTime from './mirai-table/select-time'
import selectCity from './mirai-table/select-city'
import selectPosition from './mirai-table/select-position'
import selectSubmit from './mirai-table/select-submit'
import locationCheckbox from './mirai-table/location-checkbox'
import positionCheckbox from './mirai-table/position-checkbox'
import miraiTable from './mirai-table/table'
export default {
  components: {
    selectTime,
    selectCity,
    selectPosition,
    selectSubmit,
    locationCheckbox,
    positionCheckbox,
    miraiTable
  },
  data() {
    return {
      tableHeight: 0
    }
  },
  mounted() {
  },
  updated() {},
  activated() {
    this.$nextTick(() => {
      this.tableHeight =
        this.$refs.miraiDOM.offsetHeight -
        this.$refs.checkboxDOM.offsetHeight -
        this.$refs.selectDOM.offsetHeight
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mirai {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .mirai-select {
    display: flex;
    padding-bottom: 10px;
    .select {
      margin-right: 20px;
    }
  }
  .mirai-table {
    // background: #000;
    padding-bottom: 20px;
  }
  .mirai-checkbox {
    display: flex;
    flex-wrap: wrap;

    // margin-bottom: 10px;
    .checkbox-item {
      padding-bottom: 10px;
      margin-right: 40px;
    }
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
.el-checkbox-button.is-disabled .el-checkbox-button__inner {
  color: #409eff;
}
</style>
