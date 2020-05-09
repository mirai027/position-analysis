import request from './request'

export function getAllBenefit() {
  return request({
    url: '/CompanyWelfare_Servlet',
    method: 'get'
  })
}
