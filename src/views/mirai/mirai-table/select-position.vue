<template>
  <el-tooltip :content="hoverText" placement="top">
    <el-select
      v-model="value"
      :multiple="true"
      collapse-tags
      placeholder="请选择"
      :filterable="true"
      :clearable="true"
      size="small"
      @change="changeVal"
      @visible-change="handleSelect"
    >
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :value="item.value"
        >
        </el-option>
      </el-option-group>
    </el-select>
  </el-tooltip>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      options: [
        {
          options: [
            {
              value: '我全都要'
            }
          ]
        },
        {
          label: '热门岗位',
          options: [
            {
              value: '后端开发'
            },
            {
              value: '测试'
            },
            {
              value: '人工智能'
            }
          ]
        },
        {
          label: '岗位名',
          options: [
            {
              value: '移动前端开发'
            },
            {
              value: '运维'
            },
            {
              value: '数据开发'
            },
            {
              value: '前端开发'
            },
            {
              value: '高端技术职位'
            },
            {
              value: '项目管理'
            },
            {
              value: '硬件开发'
            },
            {
              value: '企业软件'
            },
            {
              value: '产品经理'
            },
            {
              value: '运营'
            }
          ]
        }
      ],
      value: [
        '我全都要',
        '后端开发',
        '测试',
        '人工智能',
        '移动前端开发',
        '运维',
        '数据开发',
        '前端开发',
        '高端技术职位',
        '项目管理',
        '硬件开发',
        '企业软件',
        '产品经理',
        '运营'
      ],
      oldValue: [
        '我全都要',
        '后端开发',
        '测试',
        '人工智能',
        '移动前端开发',
        '运维',
        '数据开发',
        '前端开发',
        '高端技术职位',
        '项目管理',
        '硬件开发',
        '企业软件',
        '产品经理',
        '运营'
      ],
      hoverText:
        '后端开发、测试、人工智能、移动前端开发、运维、数据开发、前端开发、高端技术职位、项目管理、硬件开发、企业软件、产品经理、运营'
    }
  },
  computed: {
    ...mapGetters(['tableForm', 'watchForm'])
  },
  watch: {
    watchForm: {
      handler() {
        this.value = this.tableForm.position
        this.oldValue = this.tableForm.position
      }
    }
  },
  methods: {
    changeVal(val) {
      const allKey = [
        '我全都要',
        '后端开发',
        '测试',
        '人工智能',
        '移动前端开发',
        '运维',
        '数据开发',
        '前端开发',
        '高端技术职位',
        '项目管理',
        '硬件开发',
        '企业软件',
        '产品经理',
        '运营'
      ]
      const nowFlag = val.some((item) => {
        return item === '我全都要'
      }) // 当前是否包含 全选
      const oldFlag = this.oldValue.some((item) => {
        return item === '我全都要'
      }) // 上一次是否包含 全选
      /**
       * 声明 oldValue来存储上一次的值。用来比较与上一次的变化，来判断点击的选项是否是全选
       * 当前有全选，上一次有全选。说明此次点击的是其他选项，即此次设置取消全选，点击的选项 "自适应"
       * 当前有全选，上一次没有全选。说明点击的是全选，即此次设置全选
       * 当前没全选，上一次有全选。说明此次点击的是全选，即此次设置全部不选
       * 当前没有全选，上一次没有全选。如当前 val.length === 13，此次设置全选。否则点击的选项 "自适应"
       */
      // 优化前
      // if (nowFlag && !oldFlag) {
      //   this.value = allKey
      // }
      // if (nowFlag && oldFlag) {
      //   this.value.splice(0, 1)
      // }
      // if (!nowFlag && oldFlag) {
      //   this.value = []
      // }
      // if (!nowFlag && !oldFlag) {
      //   if (val.length === 13) {
      //     this.value = allKey
      //   }
      // }
      nowFlag && oldFlag && this.value.splice(0, 1)
      nowFlag && !oldFlag && (this.value = allKey)
      !nowFlag && oldFlag && (this.value = [])
      !nowFlag && !oldFlag && val.length === 13 && (this.value = allKey)
      this.oldValue = this.value

      let text = ''
      this.value.forEach((element) => {
        element !== '我全都要' && (text += element + '、')
      })
      this.hoverText = text.substring(0, text.length - 1)

      this.$store.dispatch('tableForm', {
        position: this.value
      })
      // if (nowFlag) {
      //   if (oldFlag) {
      //     this.value.splice(0, 1)
      //   } else {
      //     this.value = allKey
      //   }
      // } else {
      //   if (oldFlag) {
      //     this.value = []
      //   } else {
      //     if (val.length === 13) {
      //       this.value = allKey
      //     }
      //   }
      // }
      // this.oldValue = this.value
    },
    handleSelect(flag) {
      // console.log(this.value)
      // console.log(flag)
    }
  }
}
</script>

<style></style>
