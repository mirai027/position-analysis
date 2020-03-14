import request from './request'

export function getAllEduPos() {
  return request({
    url: 'edu-pos/all-edu-pos.json',
    methods: 'get'
  })
}
