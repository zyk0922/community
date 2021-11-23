<template>
	<view>
		<view class="box">
			<view class="tel"><i class="iconfont icon-shouji"></i>{{mobile}}</view>
			<view class="code">
				<view class="left"><i class="iconfont icon-jiesuo"></i><input type="number" value="" placeholder="请输入验证码" v-model="code" placeholder-style="font-size:24rpx" /></view>
				<view>
					<text type="default" v-show="show" class="comm-but" @click="reg">获取验证码</text>
					<span v-show="!show" class="comm-but">{{count}} s</span>
				</view>
			</view>
			<view class="newtel"><i class="iconfont icon-shouji"></i><input type="tel" v-model="newtel" value="" placeholder="请输入新的手机号" placeholder-style="font-size:24rpx"/></view>
		</view>
		<view class="btn" @click="next()">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				count: '',
				mobile:'',
				code:'',
				newtel:'',
				timer:null,
				isupinfo:false,
			}
		},
		onLoad(option) {
			this.isupinfo = option.isupinfo
			let userinfo = uni.getStorageSync('userinfo')
			this.mobile = userinfo.mobile
		},
		methods: {
			// 下一步
			next(){
				this.$http.post('/api/user/member/checkCode',{mobile:this.mobile,code:this.code}).then(res=>{
					if(this.newtel){
							uni.navigateTo({
							url:'/pages/my/uptelpass?tel='+this.newtel+'&isupinfo='+this.isupinfo
						})
					}else{
						uni.showToast({
							icon:'error',
							title:'输入新的手机号',
							duration:2000,
						})
					}
				},fail=>{
					uni.showToast({
						icon:'error',
						title:fail.data.errMsg,
						duration:2000
					})
					
				})
				
			},
			// 获取验证码
			reg() {
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
						uni.showToast({
							icon:'error',
							title:fail.data.errMsg,
							duration:2000
						})
					})
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
				font-size: 31rpx;
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
			color: #666666;
			.left {
				display: flex;
				align-items: center;
				.iconfont {
					color: #2eca62;
					font-size: 30rpx;
					padding-right: 30rpx;
				}
				input {
					font-size: 24rpx;
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
			border: 0;
			.iconfont {
				color: #49d176;
			}
			input {
				font-size: 24rpx;
				color: #666666;
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
