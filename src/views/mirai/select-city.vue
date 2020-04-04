<template>
  <!-- <div class="flex"> -->
  <!-- <p class="title">职位:</p> -->
  <el-cascader
    ref="elcascader"
    v-model="value"
    :options="options"
    :show-all-levels="false"
    filterable
    clearable
    :props="{ expandTrigger: 'hover', checkStrictly: true }"
    @change="changeVal"
  ></el-cascader>
  <!-- </div> -->
</template>

<script>
import options from './country-date'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      options: options,
      value: ['中国']
    }
  },
  computed: {
    ...mapGetters(['tableForm', 'watchForm'])
  },
  watch: {
    watchForm: {
      handler() {
        this.value = this.tableForm.location
      }
    }
  },
  mounted() {
    console.log(this.value)
  },
  methods: {
    changeVal() {
      this.$refs.elcascader.dropDownVisible = false
      this.$store.dispatch('tableForm', {
        location: this.value[this.value.length - 1]
      })
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
