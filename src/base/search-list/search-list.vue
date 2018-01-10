<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li class="search-item" v-for="(item, index) in searches" @click="selectItem(item)" :key="index">
                <span class="icon-l">
                    <i class="icon-history"></i>
                </span>
                <div class="text">
                    <span class="key">{{item}}</span>
                    <span class="icon-r" @click.stop="deleteOne(item)">
                        <i class="icon-close"></i>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            searches: {
                type: Array,
                default: []
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('select', item)
            },
            deleteOne(item) {
                this.$emit('delete', item)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .search-list
        margin-left 10px
        .search-item
            display flex
            .icon-l
                color $color-text-d
                line-height 44px
            .text
                margin-left 10px
                padding 15px 0
                height 14px
                display flex
                flex 1
                color $color-text-ll
                font-size $font-size-medium
                line-height 14px
                border-1px(rgba(7, 17, 27, 0.1))
                .key
                    flex 1
                .icon-r
                    margin-right 20px
                    color $color-text-d
</style>