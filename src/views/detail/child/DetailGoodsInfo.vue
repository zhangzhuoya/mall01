<template>
<div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="start"></div>
    <div class="detail-desc">
        {{detailInfo.desc}}

    </div>
    <div class="end"></div>
    <div class="xg">
        穿着效果
    </div>
    <div class="info-list">
        <img :src="item" alt="" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" />
    </div>

</div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    components: {

    },
    props: {
        detailInfo: {
            type: Object,

        }

    },
    mounted() {
        // console.log(this.detailInfo)
    },
    methods: {
        // detailImageLoad() {
        //     this.$emit.detailImageLoad();
        // }
    }
}
</script>

<style>
.detail-goods-info {

    margin-top: 10px;

}

.detail-desc {
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.start {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
    margin-left: 10px;
}

.start::before {
    width: 5px;
    height: 5px;
    background: black;
    position: absolute;
    content: '';
    bottom: 0px;

}

.end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
    margin-left: 270px;

}

.end::after {
    width: 5px;
    height: 5px;
    background: black;
    position: absolute;
    content: '';
    top: 0px;
    left: 90px;

}

.info-list img {
    width: 100%;
}
</style>
