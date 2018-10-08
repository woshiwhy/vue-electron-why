/**
 * Created by Administrator on 2018/6/14.
 */
import Vue from 'vue'
// 策略参数设置
let messageTitle = (title_Tip, type) => {
  let typeChange = type == 'error' ? 'warning' : type
  Vue.prototype.$message({
    showClose: true,
    message: title_Tip,
    type: typeChange
  })
}
// 将html标签转义。
let escapeHTML = (a) => {
  a = '' + a
  return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
// 转移符变成HTML标签
let unescapeHTML = (a) => {
  a = '' + a
  return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
}
export {messageTitle, escapeHTML, unescapeHTML}
