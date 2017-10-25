<template>
    <div class="rank" ref="rank">
        <scroll class="toplist" ref="toplist" :data="topList">
            <ul>
                <li @click="selectItem(item)" class="rank-item" v-for="item in topList">
                    <div class="icon" :key="item.id">
                        <img width="100" height="100" :src="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song, index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                            <span>
                                {{song.songname}}-{{song.singername}}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import {getTopList} from 'api/rank'
    import {ERR_OK} from 'api/config'

    export default {
        data() {
            return {
                topList: []
            }
        },
        created() {
            this._getTopList()
        },
        methods: {
            _getTopList() {
                getTopList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.topList = res.data.topList
                    }
                })
            },
            selectItem(item) {
                console.log(item)
                this.$router.push({
                    path: `/rank/${item.id}`
                })
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    .rank
        width 100%
        position fixed
        top 88px
        bottom 0
        .toplist
            height 100%
            overflow hidden
            .rank-item
                margin 0 20px
                padding-top 20px
                height 100px
                display flex
                &:last-child
                    padding-bottom 20px
                .icon
                    flex 0 0 100px
                    width 100px
                    height 100px
                .songlist
                    padding 0 20px
                    height 100px
                    flex 1
                    display flex
                    flex-direction column
                    justify-content center
                    color: $color-text-d
                    font-size $font-size-small
                    overflow hidden
                    background $color-highlight-background
                    .song
                        no-wrap()
                        line-height 26px
</style>
