import { getYesterday } from '@/utils/date'
const miraiTable = {
  state: {
    tableForm: {
      time: ['2020-02-19', getYesterday()],
      location: '中国',
      position: [
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
    },
    watchForm: false, // 用于每次点击提交时，让选项组件自动更新值
    tableCheckbox: {
      location: [],
      position: [],
      total: []
    }
  },
  mutations: {
    TABLE_FORM: (state, data) => {
      for (const key in data) {
        const element = data[key]
        state.tableForm[key] = element
      }
    },
    WATCH_FORM: (state) => {
      state.watchForm = !state.watchForm
    },
    TABLE_CHECKBOX: (state, ary) => {
      let defaultVal = ['日期', '地区', '岗位']

      // 如果不显示岗位相关信息，则不显示岗位列
      if (ary.key === 'position' && !ary.value.length) {
        defaultVal = ['日期', '地区']
      }

      const { tableCheckbox: tcb } = state
      tcb[ary.key] = [...ary.value]
      const { location, position } = tcb

      state.tableCheckbox.total = [...location, ...position, ...defaultVal]
    }
  },
  actions: {
    tableForm({ commit }, data) {
      commit('TABLE_FORM', data)
    },
    watchForm({ commit }) {
      commit('WATCH_FORM')
    },
    tableCheckbox({ commit }, ary) {
      commit('TABLE_CHECKBOX', ary)
    }
  },
  getters: {
    tableForm: (state) => state.tableForm,
    watchForm: (state) => state.watchForm,
    tableCheckboxTotal: (state) => state.tableCheckbox.total
  }
}
export default miraiTable
