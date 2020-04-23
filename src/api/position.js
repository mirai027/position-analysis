import request from './request'

/**
 * 暂时性使用固定参数，后续看要求可改成 ...args
 */

export function getPositionHeatmap(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/heat-map.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}

export function getCompanySize(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/company-size.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}

export function getEducation(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/education.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}

export function getBenefit(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/benefit.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}

export function getFinanceStage(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/financeStage.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}

export function getPosition(region = '前端开发', position = '广东省') {
  return request({
    url: 'mirai-position/position.json',
    method: 'get',
    params: {
      region,
      position
    }
  })
}
