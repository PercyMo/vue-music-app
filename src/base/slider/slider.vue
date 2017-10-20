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
                // if (this.showDot) {
                // }
                // if (this.autoPlay) {
                //   this._play()
                // }
            }, 100)

            // this.$nextTick(() => {
            //     this._setSlideWidth()
            //     this._initSlider()
            // })
    	},
    	methods: {
            _setSlideWidth() {
                this.children = this.$refs.sliderGroup.children

                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
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
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            }
    	}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .slider
        min-height 1px
        .slider-group
            position relative
            overflow hidden
            .slider-item
                float left
                a
                    display block
                    text-decoration none
                    img
                        display block
                        width 100%
</style>
