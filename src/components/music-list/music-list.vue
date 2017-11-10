<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-playlist"></i>
            <!-- <img width="100%" :src="bgImage"> -->
        </div>
        <h1 class="title">{{title}}</h1>
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
    
    .music-list
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        z-index 100
        i
            margin 10px
            display block
            font-size 24px
</style>
