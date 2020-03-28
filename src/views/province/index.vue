<template>
  <div class="view-container">
    <div class="main-index">
      我系茵蒂克丝
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {}
}
</script>

<style lang="scss" scope>
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
