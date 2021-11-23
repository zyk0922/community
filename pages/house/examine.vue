<template>
	<view>
		<view class="box">
			<i class="iconfont icon-visit-time"></i>
			<view class="data">尊敬的13254987568用户</view>
			<view class="state">您的房屋正在审核中...</view>
			<view class="txt">请等待社区管理人员审核！</view>
			<view class="btn">查看房屋认证情况</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
	.box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 31rpx;
		color: #1f8fff;
		.iconfont {
			font-size: 210rpx;
			color: #00a2f1;
			margin-top: 150rpx;
		}
		.data {
			margin-top: 70rpx;
		}
		.state {
			margin-top: 20rpx;
		}
		.txt {
			margin-top: 20rpx;
		}
		.btn {
			width: 640rpx;
			height: 95rpx;
			background-color: #1f8fff;
			margin: 0 auto;
			text-align: center;
			line-height: 95rpx;
			border-radius: 95rpx;
			color: #fff;
			font-size: 31rpx;
			margin-top: 100rpx;
		}
	}
</style>
