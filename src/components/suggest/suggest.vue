<template>
    <div class="suggest">
        搜索结果页面
    </div>
</template>

<script type="text/ecmascript-6">
    import {search} from 'api/search'
    import {ERR_OK} from 'api/config'

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
            }
        },
        created() {
        },
        methods: {
            search() {
                this.page = 1
                // this.hasMore = true
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        console.log(res)
                    }
                })
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