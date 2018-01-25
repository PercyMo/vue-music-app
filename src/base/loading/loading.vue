<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: '努力加载中...'
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .loading
        width 100%
        text-align center
        .desc
            margin-left 5px
            height 24px
            display inline-block
            color $color-text-l
            font-size $font-size-small
            line-height 24px
            vertical-align top
</style>