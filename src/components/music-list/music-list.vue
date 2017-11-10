<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
    </div>
</template>

<script type="text/ecmascript-6">
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
            }
        },
        created() {
        },
        methods: {
            back() {
                this.$router.back()
            }
        },
        components: {
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
        background #666
        z-index 100
        .back
            position absolute
            top 0
            left 6px
            z-index 50
            i
                padding 0 10px
                height 50px
                display block
                color $color-text-w
                font-size $font-size-large-x
                line-height 50px
        .title
            padding 0 60px
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
</style>
