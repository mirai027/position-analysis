/* eslint-disable no-prototype-builtins */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// import 'element-ui/lib/theme-chalk/index.css'

var echarts = require('echarts')

// require('echarts/lib/component/dataset')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// require('echarts/lib/chart/scatter')
// require('echarts/lib/chart/radar')
require('echarts/lib/chart/map')
// require('echarts/lib/chart/tree')
// require('echarts/lib/chart/treemap')
// require('echarts/lib/chart/graph')
// require('echarts/lib/chart/gauge')
// require('echarts/lib/chart/funnel')
// require('echarts/lib/chart/parallel')
// require('echarts/lib/chart/sankey')
// require('echarts/lib/chart/boxplot')
// require('echarts/lib/chart/candlestick')
// require('echarts/lib/chart/effectScatter')
require('echarts/lib/chart/lines')
require('echarts/lib/chart/heatmap')
// require('echarts/lib/chart/pictorialBar')
// require('echarts/lib/chart/themeRiver')
// require('echarts/lib/chart/sunburst')
// require('echarts/lib/chart/custom')
require('echarts/lib/component/grid')
// require('echarts/lib/component/polar')
// require('echarts/lib/component/geo')
// require('echarts/lib/component/singleAxis')
// require('echarts/lib/component/parallel')
// require('echarts/lib/component/calendar')
// require('echarts/lib/component/graphic')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/axisPointer')
// require('echarts/lib/component/brush')
require('echarts/lib/component/title')
// require('echarts/lib/component/timeline')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markArea')
// require('echarts/lib/component/legendScroll')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/dataZoomInside')
require('echarts/lib/component/dataZoomSlider')
require('echarts/lib/component/visualMap')
require('echarts/lib/component/visualMapContinuous')
require('echarts/lib/component/visualMapPiecewise')

Vue.prototype.$echarts = echarts

import '@babel/polyfill'

Vue.config.productionTip = false

import {
  Cascader,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  Progress,
  Row,
  Col,
  Popover,
  Button,
  RadioButton,
  RadioGroup,
  Switch,
  CheckboxGroup,
  CheckboxButton,
  Tooltip,
  Option,
  OptionGroup,
  DatePicker,
  Table,
  TableColumn,
  Loading,
  Collapse,
  CollapseItem,
  Select
} from 'element-ui'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Progress)
Vue.use(Loading.directive)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Select)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
