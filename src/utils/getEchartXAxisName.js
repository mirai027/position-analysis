/**
 * 获取 Echart 图表 xAxis 名称
 * @param {Object} instance Echart实例
 * @param {Object} params  echartsInstance.getZr().on('click' , params => {}) 获取的参数
 * @returns {string}
 */

export default function getEchartXAxisName(instance, params) {
  // 获取点击的像素坐标值
  const pointInPixel = [params.offsetX, params.offsetY]
  // 逆运算出逻辑坐标系上的点
  const pointInGrid = instance.convertFromPixel(
    { seriesIndex: 0 },
    pointInPixel
  )
  // x轴索引值
  const xIndex = pointInGrid[0]
  // 获取图表的option
  const op = instance.getOption()
  let name = '17张牌，你能秒我？'
  if (op.series[0].data[xIndex]) {
    name = op.series[0].data[xIndex].name
  }
  return name
}
