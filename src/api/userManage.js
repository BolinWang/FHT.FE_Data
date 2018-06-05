/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:35:15
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-04 16:09:17
 */

import { fetch } from '@/utils/fetch'

/* 重置密码、删除、新增、编辑 */
export function deleteDataApi(params = {}) {
  return fetch('user/delete', params)
}
export function addDataApi(params = {}) {
  return fetch('user/add', params)
}
export function updateUserApi(params = {}) {
  return fetch('user/updateUser', params)
}

/* 个人信息修改 */
export function modifyUserApi(params = {}) {
  return fetch('user/modifyUser', params)
}
