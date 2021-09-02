import Vue from 'vue'
import Router from 'vue-router'
import index from '@/iview/index'
import login from '@/iview/login'
import chpassword from '@/iview/chpassword'
// import first from '@/iview/path1/first'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'chpassword',
      path: '/chpassword',
      component: chpassword
    },
    {
      name: '首页',
      path: '/',
      component: index,
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('@/iview/home/index.vue')
        },
        {
          name: 'establish',
          path: 'establish',
          component: () => import('@/iview/establish/establish.vue') // 商城建站
        },
        {
          name: 'Payment',
          path: 'Payment',
          component: () => import('@/iview/establish/Payment.vue') // 支付管理
        },
        {
          name: 'logistics',
          path: 'logistics',
          component: () => import('@/iview/establish/logistics.vue') // 物流管理
        },
        {
          name: 'advertisement',
          path: 'advertisement',
          component: () => import('@/iview/establish/advertisement.vue') // 广告投放
        },
        {
          name: 'influencer',
          path: 'influencer',
          component: () => import('@/iview/establish/influencer.vue') // 网红营销
        },
        {
          name: 'companyregistry',
          path: 'companyregistry',
          component: () => import('@/iview/establish/companyregistry.vue') // 公司注册
        },
        {
          name: 'account',
          path: 'account',
          component: () => import('@/iview/setting/account.vue') // 员工账号管理
        },
        {
          name: 'rolemanagement',
          path: 'rolemanagement',
          component: () => import('@/iview/setting/rolemanagement.vue') // 角色管理
        },
        {
          name: 'advertising',
          path: 'advertising',
          component: () => import('@/iview/datastatistics/advertising.vue') // 数据统计
        },
        {
          name: 'Consumption',
          path: 'Consumption',
          component: () => import('@/iview/datastatistics/Consumption.vue') // 数据广告统计
        }

      ]
    }
  ]

})
