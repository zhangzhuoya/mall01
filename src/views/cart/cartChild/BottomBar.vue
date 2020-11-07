<template>
<div class="bottom-menu">
    <check-button class="select-all" v-model="isSelectAll" @checkBtnClick="checkBtnClick"> </check-button>
    <span>全选</span>
    <span class="total-price">合计数量：{{this.$store.getters.cartLength}}</span>
    <span class="buy-product">合计：{{this.$store.getters.cartLength}}</span>
</div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
    name: "BottomBar",
    components: {
        CheckButton,
    },
    computed: {
        totalPrice() {
            const cartList = this.$store.getters.cartList;
            return cartList
                .filter((item) => item.checked)
                .reduce((preValue, item) => {
                    console.log(item.newPrice)
                    return preValue + item.count * item.price;

                }, 0)
                .toFixed(2);
        },
        isSelectAll: function () {
            return !(this.$store.getters.cartList.find(item => !item.checked))
        }
    },
    methods: {
        checkBtnClick() {
            const checkAll = this.$store.getters.cartList.find(item => !item.checked);
            console.log(checkAll)
            if (checkAll) {
                this.$store.getters.cartList.forEach((item) => {
                    item.checked = true
                })

            } else {
                this.$store.state.cartList.forEach(item => {
                    item.checked = false;
                });
            }
        }
    },

};
</script>

<style scoped>
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
}

.bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
}

.bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
}

.bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
}
</style>
