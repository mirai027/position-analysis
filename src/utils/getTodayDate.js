export default function getTodayDate() {
  const day = new Date()
  day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
  const today =
    day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
  return today
}
