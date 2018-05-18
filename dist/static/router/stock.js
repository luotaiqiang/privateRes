import Vue from 'vue'
import Router from 'vue-router'
import STOCKINTRO from '@/components/pages/stock/stockIntro.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'stockintro' }
    },
    {
      path: '/stock/:stockcode',
      name: 'stockintro',
      components: {
        stockintro: STOCKINTRO
      }
    }
  ]
})
