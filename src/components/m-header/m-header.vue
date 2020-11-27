<template>
    <div class="m-header">
        <div class="m-header-icon"></div>
        <h1 class="m-header-title">Music 音乐台-唯我所爱 2020.11.04</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .m-header
        height 44px
        position relative
        color $color-text-w
        text-align center
        font-size 0
        background-color $color-theme
        // background-color #f55
    .m-header-icon
        margin-top: 6px
        width 88px
        height 32px
        display inline-block
        vertical-align top
        bg-image('logo')
        background-size 88px 32px
    .m-header-title
        display inline-block
        font-size 0
</style>
