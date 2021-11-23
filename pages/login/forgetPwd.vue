<template>
	<view>
		<view class="box">
			<view class="tel"><i class="iconfont icon-shouji"></i><input type="tel" v-model="mobile" placeholder="请输入手机号"
					placeholder-style="font-size:24rpx" /></view>
			<view class="code">
				<view class="left"><i class="iconfont icon-jiesuo"></i><input type="text" v-model="code"
						placeholder="请输入验证码" placeholder-style="font-size:24rpx" /></view>
				<view>
					<text type="default" v-show="show" class="comm-but" @click="uptel">获取验证码</text>
					<span v-show="!show" class="comm-but">{{count}} s</span>
				</view>
			</view>
			<view class="newtel">
				<view class="newtel-left">
					<i class="iconfont icon-jiesuo"></i>
					<input :password="showPassword" v-model="pass" placeholder="输入6-12位新密码"
						placeholder-style="font-size:24rpx" />
				</view>
				<view class="newtel-right">
					<i  class="iconfont" :class="showPassword? ' icon-biyan' : 'icon-yanjing'" @click="changeSeen">
					</i>
				</view>
			</view>
		</view>
		<view class="btn" @click="changeMobileByCode">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPassword:true,
				showText:true,
				userInfo: '',
				show: true,
				count: '',
				code: '',
				mobile: '',
				pass:''
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			changeSeen() {
				this.showPassword = !this.showPassword;
			},
			changeMobileByCode() {
				if (!this.code) {
					uni.showToast({
						title: "请先输入验证码",
						icon: 'error'
					})
				} else if (!this.mobile) {
					uni.showToast({
						title: "请先输入手机号",
						icon: 'error'
					})
				} else {
					this.$http.post('/api/user/member/changePassForget', {
						mobile: this.mobile,
						code: this.code,
						pass:this.pass
					}).then(res => {
						console.log(res)
						if (res.errCode == 10000) {
							url.navigateTo({
								url:'/pages/login/login'
							})
						}
					}, fail => {
						uni.showToast({
							title: fail.data.errMsg,
							icon: 'error'
						})
					})
				}

			},
			// 获取验证码
			uptel() {
				if(!this.mobile){
					uni.showToast({
						icon:'error',
						title:'请先输入手机号'
					})
				}else{
					const TIME_COUNT = 60;
				this.$http.post('/api/member/sendcode', {
					mobile: this.mobile
				}).then(res => {
					if (res.errCode == 10000) {
						uni.showToast({
							title: "发送成功",
							duration: 2000
						});
					}
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				}, fail => {
					console.log(fail);
				})
				}
				
			}

		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f5f5;
	}

	.box {
		width: 100%;
		background-color: #fff;
		input {
			font-size: 24rpx;
		}
		.tel {
			width: 94%;
			height: 105rpx;
			display: flex;
			align-items: center;
			margin: 0 auto;
			border-bottom: 1rpx solid #eeeeee;
			font-size: 24rpx;
			color: #666666;

			.iconfont {
				color: #c8644c;
				font-size: 36rpx;
				padding-right: 35rpx;

			}
		}

		.code {
			display: flex;
			width: 94%;
			height: 105rpx;
			align-items: center;
			border-bottom: 1rpx solid #eeeeee;
			margin: 0 auto;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				font-size: 24rpx;

				.iconfont {
					color: #c8644c;
					font-size: 30rpx;
					padding-right: 30rpx;
				}

			}

			.comm-but {
				display: flex;
				align-items: center;
				color: #007AFF;
				font-size: 24rpx;
			}

			.comm-but::after {
				border: none;
			}
		}

		.newtel {
			.tel;
			display: flex;
			justify-content: space-between;
			border: 0;

			.newtel-left {
				display: flex;

				.iconfont {
					color: #49d176;
				}
			}

			.newtel-right {
				height: 105rpx;
				align-items: center;
				flex: 1;
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	.btn {
		width: 510rpx;
		height: 75rpx;
		background-color: #1f8fff;
		border-radius: 75rpx;
		line-height: 75rpx;
		text-align: center;
		color: #fff;
		margin: 100rpx auto;
	}
</style>
