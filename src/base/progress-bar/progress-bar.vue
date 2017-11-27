<template>
    <div class="progress-bar"
        ref="progressBar"
        @touchstart.stop.prevent="progressTouchStart"
        @touchmove.top.prevent="progressTouchMove"
        @touchend.stop.prevent="progressTouchEnd">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {prefixStyle} from 'common/js/dom'

    const progressBtnWidth = 12
    const transform = prefixStyle('transform')

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
            }
        },
        computed: {
        },
        created() {
            this.touch = {}
        },
        methods: {
            progressTouchStart(e) {
                const rect = this.$refs.progressBar.getBoundingClientRect()
                const startX = e.touches[0].pageX
                this.touch.disLeft = rect.left
                const offsetWidth = startX - this.touch.disLeft
                this._offset(offsetWidth)
            },
            progressTouchMove(e) {
                console.log('TouchMove')
                console.log(e)
            },
            progressTouchEnd() {
                console.log('TouchEnd')
            },
            _offset(offsetWidth) {
                
            }
        },
        watch: {
            percent(newPercent) {
                if (newPercent >= 0) {
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                    const offsetWidth = barWidth * newPercent
                    const progressWidth = offsetWidth + progressBtnWidth / 2
                    this.$refs.progress.style.width = `${progressWidth}px`
                    this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
                }
            }
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
            background rgba(255, 255, 255, .2)
            .progress
                width 0
                height 2px
                background $color-theme
                border-radius 2px
            .progress-btn-wrapper
                width 30px
                height 30px
                position absolute
                top -14px
                left -9px
                display flex
                align-items center
                justify-content center
                .progress-btn
                    width 12px
                    height 12px
                    border-radius 50%
                    background $color-background-w
</style>