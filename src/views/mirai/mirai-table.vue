<template>
  <div class="mirai">
    <div class="mirai-select">
      <selectTime class="select" />
      <selectCity class="select" />
      <selectPosition class="select" />
      <selectSubmit class="select" />
    </div>
    <div class="mirai-table">
      <table2 />
    </div>
  </div>
</template>

<script>
import selectTime from './select-time'
import selectCity from './select-city'
import selectPosition from './select-position'
import selectSubmit from './select-submit'
import table2 from './table'
export default {
  components: {
    selectTime,
    table2,
    selectCity,
    selectPosition,
    selectSubmit
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.mirai {
  width: 100%;
  height: 100%;
  .mirai-select {
    display: flex;
    margin-bottom: 10px;
    .select {
      margin-right: 20px;
    }
  }
  .mirai-table {
    background: #000;
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
</style>
