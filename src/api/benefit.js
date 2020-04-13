import request from './request'

// export function getAllBenefit() {
//   return request({
//     url: '/CountryJobWelfare_Servlet',
//     methods: 'get'
//   })
// }

export function getAllBenefit() {
  return request({
    url: 'benefit/all-benefit.json',
    methods: 'get'
  })
}

// request({
//   url: '/api/TableEnd_Servlet',
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   data: {
//     time: ['2020-04-08', '2020-04-07', '2020-04-06', '2020-04-05'],
//     location: {
//       level1: ['中国'],
//       level2: ['广东省', '广西省'],
//       level3: ['广州市']
//     },
//     position: '后端开发、测试、人工智能、移动前端开发'
//   }
// })

// request({
//   url: '/api/AllProvinceJob_DayTop_Servlet',
//   method: 'post',
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded'
//   },
//   data: {
//     date: '2020-04-01'
//   }
// })

// request({
//   url: '/api/TableEnd_Servlet',
//   method: 'post',
//   params: {
//     time: ['2020-04-08', '2020-04-07', '2020-04-06', '2020-04-05'],
//     location: {
//       level1: ['中国'],
//       level2: ['广东省', '广西省'],
//       level3: ['广州市']
//     },
//     position: '后端开发、测试、人工智能、移动前端开发'
//   },
//   paramsSerializer: params => {
//     return qs.stringify(params, { indices: false })
//   }
// })
