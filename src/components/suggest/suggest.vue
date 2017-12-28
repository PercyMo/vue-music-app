<template>
    <scroll class="suggest"
            :data="result"
            :pullup="pullup"
            @scrollToEnd="searchMore">
        <div>
            <h1 class="title" v-if="result.length">最佳匹配</h1>
            <ul class="suggest-list">
                <li class="suggest-item" v-for="item in result">
                    <template v-if="item.type === 'singer'">
                        <div class="singer-box">
                            <div class="pic">
                                <img :src="item.image" width="60px" height="60px">
                            </div>
                            <p class="singer">歌手：
                                <em>{{item.singername}}</em>
                            </p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="disc">
                            <p class="name" v-html="highlightText(item.name)"></p>
                            <p class="text" v-html="getDisTxt(item)"></p>
                        </div>
                    </template>
                </li>
            </ul>
            <loading v-show="isLoading"></loading>
            <div v-show="!isLoading && !result.length" class="no-result-wrapper">
                抱歉，暂无搜索结果
            </div>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import {search} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'

    const TYPE_SINGER = 'singer'
    const perpage = 20

    export default {
        props: {
            showSinger: {
                type: Boolean,
                default: true
            },
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                pullup: true,
                result: [],
                isLoading: true
            }
        },
        created() {
        },
        methods: {
            search() {
                this.page = 1
                this.isLoading = true
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.result = this._genResult(res.data, true)
                        this._checkLoading()
                    }
                })
            },
            searchMore() {
                this.page++
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.result = this.result.concat(this._genResult(res.data))
                        this._checkLoading()
                    }
                })
            },
            _checkLoading() {
                const song = data.song
                if (!song.list.length || (song.curnum + song.curpage*perpage) > song.totalnum) {
                    this.isLoading = false
                }
            },
            _genResult(data, pushSinger) {
                let ret = []
                if (data.zhida && data.zhida.singerid && pushSinger) {
                    data.zhida.image = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.zhida.singermid}.jpg?max_age=259200`
                    // ES6 扩展运算符
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if (data.song) {
                    ret = ret.concat(this._normalizeSongs(data.song.list))
                }
                return ret
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            },
            getDisTxt(item) {
                let ret = `${item.singer} - ${item.album}`
                return this.highlightText(ret)
            },
            highlightText(str) {
                const str1 = this.query
                const str2 = `<em>${str1}</em>`
                return str.replace(new RegExp(`${str1}`, 'g'), str2)
            }
        },
        watch: {
            query(newQuery) {
                this.search(newQuery)
            }
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .suggest
        height 100%
        overflow hidden
        .title
            margin 10px
            color $color-text-ll
            font-size $font-size-small
        .suggest-list
            padding 0 10px
            .suggest-item
                padding-bottom 1px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    &:after
                        display none
                em
                    color #4f94cd
                    font-style normal
                .singer-box
                    padding 3px 0
                    display flex
                    .pic
                        margin-right 10px
                        img
                            display block
                    .singer
                        height 60px
                        line-height 60px
                .disc
                    padding 10px 0
                    .name
                        margin-bottom 6px
                        font-size 15px
                        no-wrap()
                    .text
                        color $color-text-l
                        font-size $font-size-small
                        no-wrap()
        .loading
            margin-top 10px
</style>