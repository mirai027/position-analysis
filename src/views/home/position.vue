<template>
  <div class="position-container">
    <div class="left-container">
      <el-row :gutter="12" class="top">
        <el-col :span="8" class="box">
          <div class="title">
            <p>前端开发</p>
            <span>TOP1</span>
          </div>
          <div class="num">
            <div class="num-item">
              <p class="item-name">今日新增</p>
              <p class="item-num">2999</p>
            </div>
            <div class="num-item">
              <p class="item-name">今日新增</p>
              <p class="item-num">2999</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="box">
          <div class="title">
            <p class="city">热门城市</p>
            <!-- <span>TOP1</span> -->
          </div>
          <div class="num">
            <div class="num-item">
              <p class="item-name">广东省</p>
              <p class="item-num">2999</p>
            </div>
            <div class="num-item">
              <p class="item-name">江苏省</p>
              <p class="item-num">2999</p>
            </div>
            <div class="num-item">
              <p class="item-name">上海市</p>
              <p class="item-num">2999</p>
            </div>
          </div></el-col
        >
      </el-row>
      <el-row v-if="Object.keys(mirai).length !== 0" class="bottom">
        <el-col
          v-for="(feaItem, feaIdx) in mirai.feature.list"
          :key="feaIdx"
          :span="8"
          class="box"
        >
          <div class="title">{{ feaItem.title }}</div>
          <ul>
            <el-popover
              v-for="(popItem, popIdx) in feaItem.item"
              :key="popIdx"
              placement="top-start"
              width="200"
              trigger="hover"
              class="card-li"
            >
              <div v-if="popItem.total">关键词总数：{{ popItem.total }} 条</div>
              <div v-if="popItem.total">较上月增长：{{ popItem.new }} 条</div>
              <div v-if="popItem.title">{{ popItem.title }}</div>

              <el-button slot="reference" @click="openUrl(popItem.url)">
                <img
                  v-if="popItem.icon"
                  class="com-img"
                  :src="popItem.icon"
                  alt="logo"
                />
                <p v-if="popItem.icon">
                  {{ `${popItem.name}` }}
                </p>
                <p v-else>{{ `${popIdx + 1}. ${popItem.name}` }}</p>
              </el-button>
            </el-popover>
          </ul>
        </el-col>
      </el-row>
      <el-radio-group v-model="choiceDate" class="choice" size="small">
        <el-radio-button label="日"></el-radio-button>
        <el-radio-button label="月"></el-radio-button>
        <el-radio-button label="年"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="right-container">
      <el-row class="bottom-right">
        <el-col
          v-for="(item, idx) in 12"
          :key="idx"
          :span="8"
          class="bottom-right-item"
        >
          <p class="item-name">后端开发</p>
          <p class="item-num">
            <span style="font-size: 12px;">新增</span>
            2999
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProPos } from '@/api/pro-pos.js'
export default {
  data() {
    return {
      mirai: {},
      choiceDate: '日'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getProPos('广东', '前端开发')
      this.keyword = data.position
      this.mirai = data
      setTimeout(() => {
        this.dialogLoading = false
      }, 300)
    },
    openUrl(url) {
      url && window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.position-container {
  width: auto;
  height: auto;
  display: flex;
  position: relative;
  padding: 20px;
  .left-container {
    width: 70%;
    position: relative;
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
          color: #303133;
          // &:first-child {
          //   &::v-deep .el-button {
          //     background: #00f;
          //   }
          // }
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
