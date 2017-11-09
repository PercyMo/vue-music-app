<template>
    <div class="music-list">
        撒发发 
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
            }
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
    
    .music-list
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        z-index 100
</style>
