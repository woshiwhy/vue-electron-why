import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/store'
import VueI18n from 'vue-i18n'
import md5 from 'js-md5';
import {messageTitle} from "./assets/message";
import {postObj} from "./assets/axios";
import {loginAjax} from "./assets/loginaxios";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import moment from 'moment'
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.prototype.$messageTitle = messageTitle;
Vue.prototype.$postAxios = postObj;
Vue.prototype.$loginAjax = loginAjax;
Vue.prototype.$ajax = axios;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.prototype.$locale = locale;
Vue.prototype.$moment = moment;
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: 'cn',  // 语言标识
  messages: {
    'cn': require('./language/cn'),
    'en': require('./language/en')
  }
})
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
