<template>
	<view class="set">
		<view class="sets">
			<view class="setTel" @click="uptel()">
				<view class="Tel-left">
					<i class="iconfont icon-shouji"></i>
					<view class="modifyTel">修改手机号</view>
				</view>
				<view class="Tel-right"><i class="iconfont icon-xiangyoujiantou"></i></view>
			</view>
			<view class="setPwd" @click="uppass()">
				<view class="Tel-left">
					<i class="iconfont icon-jiesuo"></i>
					<view class="modifyTel">修改密码</view>
				</view>
				<view class="Tel-right"><i class="iconfont icon-xiangyoujiantou"></i></view>
			</view>
		</view>

		<view class="set0">
			<view class="eliminate">
				<view class="eliminate-left">
					<i class="iconfont icon-yunongtongqingchuhuancun"></i>
					<view class="cache">清除缓存</view>
				</view>
				<view class="eliminate-right">
					<view class="number">12M</view>
					<view class="iconfont icon-xiangyoujiantou"></view>
				</view>
			</view>
			<view class="edition">
				<view class="eliminate-lefts">
					<i class="iconfont icon-banben"></i>
					<view class="cache">当前版本</view>
				</view>
				<view class="eliminate-right">
					<view class="number">1.0.0</view>
					<view class="iconfont icon-xiangyoujiantou"></view>
				</view>
			</view>
		</view>
			<view class="button" @click="signout()">退出当前账号</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				edition:'',
			}
		},
		onLoad(){
			
		},
		methods:{
			uppass(){
				uni.navigateTo({
					url:'/pages/my/uppass'
				})
			},
			// 修改手机号
			uptel(){
				uni.navigateTo({
					url:'/pages/my/uptel?isupinfo=false'
				})
			},
			// 退出登录
			signout(){
				uni.removeStorage({
					key:'token'
				})
				uni.removeStorage({
					key:'userinfo'
				})
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #f6f6f6;
	}
	.set {
		width: 100%;
		height: auto;
		background-color: #f6f5f5;

		.sets {
			width: 100%;
			height: 226rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;

			.setTel {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 90%;
				margin: auto;
				height: 113rpx;
				border-bottom: 1rpx solid #f6f6f6;

				.Tel-left {
					display: flex;

					.iconfont {
						margin-left: 12rpx;
						font-size: 36rpx;
						color: #d17e6a;
					}

					.modifyTel {
						margin-left: 12rpx;
						font-size: 24rpx;
					}
				}

				.Tel-right {
					.iconfont {
						font-size: 20rpx;
						color: #898989;
					}
				}

			}

			.setPwd {
				display: flex;
				align-items: center;
				width: 90%;
				margin: auto;
				height: 113rpx;
				.setTel;

				.Tel-left {
					display: flex;

					.iconfont {
						margin-left: 12rpx;
						font-size: 32rpx;
						color: #2eca62;
					}
				}
			}
		}

		.set0 {
			width: 100%;
			height: 226rpx;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;

			.eliminate {
				border-bottom: 1rpx solid #f6f6f6;
				width: 90%;
				margin: auto;
				height: 113rpx;
				display: flex;
				justify-content: space-between;
				.eliminate-left{
					display: flex;
					align-items: center;
					flex:1;
					height: 113rpx;
					.iconfont{
						color: #2091ea;
						font-size: 32rpx;
						margin-left:12rpx ;
					}
					.cache{
						font-size: 24rpx;
						margin-left:12rpx ;
					}
				}
				.eliminate-right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					flex:1;
					height: 113rpx;
					.iconfont{
						color: #898989;
						font-size: 20rpx;
					}
					.number{
						margin-right: 30rpx;
						font-size: 20rpx;
						color: #1a8ee9;
					}
				}
			}

			.edition {
				width: 90%;
				margin: auto;
				height: 113rpx;
				.eliminate;
				.eliminate-lefts{
					display: flex;
					align-items: center;
					flex:1;
					height: 113rpx;
					.iconfont{
						color: #32cb66;
						font-size: 32rpx;
						margin-left:12rpx ;
					}
					.cache{
						font-size: 24rpx;
						margin-left:12rpx ;
					}
				}
			}
		}
			 .button{
				 width: 80%;
				 height: 76rpx;
				 margin: 100rpx auto;
				 background-color: #1f8fff;
				 border-radius: 40rpx;
				 display: flex;
				 align-items: center;
				 justify-content: center;
				 color: #FFFFFF;
				 font-size:32rpx;
			 }
	}
</style>
