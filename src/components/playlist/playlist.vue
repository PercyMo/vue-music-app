<template>
    <transition name="list-fade">
        <div class="m-playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-heard">
                    <div class="heard-l">
                        <span class="mode" @click="changeMode">
                            <i :class="iconMode"></i>
                            <span>{{modeText}} ( {{sequenceList.length}} )</span>
                        </span>
                    </div>
                    <div class="heard-r">
                        <span class="add">
                            <i class="icon-add"></i>
                            <span>添加到列队</span>
                        </span>
                        <span class="empty" @click="showConfirm">
                            <i class="icon-empty"></i>
                        </span>
                    </div>
                </div>
                <scroll ref="listContent" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
                    <transition-group ref="list" name="list" tag="ul">
                        <li class="item" :class="{'current' : getCurrent(item)}" v-for="(item, index) in sequenceList" :key="item.id" @click="selectItem(item, index)">
                            <div class="item-l">
                                <i class="icon-voice" v-if="getCurrent(item)"></i>
                                <span class="name">{{item.name}}</span>
                                <span class="singer">- {{item.singer}}</span>
                            </div>
                            <div class="item-r">
                                <span class="like" @click.stop="toggleFaviorite(item)">
                                    <i :class="getFavoriteIcon(item)"></i>
                                </span>
                                <span class="delete" @click.stop="deleteOne(item)">
                                    <i class="icon-close"></i>
                                </span>
                            </div>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @confirm="deleteSongList" text="是否清空播放列表？" confirmBtnText="清空"></confirm>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {playMode} from 'common/js/config'
    import {playerMixin} from 'common/js/mixin'
    import Confirm from 'base/confirm/confirm'

    export default {
        mixins: [playerMixin],
        data() {
            return {
                showFlag: false,
                refreshDelay: 120
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
              'playlist'
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
            deleteOne(item) {
                this.deleteSong(item)
                if (!this.sequenceList.length) {
                    this.hide()
                }
            },
            showConfirm() {
                this.$refs.confirm.show()
            },
            deleteSongList() {
                this.deleteSongList()
                this.hide()
            },
            _scrollToCurrent(current) {
                const index = this.sequenceList.findIndex((song) => {
                    return song.id === current.id
                })
                this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
            },
            ...mapMutations({
                setPlayingState: 'SET_PLAYING_STATE'
            }),
            ...mapActions([
                'deleteSong',
                'deleteSongList'
            ])
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
            Scroll,
            Confirm
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
                    overflow hidden
                    border-1px(rgba(7, 17, 27, 0.1))
                    &.list-enter-active, &.list-leave-active
                        transition all 0.1s
                    &.list-enter, &.list-leave-to
                        height 0
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
                            .icon-like_on
                                color $color-red
            .list-close
                color $color-theme
                font-size $font-size-medium
                line-height 40px
                text-align center
</style>