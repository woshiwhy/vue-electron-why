/**
 * Created by Administrator on 2018/5/25.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import home from "../store/home/index";//引入vuex的首页模块
import sopttrading from "../store/sopttrading/index";//现货交易
import auto from "../store/auto/index";//自动交易
import world from "../store/world/index";//国际行情
Vue.use(Vuex)

const store = new Vuex.Store({
  // strict:process.env.NODE_ENV !=='production',//关闭严格模式
  modules: {
    home,//首页模块
    sopttrading,
    auto,
    world,
  },
  state: {
    usersInfor:  {
      name: '',
      gender: '',
      profile: '',
    },//用户信息
    webSocket: '',//webSocket对象
    bazzer: [],//市场
    currenty: [],//货币
    // 导航状态
    navType: '',
    skinType:'',//皮肤状态0白色皮肤,1黑色皮肤
    webSocketType: true,//已经连接
    bindApi:[],//绑定的API
  },
  mutations: {
    bindApi(state, msg){
      state.bindApi = msg;
    },
    usersInfor(state, msg){
      state.usersInfor = msg;
    },
    webSocketType(state, msg){
      state.webSocketType = msg;
    },
    skinType(state, msg){
      state.skinType = msg;
    },
    webSocket(state, msg){
      state.webSocket = msg;
    },
    navType(state, msg){
      sessionStorage.setItem('navType', msg);
      state.navType = msg.toString();
    },
    bazzer(state, msg){
      state.bazzer = msg;
    },
    currenty(state, msg){
      state.currenty = msg;
    }

  },
  actions: {
      bindApi(context, payload) {
      context.commit('bindApi', payload)
    },
    usersInfor(context, payload) {
      context.commit('usersInfor', payload)
    },
    webSocketType(context, payload) {
      context.commit('webSocketType', payload)
    },
    skinType(context, payload) {
      context.commit('skinType', payload)
    },
    webSocket(context, payload) {
      context.commit('webSocket', payload)
    },
    navType(context, payload) {
      context.commit('navType', payload)
    },
    bazzer(context, payload) {
      context.commit('bazzer', payload)
    },
    currenty(context, payload) {
      context.commit('currenty', payload)
    }

  }
});


export default store
