<template>
<div class="home">
    <nav-bar class="home-nav">
        <div slot="content">
            购物街
        </div>

    </nav-bar>
    home
</div>
</template>

<script>
import NavBar from "components/common/tabbar/NavBar.vue"
export default {
    components: {
        NavBar

    }
}
</script>

<style>
.home-nav {
    background-color: #ff8198;
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
</style>
