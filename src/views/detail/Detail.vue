<template>
<div>
    detail
</div>
</template>

<script>
export default {
    data() {
        return {
            iid: null
        }
    },
    created() {
        this.iid = this.$route.params.iid
    }
}
</script>

<style>

</style>
