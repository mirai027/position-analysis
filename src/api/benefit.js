import request from './request'

export function getAllBenefit() {
  return request({
    url: '/CompanyWelfare_Servlet',
    method: 'get'
  })
}

// ***************************************** Mock Begin *****************************************

// export function getAllBenefit() {
//   return request({
//     url: '/benefit/all-benefit.json',
//     method: 'get'
//   })
// }

// ***************************************** Mock end *****************************************
