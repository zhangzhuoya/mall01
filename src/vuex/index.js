import Vuex from "vuex";
import Vue from "vue";
import mutations from './mutations';
import actions from './actions'
import getters from  './getters'
// 1. 安装插件
Vue.use(Vuex);
// 2. 创建Store对象
const state = {
  cartList:[]
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store;
