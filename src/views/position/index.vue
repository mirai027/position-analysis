<template>
  <div class="main-index">
    我系职位分析
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scope>
@import '~@/styles/index.scss';
.main-index {
  width: auto;
  padding: 10px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
