import axios from 'axios'

const service = axios.create({})

/**
 * 根据环境变量区分接口默认地址
 */
switch (process.env.NODE_ENV) {
  case 'production':
    service.defaults.baseURL = './mock/'
    // axios.defaults.baseURL = 'https://coderush.top/xxx/'
    break
  case 'development':
    service.defaults.baseURL = './mock/'
    break
}

/**
 * 设置超时时间和跨域是否允许带凭证
 */
service.defaults.timeout = 10000
service.defaults.withCredentials = true

/**
 * 设置请求拦截器
 * Token校验
 */
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 设置响应拦截器
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg))
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
