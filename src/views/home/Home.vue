<template>
<div class="home">
    <div class="home-nav">
        <nav-bar>
            <div slot="content">购物街</div>
        </nav-bar>
    </div>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="pullingUp">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-item :recommends="recommends"></recommend-item>
        <feature-view></feature-view>
        <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop">
    </back-top>
</div>
</template>

<script>
import NavBar from "components/common/tabbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import Scroll from "components/common/scroll/Scroll.vue"

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendItem from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import {
    getHomeMultidata,
    getHomeGoods,

} from "network/home";

export default {
    components: {
        NavBar,
        HomeSwiper,
        RecommendItem,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners: [],
            recommends: [],
            titles: ["流行", "新款", "精选"],
            goods: {
                "pop": {
                    page: 0,
                    list: []
                },
                "new": {
                    page: 0,
                    list: []
                },
                "sell": {
                    page: 0,
                    list: []
                }
            },
            currentType: 'pop',
            isShowBackTop: false
        };
    },
    created() {
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {
        contentScroll(position) {
            console.log(position)
            this.isShowBackTop = (-position.y) > 1000
            console.log(this.isShowBackTop)

        },
        pullingUp() {
            console.log("上拉事件")
            this.getHomeGoods(this.currentType)
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)

        },
        /**
           获取网络请求
         */
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop';
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }

        },

        getHomeMultidata() {
            console.log("a");
            getHomeMultidata().then((res) => {
                // console.log(res.data)
                // console.log(typeof res.data.recommend)
                // console.log(res.data.recommend)

                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
                // res.data.banner.list
                // this.banners = res.data.banner.list
                // console.log(this.banners)
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then((res) => {
                // console.log(type)
                this.goods[type].list.push(...res.data.list)
                // console.log(this.goods[type].list);
                this.goods[type].page + 1
                // console.log(this.goods[type].page)
                // console.log(this.goods[type].list)
                this.$refs.scroll.finishPullUp()
            });
        },
    },
};
</script>

<style scoped>
.home-nav {
    background-color: #ff8198;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

}

.content {
    overflow: hidden;
    position: absolute;
    top: 22px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
