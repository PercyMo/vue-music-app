import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Ripple from 'vue-ripple-directive'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('common/image/default.png')
})

// 点击波纹效果
Ripple.color = 'rgba(0, 0, 0, 0.08)'
Vue.directive('ripple', Ripple)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})