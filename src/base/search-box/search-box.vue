<template>
    <div class="search-box">
        <input ref="query" v-model="query" class="box" :placeholder="placeholder">
        <i @click="clear" v-show="query" class="icon-close"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索音乐、歌手'
            }
        },
        data() {
            return {
                query: ''
            }
        },
        created() {
            this.$watch('query', (newQuery) => {
                this.$emit('query', newQuery)
            })
        },
        methods: {
            clear() {
                this.query = ''
            },
            setQuery(query) {
                this.query = query
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .search-box
        padding 0 6px
        width 100%
        height 40px
        display flex
        align-items center
        box-sizing border-box
        background $color-background-w
        border-bottom 1px solid $color-background-s
        .box
            margin 0 5px
            flex 1
            color $color-text
            font-size $font-size-medium
            line-height 18px
            background none
            &::placeholder
                color: $color-text-d
        .icon-close
            color $color-text
            font-size 16px
</style>