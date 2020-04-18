<template>
  <div class="view-container">
    <div class="main-index">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
  position: relative;
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
