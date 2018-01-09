<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
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
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear">
                                <i class="icon-empty"></i>
                            </span>
                        </h1>
                        <search-list :searches="searchHistory" @select="addQuery"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest ref="suggest" :query="query" @listenScroll="blurInput" @select="saveSearch"></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import SearchList from 'base/search-list/search-list'
    import Suggest from 'components/suggest/suggest'
    import Scroll from 'base/scroll/scroll'
    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {playlistMixin} from 'common/js/mixin'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        mixins: [playlistMixin],
        data() {
            return {
                hotKey: [],
                query: ''
            }
        },
        computed: {
            ...mapGetters([
                'searchHistory'
            ])
        },
        created() {
            this._getHotkey()
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '50px' : ''
                this.$refs.shortcutWrapper.style.bottom = bottom
                this.$refs.shortcut.refresh()

                this.$refs.searchResult.style.bottom = bottom
                this.$refs.suggest.refresh()
            },
            _getHotkey() {
                getHotKey().then((res) => {
                    if (res.code === ERR_OK) {
                        let result = res.data.hotkey.slice(0, 10)
                        result.forEach((item) => {
                            item.k = item.k.replace(/(\s|\u00A0)+$/, '')
                        })
                        this.hotKey = result
                    }
                })
            },
            onQueryChange(query) {
                this.query = query
            },
            addQuery(query) {
                this.$refs.searchBox.setQuery(query)
            },
            blurInput() {
                this.$refs.searchBox.blur()
            },
            saveSearch() {
                this.saveSearchHistory(this.query)
            },
            ...mapActions([
                'saveSearchHistory'
            ])
        },
        components: {
            SearchBox,
            SearchList,
            Suggest,
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .search
        .title
            margin-bottom 15px
            display flex
            color $color-text-ll
            font-size $font-size-small
            .text
                flex 1
            .icon-empty
                margin-right 10px
                color $color-text-l
                font-size $font-size-medium
                font-weight bold
        .search-box-wrapper
            margin 20px
        .shortcut-wrapper
            width 100%
            position fixed
            top 160px
            bottom 0
            .shortcut
                height 100%
                overflow hidden
                .hot-key
                    margin 0 10px 20px
                    .key-item
                        margin 0 10px 10px 0
                        padding 6px 12px
                        display inline-block
                        color $color-text
                        font-size $font-size-medium
                        position relative
                        background $color-background-s
                        border-radius 15px
                .search-history
                    .title
                        margin 0 10px 5px
        .search-result
            position fixed
            width 100%
            top 150px
            bottom 0
</style>