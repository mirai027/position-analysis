<template>
  <div>
    <el-cascader
      ref="elcascader"
      v-model="value"
      :options="options"
      :show-all-levels="false"
      filterable
      :props="{ expandTrigger: 'hover', checkStrictly: true }"
      @change="changeVal"
    ></el-cascader>
  </div>
</template>

<script>
import options from './country-date'
export default {
  data() {
    return {
      options: options,
      value: ['中国', '北京市']
    }
  },
  mounted() {},
  methods: {
    changeVal() {
      this.$refs.elcascader.dropDownVisible = false
    }
  }
}
</script>

<style lang="scss">
.el-cascader-menu {
  &:first-child {
    min-width: 120px;
  }
  &:nth-child(2) {
    min-width: 240px;
  }
  // min-height: 300px;
}
.el-cascader-menu__wrap {
  height: 304px;
}
.el-scrollbar__wrap {
  margin-right: -10px !important;
}
.el-scrollbar__bar.is-vertical > div {
  width: 50%;
}
.el-scrollbar__bar {
  right: -2px;
}

.el-cascader-panel .el-radio {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0px;
  right: 0px;
}

.el-cascader-panel .el-radio__input {
  visibility: hidden;
}
</style>
