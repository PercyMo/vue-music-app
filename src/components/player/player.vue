<template>
    <div class="m-player" v-show="playlist.length">
        <transition name="normal">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.image" width="auto" height="100%">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <transition
                            @enter="enter"
                            @leave="leave"
                            @after-leave="afterLeave"
                            :css="false"
                        >
                            <div class="cd-wrapper" v-show="fullScreen">
                                <div class="cd" :class="cdCls">
                                    <img class="image" :src="currentSong.image">
                                </div>
                            </div>
                        </transition>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">
                                此处缺省歌词
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <div class="time time-l">
                            <span>{{format(currentTime)}}</span>
                        </div>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressChange"></progress-bar>
                        </div>
                        <div class="time time-r">
                            <span>{{format(currentSong.duration)}}</span>
                        </div>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="iconMode"  @click.stop.prevent="changeMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i @click="prev" class="icon-prev_song"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i :class="playIcon" @click.stop.prevent="togglePlaying"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i @click="next" class="icon-next_song"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-like_out"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img :class="cdCls" :src="currentSong.image" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle :radius="radius" :percent="percent">
                        <i @click.stop.prevent="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    import ProgressBar from 'base/progress-bar/progress-bar'
    import ProgressCircle from 'base/progress-circle/progress-circle'
    import Velocity from 'velocity-animate'
    import {prefixStyle} from 'common/js/dom'
    import {playMode} from 'common/js/config'
    import {shuffle} from 'common/js/util'
    import Lyric from 'common/js/lyric-parser'
    

    const transform = prefixStyle('transform')

    export default {
        data() {
            return {
                songReady: false,
                currentTime: 0,
                radius: 28
            }
        },
        computed: {
            playIcon() {
                return this.playing ? 'icon-stop' : 'icon-play'
            },
            miniIcon() {
                return this.playing ? 'icon-mini-stop' : 'icon-mini-play'
            },
            iconMode() {
                const type = this.mode
                switch (type) {
                    case playMode.sequence:
                        return 'icon-loop_all'
                        break
                    case playMode.loop:
                        return 'icon-loop_single'
                        break
                    case playMode.random:
                        return 'icon-random'
                        break
                    default:
                        break
                }
            },
            cdCls() {
                return this.playing ? 'play' : 'play pause'
            },
            disableCls() {
                return this.songReady ? '' : 'disable'
            },
            percent() {
                return this.currentTime / this.currentSong.duration
            },
            ...mapGetters([
                'fullScreen',
                'playlist',
                'sequenceList',
                'currentIndex',
                'currentSong',
                'playing',
                'mode'
            ])
        },
        created() {
        },
        methods: {
            back() {
                this.setFullScreen(false)
            },
            open() {
                this.setFullScreen(true)
            },
            enter(el, done) {
                const {x, y, scale} = this._getPosAndScale()

                Velocity(el, { translateY: y, translateX: x, scale: scale }, { duration: 0 }, { easing: "linear" } )
                Velocity(el, { translateY: 0, translateX: 0, scale: 1.1 }, { duration: 300 }, { easing: "linear" })
                Velocity(el, { scale: 1 }, { easing: "ease" }, { duration: 30 }, { complete: done })
            },
            leave(el, done) {
                el.style.transition = 'all 0.4s'
                const {x, y, scale} = this._getPosAndScale()
                el.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
                el.addEventListener('transitionend', done)
            },
            afterLeave(el) {
                el.style.transition = ''
                el.style[transform] = ''
            },
            togglePlaying() {
                if (!this.songReady) {
                    return
                }
                this.setPlayingState(!this.playing)
            },
            end() {
                if (this.mode === playMode.loop) {
                    this.loop()
                } else {
                    this.next()
                }
            },
            loop() {
                this.$refs.audio.currentTime = 0
                this.$refs.audio.play()
            },
            prev() {
                if (!this.songReady) {
                    return
                }
                let index = this.currentIndex - 1
                if (index === -1) {
                    index = this.playlist.length - 1
                }
                this.setCurrentIndex(index)
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.songReady = false
            },
            next() {
                if (!this.songReady) {
                    return
                }
                let index = this.currentIndex + 1
                if (index === this.playlist.length) {
                    index = 0
                }
                this.setCurrentIndex(index)
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.songReady = false
            },
            ready() {
                this.songReady = true
            },
            error() {
                this.songReady = true
            },
            timeupdate(e) {
                this.currentTime = e.target.currentTime
            },
            format(time) {
                time =  time | 0
                const minute = this._pad(time / 60 | 0)
                const second = this._pad(time % 60)
                return `${minute}:${second}`
            },
            onProgressChange(precent) {
                const currTime = this.currentSong.duration * precent
                this.$refs.audio.currentTime = currTime

            },
            getLyric() {
                this.currentSong.getLyric().then((lyric) => {
                    if (this.currentSong.lyric !== lyric) {
                        return
                    }
                    console.log(lyric)
                })
            },
            changeMode() {
                const mode = (this.mode + 1) % 3
                this.setPlayMode(mode)
                let list = []
                if (this.mode === playMode.random) {
                    list = shuffle(this.sequenceList)
                } else {
                    list = this.sequenceList
                }
                this._resetCurrentIndex(list)
                this.setPlayList(list)
            },
            _resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id
                })
                this.setCurrentIndex(index)
            },
            _pad(num, n = 2) {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len++
                }
                return num
            },
            _getPosAndScale() {
                const targetWidth = 20
                const paddingLeft = 40
                const paddingBottom = 30
                const paddingTop = 125
                const width = window.innerWidth * 0.7
                const scale = targetWidth / width
                const x = -(window.innerWidth / 2 - paddingLeft)
                const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
                return {
                    x,
                    y,
                    scale
                }
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAYLIST'
            })
        },
        watch: {
            currentSong(newSong, oldSong) {
                if (!newSong.id) {
                    return
                }
                if (newSong.id === oldSong.id) {
                    return
                }
                this.$nextTick(() => {
                    this.$refs.audio.play()
                    this.getLyric()
                })
            },
            playing(newPlaying) {
                const audio = this.$refs.audio
                this.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause()
                })
            }
        },
        components: {
            ProgressBar,
            ProgressCircle
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .m-player
        .normal-player
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            z-index 150
            background $color-background-b
            .background
                position absolute
                left 0
                top 0
                width 100%
                height 100%
                z-index -1
                overflow hidden
                opacity .6
                filter blur(30px)
            .top
                padding 0 50px
                height 50px
                display flex
                flex-direction column
                justify-content center
                position relative
                .back
                    position absolute
                    top 0
                    left 0
                    z-index 50
                    .icon-back
                        padding 0 10px
                        height 50px
                        display block
                        color $color-text-w
                        font-size $font-size-large-x
                        line-height 50px
                .title
                    height 24px
                    no-wrap()
                    color $color-text-w
                    font-size $font-size-medium-x
                    line-height 24px
                    box-sizing border-box
                .subtitle
                    line-height 16px
                    color $color-theme-w
                    font-size $font-size-small
            .middle
                width 100%
                position fixed
                top 80px
                bottom 170px
                font-size 0
                .middle-l
                    margin-top 45px
                    padding-top 70%
                    width 100%
                    height 0
                    position relative
                    display inline-block
                    vertical-align top
                    .cd-wrapper
                        width 70%
                        height 100%
                        position absolute
                        left 15%
                        top 0
                        .cd
                            width 100%
                            height 100%
                            position relative
                            box-sizing border-box
                            border 5px solid rgba(255, 255, 255, .1)
                            border-radius 50%
                            transform translate3d(0, 0, 0)
                            overflow hidden
                            &:after
                                content ' '
                                position absolute
                                top -12px
                                left -12px
                                right -12px
                                bottom -12px
                                background url(./cd-bg.png) no-repeat
                                background-size contain
                                z-index 2
                            &.play
                                animation rotate 30s linear infinite
                            &.pause
                                animation-play-state paused
                            .image
                                width 74%
                                height 74%
                                position absolute
                                top 13%
                                left 13%
                                border-radius 50%
            .bottom
                width 100%
                position absolute
                bottom 30px
                .dot-wrapper
                    font-size 0
                    text-align center
                    .dot
                        margin 0 4px
                        width 6px
                        height 6px
                        display inline-block
                        vertical-align middle
                        border-radius 50%
                        background $color-text-l
                .progress-wrapper
                    margin 0 auto
                    padding 10px 0
                    width 86%
                    display flex
                    .progress-bar-wrapper
                        flex 1
                    .time
                        width 30px
                        flex 0 0 35px
                        color $color-theme-w
                        font-size $font-size-small
                        line-height 30px
                        span
                            display block
                            transform scale(.8)
                        &.time-l
                            text-align left
                        &.time-r
                            text-align right
                .operators
                    display flex
                    align-items center
                    .icon
                        flex 1
                        color $color-theme-w
                        text-align center
                        &.disable
                            i
                                color $color-theme-w
                        i
                            font-size 26px
                        .icon-prev_song, .icon-next_song
                            color rgba(255, 255, 255, .8)
                            font-size 30px
                    .i-center
                        i
                            color rgba(255, 255, 255, .8)
                            font-size 45px
            &.normal-enter-active, &.normal-leave-active
                transition: all .4s
                .top, .bottom
                    transition all .4s cubic-bezier(.86, .18, .82, 1.32)
            &.normal-enter, &.normal-leave-to
                opacity 0
                .top
                    transform translate3d(0, -100px, 0)
                .bottom
                    transform translate3d(0, 100px , 0)
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
                    &.play
                        animation rotate 30s linear infinite
                    &.pause
                        animation-play-state paused
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
                padding 10px 10px 0
                width 28px
                flex 0 0 28px
                .icon-mini-stop, .icon-mini-play
                    color $color-background-b
                    font-size 28px
                .icon-playlist
                    padding-top 4px
                    display block
                    color $color-text-l
                    font-size 21px
                .icon-mini
                    padding-top 1px
                    display block
                    position absolute
                    top 0
                    left 0
            &.mini-enter-active, &.mini-leave-active
                transition: all .4s
            &.mini-enter, &.mini-leave-to
                opacity 0

    @keyframes rotate
        0%
            transform rotate(0)
        100%
            transform rotate(360deg)
</style>