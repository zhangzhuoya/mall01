<template>
<div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
        <a :href="item.link">
            <img :src="item.image" />
            <div>{{item.title}}</div>
        </a>
    </div>
</div>
</template>

<script>
export default {
    props: {
        recommends: {
            type: Array,
            default () {
                return []
            }
        },
        // imageType: {
        //     type: String,

        // }
    },
    mounted() {
        // console.log(this.recommends);
        // console.log(this.imagType)
    },
    // computed: {
    //     getImg() {
    //         return this.item.img || this.item.image || this.item.show.img
    //     }
    // }

}
</script>

<style>
.recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
}

.recommend-item {
    flex: 1;
}

.recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>
