<template>
  <div class="main-index">
    <eduPos />
  </div>
</template>

<script>
import eduPos from './edu-pos'
export default {
  components: {
    eduPos
  }
}
</script>

<style lang="scss" scope>
.main-index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
