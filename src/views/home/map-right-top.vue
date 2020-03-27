<template>
  <div class="map-r-t-container">
    <div v-for="(allItem, allIdx) in pct" :key="allIdx" class="list-container">
      <div class="list-title">{{ allItem.title }}榜</div>
      <div
        v-for="(item, idx) in allItem.data"
        :key="idx"
        class="list"
        @click="handleSelect(item, allIdx)"
      >
        <p class="item-name" style="font-size: 12px;">{{ item.rank }}</p>
        <p :class="['item-name pos-name', { 'active-text': item.isSelect }]">
          {{ item.name }}
        </p>
        <p class="item-num">
          <span style="font-size: 12px;">{{ allItem.title }}</span>
          {{ item.num }}
        </p>
      </div>
      <el-progress
        type="circle"
        :width="60"
        :percentage="pctNum[allIdx].num"
        class="pct"
        :color="allItem.color"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pctNum: [{ num: 0 }, { num: 0 }],
      pct: [
        {
          title: '总量',
          data: [
            {
              rank: 'TOP1',
              name: '广东省',
              num: 2489
            },
            {
              rank: 'TOP2',
              name: '上海市',
              num: 2189
            },
            {
              rank: 'TOP3',
              name: '浙江省',
              num: 1789
            }
          ]
        },
        {
          title: '新增',
          data: [
            {
              rank: 'TOP1',
              name: '江苏省',
              num: 489
            },
            {
              rank: 'TOP2',
              name: '广东省',
              num: 389
            },
            {
              rank: 'TOP3',
              name: '浙江省',
              num: 289
            }
          ]
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.getPctNum(0)
      this.getPctNum(1)
    }, 1000)
  },
  created() {
    this.pct.forEach((element, index) => {
      index === 0 ? (element.color = '#409EFF') : (element.color = '#67C23A')
      element.data.forEach((el, idx) => {
        idx === 0 ? (el.isSelect = true) : (el.isSelect = false)
      })
    })
  },
  methods: {
    handleSelect(item, pctAllIdx) {
      // $set数据更新试图不更新，看不懂
      // this.$set(item, 'isSelect', !item.isSelect)
      this.$forceUpdate()
      item.isSelect = !item.isSelect
      // console.log(pctAllIdx)
      this.getPctNum(pctAllIdx)
    },
    getPctNum(pctAllIdx) {
      // watch没办法监听到数组对象的变化, 即使使用了 deep:true.
      // 因每次点击都会重新计算, 所以使用了当前新加一个方法的方法
      let count = 0
      this.pct[pctAllIdx].data.forEach(el => {
        if (el.isSelect) {
          count += el.num
        }
      })
      this.pctNum[pctAllIdx].num = count / 100
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin top-line($color) {
  &::before {
    content: '';
    width: 15px;
    height: 2px;
    background: $color;
    position: absolute;
    top: -5px;
    left: 0;
  }
}
.map-r-t-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-around;
  .list-container {
    display: flex;
    align-items: center;
    &:nth-child(1) {
      margin-left: 25px;
    }
    &:nth-child(2) {
      margin-left: 50px;
    }
    &:nth-child(1) .list-title {
      @include top-line($color: #409eff);
    }
    &:nth-child(2) .list-title {
      @include top-line($color: #67c23a);
    }
    .list-title {
      font-size: 14px;
      line-height: 16px;
      width: 10px;
      margin-right: 4px;
      position: relative;
    }
    .list {
      text-align: center;
      margin-left: 15px;
      cursor: pointer;
      color: #303133;
      .pos-name {
        padding: 3px 0;
      }
      &:hover .pos-name {
        color: #409eff;
      }
      .active-text {
        color: #409eff;
      }
    }
    .list:not(.active-text):hover .active-text {
      color: #303133;
    }
    .pct {
      margin-left: 15px;
    }
  }
}
</style>
