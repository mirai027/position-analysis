<template>
  <!-- <div class="flex"> -->
  <!-- <p class="title">职位:</p> -->
  <el-tooltip :content="hoverText" placement="top">
    <el-cascader
      ref="elcascader"
      v-model="value"
      :options="options"
      :show-all-levels="false"
      :filterable="isfilterable"
      clearable
      :props="{ expandTrigger: 'hover', checkStrictly: true, multiple: true }"
      size="small"
      collapse-tags
      class="city-select"
      @change="changeVal"
    ></el-cascader>
  </el-tooltip>
  <!-- </div> -->
</template>

<script>
import options from './country-date'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      options: options,
      value: ['中国'],
      hoverText: '中国'
    }
  },
  computed: {
    ...mapGetters(['tableForm', 'watchForm']),
    isfilterable() {
      // 存在值时不可搜索
      if (this.value.length) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    watchForm: {
      handler() {
        this.value = this.tableForm.location
      }
    }
  },
  mounted() {},
  methods: {
    changeVal() {
      // this.$refs.elcascader.dropDownVisible = false
      // this.$store.dispatch('tableForm', {
      //   location: this.value[this.value.length - 1]
      // })
      console.log(this.value)
      let text = ''
      this.value.forEach((element) => {
        text += element[element.length - 1] + '、'
      })
      this.hoverText = text.substring(0, text.length - 1)
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
  &::v-deep .el-input__inner {
    height: 32px !important;
  }
  &::v-deep .el-cascader__tags .el-tag {
    margin: 4px 0 2px 6px;
  }
}
</style>

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

// .el-cascader-panel .el-radio {
//   width: 100%;
//   height: 100%;
//   z-index: 10;
//   position: absolute;
//   top: 0px;
//   right: 0px;
// }

// .el-cascader-panel .el-radio__input {
//   visibility: hidden;
// }
.el-checkbox {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: red;
  top: 0;
  left: 0;
}
.el-checkbox__inner {
  visibility: hidden;
}
</style>
