<template>
<div class="nav-container">
    <div class="left">
        <slot name="left">

        </slot>
    </div>
    <div class="nav-content">
        <slot name="content"> </slot>
    </div>

    <div class="right">
        <slot name="right"> </slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'NavBar'
};
</script>

<style scoped>
.nav-container {
    display: flex;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: black;
}

.nav-container .left {
    width: 60px;
}

.nav-container .right {
    width: 60px;
}

.nav-container .nav-content {
    flex: 1;
    color: black;

}
</style>
