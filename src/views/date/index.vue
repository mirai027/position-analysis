<template>
  <div class="view-container">
    <div class="main-index">
      我是时间刻度
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.view-container {
  width: auto;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .main-index {
    height: auto;
    padding: 10px;
  }
}
</style>
