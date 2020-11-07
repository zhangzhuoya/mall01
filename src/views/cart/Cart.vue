<template>
<div class="cart">
    <nav-bar class="nav-bar">
        <div slot="content">
            购物车({{ cartLength }})
            <!-- （）里面的数字来自vuex -->
        </div>
    </nav-bar>
    <cart-list class="cart-list" :cartList="cartList"></cart-list>
    <bottom-bar v-if="cartLength!==0"></bottom-bar>
</div>
</template>

<script>
import NavBar from "components/common/tabbar/NavBar.vue";
import CartList from "./cartChild/CartList.vue";
import BottomBar from "./cartChild/BottomBar"
import {
    mapGetters
} from "vuex";
export default {
    name: "Cart",
    components: {
        NavBar,
        CartList,
        BottomBar
    },

    computed: {
        // 把getter里面的东西直接拿出来用 通过mapGetters
        ...mapGetters(["cartLength", "cartList"]),
    },
    mounted() {
        console.log(this.cartList);
    },
};
</script>

<style scoped>
.nav-bar {
    background: #ff8e96;
    position: fixed;
    top: 0px;
    width: 100%;
}

.cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;

    z-index: -1;
}
</style>
