<template>
  <div class="position">
    <div class="top content">
      <p class="h-title">今日职位信息</p>
      <div v-if="Object.keys(day).length" ref="positionTop" class="p-container">
        <div
          v-for="(topData, idx) in day.top"
          :key="idx"
          ref="mainTop"
          class="main-container"
          @click="showMoreTop(idx)"
        >
          <div class="container">
            <div class="left">
              <p class="title">{{ topData.title }}</p>
              <div class="rank">{{ topData.rank }}</div>
              <p class="total">
                今日新增: <span>{{ topData.new }} 条</span>
              </p>
              <p class="total">
                今日总数: <span>{{ topData.total }} 条</span>
              </p>
              <div class="city">
                <p class="city-title">热门城市</p>
                <div class="city-container">
                  <div
                    v-for="(province, proKey) in topData.hotProvince"
                    :key="proKey"
                    class="province"
                  >
                    <div class="name">{{ province.name }}</div>
                    <div class="amount">总：{{ province.total }}条</div>
                    <div class="amount">新增：{{ province.new }}条</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="pl-title">{{ topData.title }}技能要求：</div>
              <ul class="pl">
                <li v-for="(skillData, sIdx) in topData.skill" :key="sIdx">
                  {{ `${sIdx + 1}. ${skillData}` }}
                </li>
              </ul>
              <div class="community-title">推荐的技术社区</div>
              <ul class="community">
                <li
                  v-for="(communityData, cIdx) in topData.community"
                  :key="cIdx"
                >
                  <a :href="communityData.url">{{
                    `${cIdx + 1}. ${communityData.name}`
                  }}</a>
                </li>
              </ul>
              <div class="study-title">推荐的视频学习网站</div>
              <ul class="community">
                <li v-for="(videoData, vIdx) in topData.video" :key="vIdx">
                  <a :href="videoData.url">{{
                    `${vIdx + 1}. ${videoData.name}`
                  }}</a>
                </li>
              </ul>
              <div class="detail" @click="getPositionName(topData.title)">
                查看更多
              </div>
            </div>
          </div>
        </div>
        <div class="except-top3">
          <div
            v-for="(item, idx) in day.other"
            :key="idx"
            class="except-container"
          >
            <div class="name">{{ item.name }}</div>
            <p class="except-total">
              今日总数: <span>{{ item.total }} 条</span>
            </p>
            <p class="except-total">
              今日新增: <span>{{ item.new }} 条</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom content">
      <p class="h-title">月度职位信息</p>
      <div
        v-if="Object.keys(month).length"
        ref="positionBtm"
        class="p-container"
      >
        <div
          v-for="(topData, idx) in month.top"
          :key="idx"
          ref="mainBtm"
          class="main-container"
          @click="showMoreBtm(idx)"
        >
          <div class="container">
            <div class="left">
              <p class="title">{{ topData.title }}</p>
              <div class="rank">{{ topData.rank }}</div>
              <p class="total">
                今日新增: <span>{{ topData.new }} 条</span>
              </p>
              <p class="total">
                今日总数: <span>{{ topData.total }} 条</span>
              </p>
              <div class="city">
                <p class="city-title">热门城市</p>
                <div class="city-container">
                  <div
                    v-for="(province, proKey) in topData.hotProvince"
                    :key="proKey"
                    class="province"
                  >
                    <div class="name">{{ province.name }}</div>
                    <div class="amount">总：{{ province.total }}条</div>
                    <div class="amount">新增：{{ province.new }}条</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="pl-title">{{ topData.title }}技能要求：</div>
              <ul class="pl">
                <li v-for="(skillData, sIdx) in topData.skill" :key="sIdx">
                  {{ `${sIdx + 1}. ${skillData}` }}
                </li>
              </ul>
              <div class="community-title">推荐的技术社区</div>
              <ul class="community">
                <li
                  v-for="(communityData, cIdx) in topData.community"
                  :key="cIdx"
                >
                  <a :href="communityData.url">{{
                    `${cIdx + 1}. ${communityData.name}`
                  }}</a>
                </li>
              </ul>
              <div class="study-title">推荐的视频学习网站</div>
              <ul class="community">
                <li v-for="(videoData, vIdx) in topData.video" :key="vIdx">
                  <a :href="videoData.url">{{
                    `${vIdx + 1}. ${videoData.name}`
                  }}</a>
                </li>
              </ul>
              <div class="detail" @click="getPositionName(topData.title)">
                查看更多
              </div>
            </div>
          </div>
        </div>
        <div class="except-top3">
          <div
            v-for="(item, idx) in month.other"
            :key="idx"
            class="except-container"
            @click="getPositionName(item.name)"
          >
            <div class="name">{{ item.name }}</div>
            <p class="except-total">
              今日总数: <span>{{ item.total }} 条</span>
            </p>
            <p class="except-total">
              今日新增: <span>{{ item.new }} 条</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllDayPosition, getAllMonthPosition } from '@/api/position'
export default {
  data() {
    return {
      day: {},
      month: {}
    }
  },
  mounted() {
    this.getInfo() // 获取api信息
  },
  methods: {
    showMoreTop(idx) {
      this.$refs.positionTop
        .getElementsByClassName('main-container')
        .forEach(element => {
          element.style.width = '300px'
        })
      this.$refs.mainTop[idx].style.width = '700px'
    },
    showMoreBtm(idx) {
      this.$refs.positionBtm
        .getElementsByClassName('main-container')
        .forEach(element => {
          element.style.width = '300px'
        })
      this.$refs.mainBtm[idx].style.width = '700px'
    },
    async getInfo() {
      const dayInfo = await getAllDayPosition()
      const monthInfo = await getAllMonthPosition()
      this.day = dayInfo.data
      this.month = monthInfo.data
      this.$nextTick(() => {
        this.showMoreTop(0) // 默认第一个卡片显示详细信息
        this.showMoreBtm(0) // 默认第一个卡片显示详细信息
      })
    },
    getPositionName(name) {
      console.log(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  // width: auto;
  // height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-x: scroll;
  padding: 10px 0;
  .content {
    margin-top: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    .h-title {
      color: #f00;
      height: 100px;
    }
    .p-container {
      display: flex;
      height: 100%;
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
  }
}
</style>
