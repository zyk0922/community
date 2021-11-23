<template>
	<view class="quan">
		<view class="tutel">
			<view class="whole">全部</view>
			<view class="information">系统信息</view>
		</view>
		<view class="chat">
			<view class="nani" @click="help(item.touserid)" v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="left-price">
						<image v-if="item.photo" :src="$config.imgUrl+item.photo" mode=""></image>
						<image v-if="!item.photo" src="../../static/images/head.png" mode=""></image>
					</view>
					<view class="name">
						<view class="username">{{item.name}}</view>
						<view class="info">{{item.type=='file'?[图片]:item.content}}</view>
					</view>
				</view>
				<view class="right">{{item.addtime | addtime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var moment = require('moment');	
	export default {
		data(){
			return {
				list:[]
			}
		},
		onLoad(){
			this.onKeyboardHeightChange()
			this.getlist();
		},
		onShow() {
			this.getlist()
		},
		filters:{
			addtime(val) {
				return moment(val).format('[今天] H:mm');
			}
		},
		methods:{
			help(touserid){
				uni.navigateTo({
					url:'/pages/help/chat?touserid='+touserid
				})
			},
			// 获取消息数据
			getlist(){
				this.$http.get('/api/user/messages/mylist',{}).then(res=>{
					this.list = res.data.list
				},fail=>{
					console.log(fail)
				})
			},
			// 监听键盘事件
			onKeyboardHeightChange(){
				uni.onKeyboardHeightChange(res => {
					 if(res.height!==0){
						 uni.hideTabBar()
					 }else{
						 uni.showTabBar()
					 }
				  
				})
			},
		}
		
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="less" scoped>
	.quan {
		width: 100%;

		.tutel {
			width: 90%;
			margin: auto;
			height: 100rpx;
			border-bottom: 1rpx solid #f4f6f6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;

			.whole {
				color: #3b87f6;
			}

			.information {
				color: #666666;
			}
		}

		.chat {
			padding-top: 42rpx;
			width: 100%;
			height: 400rpx;

			.nani {
				width: 90%;
				margin: auto;
				height: 136rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.right {
					color: #cccccc;
					font-size: 24rpx;
				}

				.left {
					display: flex;
					height: 136rpx;
					align-items: center;

					.left-price {
						height: 136rpx;
						display: flex;
						align-items: center;
						margin-right: 30rpx;

						image {
							width: 90rpx;
							height: 90rpx;
							border-radius: 10rpx;
						}
					}

					.name {
						height: 90rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.username {
							color: #4f5153;
							font-size: 32rpx;
						}

						.info {
							color: #8a8a8e;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
