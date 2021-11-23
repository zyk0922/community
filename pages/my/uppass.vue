<template>
	<view>
		<view class="box">
			<view class="newtel"><i class="iconfont icon-jiesuo"></i><input type="password" v-model="oldpass" value=""
					placeholder="输入旧密码" placeholder-style="font-size:24rpx" /></view>
			<view class="newtel"><i class="iconfont icon-jiesuo"></i><input type="password" v-model="newpass" value=""
					placeholder="输入6-12位的新密码" placeholder-style="font-size:24rpx" /></view>
			<view class="newtell"><i class="iconfont icon-jiesuo"></i><input type="password" v-model="newpass2"
					value="" placeholder="再次输入新密码" placeholder-style="font-size:24rpx" /></view>
		</view>
		<view class="btn" @click="next()">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpass: '',
				newpass: '',
				newpass2: ''
			}
		},
		onLoad() {

		},
		methods: {
			next(){
				if(this.newpass!==this.newpass2){
					uni.showToast({
						icon:'error',
						title: '两次密码不一致'
					});
				}else{ 
					this.$http.post('/api/user/member/changePass',{oldpass:this.oldpass,pass:this.newpass}).then(res=>{
					console.log(res)
				},fail=>{
					console.log(fail)
				})
				}
				
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
				color: #c8644c;
				font-size: 31rpx;
				padding-right: 35rpx;

			}
		}

		.newtel {
			.tel;

			.iconfont {
				color: #49d176;
			}

			input {
				font-size: 24rpx;
				color: #666666;
			}
		}
		.newtell{
			.newtel;
		border: 0;
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
