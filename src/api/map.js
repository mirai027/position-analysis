import request from './request'

export function getAllProvince() {
  return request({
    url: 'map/all-day-province.json',
    methods: 'get'
  })
}

export function getAllUpdate() {
  return request({
    url: 'map/all-update.json',
    methods: 'get'
  })
}

// export function getAllDayBest() {
//   return request({
//     url: 'map/all-day-best.json',
//     methods: 'get'
//   })
// }

// export function getAllMonthBest() {
//   return request({
//     url: 'map/all-month-best.json',
//     methods: 'get'
//   })
// }

// export function getAllProvince() {
//   return request({
//     url: '/AllProvince_Job_Servlet',
//     methods: 'get'
//   })
// }

// export function getAllUpdate() {
//   return request({
//     url: '/AllProvince_DayJob_Servlet',
//     methods: 'get'
//   })
// }

// export function getAllDayBest() {
//   return request({
//     url: 'map/all-day-best.json',
//     methods: 'get'
//   })
// }

// export function getAllMonthBest() {
//   return request({
//     url: 'map/all-month-best.json',
//     methods: 'get'
//   })
// }
