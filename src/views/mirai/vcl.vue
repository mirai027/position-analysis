<template>
  <div class="vcl-container">
    <el-switch
      v-model="runFlag"
      active-text="开始"
      inactive-text="暂停"
      class="run"
      @click.native="handleRun"
    >
    </el-switch>
    <div class="title">
      <p class="sub-title">截止至当前时间招聘最火热的职位是:</p>
      <p v-if="data.length != 0">{{ data[data.length - 1].name }}</p>
    </div>
    <div class="chart">
      <p class="time">{{ dateList[index] }}</p>
      <div ref="vcl" class="vcl"></div>
    </div>
  </div>
</template>

<script>
import { getDateList, getDateBetween } from '@/utils/date'
export default {
  data() {
    return {
      vclData: [
        {
          name: '后端开发',
          data: [
            132,
            291,
            415,
            657,
            867,
            1050,
            1264,
            1502,
            1642,
            1882,
            2150,
            2430,
            2642,
            2891,
            3030,
            3240,
            3460,
            3601,
            3826,
            4109,
            4220,
            4459,
            4580,
            4769,
            5007,
            5303,
            5501,
            5646,
            5871,
            5988,
            6126,
            6248,
            6396,
            6667,
            6819,
            6950,
            7140,
            7368,
            7517,
            7800,
            7984,
            8234,
            8466,
            8597,
            8832,
            8995,
            9134,
            9396,
            9622,
            9798,
            9956,
            10091,
            10240,
            10383,
            10610,
            10735,
            11007,
            11110,
            11232
          ]
        },
        {
          name: '测试',
          data: [
            235,
            348,
            515,
            633,
            894,
            1050,
            1338,
            1635,
            1883,
            2140,
            2438,
            2699,
            2946,
            3215,
            3508,
            3705,
            3813,
            3944,
            4073,
            4242,
            4406,
            4679,
            4793,
            5005,
            5107,
            5336,
            5540,
            5762,
            5911,
            6084,
            6286,
            6464,
            6654,
            6875,
            7165,
            7269,
            7435,
            7604,
            7780,
            8064,
            8219,
            8404,
            8555,
            8752,
            8940,
            9109,
            9330,
            9595,
            9771,
            10049,
            10233,
            10344,
            10467,
            10635,
            10780,
            10967,
            11253,
            11469,
            11576
          ]
        },
        {
          name: '人工智能',
          data: [
            148,
            415,
            560,
            740,
            862,
            989,
            1162,
            1368,
            1589,
            1790,
            2057,
            2346,
            2578,
            2791,
            2976,
            3267,
            3551,
            3771,
            3921,
            4054,
            4278,
            4531,
            4780,
            5020,
            5226,
            5522,
            5772,
            5911,
            6015,
            6146,
            6400,
            6543,
            6799,
            7041,
            7234,
            7447,
            7686,
            7789,
            8079,
            8201,
            8339,
            8571,
            8852,
            9046,
            9261,
            9390,
            9559,
            9688,
            9946,
            10087,
            10219,
            10509,
            10792,
            11044,
            11178,
            11308,
            11418,
            11524,
            11810
          ]
        },
        {
          name: '移动前端开发',
          data: [
            198,
            342,
            463,
            700,
            880,
            1156,
            1418,
            1704,
            1945,
            2203,
            2316,
            2605,
            2855,
            3134,
            3323,
            3477,
            3748,
            4026,
            4315,
            4478,
            4728,
            4846,
            4996,
            5149,
            5350,
            5565,
            5836,
            6115,
            6344,
            6598,
            6870,
            7048,
            7185,
            7474,
            7644,
            7920,
            8115,
            8254,
            8387,
            8545,
            8741,
            9016,
            9149,
            9253,
            9403,
            9690,
            9973,
            10192,
            10430,
            10563,
            10845,
            10987,
            11266,
            11394,
            11637,
            11776,
            12071,
            12286,
            12495
          ]
        },
        {
          name: '运维',
          data: [
            108,
            229,
            491,
            788,
            1011,
            1196,
            1419,
            1571,
            1771,
            1937,
            2043,
            2301,
            2427,
            2646,
            2919,
            3183,
            3469,
            3596,
            3828,
            3948,
            4112,
            4391,
            4555,
            4735,
            4905,
            5116,
            5338,
            5501,
            5641,
            5900,
            6174,
            6357,
            6536,
            6798,
            7043,
            7149,
            7419,
            7558,
            7803,
            7937,
            8071,
            8239,
            8451,
            8676,
            8949,
            9199,
            9436,
            9700,
            9838,
            9954,
            10158,
            10400,
            10600,
            10711,
            10916,
            11025,
            11137,
            11321,
            11481
          ]
        },
        {
          name: '数据开发',
          data: [
            204,
            360,
            495,
            676,
            850,
            974,
            1182,
            1310,
            1487,
            1695,
            1888,
            2004,
            2113,
            2240,
            2508,
            2735,
            2987,
            3280,
            3482,
            3718,
            4010,
            4152,
            4298,
            4566,
            4727,
            4988,
            5193,
            5408,
            5703,
            5892,
            6004,
            6116,
            6393,
            6560,
            6677,
            6832,
            6944,
            7057,
            7242,
            7527,
            7805,
            7909,
            8107,
            8393,
            8635,
            8819,
            9102,
            9241,
            9358,
            9459,
            9618,
            9846,
            10122,
            10350,
            10631,
            10743,
            10947,
            11083,
            11246
          ]
        },
        {
          name: '前端开发',
          data: [
            146,
            318,
            617,
            732,
            997,
            1166,
            1427,
            1666,
            1865,
            2124,
            2387,
            2522,
            2720,
            2912,
            3167,
            3401,
            3688,
            3851,
            4004,
            4229,
            4488,
            4765,
            4896,
            5045,
            5164,
            5440,
            5687,
            5981,
            6127,
            6346,
            6573,
            6844,
            7002,
            7272,
            7542,
            7768,
            7929,
            8168,
            8322,
            8458,
            8726,
            9002,
            9241,
            9407,
            9554,
            9764,
            9934,
            10158,
            10407,
            10526,
            10712,
            10874,
            11064,
            11337,
            11484,
            11618,
            11762,
            12060,
            12275
          ]
        },
        {
          name: '高端技术职位',
          data: [
            267,
            451,
            638,
            889,
            1068,
            1289,
            1564,
            1700,
            1869,
            2082,
            2312,
            2537,
            2759,
            2991,
            3095,
            3246,
            3410,
            3628,
            3752,
            3990,
            4168,
            4434,
            4595,
            4855,
            5045,
            5270,
            5412,
            5534,
            5649,
            5773,
            5976,
            6092,
            6318,
            6603,
            6704,
            6966,
            7219,
            7450,
            7568,
            7806,
            7960,
            8134,
            8430,
            8564,
            8762,
            8940,
            9163,
            9294,
            9532,
            9704,
            10000,
            10251,
            10492,
            10746,
            10875,
            11099,
            11380,
            11482,
            11771
          ]
        },
        {
          name: '项目管理',
          data: [
            196,
            395,
            681,
            814,
            1040,
            1333,
            1627,
            1917,
            2171,
            2289,
            2453,
            2675,
            2965,
            3114,
            3307,
            3565,
            3802,
            3924,
            4198,
            4477,
            4584,
            4770,
            5042,
            5336,
            5548,
            5822,
            6095,
            6386,
            6509,
            6807,
            6908,
            7052,
            7188,
            7397,
            7673,
            7967,
            8124,
            8312,
            8561,
            8762,
            9001,
            9108,
            9256,
            9375,
            9521,
            9659,
            9828,
            9982,
            10093,
            10256,
            10478,
            10600,
            10790,
            10945,
            11089,
            11190,
            11414,
            11646,
            11922
          ]
        },
        {
          name: '硬件开发',
          data: [
            206,
            474,
            684,
            970,
            1168,
            1423,
            1611,
            1836,
            2082,
            2190,
            2444,
            2548,
            2744,
            2934,
            3194,
            3469,
            3572,
            3828,
            4111,
            4341,
            4506,
            4726,
            4853,
            5016,
            5131,
            5410,
            5581,
            5815,
            6027,
            6300,
            6504,
            6798,
            7004,
            7272,
            7453,
            7598,
            7752,
            7965,
            8070,
            8347,
            8497,
            8627,
            8729,
            8976,
            9184,
            9333,
            9477,
            9682,
            9925,
            10108,
            10252,
            10444,
            10672,
            10796,
            11017,
            11287,
            11502,
            11785,
            11893
          ]
        },
        {
          name: '企业软件',
          data: [
            262,
            380,
            515,
            802,
            1090,
            1352,
            1624,
            1776,
            1948,
            2112,
            2282,
            2496,
            2620,
            2914,
            3159,
            3330,
            3449,
            3580,
            3835,
            4126,
            4254,
            4500,
            4791,
            5069,
            5334,
            5593,
            5729,
            5947,
            6053,
            6180,
            6395,
            6579,
            6876,
            7106,
            7242,
            7401,
            7523,
            7797,
            8027,
            8193,
            8319,
            8472,
            8611,
            8737,
            8942,
            9218,
            9415,
            9682,
            9909,
            10028,
            10203,
            10455,
            10690,
            10887,
            11084,
            11376,
            11607,
            11761,
            11868
          ]
        },
        {
          name: '产品经理',
          data: [
            175,
            362,
            659,
            950,
            1138,
            1398,
            1504,
            1619,
            1772,
            1934,
            2070,
            2362,
            2499,
            2708,
            2971,
            3084,
            3337,
            3444,
            3559,
            3751,
            3899,
            4164,
            4388,
            4656,
            4869,
            5009,
            5173,
            5349,
            5463,
            5692,
            5861,
            6095,
            6206,
            6316,
            6418,
            6688,
            6804,
            7023,
            7180,
            7461,
            7611,
            7877,
            8148,
            8383,
            8587,
            8803,
            9029,
            9179,
            9318,
            9434,
            9680,
            9942,
            10098,
            10360,
            10559,
            10792,
            11065,
            11248,
            11518
          ]
        },
        {
          name: '运营',
          data: [
            221,
            488,
            614,
            766,
            1054,
            1157,
            1453,
            1739,
            2015,
            2204,
            2493,
            2763,
            3002,
            3135,
            3409,
            3614,
            3779,
            4072,
            4314,
            4558,
            4794,
            5078,
            5191,
            5479,
            5611,
            5730,
            5889,
            6063,
            6197,
            6439,
            6574,
            6816,
            7105,
            7369,
            7557,
            7743,
            7880,
            8020,
            8157,
            8412,
            8671,
            8941,
            9105,
            9381,
            9551,
            9671,
            9777,
            9900,
            10192,
            10414,
            10563,
            10855,
            11139,
            11248,
            11532,
            11727,
            11876,
            12078,
            12301
          ]
        }
      ],
      option: [],
      index: 0,
      data: [],
      positionList: [],
      positionColors: [], // 可合并，但太赶了下次再说
      lastData: [],
      dateList: [],
      timer: null,
      runFlag: false
    }
  },
  mounted() {
    /**
     * 后期可添加日期范围选择
     * 但日期数据搜索
     */
    this.ininChart()
  },
  methods: {
    getData(dataIndex) {
      // 获取索引的数据，用于更新图标数据
      const newData = this.vclData.map((item) => {
        return { name: item.name, value: item.data[dataIndex] }
      })
      // 图表数据排序
      this.data = newData.sort(function(a, b) {
        return a.value - b.value
      })

      // 图标 y轴名称随排序更换
      this.positionList = this.data.map((item) => {
        return item.name
      })
    },
    run(chart) {
      // 每次执行计算出相间的两组数据的数据差
      const oldData = this.data

      this.getData(++this.index)

      const newData = this.data
      const mirai = []
      for (let index = 0; index < newData.length; index++) {
        let speed = (newData[index].value - oldData[index].value) / 10
        speed = Math.round(speed)
        mirai.push({ name: newData[index].name, speed })
      }
      let insideIndex = 0
      console.log(3333333333)
      const insideTimer = setInterval(() => {
        insideIndex++
        // 获取每一秒各职位在一毫秒时的增速
        for (let index = 0; index < this.data.length; index++) {
          const speed = mirai.find((item) => {
            return item.name === this.data[index].name
          }).speed
          this.data[index].value += speed
        }

        // 图表数据排序
        this.data.sort(function(a, b) {
          return a.value - b.value
        })

        // 图标 y轴名称随排序更换
        this.positionList = this.data.map((item) => {
          return item.name
        })

        this.option = this.getOption(this.positionList, this.data)
        chart.setOption(this.option, this.data)

        /**
         * 每秒钟清除自身定时器
         * 如果到了最末尾的数据，设置当前数据为请求数据的最后一项（确保精度问题），并清空定时器
         */
        if (insideIndex === 10) {
          if (this.index === this.dateList.length - 1) {
            this.getData(this.dateList.length - 1)
            this.option = this.getOption(this.positionList, this.data)
            chart.setOption(this.option, this.data)

            // 重置开关状态
            this.runFlag = false
            clearInterval(this.timer)
          }
          clearInterval(insideTimer)
        }
      }, 100)
    },
    getOption(positionList, data) {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          axisPointer: {
            type: 'cross',
            label: {
              precision: '0'
            }
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: true,
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 18,
            color: (params) => {
              const name = params
              const color = this.positionColors.find(
                (item) => item.name === name
              ).color
              return color
            }
          },
          data: positionList
        },
        series: [
          {
            name: this.dateList[0],
            type: 'bar',
            data: data,
            barMaxWidth: 21,
            label: {
              show: true,
              position: 'insideRight',
              fontSize: 21,
              offset: [0, -10],
              formatter: function(params) {
                const { name, value } = params
                return `${name}: ${value} 条`
              }
            },
            itemStyle: {
              barBorderRadius: [0, 7, 7, 0],
              color: (params) => {
                const { name } = params
                const color = this.positionColors.find(
                  (item) => item.name === name
                ).color
                return color
              }
            }
          }
        ]
      }
    },
    handleRun() {
      const chart = this.$echarts.init(this.$refs.vcl)
      if (this.index === this.dateList.length - 1) {
        this.index = 0
        this.ininChart()
      }
      if (this.runFlag) {
        this.timer = setInterval(() => {
          this.run(chart)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    ininChart() {
      // 获取昨天到 2020-02-19相隔多少天
      const dateNum = getDateBetween('2020-02-19', getDateList())

      // 获取昨天到 2020-02-19的日期
      const dateList = getDateList(dateNum + 1).reverse()

      this.dateList = dateList

      /**
       * 根据传入的索引获取对应索引（日期）的数据的函数
       */
      // 根据传入的索引获取对应索引（日期）的数据
      this.getData(this.index)

      const chart = this.$echarts.init(this.$refs.vcl)

      this.positionColors = this.positionList.map((item) => {
        const color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)})`
        return { name: item, color }
      })

      // 更新 option里的数据的函数

      // 更新 option里的数据
      this.option = this.getOption(this.positionList, this.data)

      // 渲染图表
      chart.setOption(this.option, this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.vcl-container {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  .run {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .title {
    padding: 10px 20px;
    font-size: 24px;
    display: flex;
    align-items: flex-end;
    color: #606266;
    .sub-title {
      font-size: 20px;
      color: #909399;
      margin-right: 10px;
    }
  }
  .chart {
    flex: 1;
    position: relative;
    .vcl {
      width: 100%;
      height: 100%;
    }
    .time {
      position: absolute;
      right: 40px;
      bottom: 50px;
      font-size: 37px;
    }
  }
}
</style>
