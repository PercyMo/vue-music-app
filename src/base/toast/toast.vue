<template>
    <transition name="toast-fade">
        <div class="pop-toast" v-if="showFlag && text" @click.stop>
            <p v-html="text"></p>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            text: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                if (this.showFlag) {
                    return
                }
                this.showFlag = true
                setTimeout(() => {
                    this.showFlag = false
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .pop-toast
        position fixed
        top 40%
        left 50%
        z-index 998
        transform translateX(-50%)
        &.toast-fade-enter-active, .toast-fade-leave-active
            transition all .3s
        
        &.toast-fade-enter, .toast-fade-leave-to
            opacity 0
        p
            padding 10px 15px
            color $color-text-w
            font-size $font-size-medium
            line-height 24px
            text-align center
            background $color-background-l
            border-radius 6px
</style>