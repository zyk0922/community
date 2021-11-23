<template>
	<view class="box">
		<view class="ba">
			<image class="ba-img" src="../../static/images/ba.png" mode="widthFix"></image>
		</view>
		<view class="from-box" v-if="iscode">
			<view class="from-title">
				<view class="txt1" @click="codelogin()">验证码登录</view>
				<view class="txt2" @click="passlogin()">密码登录</view>
			</view>
			<view class="from-input">
				<input type="tel" class="inp-tel" value="" v-model="mobile" placeholder="请输入手机号" />
				<view class="inp-pass">
					<input type="number" class="inp" value="" v-model="code" placeholder="请输入验证码" />
					<view type="default" v-show="show" class="pass-button" @click="reg">获取验证码</view>
					<span v-show="!show" class="pass-button">{{count}} s</span>
				</view>
			</view>
		</view>
		<view class="from-box" v-if="!iscode">
			<view class="from-title">
				<view class="txt1" @click="passlogin()">密码登录</view>
				<view class="txt2" @click="codelogin()">验证码登录</view>
			</view>
			<view class="from-input">
				<input type="tel" class="inp-tel" value="" v-model="mobile" placeholder="请输入手机号" />
				<view class="inp-pass">
					<input :password="showPassword" class="inp" value="" v-model="pass" placeholder="请输入密码" />
					<i  class="iconfont" :class="showPassword? ' icon-biyan' : 'icon-yanjing'" @click="changeSeen">
					</i>
				</view>
			</view>
		</view>
		<view class="button" @click="login()">登录</view>
		<view class="forgetpwd" @click="forgetpwd()">忘记密码</view>
		<view class="register" @click="register">没有账号，立即注册</view>
	</view>
</template>

<script>
	import { mapActions }from 'vuex'
	export default {
		data() {
			return {
				showPassword:true,
				iscode: true,
				show: true,
				count: '',
				timer: null,
				mobile:'',
				code:'',
				pass:'',
			};
		},
		methods: {
			...mapActions({update:'building/updatebuildings'}),
			changeSeen() {
				this.showPassword = !this.showPassword;
			},
			// 忘记密码
			forgetpwd(){
				uni.navigateTo({
					url:'/pages/login/forgetPwd'
				})
			},
			// 登录
			login(){
				if(this.iscode){
					this.$http.post('/api/member/loginByCode',{mobile:this.mobile,code:this.code}).then(res=>{
							console.log(1111,res)
						if(res.errCode==10000){
							uni.setStorage({
								key:'token',
								data:res.data.token
							})
							uni.setStorage({
								key:'userinfo',
								data:res.data.member
							})
							uni.setStorage({
								key:'userid',
								data:res.data.userid
							})
							this.update(res.data.buildings)
							uni.switchTab({
								url:'/pages/index/index'
							})
						}else{
							uni.showToast({
								icon:'error',
								title:'登录失败',
								duration:2000,
							})
						}
					},fail=>{
						uni.showToast({
							icon:'error',
							title:fail.data.errMsg,
							duration:2000,
						})
					})
				}else{
					this.$http.post('/api/member/login',{mobile:this.mobile,pass:this.pass}).then(res=>{
						console.log(res)
						if(res.errCode==10000){
							uni.setStorage({
								key:'token',
								data:res.data.token
							})
							uni.setStorage({
								key:'userinfo',
								data:res.data.member
							})
							uni.setStorage({
								key:'userid',
								data:res.data.userid
							})
							this.update(res.data.buildings)
							uni.switchTab({
								url:'../index/index'
							})
						}else{
							uni.showToast({
								icon:'error',
								title:'登录失败',
								duration:2000,
							})
						}
					},fail=>{
						uni.showToast({
							icon:'error',
							title:fail.data.errMsg,
							duration:2000,
						})
					})
				}
			},
			// 验证码登录
			codelogin(){
				this.iscode = true
			},
			// 密码登录
			passlogin(){
				this.iscode = false
			},
			// 注册
			register(){
				uni.navigateTo({
					url:'./register'
				})
			},
			// 获取验证码
			reg() {
				if (!this.mobile) {
					uni.showToast({
						icon:'error',
						title: "请先输入手机号",
						duration: 2000
					});
				} else {
					const TIME_COUNT = 60;
					this.$http.post('/api/member/sendcode', {
						mobile: this.mobile
					}).then(res => {
						console.log(res)
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
							title:fail.data.errMsg,
							icon:'error'
						})
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		width: 100%;
		height: 93vh;
		background-color: #f9f9f9;
		box-sizing: border-box;

		.ba {
			.ba-img {
				width: 100%;
			}
		}

		.from-box {
			width: 90%;
			height: 410rpx;
			background-color: #ffffff;
			position: absolute;
			top: 105rpx;
			left: 50%;
			display: flex;
			flex-direction: column;
			margin-left: -45%;
			border-radius: 20rpx;

			.from-title {
				width: 100%;
				height: 165rpx;
				position: relative;

				.txt1 {
					width: 100%;
					text-align: center;

					font-size: 34rpx;
					line-height: 165rpx;
					font-weight: bold;
				}

				.txt2 {
					position: absolute;
					top: 0;
					right: 32rpx;
					line-height: 165rpx;
					font-size: 26rpx;
				}
			}

			.from-input {
				width: 90%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;

				.inp-tel {
					height: 100rpx;
					border-bottom: 1rpx solid #f2f2f2;
				}

				.inp-pass {
					display: flex;
					position: relative;
					align-items: center;
					justify-content: space-between;

					.inp {
						height: 100rpx;
					}
					.iconfont {
						font-size: 36rpx;
						color: #666666;
					}

					.pass-button {
						border: 0;
						line-height: 100rpx;
						position: absolute;
						right: 60rpx;
						color: #2f6ab4;
					}
				}
			}
		}

		.button {
			width: 60%;
			height: 100rpx;
			background-color: #5ca9f1;
			position: absolute;
			top: 600rpx;
			left: 50%;
			margin-left: -30%;
			border-radius: 100rpx;
			text-align: center;
			line-height: 100rpx;
			color: #ffffff;
			font-size: 32rpx;
		}

		.register {
			width: 100%;
			position: absolute;
			top: 800rpx;
			left: 0;
			text-align: center;
		}
		.forgetpwd{
			position: absolute;
			top: 750rpx;
			left: 50%;
			margin-left: -10%;
		}
	}
</style>
