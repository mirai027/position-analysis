<template>
  <div v-loading="!mainLoading" class="map" element-loading-text="拼命加载中">
    <div class="container">
      <div ref="province" class="left map echart" />
      <div class="right">
        <div v-if="Object.keys(monthBest).length" class="month main-card">
          <div class="card" @click="getName(monthBest.best.title)">
            <p class="title">今日“优秀三好学生”省份</p>
            <p class="province">
              {{ monthBest.best.rank }}:
              <span>{{ monthBest.best.title }}</span>
            </p>
            <p class="total">
              今日总数: <span>{{ monthBest.best.total }} 条</span>
            </p>
            <p class="total">
              今日新增: <span>{{ monthBest.best.new }} 条</span>
            </p>
          </div>
          <div class="card" @click="getName(monthBest.better.title)">
            <p class="title">今日“优秀进步奖”省份</p>
            <p class="province">
              {{ monthBest.better.rank }}:
              <span>{{ monthBest.better.title }}</span>
            </p>
            <p class="total">
              今日总数: <span>{{ monthBest.better.total }} 条</span>
            </p>
            <p class="total">
              今日新增: <span>{{ monthBest.better.new }} 条</span>
            </p>
          </div>
        </div>
        <div v-if="Object.keys(dayBest).length" class="day main-card">
          <div class="card" @click="getName(dayBest.best.title)">
            <p class="title">月度“优秀三好学生”省份</p>
            <p class="province">
              {{ dayBest.best.rank }}: <span>{{ dayBest.best.title }}</span>
            </p>
            <p class="total">
              月度总数: <span>{{ dayBest.best.total }} 条</span>
            </p>
            <p class="total">
              月度新增: <span>{{ dayBest.best.new }} 条</span>
            </p>
          </div>
          <div class="card" @click="getName(dayBest.better.title)">
            <p class="title">月度“优秀进步奖”省份</p>
            <p class="province">
              {{ dayBest.better.rank }}:
              <span>{{ dayBest.better.title }}</span>
            </p>
            <p class="total">
              月度总数: <span>{{ dayBest.better.total }} 条</span>
            </p>
            <p class="total">
              月度新增: <span>{{ dayBest.better.new }} 条</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div ref="update" class="bottom update" />
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      class="map-dialog"
      title="M智能推荐🤖"
      @close="handleClose"
    >
      <div
        v-loading="dialogLoading"
        class="wrap"
        element-loading-text="拼命加载中"
      >
        <div v-if="Object.keys(mirai).length !== 0" class="container-dialog">
          <el-select
            v-model="keyword"
            placeholder="请选择"
            class="pos-select"
            @change="changeKy()"
          >
            <el-option
              v-for="(item, idx) in mirai.positionList"
              :key="idx"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="c-h1">
            广东地区招聘数量最多的：<span
              v-for="(item, idx) in mirai.top"
              :key="item.name"
              >{{ item.name }}<span v-if="idx != 2">、</span></span
            >
          </p>
          <p class="c-h1">
            其中，<span v-for="(item, idx) in mirai.top" :key="item.name">
              {{ `${item.name} ${item.value}条`
              }}<span v-if="idx != 2">、</span></span
            >
          </p>
          <!-- <el-divider></el-divider> -->
          <p class="c-h1">
            您所选择的 "{{ mirai.position }}" 在{{
              mirai.best.name
            }}中综合条件最优
          </p>
          <div class="advantage">
            <div
              v-for="(item, idx) in mirai.best.list"
              :key="idx"
              class="adv-card"
            >
              <div class="top">
                <img :src="svg[idx]" alt="" class="top-img" />
                <div class="container">
                  <p>{{ item.num }}</p>
                  <p>占{{ item.dc }}</p>
                </div>
              </div>
              <div class="bottom">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div
              v-for="(feaItem, feaIdx) in mirai.feature.list"
              :key="feaIdx"
              class="card-item"
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
                  <div v-if="popItem.total">
                    关键词总数：{{ popItem.total }} 条
                  </div>
                  <div v-if="popItem.total">
                    较上月增长：{{ popItem.new }} 条
                  </div>
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
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">
          世界这么大，我想去康康
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'echarts/map/js/china'
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/aomen'
import 'echarts/map/js/province/beijing'
import 'echarts/map/js/province/chongqing'
import 'echarts/map/js/province/fujian'
import 'echarts/map/js/province/gansu'
import 'echarts/map/js/province/guangdong'
import 'echarts/map/js/province/guangxi'
import 'echarts/map/js/province/guizhou'
import 'echarts/map/js/province/hainan'
import 'echarts/map/js/province/hebei'
import 'echarts/map/js/province/heilongjiang'
import 'echarts/map/js/province/henan'
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/hunan'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/province/jiangxi'
import 'echarts/map/js/province/jilin'
import 'echarts/map/js/province/liaoning'
import 'echarts/map/js/province/neimenggu'
import 'echarts/map/js/province/ningxia'
import 'echarts/map/js/province/qinghai'
import 'echarts/map/js/province/shandong'
import 'echarts/map/js/province/shanghai'
import 'echarts/map/js/province/shanxi'
import 'echarts/map/js/province/shanxi1'
import 'echarts/map/js/province/sichuan'
import 'echarts/map/js/province/taiwan'
import 'echarts/map/js/province/tianjin'
import 'echarts/map/js/province/xianggang'
import 'echarts/map/js/province/xinjiang'
import 'echarts/map/js/province/xizang'
import 'echarts/map/js/province/yunnan'
import 'echarts/map/js/province/zhejiang'
import { getAllUpdate, getAllDayBest, getAllMonthBest } from '@/api/map'
import getEchartXAxisName from '@/utils/getEchartXAxisName'
import { getProPos } from '@/api/pro-pos.js'

