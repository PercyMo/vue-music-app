<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper">
            <div class="hot-key">
                <h1 class="title">热门搜索</h1>
                <ul>
                    <li class="key-item" v-for="item in hotKey">
                        <span>{{item.k}}</span>
                    </li>
                </ul>
            </div>
            <div class="search-history">
                <h1 class="title">搜索历史</h1>
            </div>
        </div>
        <div class="search-result">
            
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'

    export default {
        data() {
            return {
                hotKey: []
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
            onQueryChange(value) {
                console.log(value)
            }
        },
        components: {
            SearchBox
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>