import request from './request'

export function getAllCompanySize() {
  return request({
    url: 'company-size/all-company-size.json',
    methods: 'get'
  })
}