<template>
	<view class="details">
		<view class="data">
			<view class="address">
				<view class="house">{{data.address}}</view>
				<view class="type">{{data.typename}}</view>
				<view class="state">{{data.statename}}</view>
			</view>
			<view class="content">{{data.content}}</view>
			<view class="details-img">
				<image class="img" v-for="(item,index) in data.images" :src="$config.imgUrl+item.url" mode=""></image>
			</view>
			<view class="time">{{data.addtime | time}}</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				data:{},
			}
		},
		onLoad(option){
			this.getdata(option.id)
		},
		filters:{
			time(val){
				return moment(val).format("YYYY-MM-DD HH-mm")
			}
		},
		methods: {
			getdata(id){
				this.$http.get('/api/user/repairs/get',{id:id}).then(res=>{
					console.log(res)
					this.data = res.data
				},fail=>{
					console.log(fail)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.details {
		width: 100%;
		background-color: #f6f6f6;
		overflow: hidden;
		.data {
			width: 96%;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 10rpx;
			.address {
				width: 90%;
				height: 80rpx;
				margin: 0 auto;
				color: #666666;
				display: flex;
				font-size: 22rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #f0f0f0;
				line-height: 80rpx;
				.house {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.type {
					margin-left: 20rpx;
				}
				.state {
					width: 100rpx;
					margin-left: 30rpx;
				}
			}
			.content {
				width: 90%;
				margin: 0 auto;
				padding: 30rpx 0;
				font-size: 22rpx;
			}
			.details-img {
				width: 90%;
				margin:0 auto ;
				border-bottom: 1rpx solid #f3f3f3;
				.img {
					width: 100%;
					margin-bottom: 20rpx;
				}
			}
			.time {
				width: 90%;
				height: 75rpx;
				margin: 0 auto;
				line-height: 75rpx;
				font-size: 18rpx;
				color: #666666;
			}
		}
	}
</style>
