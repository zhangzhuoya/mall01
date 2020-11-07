import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './vuex'
import toast from 'components/common/toast'
Vue.config.productionTip = false
Vue.use(toast)
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

const arr = [{istrue:false},{istrue:false}];
const a= arr.find((item)=>
  item.istrue==true)
console.log( a);