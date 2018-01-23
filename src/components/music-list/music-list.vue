<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div ref="playBtn" v-if="songs.length > 0" @click.stop.prevent="random" class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
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
            <song-list :songs="songs" :rank="rank" @select="selectSong"></song-list>
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
    import {prefixStyle} from 'common/js/dom'
    import {playlistMixin} from 'common/js/mixin'

    const RESERVED_HEIGHT = 50
    const transform = prefixStyle('transform')

    export default {
        mixins: [playlistMixin],
        props: {
            songs: {
                type: Array,
                default: () => []
            },
            title: {
                type: String,
                default: ''
            },
            bgImage: {
                type: String,
                default: ''
            },
            rank: {
                type: Boolean,
                default: false
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
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '50px' : ''
                this.$refs.list.$el.style.bottom = bottom
                this.$refs.list.refresh()
            },
            back() {
                this.$router.back()
            },
            random() {
                this.randomPlay({
                    list: this.songs
                })
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
                'selectPlay',
                'randomPlay'
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
                    this.$refs.playBtn.style.display = 'none'
                } else {
                    this.$refs.bgImage.style.paddingTop = '60%'
                    this.$refs.bgImage.style.height = 0
                    this.$refs.playBtn.style.display = ''
                }
                this.$refs.bgImage.style[transform] = `scale(${scale})`
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
            transform translate3d(0, 0, 0)
            .play-wrapper
                width 100%
                position absolute
                bottom 20px
                z-index 50
                .play
                    margin 0 auto
                    padding 7px 0
                    width 135px
                    color $color-text-w
                    font-size 0
                    text-align center
                    border 1px solid $color-theme-w
                    border-radius 100px
                    .icon-play
                        margin-right 6px
                        display inline-block
                        font-size $font-size-medium-x
                        vertical-align middle
                    .text
                        display inline-block
                        font-size $font-size-small
                        vertical-align middle
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
