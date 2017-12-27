<template>
    <div class="suggest">
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
    </div>
</template>

<script type="text/ecmascript-6">
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
                result: []
            }
        },
        created() {
        },
        methods: {
            search() {
                this.page = 1
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.result = this._genResult(res.data)
                    }
                })
            },
            _genResult(data) {
                let ret = []
                if (data.zhida && data.zhida.singerid) {
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .suggest
        height 100%
        overflow hidden
        .suggest-list
            padding 0 5px
            .suggest-item
                padding-bottom 1px
                border-1px(rgba(7, 17, 27, 0.1))
</style>