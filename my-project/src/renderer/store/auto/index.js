/**
 * Created by Administrator on 2018/6/19.
 */
  //  自动交易
const state={
    myplan:'',// 可供选择的策略方案
    changePlan:'',//当前修改的策略
    seaveType:true,//刷新方案表格
    playPlan:'',//正在执行的策略
    fromClear:true,//清空设置策略表单
    delePlan:'' // 删除的策略ID

};
const  mutations= {
  delePlan(state,msg){
    state.delePlan = msg;
  },
  fromClear(state,msg){
    state.fromClear = msg;
  },
  playPlan(state,msg){
    state.playPlan = msg;
  },
  seaveType(state,msg){
    state.seaveType = msg;
  },
  myplan(state,msg){
    state.myplan = msg;
  },
  changePlan(state,msg){
    state.changePlan = msg;
  }
};
const actions = {
  delePlan(context, payload) {
    context.commit('delePlan', payload)
  },
  fromClear(context, payload) {
    context.commit('fromClear', payload)
  },
  playPlan(context, payload) {
    context.commit('playPlan', payload)
  },
  seaveType(context, payload) {
    context.commit('seaveType', payload)
  },
  myplan(context, payload) {
    context.commit('myplan', payload)
  },
  changePlan(context, payload) {
    context.commit('changePlan', payload)
  }
};
export default {
  state,//将state进行输出
  mutations,
  actions,
}


