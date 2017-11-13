<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        <scroll
            ref="list"
            class="list"
            :data="songs"
            @scroll="scroll"
            :probeType="probeType"
            :listenScroll="listenScroll"
            :bounce="true">
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
                scrollY: 0
            }
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`
            }
        },
        created() {
            this.probeType = 3
            this.listenScroll = true
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.$refs.list.$el.style.top = `${this.imageHeight}px`
        },
        methods: {
            back() {
                this.$router.back()
            },
            scroll(pos) {
                this.scrollY = pos.y
            },
        },
        watch: {
            scrollY(newVal) {
                let scale = 1
                let zIndex = 0
                const percent = Math.abs(newVal / this.imageHeight)
                if (newVal > 0) {
                    console.log('超出高度，需要放大')
                    scale = 1 + percent
                    zIndex = 10
                    console.log(scale)
                } else {
                    console.log('正常范围内滚动')
                }
                // this.$refs.bgImage.style['padding-top'] = `scale(${scale})`
                // let x = this.$refs.bgImage.style['padding-top']
                // console.log(x)
                this.$refs.bgImage.style.paddingTop = '60%'
                this.$refs.bgImage.style['transform'] = `scale(${scale})`
                this.$refs.bgImage.style.zIndex = zIndex
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
