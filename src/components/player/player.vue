<template>
    <div class="m-player" v-show="playList.lenrth">
        <div class="normal-player" v-show="fullScreen">
            全屏播放页面
        </div>
        <div class="mini-player" v-show="!fullScreen">
            <div class="icon">
                <img src="" width="40" height="40">
            </div>
            <div class="text">
                <h2 class="name">泡沫</h2>
                <p class="desc">这里是当前播放的歌词</p>
            </div>
            <div class="control">
                <i class="icon-play"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters([
                'fullScreen',
                'playList'
            ])
        },
        created() {
        },
        methods: {
            
        },
        components: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .m-player
        .mini-player
            width 100%
            height 50px
            display flex
            position fixed
            left 0
            bottom 0
            z-index 180
            background $color-background-w
            .icon
                flex 0 0 40px
                width 40px
                padding 5px
                img
                    border-radius 50%
            .text
                display flex
                flex 1
                flex-direction column
                justify-content center
                line-height 18px
                overflow hidden
                .name
                    no-wrap()
                    font-size $font-size-medium
                .desc
                    no-wrap()
                    color $color-text-d
                    font-size $font-size-small
            .control
                width 30px
                flex 0 0 30px
</style>
