<template>
	<view class="content">
		<view class="from">
			<view class="inp">
				<view claas="label">类型</view>
				<picker @change="bindPickerChange" :value="0" range-key="name" :range="typelist">
					<view class="data">{{typedata}} <i class="iconfont icon-xiangyoujiantou"></i></view>
				</picker>
			</view>
			<view class="inp">

				<view claas="label">报修地址</view>
				<picker @change="bindPickerChange1" :value="0" range-key="name" :range="addresslist">
					<view class="data">{{addressdata}}<i class="iconfont icon-xiangyoujiantou"></i></view>
				</picker>
			</view>
			<view class="inp">
				<view claas="label">联系电话</view>
				<view class="data"><input type="tel" value="" v-model="tel" placeholder="请输入手机号"
						placeholder-style="font-size:24rpx" /><i class="iconfont icon-xiangyoujiantou"></i></view>
			</view>
			<view class="textarea"><textarea class="textareaa" v-model="content"
					placeholder="请输入报修问题,以便维修人员尽快为您解决" placeholder-style="font-size:24rpx" /></view>
			<view class="camera">
				<view class="camera-btn" @click="Videopicture()"><i class="iconfont icon-xiangji"></i></view>
				<view class="camera-img" v-for="(item,index) in imgList" :key="index">
					<i class="iconfont icon-chahao" @click="delimg(index)"></i>
					<image class="img" :src="$config.imgUrl+item.name" mode=""></image>
				</view>
			</view>
			<view class="btn" @click="addform()">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				typelist: [],
				typedata: '请选择报修类型',
				typeid: '',
				addresslist: [],
				addressdata: '请选择报修地址',
				tel: '',
				content: '',
				imgList: [],
				images: [],
			}
		},
		onLoad() {
			this.gettype();
			this.getaddress();
		},
		computed: {
			...mapState({
				building: state => state.building.buildings
			})
		},
		methods: {
			// 添加提交
			addform() {
				let form= {
					id: 0,
					address:this.addressdata,
					content: this.content,
					tel: this.tel,
					type: this.typeid,
					state: 1,
					images: this.images
				};
				console.log(111,form)
				this.$http.post('/api/user/repairs/add',form).then(res=>{
					console.log(222,res)
					uni.redirectTo({
						url:'/pages/repair/record'
					})
				},fail=>{
					console.log(fail)
				})
			},
			// 删除图片
			delimg(index) {
				this.imgList.splice(index, 1)
				this.images.splice(index, 1)
			},
			// 拍照and图片
			Videopicture() {
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
									uni.hideLoading()
									if (res.errCode == 10000) {
										_this.imgList.push({
											oldname: tempFilePaths[i], //原始图片路径 
											name: res.data //新路径  2021/07/20/202107201030281024294.jpg
										})
										_this.images.push({url:res.data})
									}
								}, fail => {
									console.log(fail)
								})
						}
					}
				});
			},
			
			// 地址
			bindPickerChange1(e) {
				this.addressdata = this.addresslist[e.detail.value].name
			},
			getaddress() {
				this.building.forEach(item => {
					this.addresslist.push({
						name: item.building + item.houseno
					})
				})
			},
			// 类型
			bindPickerChange(e) {
				this.typedata = this.typelist[e.detail.value].name
				this.typeid = this.typelist[e.detail.value].id
			},
			// 获取报修类型
			gettype() {
				this.$http.get('/api/user/repairstype/list', {}).then(res => {
					this.typelist = res.data.list
				}, fail => {
					console.log(fail)
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="less" scoped>
	.from {
		width: 90%;
		margin: 0 auto;

		.inp {
			width: 100%;
			height: 105rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			position: relative;

			&::after {
				content: '';
				width: 100%;
				height: 1rpx;
				background-color: #eeeeee;
				transform: scaleY(0.5);
				position: absolute;
				bottom: 0;
				left: 0;
			}

			.iconfont {
				font-size: 24rpx;
				margin-left: 10rpx;
			}

			.data {
				color: #898989;
				display: flex;

				input {
					width: 170rpx;
					font-size: 24rpx;
				}
			}
		}

		.textarea {
			.textareaa {
				width: 100%;
				height: 150rpx;
				font-size: 24rpx;
				border-radius: 15rpx;
				color: #898989;
				padding: 10rpx;
				border: 1rpx solid #c9c9c9;
			}

		}

		.camera {
			display: flex;
			flex-wrap: wrap;
			margin-top: 40rpx;

			.camera-btn {
				width: 95rpx;
				height: 95rpx;
				border-radius: 15rpx;
				border: 1rpx solid #cbcbcb;
				text-align: center;

				.iconfont {
					font-size: 40rpx;
					line-height: 95rpx;
					color: #898989;
				}
			}

			.camera-img {
				width: 95rpx;
				height: 95rpx;
				margin-left: 40rpx;
				border-radius: 15rpx;
				position: relative;
				margin-bottom: 20rpx;

				.iconfont {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
					z-index: 10;
					color: #a3a5a8;
				}

				.img {
					width: 95rpx;
					height: 95rpx;
					border-radius: 15rpx;
				}
			}
		}

		.btn {
			text-align: center;
			line-height: 95rpx;
			color: #fff;
			font-size: 32rpx;
			border-radius: 95rpx;
			width: 550rpx;
			background-color: #1f8fff;
			margin: 100rpx auto;
			height: 95rpx;
		}
	}
</style>
