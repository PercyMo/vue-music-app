<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    
    export default {
        props: {
            data: {
                type: Array,
                default: null
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true
                })
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>
