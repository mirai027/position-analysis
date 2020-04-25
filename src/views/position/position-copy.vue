<template>
  <div v-loading="loading" class="position-container">
    <div class="left-container">
      <selectRegion class="select-region" @changeRegion="changeRegion" />
      <el-row :gutter="12" class="top">
        <el-col
          v-if="Object.keys(positionDest).length > 0"
          :span="8"
          class="box"
        >
          <div class="title">
            <p>{{ positionDest.title }}</p>
            <span>{{ positionDest.rank }}</span>
          </div>
          <div class="num">
            <div class="num-item">
              <p class="item-name">今月新增</p>
              <p class="item-num">{{ positionDest.new }}</p>
            </div>
            <div class="num-item">
              <p class="item-name">职位总量</p>
              <p class="item-num">{{ positionDest.total }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="box">
          <div class="title">
            <p class="city">热门城市</p>
            <!-- <span>TOP1</span> -->
          </div>
          <div v-if="positionHotRegion.length > 0" class="num">
            <div
              v-for="(item, index) in positionHotRegion"
              :key="index"
              class="num-item"
            >
              <p class="item-name">{{ item.name }}</p>
              <p class="item-num">{{ item.value }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom">
        <el-col v-if="positionSkill.length > 0" :span="8" class="box">
          <div class="title">{{ positionDest.title }}技术栈要求</div>
          <ul>
            <el-popover
              v-for="(item, index) in positionSkill"
              :key="item.name"
              placement="top-start"
              width="200"
              trigger="hover"
              class="card-li"
            >
              <div>关键词总数：{{ item.total }}条</div>
              <div>较上月增长：：{{ item.new }} 条</div>
              <div></div>
              <el-button slot="reference">{{
                `${index + 1}. ${item.name}`
              }}</el-button>
            </el-popover>
          </ul>
        </el-col>
        <el-col v-if="positionCommunity.length > 0" :span="8" class="box">
          <div class="title">技术社区</div>
          <ul>
            <el-popover
              v-for="item in positionCommunity"
              :key="item.name"
              placement="top-start"
              width="200"
              trigger="hover"
              class="card-li"
            >
              <div>{{ item.title }}</div>
              <el-button slot="reference" @click="openUrl(item.url)">
                <img class="com-img" :src="item.icon" alt="logo" />
                <p>{{ item.name }}</p>
              </el-button>
            </el-popover>
          </ul>
        </el-col>
        <el-col v-if="positionVideo.length > 0" :span="8" class="box">
          <div class="title">视频学习网站</div>
          <ul>
            <el-popover
              v-for="item in positionVideo"
              :key="item.name"
              placement="top-start"
              width="200"
              trigger="hover"
              class="card-li"
            >
              <div>{{ item.title }}</div>
              <el-button slot="reference" @click="openUrl(item.url)">
                <img class="com-img" :src="item.icon" alt="logo" />
                <p>{{ item.name }}</p>
              </el-button>
            </el-popover>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="right-container">
      <el-row v-if="otherPosition.length > 0" class="bottom-right">
        <el-col
          v-for="(item, idx) in otherPosition"
          :key="idx"
          :span="8"
          class="bottom-right-item"
        >
          <p class="item-name">{{ item.name }}</p>
          <p class="item-num">
            <span style="font-size: 12px;">总量</span>
            {{ item.value }}
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import selectRegion from '@/components/selectRegion/select-region'
export default {
  components: {
    selectRegion
  },
  props: {
    positionData: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      positionDest: [],
      positionHotRegion: [],
      otherPosition: [],
      positionSkill: [],
      positionCommunity: [],
      positionVideo: [],
      loading: true
    }
  },
  watch: {
    positionData: {
      handler() {
        this.initPositionData()
      }
    }
  },
  mounted() {},
  methods: {
    openUrl(url) {
      url && window.open(url)
    },
    initPositionData() {
      // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
      setTimeout(() => {
        this.loading = false
      }, 300)

      this.positionDest = this.positionData.desc
      this.positionHotRegion = this.positionData.hotRegion
      this.otherPosition = this.positionData.other
      this.positionSkill = this.positionData.skill
      this.positionCommunity = this.positionData.community
      this.positionVideo = this.positionData.video
    },
    changeRegion(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
// 写得一言难尽，但不想改了 = =
.position-container {
  width: auto;
  height: auto;
  display: flex;
  position: relative;
  padding: 20px;
  flex-direction: column;
  .left-container {
    width: 100%;
    position: relative;
    .select-region {
      position: absolute;
      right: 30px;
      top: 0px;
    }
    .top {
      width: 70%;
      .box {
        color: #303133;
        // background: #00f;
        .title {
          display: flex;
          p {
            font-size: 24px;
          }
          span {
            margin-left: 5px;
            font-size: 12px;
            align-self: flex-end;
            color: #606266;
          }
          .city {
            transform: scale(0.8);
            transform-origin: 0 100%;
          }
        }
        .num {
          display: flex;
          .num-item {
            margin: 20px 20px 0 0;
            text-align: center;
            .item-name {
              font-size: 12px;
            }
            .item-num {
              margin-top: 5px;
              font-size: 24px;
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      // background: #00f;
      .box {
        padding-right: 20px;
        .title {
          font-size: 21px;
          padding: 30px 0 14px;
        }
        .card-li {
          &::v-deep .el-button {
            font-size: 16px;
            border: none;
            padding: 10px 20px 10px 0;
            background: rgba(236, 236, 236, 0.164);
            position: relative;
            // &::before {
            //   content: '';
            //   width: 0px;
            //   height: 40%;
            //   border-right: 1px solid #303133;
            //   position: absolute;
            //   top: 50%;
            //   right: 0;
            //   transform: translateY(-50%) translateX(-5px);
            // }
          }
          &::v-deep span {
            display: flex;
            align-items: center;
            img {
              // width: 18px;
              height: 18px;
              border-radius: 50%;
            }
            p {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .right-container {
    width: 100%;
    // background: red;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      width: 70%;
      height: 1px;
      position: absolute;
      top: 0;
      right: 50%;
      transform: translate(50%, -5px);
      box-shadow: 0px 0px 20px 1px #ccc;
    }
    .bottom-right-item {
      text-align: center;
      margin: 12px 0;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      .item-name {
        font-size: 14px;
      }
      .item-num {
        margin-top: 7px;
        font-size: 20px;
      }
    }
  }
  .choice {
    position: absolute;
    top: 0;
    right: 40px;
    // transform: scale(0.9);
  }
}
</style>

<style lang="scss" scoped>
.el-popover {
  width: auto !important;
}
</style>
