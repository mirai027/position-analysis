<template>
  <el-select
    v-model="positionValue"
    multiple
    collapse-tags
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
</template>

<script>
export default {
  data() {
    return {
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
      positionValue: []
    }
  }
}
</script>

<style></style>
