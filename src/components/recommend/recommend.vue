<template>
    <div class="recommend">
		<slider>
			<div class="slider-item" v-for="item in recommends" :key="item.id">
				<a :href="item.linkUrl">
					<img :src="item.picUrl"></img>
				</a>
			</div>
		</slider>
    </div>
</template>

<script type="text/ecmascript-6">
	import Slider from 'base/slider/slider'
	import {getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	
    export default {
    	data() {
    		return {
    			recommends: []
    		}
    	},
    	created() {
    		this._getRecommend()
    	},
    	methods: {
    		_getRecommend() {
    			getRecommend().then((res) => {
    				if(res.code === ERR_OK) {
    					this.recommends = res.data.slider
    				}
    			})
    		}
		},
		components: {
			Slider
		}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
</style>
