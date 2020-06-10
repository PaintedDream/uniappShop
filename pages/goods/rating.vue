<template>
	<view>
		<video v-show="showVideo" id="myVideo" class="myVideo" :src="videoSrc" 
				:show-fullscreen-btn="showFullscreenBtn" :direction="videoDirection" 
				@pause="videoPause" @fullscreenchange="viderFullscreen">
		</video>
		<view class="content">
			<view class="label">
				<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="loadRatings(index)" :key="label.type">
					{{label.name}}({{label.number}})
				</view>
			</view>
			<view class="list">
				<view class="row" v-for="(row,Rindex) in ratingsList" :key="Rindex">
					<view class="left">
						<view class="face">
							<image :src="row.face"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{row.username}}
							</view>
							<view class="date">
								{{row.date}}
							</view>
						</view>
						<view class="spec">
							{{row.spec}}
						</view>
						<view class="first">
							<view class="rat">
								{{row.content}}
							</view>
							<view class="img-video">
								<view class="box" v-for="item in row.video" @tap="playVideo(item.path)" :key="item.path">
									<image mode="aspectFill" :src="item.img"></image>
									<view class="playbtn">
										<view class="icon iconfont">&#xe7e9;</view>
									</view>
								</view>
								<view class="box" v-for="item in row.img" @tap="showBigImg(item,row.img)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				labelList:[
					{name:'全部',number:25,type:'all'},
					{name:'好评',number:23,type:'good'},
					{name:'中评',number:1,type:'secondary'},
					{name:'差评',number:1,type:'poor'},
					{name:'有图',number:12,type:'img'},
					{name:'视频',number:2,type:'video'},
					{name:'追加',number:2,type:'append'}
				],
				labelIndex:0, // 当前评论类型下标
				ratingsList:[],
				videoContext:null, // 播放器对象
				videoDirection:0, // 全屏方向
				showFullscreenBtn:true, // 是否全屏
				videoSrc:'',
				showVideo: true // 小程序端隐藏
			}
		},
		onLoad(){
			try {
				const comments = uni.getStorageSync('comments');
				if (comments) {
					this.ratingsList = comments
					console.log(this.ratingsList)
				}
			} catch (e) {
				// error
			}
			// #ifdef  MP
			this.showVideo = false
			// #endif
		},
		onReady: function (res) { 
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods:{
			loadRatings(index){
				this.labelIndex = index;
			},
			showBigImg(src,srclist){ // 预览图片
				uni.previewImage({
					current:src,
					urls: srclist
				});
			},
			playVideo(path) { // 播放视频
				this.videoSrc = path;
				this.$nextTick(function() {
					this.videoContext.requestFullScreen({direction:0});
				});
				// #ifdef  MP
				this.showVideo = true;
				// #endif
			},
			videoPause(){
				this.videoSrc = '';
				// #ifdef  MP
				this.showVideo = false;
				// #endif
			}, 
			viderFullscreen(e){
				if(e.detail.fullScreen){ // 全屏
					this.videoContext.play();
				}else{ // 退出全屏
					this.videoContext.pause();	
				}
			},
			videoError(e){
				console.log(e)
			}
			
		}
	}
</script> 

<style lang="scss">
.myVideo{
	position: fixed;
	top: 50%;
	right: 100%;
	// #ifdef  MP
	top: 0;
	right: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	// #endif
}
.content{
	view{
		display: flex;
	}
	width: 94%;
	padding: 0 3%;
	
	.label{
		width: 100%;
		flex-wrap:wrap;
		view{
			padding: 0 20upx;
			height: 50upx;
			border-radius: 40upx;
			border:solid 1upx #ddd;
			align-items: center;
			color: #555;
			font-size: 26upx;
			background-color: #f9f9f9;
			margin: 10upx 20upx 10upx 0;
			&.on{
				border:solid 1upx #f06c7a;
				color: #f06c7a;
			}
		}
	}
	.list{
		width: 100%;
		flex-wrap: wrap;
		padding: 20upx 0;
		.row{
			width: 100%;
			margin-top: 30upx;
			.left{
				width: 10vw;
				flex-shrink: 0;
				margin-right: 10upx;
				.face{
					width: 100%;
					image{
						width: 10vw;
						height: 10vw;
						border-radius: 100%;
					}
					
				}
			}
			.right{
				width: 100%;
				flex-wrap: wrap;
				.name-date{
					width: 100%;
					justify-content: space-between;
					align-items: baseline;
					.username{
						font-size: 32upx;
						color: #555;
					}
					.date{
						font-size:28upx;
						color: #aaa;
					}
				}
				.spec{
					width: 100%;
					color: #aaa;
					font-size: 26upx;
				}
				.first{
					width: 100%;
					flex-wrap: wrap;
					.rat{
						font-size: 30upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 50upx)/4);
							height: calc((84.6vw - 50upx)/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9)
								}
							}
						}
					}
				}	
			}
		}
	}
}
</style>
