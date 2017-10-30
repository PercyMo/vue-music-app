<template>
    <div class="listview">
        <ul>
            <li v-for="group in data">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" :src="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>
