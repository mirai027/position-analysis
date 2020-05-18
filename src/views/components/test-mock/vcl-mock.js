import { getDateList, getDateBetween } from '@/utils/date'
// 获取昨天到 2020-02-19相隔多少天
const dateNum = getDateBetween('2020-02-19', getDateList())

// 获取昨天到 2020-02-19的日期
const dateList = getDateList(dateNum + 1).reverse()

const positionList = [
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

const mirai = positionList.map((item) => {
  let num = 0
  const data = dateList.map(() => {
    num += Math.round(Math.random() * 20000 + 100)
    return num
  })
  return { name: item, data }
})

console.log({
  success: true,
  msg: null,
  code: 200,
  data: mirai
})

export default {
  success: true,
  msg: null,
  code: 200,
  data: mirai
}
