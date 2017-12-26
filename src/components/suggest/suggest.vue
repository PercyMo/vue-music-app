<template>
    <div class="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="disc">
                    <p class="name" v-html=""></p>
                    <p class="text"></p>
                </div>
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
                        console.log(res)
                        this.result = this._genResult(res.data)
                    }
                })
            },
            _genResult(data) {
                let ret = []
                if (data.zhida && data.zhida.singerid) {
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
    
    
</style>