<template>
<swiper class="detail-swiper">
    <swiper-item class="item" v-for="(item,index) in banners" :key="index">
        <img :src="item" alt="">
    </swiper-item>
</swiper>
</template>

<script>
import {
    Swiper,
    SwiperItem
} from 'components/common/swiper'
export default {
    name: "DetailSwiper",
    props: {
        banners: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },

}
</script>

<style scoped>
.item {
    text-align: center;
    height: 300px;
}
</style>
