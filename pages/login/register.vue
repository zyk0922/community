<template>
	<view class="main">
		<view class="back">
			<image src="../../static/images/ba.png" mode=""></image>
		</view>
		<view class="moban">
			<view class="mobanli">
				<input type="tel" class="tel" placeholder="请输入手机号" v-model="mobile" />
				<view class="comm">
					<input type="password" placeholder="请输入验证码" v-model="code" class="code" />
					<text type="default" v-show="show" class="comm-but" @click="reg">获取验证码</text>
					<span v-show="!show" class="comm-but">{{count}} s</span>
				</view>
			</view>
		</view>
		<view class="zysx">
			 <label class="radio" @click="radio"><view :class="checked?'on':'radioed'"></view></label>
			<view class="ra-fo">
				我已阅读并同意<b class="fo-font">《用户使用权限》</b>和<b class="fo-font">《隐私政策》</b>
			</view>
		</view>
		<view class="but" @click="next">
			<button type="default" class="bubutton">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				mobile: '',
				code: '',
				checked:false,
			};
		},
		methods: {
			// 权限政策
			radio(){
				this.checked = !this.checked
			},
			// 下一步
			next(){
				if(this.mobile && this.code && this.checked){
					this.$http.post('/api/member/regByCode',{mobile:this.mobile,code:this.code}).then(res=>{
						if(res.errCode==10000){
						uni.navigateTo({
							url:'./registertwo?mobile='+this.mobile
						})
						}
					},fail=>{
						uni.showToast({
							icon:'error',
							title: fail.data.errMsg,
							duration: 2000
						});
					})
					
					
				}else{
					if(!this.mobile){
						uni.showToast({
							icon:'error',
							title: "请先输入手机号",
							duration: 2000
						});
					}else if(!this.code){
						uni.showToast({
							icon:'error',
							title: "请先输入验证码",
							duration: 2000
						});
					}else if(!this.checked){
						uni.showToast({
							icon:'error',
							title: "请先勾选",
							duration: 2000
						});
					}
				}
			},
			// 获取验证码
			reg() {
				if(!this.mobile){
					uni.showToast({
						title: "请先输入手机号",
						duration: 2000
					});
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
	*{
	padding: 0;
	margin: 0;
}
page{
	background-color: #f4f5fa;
}
.main{
	width: 100%;
	height: 100%;
	.back{
		width: 100%;
		height: 256rpx;
		image{
			width: 100%; 
			height: 100%;
		}
	}
	.moban{
		width: 92%;
		height: 310rpx;
		background-color: #FFFFFF;
		position: relative;
		top: -120rpx;
		margin: auto;
		border-radius: 15rpx;
		.mobanli{
			width: 80%;
			height: 200rpx;
			margin: auto;
			.tel{
				height: 150rpx;
				border-bottom: 1rpx solid #f2f2f2;
				padding-top: 30rpx;
				box-sizing: border-box;
			}
			.comm{
				width: 100%;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				display: flex;
				padding-top: 30rpx;
				box-sizing: border-box;
				.code{
					width: 50%; 
					height: 100rpx;
				}
				.comm-but{
					display: flex;
					align-items: center;
					color: #007AFF;
				}
				.comm-but::after{
				  border: none;
				}
			}
		}
		
	}
	.zysx{
		width: 100%;
		height: 50rpx;
		position: absolute;
		top: 487rpx;
		display: flex;
		align-items: center;
		.radio{
			margin: 0 10rpx 0 30rpx;
			.radioed {
				width: 40rpx;
				height: 40rpx;
				background-color: #fff;
				border-radius: 40rpx;
				border: 1rpx solid #eeeeee;
			}
			.on {
				.radioed;
				border: 1rpx solid #458df7;
				background-color: #458df7;
				position: relative;
				&::after {
					content: '✓';
					position: absolute;
					top: 50%;
					left: 50%;
					margin: -45% 0 0 -30%;
					color: #fff;
			        font-size: 14px;
			        font-weight: bold;
				}
			}
		}
		
		.ra-fo{
			font-size: 16rpx;
			line-height: 50rpx;
			.fo-font{
				color: #5da7f0;
			}
		}
		
	}
	.but{
		width: 80%;
		height: 100rpx;
		margin: auto;
		border-radius: 50rpx;
		.bubutton{
			width: 100%;
			height: 100%;
			background-color: #5da7f0;
			margin: auto;
			border-radius: 50rpx;
			color: #FFFFFF;
		}
	}
}
</style>
