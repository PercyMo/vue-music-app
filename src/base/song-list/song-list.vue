<template>
    <div class="song-list">
        <ul>
            <li v-for="(song, index) in songs" :key="index" class="single" @click="selectSong(song, index)">
                <div class="rank">
                    <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: () => []
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getRankCls(index) {
                if (this.rank) {
                    if (index === 0) {
                        return 'top'
                    } else if (index === 1) {
                        return 'top1'
                    } else if (index === 2) {
                        return 'top2'
                    }
                }
                return ''
            },
            getRankText(index) {
                return index + 1
            },
            getDesc(song) {
                return `${song.singer} - ${song.album}`
            },
            selectSong(song, index) {
                this.$emit('select', song, index)
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
                .top
                    color #f00
                    font-size $font-size-large
                .top1
                    color #00cd66
                    font-size $font-size-large
                .top2
                    color #00bfff
                    font-size $font-size-large
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
            &:last-child
                .content
                    &:after
                        display none
</style>