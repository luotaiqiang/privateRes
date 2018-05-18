import Vue from 'vue'
import Router from 'vue-router'
import Initial from '@/components/pages/hangqing/hqzx/initial'
import Shyl from '@/components/pages/hangqing/hqzx/shyl'
import Basic from '@/components/pages/hangqing/hqzx/basic'
import Diff from '@/components/pages/hangqing/hqzx/diff'
import Rank from '@/components/pages/hangqing/hqzx/rank'
import Shares from '@/components/pages/hangqing/hqzx/shares'
import Billboard from '@/components/pages/hangqing/hqzx/billboard'
import AhPremium from '@/components/pages/hangqing/hqzx/ahPremium'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Initial',
      name: 'Initial',
      component: Initial
    },
    {
      path: '/Shyl',
      name: 'Shyl',
      component: Shyl
    },
    {
      path: '/Basic/:type/:sortRule',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/Diff/:type/:sortRule',
      name: 'Diff',
      component: Diff
    },
    {
      path: '/Rank/:type/:sortRule',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/Shares',
      name: 'Shares',
      component: Shares
    },
    {
      path: '/Billboard',
      name: 'Billboard',
      component: Billboard
    },
    {
      path: '/AhPremium',
      name: 'AhPremium',
      component: AhPremium
    }
  ]
})
