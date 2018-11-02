import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/store'
import md5 from 'js-md5';
import {messageTitle} from "./assets/message";
import {postObj} from "./assets/axios";
import {loginAjax} from "./assets/loginaxios";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import moment from 'moment'
import i18n from './i18n/i18n';
import filter from "./assets/filters";
Vue.mixin(filter);
Vue.use(ElementUI);
Vue.prototype.$messageTitle = messageTitle;
Vue.prototype.$postAxios = postObj;
Vue.prototype.$loginAjax = loginAjax;
Vue.prototype.$ajax = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment;
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app');
