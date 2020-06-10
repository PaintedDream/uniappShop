<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper" autoplay=true  indicator-dots=true >
            <swiper-item>
                <view class="swiper-item ">
					<image  :src="goodsInfo.img"></image>
				</view>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item ">
					<image :src="goodsInfo.img"></image>
				</view>
            </swiper-item>
                       
        </swiper>	
		<view class="priceS">
			<view class="price"><span>￥</span>{{goodsInfo.price}}</view>
			<view class="shu">{{goodsInfo.slogan}}已购</view>
		</view>
		<view class="goodTitle">{{goodsInfo.name}}</view>
		<!-- 评价 -->
		<view class="pingjia">
			<view class="Ptitle">
				<view class="pingti">商品评价({{goodsData.comment.length}})</view>
				<view class="pingall" @tap="toRatings">查看全部
					<uni-icons type="arrowdown" size="10"></uni-icons>
				</view>
			</view>
			<view class="pContent">
				<view class="pUser">
					<image :src="goodsData.comment[0].face"></image>
					<view class="username">{{goodsData.comment[0].username}}</view>
				</view>
				<view class="pContents">
					{{goodsData.comment[0].content}}
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content"><rich-text :nodes="goodsData.descriptionStr"></rich-text></view>
		</view>
		<!-- 购物车底部 -->
		<view class="shopFooder">
			<view class="fenxiang">
				<uni-icons type="redo" size="20"></uni-icons>
				<view >分享</view>
			</view>
			<view class="shoucang" @tap="keep()">
				<uni-icons type="heart-filled" color="red" size="20" v-if="isKeep"></uni-icons>
				
				<uni-icons type="heart"  size="20" v-else></uni-icons>
				<view>{{isKeep?'已':''}}收藏</view>
			</view>
			<view class="shopping">
				<view class="AddshopCar" :goodsInfo="goodsInfo"  @tap="spaceInfo.showSpace = true">加入购物车</view>
				<view class="Buyshop">立即购买 </view>
			</view>
			
		</view>
		<!-- 规格 -->
			<popup-spec :goodsData="goodsData" :goodsInfo='goodsInfo' :spaceInfo='spaceInfo'></popup-spec>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	import uniIcons  from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
	//import uniIcons from "@/components/uni-icons/uni-icons.vue"
	//import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-dialog.vue'
	import popupSpec from '../../components/popupSpec.vue'
	export default{
		data(){
			return{
				goodsInfo:{
						  name:'',
						  price:'',
						  slogan:'',
							number:1,
							spec:'',
							img:''
							  },
				goodsData:{
						swiperList:[],
						spec:[],
						comment:[{face:'', username:'', content:''}],
						descriptionStr:''
							 },
							 isKeep:false,
							 spaceInfo:{showSpace:false} // 是否展示选择规格遮罩
							  
					 }
					 
			

			
		},
		components: {uniIcons,
						popupSpec,
					 uniPopup,
					 uniPopupMessage,
					 uniPopupDialog},
		onLoad(option) {
			console.log(option)
			this.goodsInfo=JSON.parse(option.goodsInfo)
			console.log(this.goodsInfo)
			this.InitGoodBaata();
			
		},
		methods:{
			upGui(){
			         this.$refs.popup.open()
			      },
			InitGoodBaata(){
				this.request({
					url:interfaces.getGoods,
					success:((res)=>{
						console.log("详情数据")
						console.log(res)
						this.goodsData=res.data
					})
				})
			},
			keep(){
				
					this.isKeep = !this.isKeep;
					if(this.isKeep)
								uni.showToast({
									icon:'success',
									title:'已收藏'
								})
				},
			toRatings(){
				uni.setStorageSync('comments', this.goodsData.comment)
								uni.navigateTo({
									url:'./rating'
								})
			}
			
			
		}
	}
</script>

<style lang="scss">
	.swiper{
		width: 100%;
		height: 700rpx;
	
	.swiper-item{
		width: 100%;
		height:700rpx;
		image{
			width: 100%;
			height:700rpx;
			
		}
		
	}
	}
	.priceS{
		width: 95%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		.price{
			color: red;
			font-size: 60rpx;
			font-weight: 400;
			line-height: 80rpx;
			span{
				font-size: 40rpx;
				font-weight: 400;
			}
		}
		.shu{
			color: #999999;
			font-size: 30rpx;
			line-height: 80rpx;
		}
	}
	.pingjia{
		width: 95%;
		margin-top:30rpx ;
		.Ptitle{
			display: flex;
			justify-content: space-between;
			.pingti{
				font-size: 30rpx;
				font-weight: 600;
			}
			.pingall{
				font-size: 30rpx;
				font-weight: 400;
				color: #C8C9CC;
				
			}
		}
		
	}
	.pContent{
		width: 95%;
		.pUser{
			display: flex;
			font-size: 30rpx;
			font-weight: 400;
			height: 60rpx;
			line-height: 60rpx;
			margin-top: 20rpx;
			image{
				width: 60upx;
				height: 60upx;
				border-radius: 100%;
			}
		}
		.pContents{
			width: 95%;
			font-size: 30rpx;
			font-weight: 400;
			color: #808080;
			margin: 10rpx auto;
			
		}
	}
	.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
	}
}
.shopFooder{
	display: flex;
	width: 100%;
	position:fixed;/*这是固定定位，可以通过left，等4个方向改变*/
	padding-top: 15rpx;
	padding-bottom: 15rpx;
	bottom:0rpx;
	background-color: #FFFFFF;
	
	
	.fenxiang{
		width: 20%;
		text-align: center;
		view{
			font-size: 30rpx;
			
		}
	}
	.shoucang{
		width: 20%;
		text-align: center;
		view{
			font-size: 30rpx;
		}
	}
	.shopping{
		display: flex;
		  
		justify-content: center;
		.AddshopCar{
			
			background-color: #FFA500;
			color: #FFFFFF;
			font-size: 35rpx;
			height: 100rpx;
			line-height: 100rpx;
			width: 240rpx;
			border-radius:40rpx 0rpx 0rpx 40rpx;
			text-align: center;
		}
		.Buyshop{
			width: 50%;
			background-color:red;
			color: #FFFFFF;
			font-size: 35rpx;
			height: 100rpx;
			line-height: 100rpx;
			width: 240rpx;
			border-radius:0rpx 40rpx 40rpx 0rpx;
			text-align: center;
			
		}
	}
}
uni-popup{
	background-color: #FFFFFF;
	width: 100%;
	.op{
		height: 500rpx;
		width: 100%;
		background-color: #FFFFFF;
	}
	
}
</style>
