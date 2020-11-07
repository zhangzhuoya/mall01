<template>
<div class="toast" v-show="isShow">
    <div class="message">
        {{message}}

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message = "已加入到购物车", duration = 1000) {
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false
            }, duration)
        }
    },

}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 45%;
    left: 40%;

    background-color: rgba(0, 0, 0, 0.74);
    width: 100px;
    height: 40px;
    color: white;
    line-height: 40px;
    border-radius: 6px;
}
</style>
