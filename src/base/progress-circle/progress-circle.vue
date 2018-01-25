<template>
    <div class="progress-circle">
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" cx="50" cy="50" r="50" fill="transparent" />
            <circle class="progress-bar" cx="50" cy="50" r="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset" />
        </svg>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            radius: {
                type: Number,
                default: 100
            },
            percent: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                dasharray: Math.PI * 100
            }
        },
        computed: {
            dashoffset() {
                return (1 - this.percent) * this.dasharray
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .progress-circle
        position relative
        circle
            stroke-width 5px
            transform-origin center
            &.progress-background
                transform scale(.9)
                stroke $color-background-b
            &.progress-bar
                transform scale(.9) rotate(-90deg)
                stroke $color-theme
</style>