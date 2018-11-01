import Vue from 'vue'
import Router from 'vue-router'
const Login =  () => import('@/components/login');//登录窗口
const Register =  () => import('@/components/register');//注册
const Forget =  () => import('@/components/forget');//忘记密码
const LoginContent = () => import('@/components/logincontent');//登录后主窗口
const Home = () => import('~/home');//  首页
const SpotTrading = () => import('~/spottrading');//  现货交易
const OutoTrade = () => import('~/outotrade');//  自动交易
const MyPlan = () => import('~/autotrade/myplan');//  自动交易我的方案
const ByHistory = () => import ('~/autotrade/byhistory');//  自动交易购买历史
const ExecuteHistory =() => import('~/autotrade/executehistory');//  自动交易执行历史
const WorldMarket = () => import('~/worldmarket');//  国际行情
const KTable = () => import('~/spottrading/Ktable');//  现货交易K线模块
const PutUp = () => import('~/spottrading/putup');//  现货交易挂单模块
const Deepness = () => import('~/spottrading/deepness');//  现货交易深度模块
const History = () => import('~/spottrading/history');//  现货交易历史记录模块
const BinDing = () => import('~/binding');//  授权绑定
const AccountSet = () => import('~/accountset');//  账户设置
Vue.use(Router);
// '~':path.join(__dirname, '../src/renderer/components/page');
//  '&':path.join(__dirname, '../src/renderer/components/module'),
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
