<template>
	<view>
		<view class="top">
			<view class="userinfo">
				<image src="../../static/images/my-bg.png" style="width: 100%;" mode="widthFix"></image>
				<view class="title">会员中心 <i class="iconfont icon-shezhi" @click="setup()"></i></view>
				<view class="headimg" @click="upinfo()">
					<image class="img" v-if="userinfo.photo" :src="$config.imgUrl+userinfo.photo" mode=""></image>
					<image class="img" v-if="!userinfo.photo" src="../../static/images/head.png" mode=""></image>
					<view class="info">
						<view class="tel">{{userinfo.mobile}}</view>
						<view class="info-icon"><i class="iconfont icon-renzheng"></i>已认证</view>
					</view>
				</view>
			</view>
			<view class="menu">
				<view class="menubox">
					<view class="icon" @click="house()"><image src="../../static/images/my-home.png"  mode=""></image></view>
					<view class="txt">我的房屋</view>
				</view>
				<view class="menubox2" @click="vehicle()">
					<view class="icon"><image src="../../static/images/my-vehicle.png"  mode=""></image></view>
					<view class="txt">我的车辆</view>
				</view>
				<view class="menubox3" @click="pay()">
					<view class="icon"><image src="../../static/images/my-pay.png"  mode=""></image></view>
					<view class="txt">我的缴费</view>
				</view>
				<view class="menubox4" @click="family()">
					<view class="icon"><image src="../../static/images/my-family.png"  mode=""></image></view>
					<view class="txt">家庭成员</view>
				</view>
			</view>
		</view>
		<view class="databox">
			<view class="data" @click="repair()"><i class="iconfont icon-tubiao_baoxiujilu"></i><view class="txt">报修记录</view><i class="iconfont icon-xiangyoujiantou"></i></view>
			<view class="data" @click="feedback()"><i class="iconfont icon-yijianfankui"></i><view class="txt">反馈记录</view><i class="iconfont icon-xiangyoujiantou"></i></view>
			<view class="data"><i class="iconfont icon-xinxi"></i><view class="txt">联系物业</view><i class="iconfont icon-xiangyoujiantou"></i></view>
			<view class="data" @click="setup()"><i class="iconfont icon-shezhi1"></i><view class="txt">账号设置</view><i class="iconfont icon-xiangyoujiantou"></i></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{},
				
			}
		},
		onLoad(){
			this.userinfo = uni.getStorageSync('userinfo')
		},
		onShow(){
			this.userinfo = uni.getStorageSync('userinfo')
		},
		methods: {
			// 修改信息
			upinfo(){
				uni.navigateTo({
					url:'/pages/my/upinfo'
				})
			},
			// 跳转设置页面
			setup(){
				uni.navigateTo({
					url:'/pages/my/setup'
				})
			},
			// 跳转反馈记录
			feedback(){
				uni.navigateTo({
					url:'/pages/feedback/record'
				})
			},
			// 跳转家庭成员
			family(){
				uni.navigateTo({
					url:'/pages/family/family'
				})
			},
			// 我的车辆
			vehicle(){
				uni.navigateTo({
					url:'/pages/vehicle/vehicle'
				})
			},
			// 我的房屋
			house(){
				uni.navigateTo({
					url:'/pages/house/certification'
				})
			},
			// 我的缴费
			pay(){
				uni.navigateTo({
					url:'/pages/pay/pay'
				})
			},
			// 报修记录
			repair(){
				uni.navigateTo({
					url:'/pages/repair/record'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.top {
		width:100%;
		height: 660rpx;
		background-color: #fff;
		position: relative;
		.userinfo{
			.title {
				width: 100%;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				color: #fff;
				font-size: 34rpx;
				position: absolute;
				top: 80rpx;
				
				.iconfont {
					position: absolute;
					right: 35rpx;
					font-size: 45rpx;
				}
			}
			.headimg {
				width: 100%;
				position: absolute;
				top: 200rpx;
				left: 0;
				box-sizing: border-box;
				display: flex;
				.img {
					width: 115rpx;
					height: 115rpx;
					border-radius: 115rpx;
					margin: 0 50rpx;
				}
				.info {
					color: #fff;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.tel {
						font-size: 32rpx;
					}
					.info-icon {
						width: 90rpx;
						padding: 5rpx 10rpx;
						margin-top: 10rpx;
						border: 1rpx solid #fff;
						border-radius: 35rpx;
						font-size: 18rpx;
						display: flex;
						align-items: center;
						.iconfont {
							padding:0 5rpx;
							font-size: 25rpx;
						}
					}
					
				}
			}
		}
		.menu {
			width: 90%;
			height: 245rpx;
			display: flex;
			margin: 0 auto;
			justify-content: space-between;
			.menubox {
				width: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.icon {
					width: 60rpx;
					height: 60rpx;
					background-color: #3c88f6;
					border-radius: 15rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 40rpx;
						height: 33rpx;
					}
				}
				.txt {
					font-size: 22rpx;
					margin-top: 25rpx;
				}
			}
			.menubox2 {
				.menubox;
				.icon {
					background-color: #57b988;
				}
			}
			.menubox3 {
				.menubox;
				.icon {
					background-color: #ee9a52;
					image{
						width: 38rpx;
						height: 38rpx;
					}
				}
			}
			.menubox4 {
				.menubox;
				.icon {
					background-color: #4f94f1;
					color: #10315e;
					image {
						width: 31rpx;
						height: 35rpx;
					}
				}
			}
			
		}
	}
	.databox {
		width: 100%;
		background-color: #fff;
		margin-top: 20rpx;
		padding-top: 30rpx;
		height: 39.3vh;
		.data {
			width: 90%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			font-size: 24rpx;
			color: #666666;
			align-items: center;
			border-bottom: 1rpx solid #eeeeee;
			.icon-tubiao_baoxiujilu {
				margin-right: 15rpx;
				font-size: 34rpx;
			}
			.icon-yijianfankui {
				margin-right: 15rpx;
				font-size: 29rpx;
			}
			.icon-xinxi{
				margin-right: 15rpx;
				font-size: 35rpx;
			}
			.icon-shezhi1{
				margin-right: 15rpx;
				font-size: 29rpx;
			}
			.txt {
				flex: 1;
			}
		}
	}
</style>
