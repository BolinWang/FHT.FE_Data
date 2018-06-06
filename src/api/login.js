/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:33:06
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-06 15:47:28
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export function login(mobile, password) {
  return fetch('login', {
    userName: mobile,
    password
  })
}

/* 获取用户信息 */
export function getInfo(userId) {
  return fetch('user/findOne', {
    userId
  })
}

/* 退出系统 */
export function logout(params = {}) {
  return fetch('logout', {
    params
  })
}
