import Vuex from "vuex";
import Vue from "vue";
// 1. 安装插件
Vue.use(Vuex);
// 2. 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
      console.log(payload);
      
      // state.cartList.payload.count++;
      // console.log(payload);

    },
    addToCard(state, payload) {
      console.log(payload);
      
      state.cartList.push(payload);
    },
  },
  actions: {
    addCards(context, payload) {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit("addCounter", oldProduct);
      } else {
        payload.count = 1;
        context.commit("addToCard", payload);
      }
    },
  },
});
export default store;
