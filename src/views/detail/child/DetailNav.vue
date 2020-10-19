<template>
<div class="tab">
    <detail-item>
        <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg">
        <div class="content-item" slot="content">
            <div v-for="(item,index) in titles" :key="index" class="detail-item" @click="detailClick(index)" :class="{'active':detailIndex==index}">
                {{item}}
            </div>
        </div>

    </detail-item>
</div>
</template>

<script>
import DetailItem from "@/components/common/tabbar/NavBar.vue"
export default {
    components: {
        DetailItem
    },
    data() {
        return {
            titles: ["商品", "参数", "评论", "推荐"],
            detailIndex: 0
        }
    },
    methods: {
        detailClick(index) {
            console.log(index)
            // this.$emit('detailClick', index)
            this.detailIndex = index

        },
        backClick() {
            this.$router.back()
        }
    }

}
</script>

<style scoped>
.back {
    margin-top: 12px;
}

.content-item {
    display: flex;
    font-size: 14px;

}

.detail-item {
    flex: 1;
}

.detail-item.active {
    color: var(--color-high-text);
}
</style>
