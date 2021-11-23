<template>
	<view class="main">
		<view class="back">
			<image src="../../static/images/ba.png" mode=""></image>
		</view>
		<view class="moban">
			<view class="mobanli">
				<input type="password" class="tel" v-model="pass" placeholder="请输入密码" />
				<view class="comm">
					<input type="password" v-model="pass2" placeholder="再次输入密码" class="code" />
				</view>
			</view>
		</view>
		<view class="zysx">
			<label class="radio" @click="radio"><view :class="checked?'on':'radioed'"></view></label>
			<view class="ra-fo">
				我已阅读并同意<b class="fo-font">《用户使用权限》</b>和<b class="fo-font">《隐私政策》</b>
			</view>
		</view>
		<view class="but">
			<button type="default" class="bubutton" @click="Submit">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				mobile:'',
				pass:'',
				pass2:'',
			};
		},
		onLoad(option){
			this.mobile = option.mobile
		},
		methods:{
			// 提交
			Submit(){
				if(this.pass===this.pass2 && this.checked){
					uni.navigateTo({
						url:'./login'
					})
				}else{
					if(!this.checked){
						uni.showToast({
							icon:'error',
							title:'请先勾选',
							duration:2000,
						})
					}else{
						uni.showToast({
						icon:'error',
						title:'两次密码不相同',
						duration: 2000,
					})
					}
					
				}
			},
			// 权限政策
			radio(){
				this.checked = !this.checked
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
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				padding-top: 30rpx;
				box-sizing: border-box;
				.code{
					width: 50%; 
					height: 100rpx;
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
