<template>
	<view>
		<view class="box">
			<view class="head">
				<view class="left">
					<i class="iconfont icon-touxiang"></i>
					头像
				</view>
				<view class="right" @click="upheadimg()">
					<image class="img" v-if="headimg" :src="$config.imgUrl+headimg" mode=""></image>
					<image class="img" v-if="!headimg" src="../../static/images/head.png" mode=""></image>
					<i class="iconfont icon-xiangyoujiantou"></i>
				</view>
			</view>
			<view class="name">
				<view class="left">
					<i class="iconfont icon-nicheng"></i>
					昵称
				</view>
				<view class="right">
					<input type="text" style="text-align: end;font-size:24rpx; color: #666666;" value=""
						v-model="name" placeholder="请输入昵称"/>
					<i class="iconfont icon-xiangyoujiantou"></i>
				</view>
			</view>
			<view class="sex">
				<view class="left">
					<i class="iconfont icon-tongxingbie"></i>
					性别
				</view>

				<picker @change="bindPickerChange" range-key="name" :range="sexlist">
					<view class="right">
						<view class="uni-input">{{sex | sex}}</view>
						<i class="iconfont icon-xiangyoujiantou"></i>
					</view>
				</picker>
			</view>
			<view class="tel">
				<view class="left">
					<i class="iconfont icon-shouji"></i>
					手机
				</view>
				<view class="right" @click="uptel()">
					{{tel}}
					<i class="iconfont icon-xiangyoujiantou"></i>
				</view>
			</view>
		</view>
		<view class="btn" @click="updateinfo()">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headimg:'',
				tel:'',
				name: '',
				sex: 0,
				sexlist: [{
					id: 0,
					name: "保密"
				}, {
					id: 1,
					name: "男"
				}, {
					id: 2,
					name: "女"
				}],
				
			}
		},
		filters: {
			sex(val) {
				if (val == 0) {
					return "保密"
				} else if (val == 1) {
					return "男"
				} else if (val == 2) {
					return "女"
				}
			}
		},
		onLoad(option) {
			let userinfo = uni.getStorageSync('userinfo')
			if(option.tel){
				this.tel = option.tel
				this.headimg = userinfo.photo
				this.name = userinfo.name
				this.sex = userinfo.sex
			}else{
				this.headimg = userinfo.photo
				this.tel = userinfo.mobile
				this.name = userinfo.name
				this.sex = userinfo.sex
			}
			
		},
		methods: {
			// 保存
			updateinfo(){
				let model = {
					 name:this.name,
					    photo:this.headimg,
					    sex:this.sex,
				}
				this.$http.post('/api/user/member/update',model).then(res=>{
					let userinfo = uni.getStorageSync('userinfo')
					userinfo.photo = res.data.photo                                                          
					userinfo.name = res.data.name   
					userinfo.mobile =res.data.mobile
					userinfo.sex = res.data.sex
					uni.setStorage({
						key:'userinfo',
						data:userinfo,
					})
					uni.switchTab({
						url:'/pages/my/my'
					})
				
				},fail=>{
					console.log(fail)
				})
			},
			// 修改手机号
			uptel(){
				uni.navigateTo({
					url:'/pages/my/uptel?isupinfo=true'
				})
				
			},
			// 更换头像
			upheadimg() {
				let _this = this
				uni.chooseImage({
					count: 9, //图片默认9条
					sourceType: ['album', 'camera'],
					sizeType: ['original'], //原图
					success: (res) => {
						uni.showLoading({
							title: "正在上传中"
						})
						let tempFilePaths = res.tempFilePaths
						for (let i = 0; i < tempFilePaths.length; i++) {
							_this.$http.upload('/api/upload/add', tempFilePaths[
									i], {})
								.then(res => {
									console.log(res)
									uni.hideLoading()
									// if (res.errCode == 10000) {
										this.headimg = res.data
									// }
								}, fail => {
									console.log(fail)
								})
						}
					}
				});
			},
			bindPickerChange(e) {
				this.sex = this.sexlist[e.detail.value].id
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.box {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding-top: 20rpx;

		.head {
			width: 90%;
			color: #666666;
			margin: 0 auto;
			height: 100rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: 25rpx;
			justify-content: space-between;
			border-bottom: 1rpx solid #eeeeee;

			.left {
				display: flex;
				align-items: center;

				.iconfont {
					margin-right: 10rpx;
					color: #1f8fff;
					font-size: 30rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.img {
					width: 77rpx;
					height: 77rpx;
					border-radius: 77rpx;
				}

				.iconfont {
					margin-left: 30rpx;
					font-size: 20rpx;
				}
			}
		}

		.name {
			.head;
		}

		.sex {
			.name;
		}
		.tel {
			.head;
			border: #0000000;
		}
	}
	.btn {
		width: 70%;
		background-color: #1f8fff;
		height: 75rpx;
		border-radius: 75rpx;
		color: #fff;
		font-size: 30rpx;
		line-height: 75rpx;
		text-align: center;
		margin: 100rpx auto;
	}
</style>
