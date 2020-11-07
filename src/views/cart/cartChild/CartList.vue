<template>
<div class="cart-list">
    <scroll class="content" :probe-type="3">

        <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
</div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
    props: {
        cartList: {
            type: Function
        }
    },
    components: {
        Scroll,
        CartListItem
    }

}
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px);

}

.contnet {
    overflow: hidden;
    height: 100%;

}
</style>
