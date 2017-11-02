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
                    <li v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" v-if="shortcutlist.length" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutlist"
                    :key="index"
                    :data-index="index"
                    class="shortcut-item"
                    :class="{'current': index === currentIndex}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-if="shortcutlist.length">
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
                listHeight: [],
                currentIndex: 0
            }
        },
        created() {
            this.probeType = 3
            this.listenScroll = true
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
                    }
                }
            }
        },
        methods: {
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
            scroll(pos) {
                this.scrollY = Math.abs(Math.round(pos.y))
                console.log(this.scrollY)
            },
            onShortcutTouchStart(e) {
                console.log(e)
                let anchorIndex = getData(e.target, 'index')

                this._scrollTo(anchorIndex)
                
            },
            onShortcutTouchMove(e) {
                console.log(e.touches[0].pageY)
            },
            _scrollTo(index) {
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
                let y = this.$refs.listview.scroll.y
                this.scrollY = -y
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
                transform scale(.8)
                &.current
                    color $color-text
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
