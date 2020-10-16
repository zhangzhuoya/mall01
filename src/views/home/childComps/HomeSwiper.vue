<template>
<swiper class="home-swiper">
    <div>
        <swiper-item>
            <a :href="item.link" v-for="(index,item) in banners" :key="item">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </div>

</swiper>
</template>

<script>
import {
    Swiper,
    SwiperItem
} from 'components/common/swiper'

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
.home-swiper {
    width: 100%;
    height: 193px;
    border: 1px solid black;
}
</style>
