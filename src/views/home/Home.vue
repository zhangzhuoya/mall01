<template>
<div class="home">
    <div class="home-nav">
        <nav-bar>
            <div slot="content">购物街</div>
        </nav-bar>
    </div>
    <tab-control :titles="titles" @tabClick="tabClick" class="tab-item" ref="tab1" v-if="isTabShow"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="pullingUp">
        <home-swiper :banners="banners" @swiperOnLoad="swiperOnLoad" :isLoad="isLoad"></home-swiper>
        <recommend-item :recommends="recommends"></recommend-item>
        <feature-view></feature-view>
        <tab-control :titles="titles" @tabClick="tabClick" ref="tab2"></tab-control>
        <goods-list :goods="showGoods" :imageType="imageType"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"> </back-top>
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
    itemListenerMixin
} from "common/mixin.js"
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
    mixins: [itemListenerMixin],

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
            imageType: "img",
            currentType: 'pop',
            isShowBackTop: false,
            isTabShow: false,
            isLoad: false,
            saveY: 0,
        };
    },
    mounted() {
        // console.log(this.$ref.$el.)
        // 监听图片是否加载完成，注册全局事件
        // const newRefresh = this.debounce(this.$refs.scroll.refresh, 100)
        // this.$bus.$on('itemImgOnload', this.itemImgListener)
        // // this.swiperOnLoad()
        // this.itemImgListener = () => {
        //     newRefresh()
        // }

    },
    created() {
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
        // this.$refs.scroll.refresh()

    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        },

    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        // 进行刷新
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.scroll.y;
        // 2. 取消对全局事件的监听
        this.$bus.$off('itemImgOnload', this.itemImgListener)
    },
    methods: {
        debounce(func, delay) {
            let timer = null;
            return function () {
                timer && clearInterval(timer);
                timer = setTimeout(() => {
                    func.apply(null, arguments)
                }, delay)
            }
        },
        contentScroll(position) {
            // console.log(position)
            this.isShowBackTop = (-position.y) > 1000
            // console.log(this.isShowBackTop)
            this.isTabShow = (-position.y) > this.swiperOnLoad()
        },
        swiperOnLoad() {
            return this.$refs.tab2.$el.offsetTop
        },
        pullingUp() {
            // console.log("上拉事件")
            this.getHomeGoods(this.currentType)
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },

        //对监听事件保存

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
            this.$refs.tab1.curIndex = index;
            this.$refs.tab2.curIndex = index;

        },

        getHomeMultidata() {
            // console.log("a");
            getHomeMultidata().then((res) => {
                // console.log(res.data)
                // console.log(typeof res.data.recommend)
                // console.log(res.data.recommend)

                this.banners = res.data.banner.list;
                // console.log(this.banners)
                this.recommends = res.data.recommend.list;
                // res.data.banner.list
                // this.banners = res.data.banner.list
                // console.log(this.banners)
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then((res) => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page + 1
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

.tab-item {
    position: relative;
    top: 43px;
    background: white;
    z-index: 10;
}

.content {
    overflow: hidden;
    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
