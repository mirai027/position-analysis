/**
 * 获取两个日期的间隔天数
 * @param {string} star 起始日 YYYY-MM-DD
 * @param {string} end 结束日 YYYY-MM-DD
 * @returns {Number}
 */

export default function getDayBetween(star, end) {
  var startDate = Date.parse(star)
  var endDate = Date.parse(end)
  var day = (endDate - startDate) / (24 * 60 * 60 * 1000)
  return day
}
