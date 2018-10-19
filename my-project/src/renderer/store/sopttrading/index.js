/**
 * Created by Administrator on 2018/6/19.
 */
//现货交易状态
const state={
  maxBuy:0,//深度买入纵坐标最大值
  maxSell:0,//深度卖出纵坐标最大值
  buyPrice: '', //  买入价格
  sellPrice: '',//卖出价格
  selectBazzer:'',//选中的市场属性
  selectCurrenty:'',//选中的货币属性
  depthChart:'',//深度数据
  lineVal:'',//k线图数据
  myBalance:[], //我的资产
  balance:0,//计价货币价格
    balanceType:true,//刷新可用币的余额
  tableList:'',//挂单增加表格,
};
const  mutations= {
  tableList(state,msg){
    state.tableList=msg;
  },
  depthChart(state,msg){
    state.depthChart=msg;
  },
    balanceType(state,msg){
        state.balanceType=msg;
    },
  balance(state,msg){
    state.balance=msg;
  },
  myBalance(state,msg){
    state.myBalance=msg;
  },
  maxBuy(state,msg){
    state.maxBuy=msg;
  },
  maxSell(state,msg){
    state.maxSell=msg;
  },
  lineVal(state,msg){
    state.lineVal=msg;
  },

  buyPrice(state,msg){
    state.buyPrice = msg;
  },
  sellPrice(state,msg){
    state.sellPrice = msg;
  },
  selectBazzer(state,msg){
    state.selectBazzer = msg;
  },
  selectCurrenty(state,msg){
    state.selectCurrenty = msg;
  }
};
const actions = {
    balanceType(context, payload) {
    context.commit('balanceType', payload)
},
  tableList(context, payload) {
  context.commit('tableList', payload)
},
  depthChart(context, payload) {
    context.commit('depthChart', payload)
  },
  balance(context, payload) {
  context.commit('balance', payload)
},
  myBalance(context, payload) {
  context.commit('myBalance', payload)
},
  maxBuy(context, payload) {
    context.commit('maxBuy', payload)
  },
  maxSell(context, payload) {
    context.commit('maxSell', payload)
  },
  lineVal(context, payload) {
    context.commit('lineVal', payload)
  },

  buyPrice(context, payload) {
    context.commit('buyPrice', payload)
  },
  sellPrice(context, payload) {
    context.commit('sellPrice', payload)
  },
  selectBazzer(context, payload) {
    context.commit('selectBazzer', payload)
  },
  selectCurrenty(context, payload) {
    context.commit('selectCurrenty', payload)
  }
};
export default {
  state,//将state进行输出
  mutations,
  actions,
}
