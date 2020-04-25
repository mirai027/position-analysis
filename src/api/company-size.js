import request from './request'

// export function getAllCompanySize() {
//   return request({
//     url: '/CounterCompanyScale_Servlet',
//     methods: 'get'
//   })
// }
export function getAllCompanySize() {
  return request({
    url: '/company-size/all-company-size.json',
    method: 'get'
  })
}
