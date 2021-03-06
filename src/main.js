/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:24:18
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-04 16:42:49
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import IconSvg from '@/components/Icon-svg/index.vue'
import { getSessionId } from '@/utils/auth'
import * as filters from './filters'
import VuePreview from '@/components/Preview/plugins'
import VueLazyload from 'vue-lazyload'
import lazyLoadPic from '@/assets/lazyLoad@3x.png'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VuePreview)
Vue.use(VueLazyload, {
  /* error: errorPic,*/
  loading: lazyLoadPic
})
Vue.component('icon-svg', IconSvg)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getSessionId()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const rolesMap = ['global', 'admin']
          const roles = [(rolesMap[res.dataObject.isAdmin] || 'global')]
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.use(vm)
