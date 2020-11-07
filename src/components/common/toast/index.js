import Toast from "./Toast.vue"

const obj = {};
obj.install = function (Vue) {
    // 1. 创建内部构造器
    const toastContrustor = Vue.extend(Toast);
    // 2. new 的方式根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor();
    // 3. 将组件对象 手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4. toast 对应的￥el就是div
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
    
}
export default obj