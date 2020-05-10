import request from './request'

export function getAllEduPos() {
  return request({
    url: '/CountryJobEdu_Top_Servlet',
    methods: 'get'
  })
}

// ***************************************** Mock begin *****************************************

// export function getAllEduPos() {
//   return request({
//     url: '/edu-pos/all-edu-pos.json',
//     method: 'get'
//   })
// }

// ***************************************** Mock End *****************************************
