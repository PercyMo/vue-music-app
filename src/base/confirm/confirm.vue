<template>
    <transition name="confirm-fade">
        <div class="pop-confirm" v-show="showFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div @click="cancel" class="operate-btn">{{cancelBtnText}}</div>
                        <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            text: {
                type: String,
                default: ''
            },
            confirmBtnText: {
                type: String,
                default: '确定'
            },
            cancelBtnText: {
                type: String,
                default: '取消'
            }
        },
        data() {
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                this.showFlag = true
            },
            hide() {
                this.showFlag = false
            },
            cancel() {
                this.hide()
                this.$emit('cancel')
            },
            confirm() {
                this.hide()
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .pop-confirm
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 998
        background $color-background-l
        &.confirm-fade-enter-active
            animation confirm-fadein 0.3s
            .confirm-content
                animation confirm-zoom 0.3s
        .confirm-wrapper
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            z-index 999
            .confirm-content
                width 270px
                border-radius 3px
                background $color-background-w
                box-shadow 5px 5px 10px rgba(0, 0, 0, .1)
                .text
                    padding 19px 15px
                    line-height 22px
                    color $color-text-l
                    text-align center
                    font-size $font-size-medium
                .operate
                    display flex
                    align-item center
                    color $color-theme
                    font-size 15px
                    text-align center
                    .operate-btn
                        padding 10px 0
                        flex 1
                        line-height 22px
                        
    @keyframes confirm-fadein
        0%
            opacity 0
        100%
            opacity 1
    @keyframes confirm-zoom
        0%
            transform scale(0)
        50%
            transform scale(1.1)
        100%
            transform scale(1)
</style>