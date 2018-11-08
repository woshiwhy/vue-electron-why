/**
 * Created by Administrator on 2018/10/10.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './language'
Vue.use(VueI18n);
let type=localStorage.getItem('languageType');
//从localStorage获取语言选择。
const i18n = new VueI18n({
    locale: localStorage.lang || 'cn', //初始未选择默认 cn 中文
    messages,
})

export default i18n
