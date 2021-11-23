<template>
	<view class="success">
		<view class="box">
			<i class="iconfont icon-duigouxiao"></i>
		<view class="title">恭喜你，操作成功！</view>
		<view class="name">{{name}}</view>
		<view class="houseid">你的门牌号是：{{building}}</view>
		<view class="txt">等待物业审核！</view>
		<view class="btn" @click="index()">返回首页</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				name:'',
				building:'',
			}
		},
		onLoad(option){
			this.name = option.name
			this.building = option.building
		},
		methods:{
			index(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.success {
		height: 93vh;
		display: flex;
		justify-content: center;
		.box {
			display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 200rpx;
		}
		
		.iconfont {
			font-size: 145rpx;
			color: #27da99;
		}
		.title {
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 50rpx;
		}
		.name {
			margin-top: 50rpx;
		}
		.houseid {
			margin-top: 10rpx;
		}
		.txt {
			margin-top: 10rpx;
		}
		.btn {
			width: 90%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background-color: #1f8fff;
			border-radius: 90rpx;
			margin-top: 100rpx;
			color: #fff;
		}
	}
	
</style>
