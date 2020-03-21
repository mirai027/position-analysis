<template>
  <div class="main-index">
    <map2 />
    <salary-exp />
    <companySize />
    <benefit />
  </div>
</template>

<script>
import map2 from './map'
import salaryExp from './salary-exp'
import companySize from './company-size'
import benefit from './benefit'
export default {
  components: {
    map2,
    salaryExp,
    companySize,
    benefit
  },
  mounted() {
    alert(`
      广东地区招聘数量最多的：广州市、深圳市、佛山市
      其中，广州市共3666条、深圳市2666条、佛山市1666条
      您所选择的 "web前端开发" 在深圳市最受企业的喜爱
    `)
  }
}
</script>

<style lang="scss" scope>
@import '~@/styles/index.scss';
.main-index {
  @include max-screen();
  overflow: hidden;
  overflow-y: scroll;
}
</style>
