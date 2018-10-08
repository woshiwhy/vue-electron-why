/**
 * Created by Administrator on 2018/6/13.
 */
import axios from 'axios'
import {axiosLogin} from './axios' // jie
const $loginaxios = axios.create({
  baseURL: axiosLogin,
  timeout: 10000,
  headers: {
    auth: ''
  }
}
)
let editUrl = '/user/edit'
let resetUrl = '/user/resetPassword'
let uploadUrl = '/user/upload'
let queryUrl = '/user/log/login/query'
let getUserInfo = '/user/getUserInfo'
let editusername = '/user/edit/username'
let userIntegral = '/userIntegral/query'
let qrCodeCreate = '/qrCode/create'
let basicTasks = '/userIntegral/query/basicTasks'
let userSign = '/userSign/sign'
let signInfo = '/userSign/query/signInfo'

$loginaxios.interceptors.request.use(config => {
  // 验证码登录
  if (config.url == '/user/loginForCode') {
    config.headers.auth = 'Basic d2ViQXBwOndlYkFwcA=='
  }
  // 用户修改接口 和上传 请求头加token
  if (config.url == editUrl || config.url == resetUrl || config.url == uploadUrl || config.url == queryUrl || config.url == getUserInfo || config.url == editusername || config.url == userIntegral || config.url == qrCodeCreate || config.url == basicTasks || config.url == userSign || config.url == signInfo) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('userToken')
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
let loginAjax = {
  loginAxios: (data) => $loginaxios({
    method: 'post',
    url: '/user/login',
    data: data
  }),
  // 发送登录验证码
  sendLoginVerifyCode: (data) => $loginaxios({
    method: 'get',
    url: '/user/sendLoginVerifyCode/' + data
  }),
  // 验证码登录接口
  loginForCode: (data) => $loginaxios({
    method: 'post',
    url: '/user/loginForCode',
    data: data
  }),
  // 注册页面接口
  register: (data) => $loginaxios({
    method: 'post',
    url: 'user/register',
    data: data
  }),
  // 发送注册验证码
  sendRegisterVerifyCode: (data) => $loginaxios({
    method: 'get',
    url: '/user/sendRegisterVerifyCode/' + data
  }),
  // 忘记密码接口
  forgetReg: (data) => $loginaxios({
    method: 'post',
    url: '/user/forget',
    data: data
  }),

  // 发送修改验证码
  sendEditVerifyCode: (data) => $loginaxios({
    method: 'get',
    url: '/user/sendEditVerifyCode/' + data
  }),
  // 发送忘记验证码
  sendForgetVerifyCode: (data) => $loginaxios({
    method: 'get',
    url: '/user/sendForgetVerifyCode/' + data
  }),
  // 修改密码
  resetPassword: (data) => $loginaxios({
    method: 'post',
    url: '/user/resetPassword',
    data: data
  }),
  // 修改用手机邮箱
  editname: (data) => $loginaxios({
    method: 'post',
    url: '/user/edit/username',
    data: data
  }),
  // 修改用户信息
  edit: (data) => $loginaxios({
    method: 'post',
    url: '/user/edit',
    data: data
  }),
  // 上传头像
  setImage: (data) => $loginaxios({
    method: 'post',
    url: '/user/upload',
    data: data
  }),
  // 获取用户信息
  getUserIfor: (data) => $loginaxios({
    method: 'get',
    url: '/user/getUserInfo',
    data: data
  }),
  // 登录记录
  loginQuery: (data) => $loginaxios({
    method: 'post',
    url: '/user/log/login/query',
    data: data
  }),
  //  用户积分查询
  userIntegral: (data) => $loginaxios({
    method: 'get',
    url: '/userIntegral/query',
    data: data
  }),
  //  基本任务
  basicTasks: (data) => $loginaxios({
    method: 'get',
    url: '/userIntegral/query/basicTasks',
    data: data
  }),
  /// 每日签到
  userSign: (data) => $loginaxios({
    method: 'get',
    url: '/userSign/sign',
    data: data
  }), /// 每日签到
  signInfo: (data) => $loginaxios({
    method: 'get',
    url: '/userSign/query/signInfo',
    data: data
  }),
  //  创造二维码
  qrCodeCreate: (data) => $loginaxios({
    method: 'get',
    url: '/qrCode/create' + data,
    data: data
  })

}
export {loginAjax}
