import Vue from "vue";
import VueRouter from "vue-router";
// 1. 安装插件
const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Details = () => import("../views/detail/Detail")
Vue.use(VueRouter);
// 创建路由
const routes = [
  // { path: "", redirect: home },
{
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Details
  }];
const router = new VueRouter({
    routes,
    mode:'history'
})
export default router
