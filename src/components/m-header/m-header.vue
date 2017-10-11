<template>
    <div class="m-header">
        <div class="m-header-icon"></div>
        <h1 class="m-header-title">Chicken Music</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .m-header
        height 44px
        position relative
        color $color-theme
        text-align center
        font-size 0
    .m-header-icon
        margin 6px 9px 0 0
        width 30px
        height 32px
        display inline-block
        vertical-align top
        bg-image('logo')
        background-size 30px 32px
    .m-header-title
        display inline-block
        font-size $font-size-large
        line-height 44px
        vertical-align top
</style>
