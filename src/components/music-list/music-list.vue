<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter"></div>
            <div class="tit-mask" ref="mask"></div>
        </div>
        <scroll
            ref="list"
            class="list"
            :data="songs"
            @scroll="scroll"
            :probeType="probeType"
            :listenScroll="listenScroll"
            :bounce="true">
            <song-list :songs="songs" @select="selectSong"></song-list>
            <div class="loading-container" v-if="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import SongList from 'base/song-list/song-list'
    import {mapActions} from 'vuex'

    const RESERVED_HEIGHT = 50

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
            this.minTransLateY = -this.imageHeight + RESERVED_HEIGHT
            this.$refs.list.$el.style.top = `${this.imageHeight}px`
        },
        methods: {
            back() {
                this.$router.back()
            },
            scroll(pos) {
                this.scrollY = pos.y
            },
            selectSong(song, index) {
                this.selectPlay({
                    list: this.songs,
                    index
                })
            },
            ...mapActions([
                'selectPlay'
            ])
        },
        watch: {
            scrollY(newVal) {
                let scale = 1
                let zIndex = 0
                const percent = Math.abs(newVal / this.imageHeight)
                const maxHeight = this.imageHeight - RESERVED_HEIGHT
                if (newVal >= 0) {
                    scale = 1 + percent
                    zIndex = 10
                    this.$refs.mask.style.background = 'rgba(0, 0, 0, 0)'
                } else if (newVal < 0 && newVal > -maxHeight) {
                    const opacity = percent * 0.65
                    this.$refs.mask.style.background = `rgba(0, 0, 0, ${opacity})`
                }

                if (newVal < this.minTransLateY) {
                    zIndex = 10
                    this.$refs.bgImage.style.paddingTop = 0
                    this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                } else {
                    this.$refs.bgImage.style.paddingTop = '60%'
                    this.$refs.bgImage.style.height = 0
                }
                this.$refs.bgImage.style['transform'] = `scale(${scale})`
                this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
                this.$refs.bgImage.style.zIndex = zIndex
            }
        },
        components: {
            Scroll,
            Loading,
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
            left 0
            z-index 50
            i
                padding 0 10px
                height 50px
                display block
                color $color-text-w
                font-size $font-size-large-x
                line-height 50px
        .title
            padding 0 50px
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
            transform-origin top
            background-size cover
            .filter
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                background rgba(0, 0, 0, .15)
            .tit-mask
                position absolute
                top 0
                left 0
                width 100%
                height 50px
        .list
            width 100%
            position fixed
            top 0
            bottom 0
            background $color-background
</style>
