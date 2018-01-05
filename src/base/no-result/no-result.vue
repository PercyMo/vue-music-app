<template>
    <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .no-result
        text-align center
        .no-result-icon
            margin 0 auto
            width 88px
            height 32px
            bg-image('no-result')
            background-size: 88px 32px
        .no-result-text
            margin-top 30px
            color $color-text-l
            font-size $font-size-medium
</style>