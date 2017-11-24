<template>
    <div class="progress-bar">
        <div class="bar-inner">
            <div class="progress"></div>
            <div class="progress-btn-wrapper">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
            }
        },
        computed: {
        },
        created() {
        },
        methods: {
        },
        components: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .progress-bar
        height 30px
        .bar-inner
            position relative
            top 13px
            height 2px
            background rgba(0, 0, 0, .3)
            .progress
                width 100%
                height 2px
                background $color-theme
                border-radius 2px
            .progress-btn-wrapper
                width 30px
                height 30px
                position absolute
                top 0
                left 0
                .progress-btn
                    width 12px
                    height 12px
                    border-radius 50%
                    background $color-background-w
                    
</style>