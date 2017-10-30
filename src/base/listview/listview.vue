<template>
    <div class="listview">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.title">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img class="avatar" :src="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .listview
        width 100%
        height 100%
        overflow hidden
        background-color $color-background
        .list-group
            padding-bottom 30px
            .list-group-title
                padding-left 20px
                height 30px
                color $color-text-l
                font-size $font-size-small
                line-height 30px
                background $color-highlight-background
            .list-group-item
                padding 20px 0 0 30px
                display flex
                align-items center
                .avatar
                    width 50px
                    height 50px
                    border-radius 50%
                .name
                    margin-left 20px
                    color: $color-text-l
                    font-size: $font-size-medium
</style>
