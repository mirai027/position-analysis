import request from './request'

/**
 * 暂时性使用固定参数，后续看要求可改成 ...args
 */

export function getPositionHeatmap(loc = '前端开发', pos = '广东省') {
  return request({
    url: 'mirai-position/heat-map.json',
    method: 'get',
    params: {
      loc,
      pos
    }
  })
}

export function getCompanySize(loc = '前端开发', pos = '广东省') {
  return request({
    url: 'mirai-position/company-size.json',
    method: 'get',
    params: {
      loc,
      pos
    }
  })
}

export function getEducation(loc = '前端开发', pos = '广东省') {
  return request({
    url: 'mirai-position/education.json',
    method: 'get',
    params: {
      loc,
      pos
    }
  })
}

export function getBenefit(loc = '前端开发', pos = '广东省') {
  return request({
    url: 'mirai-position/benefit.json',
    method: 'get',
    params: {
      loc,
      pos
    }
  })
}
