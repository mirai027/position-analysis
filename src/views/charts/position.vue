<template>
  <div ref="positionTop" class="position">
    <div
      v-for="(item, idx) in 3"
      :key="idx"
      ref="mainTop"
      class="main-container"
      @click="showMore(idx)"
    >
      <div class="container">
        <div class="left">
          <p class="title">Web前端</p>
          <div class="rank">TOP1</div>
          <p class="total">今日新增: <span>3939 条</span></p>
          <p class="total">今日总数: <span>272 条</span></p>
          <div class="city">
            <p class="city-title">热门城市</p>
            <div class="city-container">
              <div class="province">
                <div class="name">广东省</div>
                <div class="amount">99999</div>
              </div>
              <div class="province">
                <div class="name">广东省</div>
                <div class="amount">99999</div>
              </div>
              <div class="province">
                <div class="name">广东省</div>
                <div class="amount">99999</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="pl-title">前端开发技能要求：</div>
          <ul class="pl">
            <li>1.Vue.js</li>
            <li>1.React.js</li>
            <li>1.Node.js</li>
            <li>1.ES6</li>
            <li>1.HTML</li>
            <li>1.CSS</li>
          </ul>
          <div class="community-title">推荐的技术社区</div>
          <ul class="community">
            <li>1.GitHub</li>
            <li>1.SegmentFault</li>
            <li>1.掘金</li>
            <li>1.Stack Overflow</li>
          </ul>
          <div class="study-title">推荐的视频学习网站</div>
          <ul class="community">
            <li>1.哔哩哔哩</li>
            <li>1.51CTO</li>
            <li>1.慕课网</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="except-top3">
      <div v-for="(item, idx) in 20" :key="idx" class="except-container">
        <div class="name">Java开发</div>
        <p class="except-total">今日总数: <span>3939 条</span></p>
        <p class="except-total">今日新增: <span>272 条</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.showMore(0)
  },
  methods: {
    showMore(idx) {
      this.$refs.positionTop
        .getElementsByClassName('main-container')
        .forEach(element => {
          element.style.width = '300px'
        })
      this.$refs.mainTop[idx].style.width = '700px'
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  width: auto;
  height: 50%;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  padding: 10px 0;
  .main-container {
    flex: none;
    width: 300px;
    height: 100%;
    // background: #0c0;
    margin-left: 2%;
    display: flex;
    transition: all 1s;
    position: relative;
    overflow: hidden;
    border: 1px solid rgb(177, 177, 177);
    border-radius: 4px;
    // box-shadow: 0px 0px 12px 1px #ddd;
    background: #39c5bb;
    // &:nth-child(n + 2) {
    //   margin-left: 2%;
    // }
    .container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      transition: none;
      .left {
        flex: none;
        width: 300px;
        height: 100%;
        .title {
          font-size: 24px;
        }
        .total {
          font-size: 18px;
        }
        .city {
          .city-title {
            font-size: 24px;
          }
          .city-container {
            display: flex;
            text-align: center;
            .province {
              flex: 1;
            }
          }
        }
      }
      .right {
        flex: none;
        width: 400px;
        height: 100%;
        background: rgb(112, 214, 255);
      }
    }
  }
  .except-top3 {
    flex: none;
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-right: 10px;
    .except-container {
      height: calc(20% - 20px - 2px);
      margin: 10px 0 10px 30px;
      border: 1px solid #ccc;
    }
  }
}
</style>
