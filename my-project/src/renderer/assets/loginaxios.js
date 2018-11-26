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
);
const $axiosInfor= axios.create({ //  登录过后
    baseURL: axiosLogin,
    timeout: 10000,
    headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')

    }
});


$loginaxios.interceptors.request.use(config => {
  // 验证码登录
  if (config.url == '/user/loginForCode') {
    config.headers.auth = 'Basic d2ViQXBwOndlYkFwcA=='
  }
  return config
}, (error) => {
  return Promise.reject(error)
});
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
  resetPassword: (data) => $axiosInfor({
    method: 'post',
    url: '/user/resetPassword',
    data: data
  }),
  // 修改用手机邮箱
  editname: (data) => $axiosInfor({
    method: 'post',
    url: '/user/edit/username',
    data: data
  }),
  // 修改用户信息
  edit: (data) => $axiosInfor({
    method: 'post',
    url: '/user/edit',
    data: data
  }),
  // 上传头像
  setImage: (data) => $axiosInfor({
    method: 'post',
    url: '/user/upload',
    data: data
  }),
  // 获取用户信息
  getUserIfor: (data) => $axiosInfor({
    method: 'get',
    url: '/user/getUserInfo',
    data: data
  }),
  // 登录记录
  loginQuery: (data) => $axiosInfor({
    method: 'post',
    url: '/user/log/login/query',
    data: data
  }),
  //  用户积分查询
  userIntegral: (data) => $axiosInfor({
    method: 'get',
    url: '/userIntegral/query',
    data: data
  }),
  //  基本任务
  basicTasks: (data) => $axiosInfor({
    method: 'get',
    url: '/userIntegral/query/basicTasks',
    data: data
  }),
  /// 每日签到
  userSign: (data) => $axiosInfor({
    method: 'get',
    url: '/userSign/sign',
    data: data
  }), /// 每日签到
  signInfo: (data) => $axiosInfor({
    method: 'get',
    url: '/userSign/query/signInfo',
    data: data
  }),
    //  策略执行签到
    strategySign: (data) => $axiosInfor({
        method: 'get',
        url: '/userSign/strategySign',
        data: data
    }),
  //  创造二维码
  qrCodeCreate: (data) => $axiosInfor({
    method: 'get',
    url: '/qrCode/create' + data,
    data: data
  }),
    memberInfo:(data) => $axiosInfor({  // 会员信息
        method: 'get',
        url: '/userState/query/memberInfo',
    }),

    memberList:(data) => $axiosInfor({  //会员菜单
        method: 'get',
        url: '/memberPackage/query',
    }),
    expenseDetail:(data) => $axiosInfor({  //会员菜单
        method: 'post',
        url: '/userPaymentOrder/query/page',
        data:data
    }),
    openMember:(data) => $axiosInfor({  //订单生成
        method: 'post',
        url: '/userPaymentOrder/openMember',
        data:data
    }),
    confirmPayment:(data) => $axiosInfor({  //已支付
        method: 'get',
        url: '/userPaymentOrder/confirmPayment/'+data,
    }),

};
export {loginAjax}
