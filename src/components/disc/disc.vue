<template>
    <transition name="slide">
        <div class="recomend-disc">
            <p>asdad</p>
            <p>asdad</p>
            <p>asdad</p>
            <p>asdad</p>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {getSongList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {mapGetters} from 'vuex'
    
    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters([
                'disc'
            ])
        },
        created() {
            this._getSongList()
        },
        methods: {
            _getSongList() {
                if (!this.disc.dissid) {
                    this.$router.push('/recommend')
                    return
                }
                getSongList(this.disc.dissid).then((res) => {
                    console.log(res)
                    if (res.code === ERR_OK) {
                        console.log('输出结果')
                        console.log(res)
                    }
                })
            }
        },
        components: {
            
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition all .3s
        
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
</style>
