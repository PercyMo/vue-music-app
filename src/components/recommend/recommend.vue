<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="dataList">
            <div>
                <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
                    <slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl"></img>
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">
                        推荐歌单
                    </h1>
                    <ul class="recommend-sheet">
                        <li v-for="item in discList" class="item" @click="selectItem(item)" :key="item.dissid">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="100%" height="auto">
                            </div>
                            <p class="desc" v-html="item.dissname"></p>
                        </li>
                    </ul>
                    <template v-if="discList.length">
                        <h1 class="list-title">
                            推荐MV
                        </h1>
                        <ul class="recommend-mv">
                            <li v-for="item in mvList" class="item" :key="item.dissid">
                                <div class="icon">
                                    <img v-lazy="item.picurl" width="100%" height="auto">
                                </div>
                                <p class="desc" v-html="item.dissname"></p>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
            <div class="loading-container" v-if="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/slider'
    import Loading from 'base/loading/loading'
    import Scroll from 'base/scroll/scroll'
    import {getRecommend, getDiscList, getMvList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {playlistMixin} from 'common/js/mixin'
    import {mapMutations} from 'vuex'
    
    export default {
        mixins: [playlistMixin],
        data() {
            return {
                recommends: [],
                discList: [],
                mvList: []
            }
        },
        computed: {
            dataList() {
                return this.mvList.length ? this.mvList : this.discList
            }
        },
        created() {
            this._getRecommend()
            this._getDiscList()
            this._getMvList()
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length ? '50px' : ''
                
                this.$refs.recommend.style.bottom = bottom
                this.$refs.scroll.refresh()
            },
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK) {
                        this.recommends = res.data.slider
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list.slice(0, 6)
                    }
                })
            },
            _getMvList() {
                getMvList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.mvList = res.data.mvlist
                    }
                })
            },
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true
                    this.$refs.scroll.refresh()
                }
            },
            selectItem(item) {
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                })
                this.setDisc(item)
            },
            ...mapMutations({
                setDisc: 'SET_DISC'
            })
        },
        components: {
            Slider,
            Loading,
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .recommend
        position fixed
        width 100%
        top 81px
        bottom 0
        .recommend-content
            height 100%
            overflow hidden
            .recommend-list
                padding-top 25px
                .list-title
                    margin-bottom 15px
                    padding-left 6px
                    height 15px
                    line-height 1
                    font-size $font-size-medium-x
                    border-left 2px solid $color-theme
                .recommend-sheet
                    margin 0 -1px 30px
                    overflow hidden
                    .item
                        padding 0 1px 7px
                        width 33.33%
                        float left
                        box-sizing border-box
                        .icon
                            img
                                display block
                                background $color-background-w
                        .desc
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp 2
                            height 32px
                            margin 5px
                            font-size $font-size-small
                            line-height 16px
                            overflow hidden
                            text-overflow ellipsis            
                .recommend-mv
                    margin 0 -1px 30px
                    overflow hidden
                    .item
                        padding 0 1px 7px
                        width 50%
                        float left
                        box-sizing border-box
                        
</style>
