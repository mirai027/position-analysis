/**
 * 获取前 num 天的日期（不包括今天）
 * 默认获取昨天日期
 * @param {Number} 获取的时间天数
 * @returns {Array} 时间格式为 YYYY-MM-DD
 */

export function getDateList(num) {
  const dateList = [...Array(num).keys()].map((days) => {
    const t = new Date(Date.now() - 24 * 60 * 60 * 1000 * (days + 1))
    let month = t.getMonth() + 1
    month < 10 && (month = `0${month}`)
    let day = t.getDate()
    day < 10 && (day = `0${day}`)
    const date = `${t.getFullYear()}-${month}-${day}`
    return date
  })
  return dateList
}

/**
 * 获取两个日期的间隔天数
 * @param {string} star 起始日 YYYY-MM-DD
 * @param {string} end 结束日 YYYY-MM-DD
 * @returns {Number}
 */

export function getDateBetween(star, end) {
  var startDate = Date.parse(star)
  var endDate = Date.parse(end)
  var day = (endDate - startDate) / (24 * 60 * 60 * 1000)
  return day
}

/**
 * 获取昨天的日期
 * @returns {string} 时间格式为 YYYY-MM-DD
 */

export function getYesterday() {
  let yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  let month = yesterday.getMonth() + 1
  month < 10 && (month = `0${month}`)
  let day = yesterday.getDate()
  day < 10 && (day = `0${day}`)
  yesterday = `${yesterday.getFullYear()}-${month}-${day}`
  return yesterday
}
