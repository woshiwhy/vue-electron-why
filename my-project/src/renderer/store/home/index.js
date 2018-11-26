
/**
 * Created by Administrator on 2018/6/19.
 */
// /首页状态
const state={
  interest:[],//套利数据
  recommendCurrent:{
      innovate:'',
      potential:'',
  },//推荐币种
    bannerList:[],//轮播
    listcarousel:[],//空投
    authosList:[],//大咖
};
const  mutations= {
    authosList(state, msg){
        state.authosList = msg;
    },
    listcarousel(state, msg){
        state.listcarousel = msg;
    },
    bannerList(state, msg){
        state.bannerList = msg;
    },
  recommendCurrent(state, msg){
    state.recommendCurrent = msg;
  },
  interest(state,msg){
    addVal('interest',msg)
  }
};
const actions = {
    authosList(context, payload) {
        context.commit('authosList', payload)
    },
    listcarousel(context, payload) {
        context.commit('listcarousel', payload)
    },
    bannerList(context, payload) {
        context.commit('bannerList', payload)
    },
  recommendCurrent(context, payload) {
    context.commit('recommendCurrent', payload)
  },
  interest(context, payload) {
    context.commit('interest', payload)
  },
};
export default {
  state,//将state进行输出
  mutations,
  actions,
}
function addVal(name,item) {
  let storage_Val=state[name];
  let type='-1';
  if(item.length!=1){//为0时，没数据。为1时需要检查数据是否重复。
      state[name]= item;
      return
  }
    let new_Id=item[0].id;
  for(let i=0,maxLength=storage_Val.length;i<maxLength;i++){
    let has_Id=storage_Val[i].id;
    if(has_Id==new_Id){  // 如果ID相同，删除以前的数据，添加新数据到数组第一位
      type=i;
    }
  }
  if(type==-1){
    storage_Val.push(item[0]);
  }
  else {
    storage_Val.splice(type,1,item[0]);
  }
  state[name]= storage_Val
}
