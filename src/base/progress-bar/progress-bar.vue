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
                this.touch.initiated = true
                const rect = this.$refs.progressBar.getBoundingClientRect()
                const startX = e.touches[0].pageX
                this.touch.disLeft = rect.left
                this.touch.barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth

                const offsetWidth = Math.min(startX - this.touch.disLeft, this.touch.barWidth)
                this._offset(offsetWidth)
            },
            progressTouchMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = this.touch
                const currLeft = e.touches[0].pageX - touch.disLeft
                const offsetWidth = Math.min(touch.barWidth, Math.max(0, currLeft))
                this._offset(offsetWidth)
            },
            progressTouchEnd() {
                this.touch.initiated = false
                const percent = this.$refs.progress.clientWidth / this.touch.barWidth
                this.$emit('percentChange', percent)
            },
            _offset(offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
            }
        },
        watch: {
            percent(newPercent) {
                if (newPercent >= 0 && !this.touch.initiated) {
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                    const offsetWidth = barWidth * newPercent
                    this._offset(offsetWidth)
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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