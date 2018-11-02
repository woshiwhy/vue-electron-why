/**
 * Created by Administrator on 2018/10/30.
 */
import i18n from './../i18n/i18n';
 const dealStatus = {
    0: "待成交",
    1: "部分成交",
    2: "完全成交",
    3: "撤单中",
    4: "已撤销",
    5: "过期"
};
 const dealName= {
     sell:'卖出',
      buy:'买入',
     0:'撤单',
     1:'撤单'
 };
 const executeStatus={
     0:"btnname.unExecute",//正在执行
     1:"btnname.execute",//未执行
     '0004-0001':"立即更新",//必更新
     '0004-0002':"更新",//可更新
     '0004-0003':"确认"//消息提示
 };
const messageList={ //消息提示
    '0004-0001':"重要更新",//必更新
    '0004-0002':"更新提示",//可更新
    '0004-0003':"消息提示"//消息提示
};
export{dealStatus,dealName,executeStatus,messageList}