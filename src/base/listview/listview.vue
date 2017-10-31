<template>
    <scroll ref="scroll"
            class="listview"
            @scroll="scroll"
            :data="data"
            :probeType="probeType"
            :listenScroll="listenScroll">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.title">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div v-if="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                scrollY: 0,
                listHeight: []
            }
        },
        created() {
            this.probeType = 3
            this.listenScroll = true
        },
        methods: {
            scroll(pos) {
                this.scrollY = Math.abs(Math.round(pos.y))
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
</style>
