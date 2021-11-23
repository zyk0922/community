<template>
	<view class="house">
		<view class="house-data">
			<view class="house-title">房屋信息</view>
			<view class="house-inp">
				<view class="data">
					<view class="label">小区</view>
					<view class="inp">
						<picker class="inp" @change="bindPickerChange" :value="0" range-key="name"
							:range="building">
							<view class="uni-input">{{index}}</view>
						</picker>
						<i class="iconfont icon-xiangyoujiantou"></i>
					</view>
				</view>
				<view class="data" @click="selectHouse()">
					<view class="label">楼栋房号</view>
					<view class="inp">{{selectHouseno.name}} <i class="iconfont icon-xiangyoujiantou"></i></view>
				</view>
				<view class="data-data">
					<view class="label">住户类型</view>
					<view class="inp">
						<picker class="inp" @change="bindPickerChange2" :value="userinfotypeed" range-key="name"
							:range="userinfotype">
							<view class="uni-input">{{userinfotypeed}}</view>
						</picker>
						<i class="iconfont icon-xiangyoujiantou"></i>
					</view>
				</view>
			</view>
		</view>、
		<view class="personal-data">
			<view class="house-title">个人信息</view>
			<view class="house-inp">
				<view class="data">
					<view class="label">姓名</view>
					<view class="inp"><input type="text" value="" v-model="name" placeholder="请填写姓名"
							placeholder-style="font-size:24rpx;color:#898989;" /></view>
				</view>
				<view class="data-data">
					<view class="label">联系电话</view>
					<view class="inp"><input type="tel" value="" v-model="tel" placeholder="请输入联系电话"
							placeholder-style="font-size:24rpx;color:#898989;" /></view>
				</view>
			</view>
		</view>
		<view class="btn" @click="add()">提交</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				building: [],
				buildingid: 0,
				index: '请选择小区',
				userinfotype: [],
				userinfotypeed: '请选择住户类型',
				usertype: 1,
				name: '',
				tel: '',

			}
		},
		onLoad() {
			this.getbuilding();
			this.getuserinfotype();

		},
		computed: {
			...mapState({
				selectHouseno: state => state.building.model
			})
		},
		methods: {
			// 提交
			add() {
				let model = {
					id: 0,
					photo: "",
					name: this.name,
					houseid: this.selectHouseno.id,
					usertype: this.usertype,
					sex: 1,
					mobile: this.tel,
					usernative: "",
					cardid: "",
					nation: ""
				}
				this.$http.post('/api/user/userinfo/add', model).then(res=>{
					if(res.errCode==10000){
						uni.navigateTo({
							url:'/pages/house/success?name='+this.name+'&building='+this.selectHouseno.name
						})
					}
				},fail=>{
					console.log(fail)
				})
			},
			// 选择住户类型
			bindPickerChange2(e) {
				this.userinfotypeed = this.userinfotype[e.detail.value].name
				this.usertype = this.userinfotype[e.detail.value].id
			},
			// 获取住户类型数据
			getuserinfotype() {
				this.$http.get('/api/user/userinfotype/list', {}).then(res => {
					console.log(res.data.list)
					this.userinfotype = res.data.list
				}, fail => {
					console.log(fail)
				})
			},
			// 楼栋房间	
			selectHouse() {
				if (this.buildingid == 0) {
					uni.showToast({
						title: "请选择小区",
						icon: "none"
					})
				} else {
					uni.navigateTo({
						url: './building?id=' + this.buildingid + '&name=' + this.index + '&delta=1'
					});
				}
			},
			// 获取小区
			getbuilding() {
				this.$http.get('/api/user/building/list', {
					pid: 0
				}).then(res => {
					this.building = res.data.list
				}, fail => {
					console.log(fail)
				})
			},
			// 小区选择
			bindPickerChange(e) {
				this.buildingid = this.building[e.target.value].id;
				this.index = this.building[e.target.value].name

			},
		}
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="less" scoped>
	.house {
		width: 100%;

		.house-data {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.house-title {
				width: 100%;
				background-color: #f6f6f6;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				padding-left: 30rpx;

			}

			.house-inp {
				width: 100%;

				.data {
					width: 90%;
					margin: 0 auto;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					line-height: 100rpx;
					font-size: 24rpx;
					border-bottom: 1rpx solid #efefef;

					.inp {
						display: flex;
						align-items: center;
						color: #898989;
						.iconfont {
							font-size: 24rpx;
							margin-left: 25rpx;
						}
					}

				}

				.data-data {
					.data;
					border: 0;
				}
			}
		}

		.personal-data {
			.house-data;
			
			.inp {
				
				input {
					font-size: 24rpx;
					width: 200rpx;
				}
			}
		}

		.btn {
			width: 510rpx;
			height: 75rpx;
			line-height: 75rpx;
			text-align: center;
			margin: 0 auto;
			background-color: #5da5f1;
			border-radius: 75rpx;
			color: #fff;
			margin-top: 100rpx;
		}
	}
</style>
