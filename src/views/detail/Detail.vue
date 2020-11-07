<template>
<div>
    <detail-nav @detailClick="detailClick" ref="nav"></detail-nav>
    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
        <detail-swiper :banners="detailBanner" :pull-up-load="true"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop :shop="shop"></detail-shop>
        <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <detail-recommend-info ref="recommend" :recommendList="recommendList" :imageType="imageType"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @s="sss"></detail-bottom-bar>
    <back-top v-show="isShowTop" @click.native="backTop"></back-top>
</div>
</template>

<script>
import DetailNav from "./child/DetailNav";
import DetailSwiper from "./child/DetailSwiper";
import DetailCommentInfo from "./child/DetailCommentInfo";
import DetailBottomBar from "./child/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop.vue";
import DetailBaseInfo from "./child/DetailBaseInfo";
import DetailShop from "./child/DetailShop";
import DetailGoodsInfo from "./child/DetailGoodsInfo";
import DetailParamInfo from "./child/DetailParamInfo";
import DetailRecommendInfo from "./child/DetailRecommendInfo";

import Scroll from "components/common/scroll/Scroll";

import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam,
} from "network/detail";

import {
    itemListenerMixin,
    backTopMixin
} from "common/mixin.js";
export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],

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
            imageType: "image",
            itemImgListener: null,
            themeTopYs: [1000, 2000, 3000, 4000],
            currentY: 0,
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
        DetailRecommendInfo,
        DetailBottomBar,
        BackTop,
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
            this._getRecommend();
    },

    // computed() {
    //     this.iid = this.$route.params.iid;

    // },
    mounted() {
        // console.log(Scroll);
        this.$refs.scroll.scrollTo(0, 0, 200);
        // console.log(this.$refs.scroll.scrollTo(0, -1000, 200));

    },
    // updated() {
    //     // 1. 第一次获取，值不对：this.$ref.params.$el压根没有渲染
    //     // 2. 第二次不对，图片没有加载完成
    //     //不包含图片，回产生bug
    //     this.detailImageLoad();
    // },
    destroyed() {
        this.$bus.$on('itemImgLoad', this.itemImgListener)

    },
    methods: {
        // detailClick(index) {
        //     case

        // },
        // 获取网络请求
        _getRecommend() {
            getRecommend().then((res, error) => {
                if (error) return;
                this.recommendList = res.data.list;
                // console.log(this.recommendList)
            });
        },

        detailImageLoad() {
            this.newRefresh()
            console.log('a')
            // this.$ref.scroll.refresh()
            // 在nextTick（（）=>{}）
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE);
            console.log(this.themeTopYs);

        },
        contentScroll(positionY) {
            // console.log(positionY.y)
            let lengthY = this.themeTopYs.length;
            // console.log(this.themeTopYs)
            for (let i = 0; i < lengthY - 1; i++) {
                // console.log(i)
                // if (this.currentY !== i &&
                //     ((i < lengthY - 1 && -positionY.y >= this.themeTopYs[i] &&
                //             -positionY.y <= this.themeTopYs[i + 1]) ||
                //         (i === lengthY - 1 && -positionY.y >= this.themeTopYs[i]))) {
                //     this.currentY = i;
                //     this.$refs.nav.detailIndex = this.currentY
                //     console.log(this.currentY)
                //     console.log(this.$refs.nav.detailIndex)
                // }
                // 这样判断
                if (
                    this.currentY !== i &&
                    -positionY.y >= this.themeTopYs[i] &&
                    -positionY.y <= this.themeTopYs[i + 1]
                ) {
                    this.currentY = i;
                    this.$refs.nav.detailIndex = this.currentY;
                }
            }
            this.isShowTop = -positionY.y > 1000

            // console.log(positionY)
        },
        sss() {
            // console.log("ddd")
            // 1. 获取商品信息
            const product = {};
            product.imageURL = this.detailBanner[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.newPrice = this.goods.newPrice;
            // product.count = 0;

            product.iid = this.iid
            // console.log(product)
            // console.log('-----')
            // 将商品添加到购物车
            this.$toast.show()
            this.$store.dispatch('addCards', product)
        },
        // 点击跳转到相应位置
        detailClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
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
