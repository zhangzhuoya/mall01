<template>
<div>
    <detail-nav @detailClick="detailClick"></detail-nav>
    <detail-swiper :banners="detailBanner"></detail-swiper>
</div>
</template>

<script>
import DetailNav from "./child/DetailNav";
import DetailSwiper from "./child/DetailSwiper";

import {
    getDetail
} from "network/detail"
export default {
    name: "Detail",
    data() {
        return {
            iid: null,
            curIndex: 0,
            detailBanner: []
        }
    },
    components: {
        DetailNav,
        DetailSwiper,

    },
    created() {
        this.iid = this.$route.params.iid;
        console.log(this.iid)
        getDetail(this.iid).then(res => {
            console.log(res.result)
            this.detailBanner = res.result.itemInfo.topImages
        })

    },
    // computed() {
    //     this.iid = this.$route.params.iid;

    // },
    methods: {
        detailClick(index) {
            console.log('aa')
            this.detailIndex = index
        }

        // 获取网络请求

    }
}
</script>

<style>

</style>
