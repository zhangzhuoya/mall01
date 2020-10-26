<template>
<div class="recommend-info">
    <goods-list :goods="recommendList" :imageType="imageType"></goods-list>
</div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'
// import GoodsLsist from 'components/content/goods/GoodsList'

export default {
    name: "DetailRecommendInfo",
    components: {
        GoodsList
    },
    props: {
        recommendList: {
            type: Array
        },
        imageType: {
            type: String
        }
    },
    created() {
        // console.log(this.recommendList)
    },
}
</script>

<style scoped>
.recommend-info {
    padding: 5px;
}

.info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
}
</style>
