<template>
    <div class="m-player" v-show="playlist.length">
        <transition name="normal"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.image" width="100%" height="100%">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>




               <!--  <div id="example-4">
                  <button @click="show = !show">
                    Toggle
                  </button>
                  <transition
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
                    v-bind:css="false"
                  >
                    <div v-if="show">
                        正常文本
                      <div ref="test">Demo</div>
                    </div>
                  </transition>
                </div> -->





                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
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
                        <span class="time time-l">当前时间</span>
                        <div class="progress-wrapper">
                            进度条
                        </div>
                        <span class="time time-r">总时长</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-loop_single"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev_song"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next_song"></i>
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
                    <img :src="currentSong.image" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i class="icon-play"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    import Velocity from 'velocity-animate'

    export default {
        data() {
            return {
                show: false
            }
        },
        computed: {
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong'
            ])
        },
        created() {
            console.log(this.currentSong)
        },
        methods: {
            back() {
                this.setFullScreen(false)
            },
            open() {
                this.setFullScreen(true)
            },





            // beforeEnter: function (el) {
            //     console.log('测试：beforeEnter')
            //   this.$refs.test.style.opacity = 0
            //   this.$refs.test.style.transformOrigin = 'left'
            // },
            // enter: function (el, done) {
            //     console.log('enter')
            //   Velocity(this.$refs.test, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
            //   Velocity(this.$refs.test, { fontSize: '1em' }, { complete: done })
            // },
            // leave: function (el, done) {
            //   console.log('leave')
            //   Velocity(this.$refs.test, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
            //   Velocity(this.$refs.test, { rotateZ: '100deg' }, { loop: 2 })
            //   Velocity(this.$refs.test, {
            //     rotateZ: '45deg',
            //     translateY: '30px',
            //     translateX: '30px',
            //     opacity: 0
            //   }, { complete: done })
            // },




            beforeEnter(el) {
                this.$refs.cdWrapper.style.opacity = 0
                // this.$refs.cdWrapper.style.transformOrigin = 'left'
                this.$refs.cdWrapper.style['translateX'] = '30px'
            },
            enter(el, done) {
                Velocity(this.$refs.cdWrapper, { opacity: 1, translateX: '0px' }, { duration: 400 }, { complete: done })
            },
            leave(el, done) {
                Velocity(this.$refs.cdWrapper, { opacity: 0, translateX: '30px' }, { duration: 400 }, { complete: done })
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        },
        components: {
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
                opacity .6
                filter blur(20px)
            .top
                padding 0 50px
                height 50px
                display flex
                flex-direction column
                justify-content center
                position relative
                // border-1px(rgba(0, 0, 0, 0.5))
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
                            border 6px solid rgba(255, 255, 255, 0.1)
                            border-radius 50%
                            .image
                                width 100%
                                height 100%
                                position absolute
                                top 0
                                left 0
                                border-radius 50%
            .bottom
                width 100%
                position absolute
                bottom 50px
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
                    width 80%
                    display flex
                .operators
                    display flex
                    align-items center
                    .icon
                        flex 1
                        color $color-theme-w
                        text-align center
                        i
                            font-size 26px
                        .icon-prev_song, .icon-next_song
                            color rgba(255, 255, 255, 0.8)
                            font-size 30px
                    .i-center
                        i
                            color rgba(255, 255, 255, 0.8)
                            font-size 45px
            &.normal-enter-active, &.normal-leave-active
                transition: all .4s
                .top, .bottom
                    transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
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
            &.mini-enter-active, &.mini-leave-active
                transition: all .4s
            &.mini-enter, &.mini-leave-to
                opacity 0
</style>