import App from './App'
import imgUrl from './api/config.js'
// #ifndef VUE3
import Vue from 'vue'
import http from 'api/request.js'
import store from './store/index.js'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$config = imgUrl
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
    ...App,store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif