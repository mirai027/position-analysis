import request from './request'

export function getAllEduPos() {
  return request({
    url: 'edu-pos/all-edu-pos.json',
    methods: 'get'
  })
}

// export function getAllEduPos() {
//   return request({
//     url: '/CountryJobEdu_Top_Servlet',
//     methods: 'get'
//   })
// }
