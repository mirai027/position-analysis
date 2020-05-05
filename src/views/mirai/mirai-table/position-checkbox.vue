<template>
  <div class="position-checkbox">
    <el-checkbox-group
      v-model="checkAll"
      size="small"
      style="margin-right: 10px;"
      @change="handleCheckAllChange"
    >
      <el-checkbox-button disabled>
        岗位相关：
      </el-checkbox-button>
      <el-checkbox-button>
        全选
      </el-checkbox-button>
    </el-checkbox-group>
    <el-checkbox-group
      v-model="checkedPosition"
      size="small"
      @change="handleCheckedPositionChange"
    >
      <el-checkbox-button v-for="city in positions" :key="city" :label="city">
        {{ city }}
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      checkedPosition: ['岗位数量', '岗位平均薪资', '岗位热门城市'],
      positions: [
        '岗位数量',
        '岗位平均薪资',
        '岗位热门城市',
        '岗位主要公司规模',
        '岗位公司福利'
      ]
    }
  },
  activated() {
    this.submitAction(this.checkedPosition)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedPosition = val ? this.positions : []
      this.submitAction(this.checkedPosition)
    },
    handleCheckedPositionChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.positions.length
      this.submitAction(this.checkedPosition)
    },
    submitAction(value) {
      this.$store.dispatch('tableCheckbox', { value, key: 'position' })
    }
  }
}
</script>

<style lang="scss" scoped>
.position-checkbox {
  display: flex;
  align-items: center;
}
</style>
