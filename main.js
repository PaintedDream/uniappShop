import Vue from 'vue'
import App from './App'
import http from './utils/https.js'

// 网络请求
Vue.prototype.request = http


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
