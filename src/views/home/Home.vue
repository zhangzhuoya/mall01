<template>
<div class="home">
    <nav-bar class="home-nav">
        <div slot="content">购物街</div>
    </nav-bar>
    <div class="content">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-item :recommends="recommends"></recommend-item>
        <feature-view></feature-view>
        <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </div>
</div>
</template>

<script>
import NavBar from "components/common/tabbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

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
        GoodsList
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
            currentType: 'pop'

        };
    },
    created() {
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

        // console.log('d')
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {
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
            const page = 1;
            getHomeGoods(type, page).then((res) => {
                console.log(type)
                this.goods[type].list = res.data.list
                // console.log(this.goods[type].list);
            });
        },
    },
};
</script>

<style>
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
    color: #fff;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
