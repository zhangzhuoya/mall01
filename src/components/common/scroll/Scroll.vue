<template>
<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null,
            message: '哈哈哈'
        }
    },
    mounted() {
        // 1.创建BScroll对象
        // console.log('scoll组件创建了')
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        // 2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
            // console.log(position);
            this.$emit('scroll', position)
        })

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {
            // console.log('上拉事件')
            this.$emit('pullingUp')
        })
        // console.log(this.scroll.wrapper)
    },
    methods: {
        scrollTo(x, y, time = 300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
            console.log('调用刷新方法了')
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style scoped>

</style>
