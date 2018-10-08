import Vue from 'vue'
import Router from 'vue-router'
const Login = require('@/components/login').default;//登录窗口
const Register = require('@/components/register').default;//注册
const Forget = require('@/components/forget').default;//忘记密码
const LoginContent = require('@/components/logincontent').default;//登录后主窗口
const Home = require('@/components/page/home').default;//  首页
const SpotTrading = require('@/components/page/spottrading').default;//  现货交易
const OutoTrade = require('@/components/page/outotrade').default;//  自动交易
const MyPlan = require('@/components/page/autotrade/myplan').default;//  自动交易我的方案
const ByHistory = require ('@/components/page/autotrade/byhistory').default;//  自动交易购买历史
const ExecuteHistory =require('@/components/page/autotrade/executehistory').default;//  自动交易执行历史
const WorldMarket = require('@/components/page/worldmarket').default;//  国际行情
const KTable = require('@/components/page/spottrading/Ktable').default;//  现货交易K线模块
const PutUp = require('@/components/page/spottrading/putup').default;//  现货交易挂单模块
const Deepness = require('@/components/page/spottrading/deepness').default;//  现货交易深度模块
const History = require('@/components/page/spottrading/history').default;//  现货交易历史记录模块
const BinDing = require('@/components/page/binding').default;//  授权绑定
const AccountSet = require('@/components/page/accountset').default;//  账户设置
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: Login
    },
    {//注册
      path: '/register',
      name: 'register',
      component: Register
    },  {//忘记密码
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {//登录后主窗口
      path: '/logincontent',
      name: 'logincontent',
      component: LoginContent,
      redirect:'/home',
      children: [
        { //  首页
          path: '/home',
          name:'home',
          component:Home,
        },
        {//  现货交易
          path: '/spottrading',
          name: 'spottrading',
          component: SpotTrading,
          redirect:'/Ktable',
          children: [
            {
              path: '/Ktable',
              name: 'Ktable',
              component: KTable,
            },
            {
              path: '/putup',
              name: 'putup',
              component: PutUp,
            },
            {
              path: '/deepness',
              name: 'deepness',
              component: Deepness,
            },
            {
              path: '/history',
              name: 'history',
              component: History,
            }
          ]
        },
        { //  自动交易
          path: '/outotrade',
          name:'outotrade',
          component:OutoTrade,
          redirect:'/myplan',
          children: [
            { //  我的方案
              path: '/myplan',
              name:'myplan',
              component:MyPlan,
            },
            { //我的购买历史
              path: '/byhistory',
              name:'byhistory',
              component:ByHistory,
            },
            { //执行历史
              path: '/executehistory',
              name:'executehistory',
              component:ExecuteHistory,
            },
          ]
        },
        { //  国际行情
          path: '/worldmarket',
          name:'worldmarket',
          component:WorldMarket,
        },
        { //  授权绑定
          path: '/binding',
          name:'binding',
          component:BinDing,
        },
        { //  账户设置
          path: '/accountset',
          name:'accountset',
          component:AccountSet,
        },
      ]
    }
  ]
})
