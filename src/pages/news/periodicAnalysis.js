// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import periodicAnalysis from './periodicAnalysis.vue'
import 'element-ui/lib/theme-default/index.css'
import http from '../../api/index.js'
import router from '../../router'
import cookie from '@/plugins/cookie.js'

Vue.config.productionTip = false

Vue.use(http)
Vue.use(cookie)
/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<periodicAnalysis/>',
  components: { periodicAnalysis }
})
