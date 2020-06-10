<template>
	<view>
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<!-- 分类列表 -->
		<view class="categgoryList">
			<!-- 左边分类 -->
			<scroll-view class="leftcategory" scroll-y="true">
				<view @tap="changeIndex(index)" class="cateList" v-for="(item,index) in CategoryList" :key="index">
					<view :class="{'block': index==ListIndex}" ></view>
					<view>{{item.title}}</view>
				</view>
				
			</scroll-view>
			<!-- 右边 -->
			<scroll-view class='right'  scroll-y="true">
				<view class="rightListC" v-for="(listc,index) in CategoryList" :key="listc.id" v-show="index==ListIndex">
					<view class="Listbanner">
						<image :src="listc.banner"></image>
					</view>
					<view class="BuList">
					<view class="Listcate" v-for="(box,i) in listc.list" :key="i" @tap="JumpNav(box)">
						<image :src="'/static/img/category/list/'+box.img"></image>
					     <view class="tex">{{box.name}}</view>
					</view>
					</view>
				</view>
				
				
				
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
	import interfaces from '../../../utils/interfaces.js'
	export default{
		data(){
			return {
				CategoryList:[],
				ListIndex:0
					
					};
			
		},
		components:{
			uniSearchBar
			
		},onLoad(){
			this.initData()
		},
		methods:{
			initData(){
			   this.request({
				   url: interfaces.getCategory,
				   success:((res)=> {
					   console.log("11111");
					   console.log(res);
					   this.CategoryList=res.data;
					   
						
						
						
						})
					})	
				},
				JumpNav(box){
					uni.navigateTo({
						url:'../../goods/goodsList?name='+box.name
						
					})
					
				},
				changeIndex(index){
					this.ListIndex=index;
					console.log(this.ListIndex);
				}
			}	
	}
	
	
	
</script>

<style>
	.categgoryList{
		width: 100%;
		display: flex;
	}
	.leftcategory{
		width: 24%;
		background-color: #f2f2f2;
		
	}
	.right{
		width: 76%;
	}
	.cateList{
		height: 90rpx;
		
		line-height: 90rpx;
		text-align: center;
		display: flex;
		justify-content: space-between;
	}
	.block{
		width:10rpx;
		height: 50rpx;
		background-color: red;
		margin-top: 20rpx ;
	}
	.Listbanner{
		width: 90%;
		margin: 10rpx auto;
		
		
	}
	.Listbanner image{
		width: 100%;
		height: 250rpx;
		
		
	}
	.Listcate{
		width: 30%;
		
	}
	.BuList{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10rpx 10rpx;
	}
	.Listcate image{
		width: 80%;
		height: 150rpx;
	}
	.Listcate .tex{
		width: 80%;
		font-size: 20rpx;
		
		text-align: center;
	}
		
		
		
</style>
