<template>
	<view>
	
		<navBarx></navBarx>
		<!-- 轮播图 -->
		 <view class="uni-padding-wrap">
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
		                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
		                        <swiper-item class="swiperimg" v-for="(item,index) in swiperList" :key="index">
		                            <view class="swiper-item uni-bg-red">
										<image  :src="item.img" mode="scaleToFill" alt="">
									</view>
		                        </swiper-item >    
		                    </swiper>
		                </view>
		            </view>
		 </view>
		 <!-- 导航分类-->
		 <view class="categoryNav">
			<view class="categoryList" v-for="(categoryimg,index) in categoryList" :key="" @tap="JumpNav(categoryimg)">
				<view class="categoryImg">
					<image :src="categoryimg.img"></image>
				</view>
				<view class="categorytext">{{categoryimg.name}}</view>
			</view>
		 </view>
		 <!-- 广告图-->
		 <view class="adImg">
			 <image src="/static/img/home/1.jpg"></image>
		 </view>
		 <!-- 活动专区-->
		 <view class="promotionList" v-if="promotion.length>0">
			 <view class="promotionTitle">活动专区</view>
			 <view class="ListBig">
			 <view class="promotionContent" v-for="(proitem,index) in promotion" :key="index">
				 <view class="ptitle">{{proitem.title}}</view>
				 <view class="duringContent">
					 <view class="left">{{proitem.ad}}</view>
					 <view class="rimg">
						 <image :src="proitem.img"></image>
					 </view>
				 </view>
			 
				 <view class="proButton">点击进入</view>
				</view> 
			 </view>
		 </view>
		        
	</view>
		
	
		
	
</template>

<script>
	import navBarx from './navbarx.vue'
	import interfaces from '../../../utils/interfaces.js'
	export default{
		data(){
			return {
					// 轮播图片
					swiperList: [],
					// 分类菜单
					categoryList: [],
					promotion: [],
					currentSwiper: 0, //当前轮播图显示下标
					 background: ['color1', 'color2', 'color3'],
					            indicatorDots: true,
					            autoplay: true,
					            interval: 2000,
					            duration: 500
					};
			
		},
		components:{
			navBarx
			
		},onLoad(){
			this.initData()
		},
		methods:{
			
			initData(){
			   this.request({
				   url: interfaces.getMallData,
				   success:((res)=> {
					   console.log(res);
						this.swiperList = res.data.swiperList
						this.categoryList = res.data.categoryList
						this.promotion = res.data.promotion
						
						
						})
					})	
				},
				JumpNav(categoryimg){
					console.log(categoryimg.name)
					uni.navigateTo({
						
						url:'../../goods/goodsList?name='+categoryimg.name
					})
					
				}
			}	
	}
	
	
</script>

<style>
	.uni-padding-wrap{
		margin: 20rpx;
		
	}
	.swiperimg{
		border-radius: 10%;
	}
	.categoryNav{
		display: flex;
		flex-wrap:  wrap ;
		margin: 5rpx 6%;
		justify-content: space-between ;
		
	}
	.categoryList{
		width:23%;
		
	}
	.categoryImg image{
		width: 80%;
		height: 100rpx;
	}
	.categorytext{
		font-size: 25rpx;
		
		width: 80%;
		text-align: center;
		color:
	}
	.adImg{
		width: 88%;
		height: 230rpx;
		padding: 5rpx 6%;
		
	}
	.adImg image{
		width: 100%;
		height: 200rpx;
		
		
	}
	
	.promotionList{
		width: 94%;
		margin: 4rpx 3%;
		padding-bottom: 25rpx;
		
	}
	.promotionTitle{
		font-weight: 900;
		
		display:inline;
		line-height: 40rpx;;
	}
	.ptitle{
		font-weight: 400;
		
		display:inline;
		line-height: 45rpx;;
		
	}
	.ListBig{
		width: 100%;
		display: flex;
		
		justify-content: space-between;
		
	}
	.promotionContent{
		width: 48%;
		background-color:#ebf9f9;
		padding: 4rpx 4rpx;
		height: 185rpx;
		
		
	}
	
	.duringContent{
		display: flex;
		
		
	}
	.duringContent .left{
		font-size: 20rpx;
		color:#555555;
	}
	.rimg{
		width: 50%;
		
		
	}
	.rimg image{
		width: 150rpx;
		height: 120rpx;
		
	}
	.proButton{
		font-size: 20rpx;
		color: #555555;
		position: relative;
		top:-50rpx;
		
		
	}
		
		
		
</style>
