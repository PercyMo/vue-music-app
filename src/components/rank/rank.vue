<template>
    <div class="rank">
        排行页面
    </div>
</template>

<script type="text/ecmascript-6">
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
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>
