<template>
  <div class="view-container">
    <div class="main-index">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {}
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    overflow-y: auto;
  }
}
</style>
