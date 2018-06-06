/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:09:27
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-06 15:48:19
 */

import { login, logout, getInfo } from '@/api/login'
import {
  getSessionId, setSessionId, removeSessionId,
  getUserId, removeUserId, setUserId
} from '@/utils/auth'
import defaultAvatar from '@/assets/defaultAvatar.png'

const user = {
  state: {
    sessionId: getSessionId(),
    userId: getUserId(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      const rolesMap = ['global', 'admin']
      state.roles = rolesMap[roles] || 'global'
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        login(mobile, userInfo.password).then(response => {
          const data = response.dataObject || {}
          setSessionId(data.sessionId)
          setUserId(data.userId)
          commit('SET_SESSIONID', data.sessionId)
          commit('SET_USERID', data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(getUserId()).then(response => {
          const data = response.dataObject || {}
          commit('SET_ROLES', data.isAdmin)
          commit('SET_NAME', data.nickName)
          commit('SET_AVATAR', data.picUrl || defaultAvatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeSessionId()
          removeUserId()
          commit('SET_SESSIONID', '')
          commit('SET_USERID', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeSessionId()
        removeUserId()
        commit('SET_SESSIONID', '')
        commit('SET_USERID', '')
        resolve()
      })
    }
  }
}

export default user
