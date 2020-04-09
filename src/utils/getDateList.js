/**
 * 获取前 num 天的日期（不包括今天）
 * @param {Number} 获取的时间天数
 * @returns {Array} 时间格式为 YYYY-MM-DD
 */

export default function getDateList(num) {
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
