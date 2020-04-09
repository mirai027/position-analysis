/**
 * 获取昨天的日期
 * @returns {string} 时间格式为 YYYY-MM-DD
 */

export default function getYesterday() {
  let yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  let month = yesterday.getMonth() + 1
  month < 10 && (month = `0${month}`)
  let day = yesterday.getDate()
  day < 10 && (day = `0${day}`)
  yesterday = `${yesterday.getFullYear()}-${month}-${day}`
  return yesterday
}
