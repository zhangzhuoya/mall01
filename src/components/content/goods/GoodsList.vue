<template>
<div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index" :imageType="imageType" />
</div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
    name: "GoodsList",
    components: {
        GoodsListItem
    },

    props: {
        goods: {
            type: Array,
            default () {
                return []
            }
        },
        imageType: {
            type: String
        }

    },
    mounted() {
        // console.log(this.imageType)
    }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
}
</style>
