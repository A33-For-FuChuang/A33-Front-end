import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/api/request'
import './assets/css/gloable.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import permission from '@/directives/permission'

Vue.config.productionTip = false
Vue.prototype.request=request
Vue.use(ElementUI);
Vue.use(permission)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
}
}).$mount('#app')
