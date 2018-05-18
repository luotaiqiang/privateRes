// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Stock from './stock.vue'
import router from '../../router/stock.js'
import G2 from '@antv/g2'
import 'element-ui/lib/theme-default/index.css'
import http from '../../api/index.js'
import filters from '../../filters/index.js'
import cookie from '@/plugins/cookie.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(http)
Vue.use(cookie)
Vue.use(G2)
/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<Stock/>',
  components: { Stock }
})

