/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:10:13
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-06 15:58:46
 */

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import qs from 'qs'
import store from '../store'

/* 防止重复提交，利用axios的cancelToken */
let cancelPromise
let requestPath = {}
const CancelToken = axios.CancelToken

/* 默认请求参数 */
// const defaultConfig = {
//   version: '1.0',
//   timestamp: new Date().getTime(),
//   reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
//   sign: '8F4C4A8E9D850EDD9692DE38723D0543'
// }

/* 创建axios实例 */
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  withCredentials: true,
  interceptors: true, // 是否开启response拦截器 默认true
  noAssign: false // 请求体是否带defaultConfig 默认false
  // timeout: 5000 // 请求超时时间
})

/* request拦截器 */
service.interceptors.request.use(config => {
  /* 发起请求时，取消掉当前正在进行的相同请求 */
  const dataMethod = config.method.toUpperCase() === 'POST' ? config.data.method : config.params.method
  const requestUrlAndMethod = (config.url.endsWith('/') ? config.url : `${config.url}/`) + dataMethod
  if (requestPath[requestUrlAndMethod]) {
    requestPath[requestUrlAndMethod]('取消重复请求')
    requestPath[requestUrlAndMethod] = cancelPromise
  } else {
    requestPath[requestUrlAndMethod] = cancelPromise
  }
  return config
}, error => {
  console.log('【REQUEST】' + error)
  Promise.reject(error)
})

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.msgCode) {
      return response
    }
    if (res.msgCode * 1 === 500) {
      MessageBox.confirm('登录状态已失效，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logOutMethod()
      })
    }
    // eslint-disable-next-line
    return Promise.reject('error')
  },
  error => {
    console.log('【response】' + error)
    if (error.message === '取消重复请求') {
      return Promise.reject(error)
    }
    Message({
      message: '连接服务器失败',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

/* 调用退出系统 */
const logOutMethod = () => {
  store.dispatch('FedLogOut').then(() => {
    // 为了重新实例化vue-router对象 避免bug
    location.reload()
  })
}

/* axios请求体包装 */
const responseMehod = (response, resolve, reject) => {
  const res = response.data
  if (!response.config.interceptors || res.success) {
    return resolve(res)
  }
  Message({
    message: res.msg || '未知错误，请联系管理员',
    type: 'error',
    duration: 5 * 1000
  })
  return reject('error')
}

const judgeMethod = (url, params, method = 'post') => {
  const requestBody = {
    method,
    url: `${url}`,
    cancelToken: new CancelToken(c => {
      cancelPromise = c
    })
  }
  if (method.toUpperCase() === 'POST') {
    requestBody.data = qs.stringify(params)
  } else {
    requestBody.params = params
  }
  return new Promise((resolve, reject) => {
    service(requestBody).then(response => {
      responseMehod(response, resolve, reject)
    })
  })
}

export const fetch = judgeMethod
