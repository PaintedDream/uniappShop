<template>
	<view class="number">
		<view class="sub" @tap.stop="sub">
			<view class="icon iconfont">&#xe768;</view>
		</view>
		<view class="input">
			<input type="number" v-model="goodsInfo.number" />
		</view>
		<view class="add"  @tap.stop="add">
			<view class="icon iconfont">&#xe767;</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			goodsInfo:Object
		},
		methods:{
			//减少数量
			sub(){
				if(this.goodsInfo.number<=1){
					return;
				}
				this.goodsInfo.number--;
			    this.$emit('change')
			},
			//增加数量
			add(){
				this.goodsInfo.number++;
				this.$emit('change')
			}
		}
	}
</script>

<style lang="scss">
.number{
	display: flex;
	justify-content: center;
	align-items: center;
	.input{
		width: 80upx;
		height: 60upx;
		margin: 0 10upx;
		background-color: #f3f3f3;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		input{
			width: 80upx;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 26upx;
		}
	}
	
	.sub ,.add{
		width: 60upx;
		height: 60upx;
		background-color: #f3f3f3;
		border-radius: 5upx;
		.icon{
			font-size: 30upx;
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
	}
}
</style>
