<template>
  <div v-loading="loading" class="position-container">
    <div class="left-container">
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
        <!-- 临时更改 -->
        <el-col v-else :span="8" class="box">
          <div class="title">
            <p>CodeRush</p>
            <span>TOP 39</span>
          </div>
          <div class="num">
            <div class="num-item">
              <p class="item-name">今月新增</p>
              <p class="item-num">0</p>
            </div>
            <div class="num-item">
              <p class="item-name">职位总量</p>
              <p class="item-num">0</p>
            </div>
          </div>
        </el-col>
        <!-- 临时更改 -->
        <el-col :span="8" class="box">
          <div class="title">
            <p class="city">热门地区</p>
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
          <div v-else class="num">
            <div v-for="(item, idx) in 3" :key="idx" class="num-item">
              <p class="item-name">CodeRush</p>
              <p class="item-num ">0</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom">
        <el-col :span="8" class="box">
          <div class="title">{{ positionDest.title }}技术栈要求</div>
          <ul v-if="positionSkill.length > 0">
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
          <ul v-else>
            <li class="card-li-null">
              {{ positionForm.region }}没有"{{ positionDest.title }}"的职位哦～
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="box">
          <div class="title">技术社区</div>
          <ul v-if="positionCommunity.length > 0">
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
          <ul v-else>
            <li class="card-li-null">
              广告位招租
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="box">
          <div class="title">视频学习网站</div>
          <ul v-if="positionVideo.length > 0">
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
          <ul v-else>
            <li class="card-li-null">
              广告位招租
            </li>
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
          @click.native="handleOther(item.name)"
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
import { mapGetters } from 'vuex'
export default {

  props: {
    positionData: {
      type: Object,
      default: function() {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      default: true
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
      // listLoading: true
    }
  },
  computed: {
    ...mapGetters(['positionForm'])
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true
      }
    },
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
    handleOther(name) {
      this.$store.dispatch('setPositionForm', { key: 'position', value: name })
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
  .left-container {
    width: 70%;
    position: relative;
    .select-region {
      position: absolute;
      right: 30px;
      top: 0px;
      // z-index: 99999;
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
      min-height: 200px;
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
        .card-li-null {
          font-size: 20px;
          margin-top: 30px;
        }
      }
    }
    &::before {
      content: '';
      width: 1px;
      height: 70%;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-10px, -50%);
      background: #ccc;
      // box-shadow: 0px 0px 40px 1px rgb(255, 54, 54);
    }
  }
  .right-container {
    width: 30%;
    // background: red;
    display: flex;
    align-items: center;
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
