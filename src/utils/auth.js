/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:10:05
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-06 15:46:39
 */

import Cookies from 'js-cookie'

const SessionIdKey = 'Data-Center-SessionId'
const userIdKey = 'Data-Center-userId'

export function getSessionId() {
  return Cookies.get(SessionIdKey)
}

export function setSessionId(sessionId) {
  return Cookies.set(SessionIdKey, sessionId)
}

export function removeSessionId() {
  return Cookies.remove(SessionIdKey)
}
export function getUserId() {
  return Cookies.get(userIdKey)
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}
