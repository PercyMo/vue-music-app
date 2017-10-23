<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{ active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from 'common/js/dom'
    import BScroll from 'better-scroll'
    
    export default {
        name: 'slider',
        props: {
            loop: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSlideWidth()
                this._initDots()
                this._initSlider()

                // if (this.autoPlay) {
                //   this._play()
                // }
            }, 100)
        },
        methods: {
            _setSlideWidth() {
                //children这类公用属性，直接绑定在this实例上
                this.children = this.$refs.sliderGroup.children

                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }

                if (this.loop) {
                    width += sliderWidth * 2
                }

                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                //使用官方demo中的方式会报错
                // snap: {
                //     loop: this.loop,
                //     threshold: 0.3,
                //     speed: 400
                // }
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                })

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex
                })
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .slider
        position relative
        min-height 1px
        overflow hidden
        .slider-group
            position relative
            overflow hidden
            white-space nowrap
            .slider-item
                float left
                box-sizing border-box
                overflow hidden
                a
                    display block
                    width 100%
                    overflow hidden
                    text-decoration none
                img
                    display block
                    width 100%
        .dots
            position absolute
            right 0
            left 0
            bottom 12px
            font-size 0
            text-align center
            .dot
                margin 0 4px
                width 8px
                height 8px
                display inline-block
                border-radius 50%
                background $color-text-l
                transition all .3s
                -webkit-transform transition3d(0, 0, 0)
                &.active
                    width 20px
                    border-radius 5px
                    background $color-text-ll
</style>
