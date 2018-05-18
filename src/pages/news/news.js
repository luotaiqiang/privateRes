// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import News from './news.vue'
import router from '../../router'
import 'element-ui/lib/theme-default/index.css'
// import raty from 'raty'
import http from '../../api/index.js'
import cookie from '@/plugins/cookie.js'

Vue.config.productionTip = false
Vue.use(http)
Vue.use(cookie)
// Vue.use(raty)
/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<News/>',
  components: { News }
})
