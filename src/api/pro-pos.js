import request from './request'

export function getProPos(pro, pos) {
  return request({
    url: '/province/pro-pos.json',
    method: 'get',
    data: {
      pro,
      pos
    }
  })
}
// export function getProPos(pro, pos) {
//   return request({
//     url: 'province/pro-pos.json',
//     method: 'post',
//     data: {
//       pro,
//       pos
//     }
//   })
// }

// export function postPosNum(pos) {
//   return request({
//     url: 'https://coderush.top',
//     method: 'post',
//     data: {
//       pos
//     }
//   })
// }
