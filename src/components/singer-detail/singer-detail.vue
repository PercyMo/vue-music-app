<template>
    <transition name="slide">
        <div class="singer-detail">
            歌手详情页面
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
            }
        },
        created() {
            console.log(this.$route)
        },
        mounted() {
            // console.log(this.$route)
        },
        methods: {
            
        },
        components: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .singer-detail
        width 100%
        position fixed
        top 0
        left 0
        bottom 0
        background $color-background
        z-index 100
</style>
