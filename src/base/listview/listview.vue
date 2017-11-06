<template>
    <scroll ref="listview"
            class="listview"
            @scroll="scroll"
            :data="data"
            :probeType="probeType"
            :listenScroll="listenScroll">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" v-if="shortcutlist.length" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop.prevent="onShortcutTouchEnd">
            <ul>
                <li v-for="(item, index) in shortcutlist"
                    :key="index"
                    :data-index="index"
                    class="shortcut-item"
                    :class="{'current': index === currentIndex}">
                    <span :data-index="index">{{item}}</span>
                </li>
            </ul>
        </div>
        <div class="shortcut-card" v-show="cardShow">
            {{shortcutlist[currentIndex]}}
        </div>
        <div class="list-fixed" ref="fixed" v-if="fixedTitle">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
        <div v-if="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import {getData} from 'common/js/dom'

    const ANCHOR_HEIGHT = 18
    const TITLE_HEIGHT = 26

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutlist() {
                return this.data.map((group) => {
                    return group.title.slice(0, 1)
                })
            },
            fixedTitle() {
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        data() {
            return {
                scrollY: 0,
                currentIndex: 0,
                cardShow: false,
                diff: 0
            }
        },
        created() {
            this.probeType = 3
            this.listenScroll = true
            this.touch = {}
            this.listHeight = []
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (newY >= height1 && newY < height2) {
                        this.currentIndex = i
                        this.diff = height2 - newY
                        break
                    }
                }
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
            }
        },
        methods: {
            scroll(pos) {
                this.scrollY = Math.abs(Math.round(pos.y))
            },
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this.cardShow = true

                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta

                this._scrollTo(anchorIndex)
            },
            onShortcutTouchEnd() {
                setTimeout(() => {
                    this.cardShow = false
                }, 200)
            },
            selectItem(item) {
                this.$emit('select', item)
            },
            _calculateHeight() {
                this.listHeight = []
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            _scrollTo(index) {
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                this.scrollY = this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            }
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .listview
        width 100%
        height 100%
        position relative
        overflow hidden
        background-color $color-background
        .list-group
            padding-bottom 30px
            .list-group-title
                padding-left 20px
                height 26px
                color $color-text-l
                font-size $font-size-small
                line-height 26px
                background $color-background-s
            .list-group-item
                padding 20px 0 0 30px
                display flex
                align-items center
                .avatar
                    width 50px
                    height 50px
                    border-radius 50%
                    background $color-background-d
                .name
                    margin-left 20px
                    color: $color-text
                    font-size: $font-size-medium
        .list-shortcut
            padding 10px 0
            width 20px
            position absolute
            top 50%
            right 0
            font-family Helvetica
            text-align center
            transform translateY(-50%)
            border-radius 10px
            background-color $color-background-d
            .shortcut-item
                padding 3px
                color $color-text-w
                font-size $font-size-small
                line-height 1
                &.current
                    color $color-text
                span
                    display block
                    transform scale(.8)
        .shortcut-card
            width 50px
            height 60px
            position absolute
            top 40%
            left 50%
            color $color-text-w
            font-size 32px
            line-height 60px
            text-align center
            border-radius $border-radius
            background $color-background-m
            transform translateX(-50%)
            box-shadow 0 0 5px #666
        .list-fixed
            width 100%
            position absolute
            top 0
            left 0
            .fixed-title
                padding-left 20px
                height 26px
                color $color-text-l
                font-size $font-size-small
                line-height 26px
                background $color-background-s
</style>