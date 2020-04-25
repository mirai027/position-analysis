import request from './request'

export function getAllProvince() {
  return request({
    url: '/map/all-day-province.json',
    method: 'get'
  })
}

export function getAllUpdate() {
  return request({
    url: '/map/all-update.json',
    method: 'get'
  })
}

// export function getAllDayBest() {
//   return request({
//     url: 'map/all-day-best.json',
//     method: 'get'
//   })
// }

// export function getAllMonthBest() {
//   return request({
//     url: 'map/all-month-best.json',
//     method: 'get'
//   })
// }

// export function getAllProvince() {
//   return request({
//     url: '/AllProvince_Job_Servlet',
//     method: 'get'
//   })
// }

// export function getAllUpdate() {
//   return request({
//     url: '/AllProvince_DayJob_Servlet',
//     method: 'get'
//   })
// }

// export function getAllDayBest() {
//   return request({
//     url: 'map/all-day-best.json',
//     method: 'get'
//   })
// }

// export function getAllMonthBest() {
//   return request({
//     url: 'map/all-month-best.json',
//     method: 'get'
//   })
// }
