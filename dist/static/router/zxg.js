import Vue from 'vue'
import Router from 'vue-router'
import Download from '@/pages/others/download'
import Account from '@/pages/others/account'
import Hall from '@/pages/others/hall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hangqing/Download',
      name: 'Download',
      component: Download
    },
    {
      path: '/hangqing/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/hangqing/Hall',
      name: 'Hall',
      component: Hall
    }
  ]
})
