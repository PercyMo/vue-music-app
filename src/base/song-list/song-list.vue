<template>
    <div class="song-list">
        <ul>
            <li v-for="(song, index) in songs" :key="index" class="single">
                <div class="rank">
                    <span v-text="getRankText(index)"></span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
        <div class="test-icon">
            <i class="icon-close"></i>
            <i class="icon-random"></i>
            <i class="icon-voice"></i>
            <i class="icon-play"></i>
            <i class="icon-add"></i>
            <i class="icon-back"></i>
            <i class="icon-stop"></i>
            <i class="icon-like_out"></i>
            <i class="icon-loop_single"></i>
            <i class="icon-loop_all"></i>
            <i class="icon-empty"></i>
            <i class="icon-like_on"></i>
            <i class="icon-playlist"></i>
            <i class="icon-prev_song"></i>
            <i class="icon-next_song"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        methods: {
            getRankText(index) {
                return index + 1
            },
            getDesc(song) {
                return `${song.singer} - ${song.album}`
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .song-list
        background $color-background
        .single
            height 64px
            display flex
            box-sizing border-box
            .rank
                width 50px
                height 64px
                display flex
                flex 0 0 50px
                align-items center
                justify-content center
                color $color-text-d
                font-size $font-size-medium-x
                text-align center
            .content
                padding-right 40px
                height 64px
                display flex
                flex 1
                line-height 20px
                flex-direction column
                justify-content center
                overflow hidden
                border-1px(rgba(7, 17, 27, 0.1))
                .name
                    no-wrap()
                    color $color-text
                    font-size $font-size-medium
                .desc
                    no-wrap()
                    color $color-text-d
                    font-size $font-size-small
                    
        .test-icon
            box-sizing border-box
            padding 20px
            z-index 100
            width 100%
            position fixed
            top 0
            left 0
            background rgba(0, 0, 0, .7)
            font-size 0
            i
                padding 5px
                display inline-block
                color #fff
                font-size 24px
</style>