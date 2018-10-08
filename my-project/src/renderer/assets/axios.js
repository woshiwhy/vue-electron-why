/**
 * Created by Administrator on 2018/6/13.
 */
import axios from 'axios'
import { Loading, Message } from 'element-ui'

const axiosLogin = 'http://api.bitbus.club:10000/upms'// 登录注册接口
// const axiosLogin='http://192.168.2.88:10000/upms';//登录注册接口
const webSocketOBj = {
  // url:'ws://192.168.2.88:10000/hub',//webSocket对象地址
  url: 'ws://api.bitbus.club:10000/hub', // webSocket对象地址
  OutTime: 60000// 心跳
}
// const axiosUrl='http://192.168.2.88:10000/hubrest';//舒服
const axiosUrl = 'http://api.bitbus.club:10000/hubrest'// 服务器

const $axios = axios.create({
  baseURL: axiosUrl,
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('userToken')
  }
})
let loading
let needLoadingRequestCount = 0

// 请求拦截；
$axios.interceptors.request.use(config => {
  if (config.loding) {
    showFullScreenLoading() // 开启loding
  }
  return config
}, (error) => {
  endLoading()
  return Promise.reject(error)
})

// // 响应拦截器
$axios.interceptors.response.use((response) => {
  tryHideFullScreenLoading()
  return response
}, (error) => {
  tryHideFullScreenLoading()
  return Promise.reject(error)
})

export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
function startLoading () { // 开启loding
  loading = Loading.service({
    lock: true,
    spinner: 'el-icon-loading',
    text: '拼命加载中...',
    customClass: 'loding-bg',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () { // 关闭loding
  loading.close()
}

let postObj = {
  recommendCurrenty: (data) => $axios({
    method: 'post',
    url: '/recommend/sysmol',
    data: data
  }),
  // 更新资产
  updateBalance: (data) => $axios({
    method: 'post',
    url: '/userAccount/checkSymbolBalance',
    data: data,
    loding: true
  }),
  // 正在执行的策略
  autoPlanInfor: (data) => $axios({
    method: 'get',
    url: '/userStrategy/getExecute'
  }),
  // 执行策略
  playPlan: (data) => $axios({
    method: 'post',
    url: '/userStrategy/execute',
    data: data,
    loding: true
  }),
  // 取消策略
  cancelPlan: (data) => $axios({
    method: 'get',
    url: '/userStrategy/stop/' + data,
    loding: true
  }),
  // 市场种类接口
  bazzerAxios: (data) => $axios({
    method: 'post',
    url: '/site/getAllSite',
    data: data
  }),
  // 货币种类接口
  currentyAxios: (data) => $axios({
    method: 'post',
    url: '/site/getSymbol',
    data: data
  }),
  // 账号资产
  balance: (data) => $axios({
    method: 'post',
    url: '/userAccount/query',
    data: data
  }),
  // 套利排行榜
  rankingList: (data) => $axios({
    method: 'post',
    url: '/sysProfit/findByWord',
    data: data
  }),
  // 货币可用余额
  balanceAxios: (data) => $axios({
    method: 'post',
    url: '/userAccount/getSymbolBalance',
    data: data
  }),
  //  现货交易K线图
  chartAxios: (data) => $axios({
    method: 'post',
    url: '/kline/getKline',
    data: data
  }),
  // 现货交易买卖接口
  transaction: (data) => $axios({
    method: 'post',
    url: '/order/createOrder',
    data: data,
    loding: true
  }),
  //  现货交易买卖历史
  historicalSum: (data) => $axios({
    method: 'post',
    url: '/historyTrade/getHistoryTrade',
    data: data
  }),
  // 现货交易买卖挂单
  entryOrders: (data) => $axios({
    method: 'post',
    url: '/historyOrder/getHistoryOrder',
    data: data
  }),
  // 现货交易撤单
  cancellations: (data) => $axios({
    method: 'post',
    url: '/cancel/cancelOrder',
    data: data
  }),
  // 自动交易盈利统计
  profitStatistics: (data) => $axios({
    method: 'post',
    url: '/strategyExeRecord/findProfitByWord',
    data: data
  }),

  // 自动交易执行记录
  executionRecord: (data) => $axios({
    method: 'post',
    url: '/userStrategy/log/query',
    data: data
  }),
  // 自动交易我的策略记录
  myplan: (data) => $axios({
    method: 'post',
    url: '/userStrategy/selectPage',
    data: data
  }),
  // 自动交易系统推荐方案
  plan: (data) => $axios({
    method: 'post',
    url: '/plan/selectPage',
    data: data
  }),

  // 自动交易保存策略信息
  saveStrategy: (data) => $axios({
    method: 'post',
    url: '/userStrategy/save',
    data: data,
    loding: true
  }),
  // 自动交易接口
  ImplemenStrategy: (data) => $axios({
    method: 'post',
    url: '/autoTrades/createOrder',
    data: data
  }),
  // 自动交易系统推荐方案
  blurryplan: (data) => $axios({
    method: 'get',
    url: '/plan/query',
    data: data
  }),
  // 删除我的方案
  delMyplan: (data) => $axios({
    method: 'post',
    url: '/userStrategy/delete',
    data: data,
    loding: true
  }),
  // 国际行情
  International: (data) => $axios({
    method: 'post',
    url: 'ticker/template',
    data: data
  }),
  // 获取绑定的密匙
  apiAxios: () => $axios({
    method: 'post',
    url: '/userSite/query'
  }),
  // 用户授权绑定
  bindAxios: (data) => $axios({
    method: 'post',
    url: '/userSite/authBind',
    data: data,
    loding: true
  }),
  // 解除授权绑定
  unbindAxios: (data) => $axios({
    method: 'post',
    url: '/userSite/unbind/' + data,
    loding: true
  })
}

// 登出接口
let logout = (data) => $axios({
  method: 'post',
  url: '/user/logout',
  data: data
})

export {logout, webSocketOBj, axiosLogin, postObj}
