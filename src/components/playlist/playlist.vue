<template>
    <transition name="list-fade">
        <div class="m-playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-heard">
                    <div class="heard-l">
                        <span class="mode">
                            <i :class="iconMode"></i>
                            <span>{{modeText}} ( {{sequenceList.length}} )</span>
                        </span>
                    </div>
                    <div class="heard-r">
                        <span class="add">
                            <i class="icon-add"></i>
                            <span>添加到列队</span>
                        </span>
                        <span class="empty">
                            <i class="icon-empty"></i>
                        </span>
                    </div>
                </div>
                <scroll ref="listContent" :data="sequenceList" class="list-content">
                    <ul ref="list">
                        <li class="item" :class="{'current' : getCurrent(item)}" v-for="(item, index) in sequenceList" :key="item.id" @click="selectItem(item, index)">
                            <div class="item-l">
                                <i class="icon-voice" v-if="getCurrent(item)"></i>
                                <span class="name">{{item.name}}</span>
                                <span class="singer">- {{item.singer}}</span>
                            </div>
                            <div class="item-r">
                                <span class="like">
                                    <i class="icon-like_out"></i>
                                </span>
                                <span class="delete">
                                    <i class="icon-close"></i>
                                </span>
                            </div>
                        </li>
                    </ul>
                </scroll>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import {mapGetters, mapMutations} from 'vuex'
    import {playMode} from 'common/js/config'

    export default {
        data() {
            return {
                showFlag: false
            }
        },
        computed: {
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
            modeText() {
                const type = this.mode
                switch (type) {
                    case playMode.sequence:
                        return '顺序播放'
                        break
                    case playMode.loop:
                        return '单曲循环'
                        break
                    case playMode.random:
                        return '随机播放'
                        break
                    default:
                        break
                }
            },
            ...mapGetters([
              'sequenceList',
              'playlist',
              'currentSong',
              'mode'
            ])
        },
        created() {
        },
        methods: {
            show() {
                this.showFlag = true
                setTimeout(() => {
                    this.$refs.listContent.refresh()
                    this._scrollToCurrent(this.currentSong)
                }, 20)
            },
            hide() {
                this.showFlag = false
            },
            getCurrent(item) {
                return this.currentSong.id === item.id
            },
            selectItem(item, index) {
                if (this.mode === playMode.random) {
                    index = this.playlist.findIndex((song) => {
                        return song.id === item.id
                    })
                }
                this.setCurrentIndex(index)
                this.setPlayingState(true)
            },
            _scrollToCurrent(current) {
                const index = this.sequenceList.findIndex((song) => {
                    return song.id === current.id
                })
                this.$refs.listContent.scrollToElement(this.$refs.list.children[index], 300)
            },
            ...mapMutations({
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE'
            })
        },
        watch: {
            currentSong(newSong, oldSong) {
                if (!this.showFlag || oldSong.id === newSong.id) {
                    return
                }
                setTimeout(() => {
                    this._scrollToCurrent(newSong)
                }, 20)
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .m-playlist
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        z-index 200
        background $color-background-l
        &.list-fade-enter-active, &.list-fade-leave-active
            transition all 0.3s
            .list-wrapper
                transition all 0.3s
        &.list-fade-enter, &.list-fade-leave-to
            opacity 0
            .list-wrapper
                transform translate3d(0, 100%, 0)
        .list-wrapper
            position absolute
            left 0
            bottom 0
            width 100%
            background $color-background-w
            .list-heard
                display flex
                height 50px
                font-size $font-size-medium
                line-height 50px
                border-1px(rgba(7, 17, 27, 0.1))
                .heard-l
                    flex 1
                    .mode
                        padding 0 10px
                        display inline-block
                .heard-r
                    font-size 0
                    .empty
                        padding 0 10px
                        display inline-block
                        position relative
                        font-size $font-size-medium
                        vertical-align top
                        &:after
                            content ''
                            width 1px
                            height 50px
                            position absolute
                            top 0
                            left 0
                            background rgba(7, 17, 27, .1)
                            transform scale(.4)
                    .add
                        padding 0 10px
                        display inline-block
                        font-size $font-size-medium
                i
                    display inline-block
                    color $color-text-l
                    font-size $font-size-medium-x
                    font-weight bold
                    vertical-align middle
            .list-content
                padding 0 0 10px 10px
                max-height 240px
                overflow hidden
                border-1px(rgba(7, 17, 27, 0.1))
                .item
                    height 40px
                    display flex
                    color $color-text-ll
                    line-height 40px
                    border-1px(rgba(7, 17, 27, 0.1))
                    &.current
                        .item-l
                            .icon-voice, .name, .singer
                                color $color-theme
                    .item-l
                        padding-right 30px
                        flex 1
                        no-wrap()
                        .icon-voice
                            margin-right 3px
                            font-size $font-size-medium-x
                        .name
                            font-size 15px
                        .singer
                            color $color-text-l
                            font-size $font-size-small
                    .item-r
                        font-size 0
                        .like, .delete
                            padding 0 10px
                            display inline-block
                            font-size $font-size-medium-x
            .list-close
                color $color-theme
                font-size $font-size-medium
                line-height 40px
                text-align center
</style>