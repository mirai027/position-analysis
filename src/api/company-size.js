import request from './request'

export function getAllCompanySize() {
  return request({
    url: '/CompanySize_Servlet',
    method: 'get'
  })
}

// ***************************************** Mock begin *****************************************

// export function getAllCompanySize() {
//   return request({
//     url: '/company-size/all-company-size.json',
//     method: 'get'
//   })
// }

// ***************************************** Mock end *****************************************
