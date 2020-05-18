import request from './request'

export function getPositionHeatmap({
  region = '广东省',
  level = 2,
  position = '后端开发'
}) {
  return request({
    url: '/Exp_Scalary_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position
    }
  })
}

export function getCompanySize({
  region = '广东省',
  level = 2,
  position = '后端开发'
}) {
  return request({
    url: '/CompanySize_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position
    }
  })
}

export function getEducation({
  region = '广东省',
  level = 2,
  position = '后端开发'
}) {
  return request({
    url: '/EduInfo_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position
    }
  })
}

export function getBenefit({
  region = '广东省',
  level = 2,
  position = '后端开发'
}) {
  return request({
    url: '/CompanyWelfare_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position
    }
  })
}

export function getFinanceStage({
  region = '广东省',
  level = 2,
  position = '后端开发'
}) {
  return request({
    url: '/CompanyFinance_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position
    }
  })
}

export function getPosition({
  region = '广东省',
  level = 2,
  position = '后端开发',
  type = 'Month'
}) {
  return request({
    url: '/CountryJob_DayTop_Servlet',
    method: 'get',
    params: {
      region,
      level,
      position,
      type
    }
  })
}

// ***************************************** Mock Begin *****************************************

// export function getPositionHeatmap(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/heat-map.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// export function getCompanySize(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/company-size.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// export function getEducation(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/education.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// export function getBenefit(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/benefit.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// export function getFinanceStage(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/financeStage.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// export function getPosition(region = '后端开发', position = '广东省', level) {
//   return request({
//     url: '/mirai-position/position.json',
//     method: 'get',
//     params: {
//       region,
//       position,
//       level
//     }
//   })
// }

// ***************************************** Mock End *****************************************
