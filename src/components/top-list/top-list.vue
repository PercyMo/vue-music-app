<template>
    <div class="top-list">
        案是否安好发货
    </div>
</template>

<script type="text/ecmascript-6">
    import {getMusicList} from 'api/rank'

    export default {
        data() {
            return {
                songs: []
            }
        },
        created() {
            this._getMusicList()
        },
        methods: {
            _getMusicList() {
                getMusicList().then((res) => {
                    // console.log(res)
                })
            }
        },
        components: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>
