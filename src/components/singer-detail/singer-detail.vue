<template>
    <transition name="slide">
        <div class="singer-detail">
            歌手详情页面
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                mao: {}
            }
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            console.log(this.singer)
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
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        z-index 100
        &.slide-enter-active, &.slide-leave-active
            transition all .3s
        &.slide-enter, &.slide-leave-to
            transform translate3d(100%, 0, 0)
</style>
