<template>
    <div class="singer-detail">
        歌手详情页面
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
            }
        },
        created() {
            // console.log(this.$router)
        },
        watch: {
            $route() {
                console.log(this.$router)
            }
        },
        methods: {
            
        },
        components: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
