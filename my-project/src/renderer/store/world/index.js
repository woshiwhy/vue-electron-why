
/**
 * Created by Administrator on 2018/6/19.
 */
// 国际行情
const state={
  worldTable:[],//国际行情表格
  activeBazzer:'',//国际行情选中市场
};
const  mutations= {
  activeBazzer(state, msg){
    state.activeBazzer = msg;
  },
  worldTable(state, msg){
    state.worldTable = msg;
  }
};
const actions = {
  activeBazzer(context, payload) {
    context.commit('activeBazzer', payload)
  },
  worldTable(context, payload) {
    context.commit('worldTable', payload)
  }
};
export default {
  state,//将state进行输出
  mutations,
  actions,
}

