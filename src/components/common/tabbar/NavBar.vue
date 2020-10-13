<template>
<div class="nav-container">
    <div class="left">
        <slot name="left">

        </slot>
    </div>
    <div class="content">
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

<style>
.nav-container {
    display: flex;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    height: 44px;
    text-align: center;
    line-height: 44px;
}

.left .right {
    width: 60px;
}

.content {
    flex: 1
}
</style>
