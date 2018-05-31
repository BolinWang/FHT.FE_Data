/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:07:11
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-05-31 15:41:52
 */

import Vue from 'vue'
import Router from 'vue-router'
import '../icons'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * icon : slider图标
 * hidden : 菜单隐藏
 * redirect : ‘noRedirect’ 面包屑链接配置
 * noDropdown : ’noDropdown:true‘ 下拉菜单
 * meta : ‘{ role: ['admin'] }‘ 权限
 */

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
}, {
  path: '/404',
  component: _import('404'),
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: '/dashboard',
  icon: 'dashboard',
  noDropdown: true,
  children: [{
    name: '首页',
    path: 'dashboard',
    component: _import('dashboard/index')
  }]
}]

export default new Router({
  /* mode: 'history', //需要服务器配置路由 */
  scrollBehavior: () => ({
    y: 0
  }), // 后退后页面位置
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/example',
  component: Layout,
  redirect: 'noredirect',
  name: '示例',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  children: [{
    path: 'image',
    component: _import('example/image'),
    name: '图片组件'
  }, {
    path: 'grid',
    component: _import('example/tablePagenation'),
    name: '表格组件'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_register'),
    name: '注册数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_customer'),
    name: '租客数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_message'),
    name: '短信数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_house'),
    name: '房源数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_contract'),
    name: '合同数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_payMoney'),
    name: '交易额数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_fhAccount'),
    name: '复恒公账数据'
  }]
}, {
  path: '/dataViews',
  component: Layout,
  redirect: 'noredirect',
  icon: 'example',
  meta: {
    role: ['admin', 'global']
  },
  noDropdown: true,
  children: [{
    path: 'register',
    component: _import('dataViews/data_gateLock'),
    name: '门锁数据'
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]
