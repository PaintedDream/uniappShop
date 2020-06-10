<template>
	<view class="popup spec" v-show="spaceInfo.showSpace" @tap="hideSpec">
		<!-- 遮罩层 -->
		<view class="mask"></view>
		<view class="layer">
			<view class="content">
				<view class="title">选择规格：</view>
				<view class="sp">
					<view v-for="(item,index) in goodsData.spec" :class="{'on': item == goodsInfo.spec}"  @tap.stop="setSelectSpec(item)" :key="index">{{item}}</view>
				</view>
				<view class="length">
					<view class="text">数量</view>
					<counter :goodsInfo="goodsInfo"></counter>
				</view>
			</view>
			<view class="btn"><view class="button" @tap="hideSpec">确定</view></view>
		</view>
		
	</view>
</template>

<script>
	import counter from './counter.vue'
	export default{
		props:{
			goodsData:Object,
			spaceInfo:Object,
			goodsInfo:Object,
			goodsInfo:{
				type:Object
			}
		},
		components:{
		    counter	
		},
		methods:{
				
			setSelectSpec(item){ // 选择规格
				this.goodsInfo.spec = item
			},
			
			hideSpec(){
				this.spaceInfo.showSpace = false
				console.log("加入购物车")
				console.log(this.goodsInfo)
				 uni.getStorage({
									key: 'goodsList',
									success: (res=> {
										let goodsList = res.data
										// 查找商品是否存在
										let isExist = false
										goodsList.forEach(goods=>{
											if(goods.goods_id == this.goodsInfo.goods_id){
												// 如果存在  修改商品数量
												goods.number += this.goodsInfo.number
												isExist = true
											}
										})
										if(!isExist) // 不存在，存入数组
										  goodsList.push(this.goodsInfo)
										  
										this.setGoodsList(goodsList)
									}),
									fail:(err=>{ // 如果没有存储过大数组，进行存储
										let goodsList = []
										goodsList.push(this.goodsInfo)
										this.setGoodsList(goodsList)
										
									})
								});
			},setGoodsList(goodsList){ // 更新storage
				uni.setStorage({ 
					key: 'goodsList',
					data: goodsList,
					success: function () {
						uni.showToast({
							icon:'success',
							title:'添加购物车成功'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: 0;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}
			
		}
		
	}
}

</style>
