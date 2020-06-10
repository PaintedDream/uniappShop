<template>
	<view>
		<!-- 选项卡 -->
		<view class="SCart">
		<view class="selectCar" v-for="(CartTitle,index) in SelecrTitle" :key="index" @tap="boderColor(index)" :class="{'on':CartTitle.selected}">
			{{CartTitle.text}}
		</view>
		</view>
		<!-- 商品列表 -->
		<view class="Goods">
			<view class="goodlist" v-for="(goodslist,index) in GoodsList" :key="goodslist.id" @tap="goodsXqing(goodslist)">
				<image class="goodimg" :src="goodslist.img"></image>
				<view class="textGoods">{{goodslist.name}}</view>
				<view class="PrGoods">￥:{{goodslist.price}}</view>
				<view class="pelopes">{{goodslist.slogan}}<span>人已购买</span></view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default{
		data(){
			return{
				SelecrTitle:[
					{text:"全部",selected:true,filterby:'all'},
					{text:"口碑",selected:false,filterby:'public'},
					{text:"热门",selected:false,filterby:'hot'}
					],
				GoodsList:[],//商品信息列表
				filterby:'all',
				page:1,
				size:6,
				loadingText:"正在加载..."
					
				
			}
			
		},
		
		onLoad(option) {
			console.log(option);
			uni.setNavigationBarTitle({
							title: option.name
						});
			this.GoodData();	
			
		},
		methods:{
			goodsXqing(e){//为什莫必须用e
				console.log(e)
				uni.navigateTo({
					url:'./goodXqing?goodsInfo='+ JSON.stringify(e)
				})
				
			},
			boderColor(index){
				this.SelecrTitle[index].selected=true;
				for(let i=0;i<this.SelecrTitle.length;i++){
					if(i!=index){
						this.SelecrTitle[i].selected = false;
					}
				}
					// 请求数据
								this.filterby = this.SelecrTitle[index].filterby
								this.page = 1;
								
								this.goodsList = []
								this.GoodData()
			},
			GoodData(){
				this.request({
					url:`${interfaces.getGoodsList}/${this.filterby}/${this.page}/${this.size}`,
					success:((res)=>{
						console.log(res)
						this.GoodsList=res.data
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.SCart{
		width: 90%;
		display: flex;
		justify-content:center;
		.selectCar{
			width: 100%;
			
			
			font-weight: 400;
			font-size: 30upx;
			text-align: center;
			&.on{
						color: #555;
						border-bottom: 6upx solid #f06c7a;
						font-weight: 600;
						font-size: 30upx;
					}
		}
		
	}
	.Goods{
		display: flex;
		flex-wrap: wrap;
		width: 95%;
		justify-content: space-between;
		margin: 10rpx auto;
		.goodlist{
			width: 49.4%;
			.goodimg{
				width: 100%;
				height: 350rpx;
			}
			.textGoods{
				font-size: 30rpx;
				font-weight: 600;
				color: #555555;
				text-overflow: ellipsis;
				    white-space: nowrap;
				    overflow: hidden;
			}
			.PrGoods{
				font-size: 30rpx;
				font-weight: 600;
				color: red;
				
			}
			.pelopes{
				font-size: 30rpx;
				color: #969799;
				margin-bottom: 20rpx;
				span{
					font-size: 20rpx;
				}
			
				
			}
		}
	}
</style>
