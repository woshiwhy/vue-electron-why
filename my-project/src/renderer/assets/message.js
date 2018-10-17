/**
 * Created by Administrator on 2018/6/14.
 */
import Vue from 'vue';
import store from "../store/store";
// 策略参数设置
let messageTitle = (title_Tip, type) => {
  let typeChange = type == 'error' ? 'warning' : type;
  Vue.prototype.$message({
    showClose: true,
    message: title_Tip,
    type: typeChange
  })
};
// 将html标签转义。
let escapeHTML = (a) => {
  a = '' + a;
  return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
// 转移符变成HTML标签
let unescapeHTML = (a) => {
  a = '' + a;
  return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
};
let balancePost=(data)=>{
    let bazzerList=store.state.bazzer;
    return Vue.prototype.$postAxios.balance(data).then((res) => {
        const data_Obj = res.data;
        if (data_Obj.code == 200) {
            currentyBalance(data_Obj.data);
            for(let v of bazzerList){
                if(v.id==data.siteId){
                    v.blanceList=data_Obj.data;//存储个人资产；
                }
            }
            if(data.updateFlag){
                messageTitle('更新成功', 'success')
            }
        }else if(data_Obj.code == 318){
            store.state.sopttrading.myBalance=[];
        }
        else {
            if(!data.updateFlag){
                store.state.sopttrading.myBalance=[];
            }
            messageTitle(data_Obj.msg, 'error');
        }
        return data_Obj;
    }).catch((res)=>{
        if(!data.updateFlag){ // 不是更新的报错，会清空当前值
            this.$store.dispatch('myBalance', []);
            return
        }
        this.$messageTitle("网络错误稍后重试", 'error')
    })

};
let currentyBalance=(obj)=>{ // 存储货币可用余额值。
    for (let v of obj) {
        let currentyName = v.symbol;
        currentyName=currentyName.toLowerCase();
        for (let balance of store.state.currenty) {
            let baseName = balance.baseCurrency;//基础货币
            let quoteName = balance.quoteCurrency;//计价货币
            if (currentyName == baseName) {
                balance.baseBalance = v.available;
            }
            if (currentyName == quoteName) {
                balance.quoteBalance = v.available;
            }
        }
    }
}
export {messageTitle, escapeHTML, unescapeHTML,balancePost,currentyBalance}
