import axios from 'axios'

/**
 * 设置默认地址
 * 设置超时时间
 * 设置请求头 Content-Type
 * 设置跨域是否允许带凭证
 */
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

// /**
//  * 根据环境变量区分接口默认地址
//  */
// switch (process.env.NODE_ENV) {
//   case 'production':
//     service.defaults.baseURL = './mock/'
//     // axios.defaults.baseURL = '/api'
//     break
//   case 'development':
//     // service.defaults.baseURL = '/api'
//     service.defaults.baseURL = './mock/'
//     break
// }

// service.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'
/**
 * 设置请求拦截器
 * Token校验
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 设置响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg))
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
