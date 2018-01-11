<template>
    <transition name="list-fade">
        <div class="m-playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-heard">
                    <div class="heard-l">
                        <span class="mode">
                            <i class="icon-random"></i>
                            <span>随机播放 ( {{sequenceList.length}} )</span>
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
                <ul class="list-content">
                    <li class="item" :class="{'current' : getCurrent(item)}" v-for="(item, index) in sequenceList" :key="item.id">
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
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                showFlag: false
            }
        },
        computed: {
            ...mapGetters([
              'sequenceList',
              'currentSong'
            ])
        },
        created() {
        },
        methods: {
            show() {
                this.showFlag = true
            },
            hide() {
                this.showFlag = false
            },
            getCurrent(item) {
                return this.currentSong.id === item.id
            }
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