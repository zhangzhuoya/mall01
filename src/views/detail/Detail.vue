<template>
<div>
    <detail-nav @detailClick="detailClick"></detail-nav>
    <scroll class="content" :probe-type="3" ref="scroll">
        <detail-swiper :banners="detailBanner" :pull-up-load="true"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop :shop="shop"></detail-shop>
        <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo" @detailImageLoad="detailImageLoad"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <detail-recommend-info ref="recommend" :recommendList="recommendList" :imageType="imageType"></detail-recommend-info>
    </scroll>
</div>
</template>

<script>
import DetailNav from "./child/DetailNav";
import DetailSwiper from "./child/DetailSwiper";
import DetailCommentInfo from "./child/DetailCommentInfo";

import DetailBaseInfo from "./child/DetailBaseInfo";
import DetailShop from "./child/DetailShop";
import DetailGoodsInfo from "./child/DetailGoodsInfo";
import DetailParamInfo from "./child/DetailParamInfo";
import DetailRecommendInfo from "./child/DetailRecommendInfo"

import Scroll from "components/common/scroll/Scroll";

import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    // DetailGoodsInfo,
    GoodsParam,
} from "network/detail";

import {
    itemListenerMixin
} from "common/mixin.js"
export default {
    name: "Detail",
    mixins: [itemListenerMixin],
    data() {
        return {
            iid: null,
            curIndex: 0,
            detailBanner: [],
            goods: {},
            shop: {},
            paramInfo: {},
            detailInfo: {},
            commentInfo: {},
            recommendList: [],
            imageType: 'image',
            itemImgListener: null,
            themeTopYs: [1000, 2000, 3000, 4000]
        };
    },
    components: {
        DetailNav,
        DetailSwiper,
        DetailBaseInfo,
        DetailShop,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        DetailRecommendInfo
    },
    created() {
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then((res) => {
                const data = res.result;
                this.detailBanner = res.result.itemInfo.topImages;
                this.goods = new Goods(
                    data.itemInfo,
                    data.columns,
                    data.shopInfo.services
                );
                // 2.4.获取店铺信息
                // console.log(this.goods);
                this.shop = new Shop(data.shopInfo);
                // console.log(this.shop);
                this.detailInfo = data.detailInfo;
                // console.log(data.detailInfo);

                // 2.6.保存参数信息
                this.paramInfo = new GoodsParam(
                    data.itemParams.info,
                    data.itemParams.rule
                );
                // console.log(this.paramInfo);

                // 2.7.保存评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }
            }),

            this._getRecommend()

    },

    // computed() {
    //     this.iid = this.$route.params.iid;

    // },
    mounted() {
        console.log(Scroll)

        this.$refs.scroll.scrollTo(0, -1000, 200)
        console.log(this.$refs.scroll.scrollTo(0, -1000, 200))

    },
    updated() {
        this.detailClick()

        this.detailImageLoad()

    },
    methods: {
        // detailClick(index) {
        //     case

        // },
        // 获取网络请求
        _getRecommend() {
            getRecommend().then((res, error) => {
                if (error) return
                this.recommendList = res.data.list
                // console.log(this.recommendList)
            })
        },
        detailImageLoad() {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        },
        // 点击跳转到相应位置
        detailClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

        },

    },
};
</script>

<style scoped>
.content {
    overflow: hidden;
    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
