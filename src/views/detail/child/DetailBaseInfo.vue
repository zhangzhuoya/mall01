<template>
<div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!--防止挂载后找不到goods报错，网络请求异步执行，-->
    <div class="base-info-title">
        {{goods.title}}
    </div>
    <div class="base-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span class="discount">{{goods.discount}}</span>

    </div>
    <div class="base-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.columns[2]}}</span>

    </div>
    <div class="base-service">
        <span class="base-service-item" v-for="index in goods.services.length" :key="index">
            <img :src="goods.services[index-1].icon">
            <span>{{goods.services[index-1].name}}</span>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: "DetailBaseInfo",
    props: {
        goods: {
            type: Object
        }
    },
    created() {
        // console.log(this.goods)
    },
}
</script>

<style>
.base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;

}

.base-info .base-info-title {
    color: #222;

}

.base-price {
    display: flex;
    margin-top: 10px;
    padding: 5px;
}

.base-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);

}

.base-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}

.base-price .discount {
    font-size: 12px;
    padding: 6px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    position: relative;
    top: -8px;
}

.base-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    justify-content: space-between;
}

.base-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}

.base-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
}

.base-service-item span {
    font-size: 13px;
    color: #333;
}
</style>
