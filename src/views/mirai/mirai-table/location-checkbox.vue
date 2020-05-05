<template>
  <div class="location-checkbox">
    <el-checkbox-group
      v-model="checkAll"
      size="small"
      style="margin-right: 10px;"
      @change="handleCheckAllChange"
    >
      <el-checkbox-button disabled>
        地区相关：
      </el-checkbox-button>
      <el-checkbox-button>
        全选
      </el-checkbox-button>
    </el-checkbox-group>
    <el-checkbox-group
      v-model="checkedLocation"
      size="small"
      @change="handleCheckedLocationChange"
    >
      <el-checkbox-button v-for="city in location" :key="city" :label="city">
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
      checkedLocation: ['地区数量', '地区平均薪资', '地区热门城市'],
      location: [
        '地区数量',
        '地区平均薪资',
        '地区热门城市',
        '地区主要公司规模',
        '地区公司福利'
      ]
    }
  },
  activated() {
    this.submitAction(this.checkedLocation)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedLocation = val ? this.location : []
      this.submitAction(this.checkedLocation)
    },
    handleCheckedLocationChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.location.length
      this.submitAction(this.checkedLocation)
    },
    submitAction(value) {
      this.$store.dispatch('tableCheckbox', { value, key: 'location' })
    }
  }
}
</script>

<style lang="scss" scoped>
.location-checkbox {
  display: flex;
  align-items: center;
}
</style>
