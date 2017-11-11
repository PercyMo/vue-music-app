<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        <scroll ref="list" class="list" :data="songs">
            <song-list :songs="songs"></song-list>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'

    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            bgImage: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
            }
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`
            }
        },
        created() {
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.$refs.list.$el.style.top = `${this.imageHeight}px`
        },
        methods: {
            back() {
                this.$router.back()
            }
        },
        components: {
            Scroll,
            SongList
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .music-list
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        z-index 100
        .back
            position absolute
            top 0
            left 6px
            z-index 50
            i
                padding 0 10px
                height 50px
                display block
                color $color-text-w
                font-size $font-size-large-x
                line-height 50px
        .title
            padding 0 60px
            height 50px
            position absolute
            top 0
            left 0
            width 100%
            no-wrap()
            color $color-text-w
            font-size $font-size-large
            text-align left
            line-height 50px
            z-index 40
            box-sizing border-box
        .bg-image
            position relative
            padding-top 60%
            width 100%
            height 0
            background-size cover
            background-position center center
        .list
            width 100%
            position fixed
            top 0
            bottom 0
            background $color-background
</style>
