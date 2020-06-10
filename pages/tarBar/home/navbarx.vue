<template>
	<view class="HeaderTop">
		
		<uni-nav-bar  status-bar="ture">
		    <uni-search-bar :radius="30" @confirm="search" ></uni-search-bar>
		    <view slot="left"><uni-icons type="location-filled" size="20"></uni-icons></view>
			<view slot="left" class="addcity">{{city}}</view>
		    <view slot="right"><uni-icons type="more-filled" size="20"></uni-icons></view>
			<!-- 占位 -->
					<view class="place"></view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
	import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
	
	
	

	export default {
		components: {uniNavBar,
					uniSearchBar,
					uniIcons},
			data(){
				return {
					city: '石家庄'
				}
			}
		}
</script>

<style>
	uni-nav-bar{
		
	}
	.addcity{
		font-size: 30rpx;
		
	}
	
</style>