export default {
  data() {
    return {
      dayBest: {},
      monthBest: {},
      dialogVisible: true,
      mainLoading: true,
      dialogLoading: true,
      options: [],
      mirai: {},
      keyword: '',
      svg: [
        require('@/assets/revenue_.svg'),
        require('@/assets/web_developer.svg'),
        require('@/assets/personal_data_.svg'),
        require('@/assets/construction_site.svg')
      ]
    }
  },
  mounted() {
    this.initMap()
    this.initUpdate()
    this.initBest()
    this.getData()
  },
  methods: {
    async changeKy() {
      this.mirai = {} // 触发 v-if 重绘 css
      this.dialogLoading = true
      const { data } = await getProPos(this.$route.query.name, this.keyword)
      this.$notify({
        title: '客官请慢用🤡',
        message: `已为您更新到 ${this.$route.query.name} - ${this.keyword} 的数据`,
        type: 'success'
      })
      setTimeout(() => {
        this.dialogLoading = false
      }, 300)
      this.keyword = data.position
      this.mirai = data
    },
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
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    initMap() {
      const chart = this.$echarts.init(this.$refs.province)
      const colors = ['#39C5BB', '#66CCFF', '#ffff00', '#ee0000']
      const option = {
        color: colors,
        tooltip: {
          show: true,
          formatter: function(params) {
            // return `${params.data.name}： ${params.data.value} 条`
          }
        },
        legend: false,
        visualMap: {
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: ['高', '低'],
          showLabel: true,
          seriesIndex: [0],
          inRange: {
            color: colors
          },
          textStyle: {
            color: '#7B93A7'
          },
          bottom: '10%',
          left: '5%'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'map',
            map: this.$route.query.name,
            roam: false,
            itemStyle: {
              // areaColor: '#0E0A26',
              borderWidth: 1
              // borderColor: '#382F93'
            },
            label: {
              show: true,
              color: '#282C34',
              fontSize: 12
            },
            // data: data,
            emphasis: {
              label: {
                show: true,
                color: '#fff'
              },
              itemStyle: {
                // areaColor: '#FF733D'
              }
            }
          }
        ]
      }
      chart.setOption(option)
    },
    async initUpdate() {
      const res = await getAllUpdate()
      const { data } = res
      const lineData = []
      const updateBarData = []
      const xAxisData = []
      for (let index = 1; index < data.length; index++) {
        const cty = data[index].value - data[index - 1].value
        lineData.push(data[index])
        updateBarData.push({ name: data[index].name, value: cty })
        xAxisData.push(data[index].name)
      }
      const colors = ['#d14a61', '#5793f3', '#675bba']
      const option = {
        color: colors,
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          },
          right: '7%',
          top: '0'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0'
            }
          },
          formatter: function(params) {
            /**
             * componentIndex === 0 line chart
             * componentIndex === 1 bar chart
             */
            const fm = {}
            params.forEach(element => {
              const { componentIndex } = element
              if (componentIndex === 0) {
                const line = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${element.color};"></span>${element.name} 共 <span style="color: #F13000;">${element.value}</span> 条招聘数据`
                fm.line = line
              }
              if (componentIndex === 1) {
                const style = () => {
                  if (element.value > 0) {
                    return {
                      value: `新增 ${element.value} `,
                      color: '#66ccff'
                    }
                  } else if (element.value < 0) {
                    return {
                      value: `减少 ${element.value} `,
                      color: '#F13000'
                    }
                  } else element.value === 0
                  return { value: ` 不变 `, color: '#39c5bb' }
                }
                const bar = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  element.color
                };"></span>${element.name} 共 <span style="color:${
                  style().color
                };">${style().value}</span> 条招聘数据`
                fm.bar = bar
              }
            })
            let res = ''
            if (Object.keys(fm).length === 2) {
              res = fm.line + '<br />' + fm.bar
            } else {
              fm.line ? (res = fm.line) : ''
              fm.bar ? (res = fm.bar) : ''
            }
            return res
          }
        },
        grid: {
          containLabel: true,
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: [
          {
            position: 'right',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} 条'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} 条'
            },
            axisPointer: {
              label: {
                formatter: '{value} 条'
              }
            }
          }
        ],
        series: [
          {
            name: '全国总数据',
            data: lineData,
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            yAxisIndex: 1,
            color: colors[1]
          },
          {
            name: '较昨日',
            data: updateBarData,
            type: 'bar',
            color: colors[0]
          }
        ],
        legend: {
          data: ['全国总数据', '较昨日'],
          textStyle: {
            color: '#1c1c1c'
          },
          top: '0',
          left: '7%'
        }
      }
      const chart = this.$echarts.init(this.$refs.update)
      chart.setOption(option)
      this.$store.dispatch('setChartDOM', [chart])
      chart.getZr().on('click', params => {
        if (params.event.offsetY > 30) {
          const name = getEchartXAxisName(chart, params)
          this.$router.push({
            path: '/date',
            query: { name }
          })
        }
      })
    },
    async initBest() {
      const day = await getAllDayBest()
      const month = await getAllMonthBest()
      this.dayBest = day.data
      this.monthBest = month.data
    },
    getName(name) {
      this.$router.push({
        path: '/province',
        query: { name }
      })
      console.log(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .container {
    width: 100%;
    height: 65%;
    display: flex;
    .left {
      width: 45%;
      height: 120%;
      position: relative;
      transform: translateY(-10%);
      // transform: scale(1.1);
    }
    .right {
      width: 55%;
      height: auto;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      .main-card {
        width: auto;
        height: 50%;
        display: flex;
        padding: 20px 0 0 20px;
        .card {
          width: 50%;
          margin-right: 20px;
          border: 1px solid rgb(241, 241, 241);
          border-radius: 4px;
          box-shadow: 0px 0px 12px 1px #ddd;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-size: 22px;
            padding-left: 10px;
          }
          .province {
            font-size: 20px;
            padding-left: 10px;
          }
          .total {
            font-size: 18px;
            padding-left: 10px;
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
  }
  .bottom {
    width: auto;
    height: 35%;
  }
  .map-dialog {
    .wrap {
      min-height: 440px;
      .pos-select {
        position: absolute;
        top: 60px;
        right: 0px;
        opacity: 0;
        animation: show 0.5s;
        animation-delay: 2s;
        animation-fill-mode: forwards;
      }
      @keyframes show {
        0% {
          right: 0px;
          opacity: 0.5;
        }
        100% {
          right: 20px;
          opacity: 1;
        }
      }
      .c-h1 {
        font-size: 21px;
        margin-bottom: 17px;
      }
      .advantage {
        margin: 30px 0;
        display: flex;
        .adv-card {
          margin-right: 100px;
          display: flex;
          flex-direction: column;
          .top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            .container {
              padding-left: 10px;
              width: auto;
              height: 70px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              p {
                font-size: 20px;
                padding: 5px 0;
              }
            }
            .top-img {
              width: 70px;
              height: 70px;
            }
          }
          .bottom {
            text-align: center;
          }
        }
      }
    }
    .card {
      display: flex;
      margin-top: 30px;
      .card-item {
        flex: 1;
        margin-right: 20px;
        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          .card-li {
            margin: 10px 20px 0 0;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.card-li ::v-deep .el-button {
  background: rgba(224, 224, 224, 0.164);
}
.card-li ::v-deep span {
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
</style>

<style>
.el-popover {
  width: auto !important;
}
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  border-radius: 14px 5px 5px 5px;
  box-shadow: 0px 0px 4px 0px #ddd;
}

.el-dialog__body {
  overflow: auto;
}
</style>
