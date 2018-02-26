<template>
    <transition name="slide">
        <div class="mv-detail">
            <div class="video-wrapper">
                <video controls="controls" width="100%">
                    <source src="http://videohy.tc.qq.com/music.qqvideo.tc.qq.com/A2SS7vbZf7aCNIGVXBg0MnAGNv8MiZqpu93rAMzCSCuY/g0022q7z0um.p312.1.mp4?sdtfrom=v1070&type=mp4&vkey=E0A180357A1FD6C679A85DBC8C2D264CF1C51C0257B9C90A2A2D024FAAF8F84BB6A0D9A63BFFC770108E79F2A77F16ABA9C6683F2DA993EB030DC2AE0AFB2FF8C98014DCF7A26023F2464E77D6040F8D6CED7B80587359D18C1895CCB1B5FEC8762E84B15987BD9330F67285C8B7AF89&platform=70202&br=78&fmt=hd&sp=0&charge=0&vip=0&guid=59FA6623E69A2ECE7D99979DC27D3D8A&ocid=3281523884" type="video/mp4">
                </video>
            </div>
            <a href="http://videohy.tc.qq.com/music.qqvideo.tc.qq.com/A2SS7vbZf7aCNIGVXBg0MnAGNv8MiZqpu93rAMzCSCuY/g0022q7z0um.p312.1.mp4?sdtfrom=v1070&type=mp4&vkey=E0A180357A1FD6C679A85DBC8C2D264CF1C51C0257B9C90A2A2D024FAAF8F84BB6A0D9A63BFFC770108E79F2A77F16ABA9C6683F2DA993EB030DC2AE0AFB2FF8C98014DCF7A26023F2464E77D6040F8D6CED7B80587359D18C1895CCB1B5FEC8762E84B15987BD9330F67285C8B7AF89&platform=70202&br=78&fmt=hd&sp=0&charge=0&vip=0&guid=59FA6623E69A2ECE7D99979DC27D3D8A&ocid=3281523884" type="video/mp4" download="泡沫-邓紫棋">下载</a>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    // import Scroll from 'base/scroll/scroll'

    export default {
        props: {
        },
        data() {
            return {
                curr: 0
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
        },
        methods: {
        },
        watch: {
        },
        components: {
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    // 重复样式 待删除
    .slide-enter-active, .slide-leave-active
        transition all .3s
        
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
        
    .mv-detail
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        z-index 100
</style>
