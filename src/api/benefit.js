import request from './request'

export function getAllBenefit() {
  return request({
    url: '/benefit/all-benefit.json',
    method: 'get'
  })
}
