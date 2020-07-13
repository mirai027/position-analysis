<template>
  <el-cascader
    ref="elcascader"
    v-model="value"
    :options="options"
    :show-all-levels="false"
    filterable
    clearable
    :props="{ expandTrigger: 'hover', checkStrictly: true }"
    size="small"
    class="city-select"
    @change="changeVal"
  ></el-cascader>
</template>

<script>
import options from './country-date'
import { mapGetters } from 'vuex'
export default {
  props: {
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: options,
      value: this.defaultValue
    }
  },
  computed: {
    ...mapGetters(['positionForm']),
    _isLoading() {
      return this.isLoading
    }
  },
  watch: {
    positionForm: {
      handler() {
        this.value = this.positionForm.region
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    changeVal() {
      // 关闭下拉框
      this.$refs.elcascader.dropDownVisible = false
      const length = this.value.length
      const name = this.value[length - 1]
      /**
       * 传出 地区 name 和 地区级联 level
       * 清空时 name 为 undefined
       */
      this.$emit('changeRegion', { name, level: length })
    }
  }
}
</script>

<style lang="scss" scoped>
// .flex {
//   display: flex;
//   align-items: center;
//   .title {
//     font-size: 16px;
//   }
// }
.city-select {
  width: 127px;
  &::v-deep .el-input__inner {
    height: 32px !important;
  }
  &::v-deep .el-cascader__tags .el-tag {
    margin: 4px 0 2px 6px;
  }
}
</style>

<style lang="scss">
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
// .el-checkbox {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   // background: red;
//   top: 0;
//   left: 0;
// }
// .el-checkbox__inner {
//   visibility: hidden;
// }
</style>
