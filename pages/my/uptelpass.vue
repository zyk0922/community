<template>
	<view>
		<view class="box">
			<view class="tel"><i class="iconfont icon-shouji"></i>{{tel}}</view>
			<view class="code">
				<view class="left"><i class="iconfont icon-jiesuo"></i><input type="number" v-model="code" value="" placeholder="请输入验证码" placeholder-style="font-size:24rpx" /></view>
				<view>
					<text type="default" v-show="show" class="comm-but" @click="reg">获取验证码</text>
					<span v-show="!show" class="comm-but">{{count}} s</span>
				</view>
			</view>
		</view>
		<view class="btn" @click="complete()">完成</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				show: true,
				count: '',
				timer: null,
				tel:'',
				code:'',
				isupinfo:false,
			}
		},
		onLoad(option){
			console.log(option)
			this.isupinfo = option.isupinfo
			this.tel = option.tel
		},
		methods:{
			// 获取验证码
			reg() {
					const TIME_COUNT = 60;
					this.$http.post('/api/member/sendcode', {
						mobile: this.tel
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
			},
			
			// 完成
			complete(){
				this.$http.post('/api/user/member/changeMobileByCode',{mobile:this.tel,code:this.code}).then(res=>{
					let userinfo = uni.getStorageSync('userinfo')
					userinfo.mobile = res.data.mobile
					uni.setStorage({
						key:'userinfo',
						data:userinfo
					})
					if(this.isupinfo=="true"){
						uni.reLaunch({
							url:'/pages/my/upinfo?tel='+this.tel
						})
					}else{
						uni.reLaunch({
						    url: '/pages/my/my'
						});
					}
					
				},fail=>{
					uni.showToast({
						title:fail.data.errMsg,
						duration:2000
					})
				})
				uni.navigateBack({
					delta:3
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #f6f6f6;
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
				color: #49d176;
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
			.left {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				.iconfont {
					color: #2eca62;
					font-size: 30rpx;
					padding-right: 30rpx;
				}
				input {
					font-size: 24rpx;
					color: #666666;
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
