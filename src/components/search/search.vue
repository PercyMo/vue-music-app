<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper">
            <scroll ref="shortcut" class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li @click="addQuery(item.k)" class="key-item" v-for="item in hotKey">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history">
                        <h1 class="title">搜索历史</h1>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import Scroll from 'base/scroll/scroll'
    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'

    export default {
        data() {
            return {
                hotKey: [],
                query: ''
            }
        },
        created() {
            this._getHotkey()
        },
        methods: {
            _getHotkey() {
                getHotKey().then((res) => {
                    if (res.code === ERR_OK) {
                        this.hotKey = res.data.hotkey.slice(0, 10)
                    }
                })
            },
            onQueryChange(query) {
                this.query = query
            },
            addQuery(query) {
                this.$refs.searchBox.setQuery(query)
            }
        },
        components: {
            SearchBox,
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .search
        .search-box-wrapper
            margin 20px
        .shortcut-wrapper
            width 100%
            position fixed
            top 170px
            bottom 0
            .shortcut
                height 100%
                overflow hidden
                .hot-key
                    margin 0 15px 20px
                    .title
                        margin-bottom 10px
                        color $color-text-l
                        font-size $font-size-small
                    .key-item
                        margin 0 10px 10px 0
                        padding 6px 12px
                        display inline-block
                        color $color-text
                        font-size $font-size-medium
                        border 1px solid $color-background-s
                        border-radius 15px
</style>