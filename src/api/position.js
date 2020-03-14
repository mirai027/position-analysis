import request from './request'

export function getAllDayPosition() {
  return request({
    url: 'position/all-day-position.json',
    methods: 'get'
  })
}

export function getAllMonthPosition() {
  return request({
    url: 'position/all-month-position.json',
    methods: 'get'
  })
}
