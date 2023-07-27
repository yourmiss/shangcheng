import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission.js"
import api from "./api"
import local from "./utils/lcoalUtils"
import "./utils/event-bus.js"
import i18n from "./plugins/i18n"
import Echarts from "./plugins/echarts"

Vue.use(Echarts)
Vue.prototype.$api = api;
Vue.config.productionTip = false

if(local.getLocal("ego")){
  store.commit("loginModule/setUser",local.getLocal("ego"))
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
