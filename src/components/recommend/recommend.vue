<template>
    <div class="recommend">
        <scroll class="recommend-content" :data="discList">
            <div>
                <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
                    <slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl"></img>
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="recommend-item" @click="selectItem(item)" :key="item.dissid">
                            <div class="icon">
                                <img :src="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <router-view></router-view>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    
    export default {
        data() {
            return {
                recommends: [],
                discList: []
            }
        },
        created() {
            this._getRecommend()
            this._getDiscList()
        },
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK) {
                        this.recommends = res.data.slider
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    this.discList = res.data.list
                })
            },
            selectItem(item) {
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                })
            }
        },
        components: {
            Slider,
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    
    .recommend
        position fixed
        width 100%
        top 88px
        bottom 0
        .recommend-content
            height 100%
            overflow hidden
            .recommend-list
                .list-title
                    height 65px
                    line-height 65px
                    color $color-theme
                    font-size $font-size-medium
                    text-align center
                .recommend-item
                    padding 0 20px 20px
                    display flex
                    box-sizing border-box
                    .icon
                        padding-right 20px
                        width 60px
                        flex 0 0 60px
                    .text
                        flex 1
                        line-height 20px
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color $color-text
                        .desc
                            color $color-text-d
</style>
