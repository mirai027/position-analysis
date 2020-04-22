import request from '../request'

export function getPositionHeatmap(loc = '前端开发', pos = '广东省') {
  return request({
    url: 'mirai-position/heatmap.json',
    method: 'get',
    params: {
      loc,
      pos
    }
  })
}
