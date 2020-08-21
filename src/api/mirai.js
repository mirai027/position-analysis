import request from './request'

export function getLanguage() {
  return request({
    url: '/Language_Servlet',
    method: 'get'
  })
}
export function getDateListData({
  time = ['2020-03-30', '2020-03-31', '2020-04-01', '2020-04-02'], position
}) {
  return request({
    url: '/CountryDatePosition',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      //暂时只有这四天的数据
      time,
      position
    }
  })
}
export function getTableData() {
  request({
    url: '/TableEnd_Servlet',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      time: ['2020-03-30', '2020-03-31', '2020-04-01', '2020-04-02'],
      location: {
        level1: ['中国'],
        level2: ['广东省', '广西省'],
        level3: ['广州市']
      },
      position: '后端开发、测试、人工智能、移动前端开发'
    }
  })
}

// Test
// request({
//   url: '/CountryDate_Job_Servlet',
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   data: {
//     time: ['2020-04-08', '2020-04-07', '2020-04-06', '2020-04-05'],
//     location: {
//       level1: ['中国'],
//       level2: ['广东省', '广西省'],
//       level3: ['广州市']
//     },
//     position: '后端开发、测试、人工智能、移动前端开发'
//   }
// })
