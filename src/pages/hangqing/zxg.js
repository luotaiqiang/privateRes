// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Zxg from './zxg.vue'
import router from '../../router/'
import store from '../../vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import cookie from '@/plugins/cookie.js'
import http from '../../api/index.js'
import filters from '../../filters/index.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(http)
Vue.use(ElementUI)
Vue.use(cookie)
/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  store,
  template: '<Zxg/>',
  components: { Zxg }
})
