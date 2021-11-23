<template>
	<view class="repairs">
		<view class="title">
			<text>居民信息</text>
		</view>
		<view class="repairsForm">
			<view class="item">
				<view>
					<text>楼栋房号</text>
				</view>
				<view class="icon-view">
					<picker @change="handleChangBuild" range-key="building" :range="buildingList">
						<view>
						<text class="type">{{fromdata.usernative == ''?'请选择楼栋':fromdata.usernative}}</text>
						</view>
					</picker>
					<i class="iconfont icon-xiangyoujiantou"></i>
					<!-- </picker> -->
				</view>
			</view>
			<view class="item">
				<view>
					<text>姓名</text>
				</view>
				<view>
<input type="text" v-model="fromdata.name" placeholder-style="font-size:24rpx;color:#ababab;" placeholder="请填写姓名" />
				</view>
			</view>
			<view class="item">
				<view>
					<text>身份证号</text>
				</view>
				<view>
					<input class="inp" v-model="fromdata.cardid" type="text" placeholder-style="font-size:24rpx;color:#ababab;" placeholder="请填写身份证号" />
				</view>
			</view>
			<view class="item">
				<view>
					<text>性别</text>
				</view>
				<view class="view">
					<picker @change="handleChangBuildsge" range-key="name" :range="sgeList">
						<view>
							<text class="type">{{sgename == ''?'请选择性别':sgename}}</text>
						</view>
					</picker>
					<i class="iconfont icon-xiangyoujiantou"></i>
				</view>
			</view>
			<view class="item">
				<view>
					<text>联系电话</text>
				</view>
				<view class="view">
					<input type="tel" v-model="fromdata.mobile" maxlength="11" style="text-align: end;box-sizing: border-box;"
						placeholder="请填写联系电话" placeholder-style="font-size:24rpx;color:#ababab;">
				</view>
			</view>
		</view>
		<view class="btn" @click="add">
			<view class="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				buildingList: [],
				building: '',
				sgeList: [{
						id: 1,
						name: "男"
					},
					{
						id: 0,
						name: "女"
					},
				],
				sgename: '',
				fromdata: {
					id: 0,
					photo: "",
					name: "",
					houseid: '',
					usertype: '',
					sex: '',
					mobile: "",
					usernative: "",
					cardid: "",
					nation: ""
				},
			};
		},
		onLoad() {
			this.buildingList = this.buildings
		},
		computed:{
			...mapState({buildings:state=>state.building.buildings})
		},
		methods: {
			add() {
				this.$http.post('/api/user/userinfo/add', this.fromdata).then(res => {
					if (res.errCode == 10000) {
							uni.navigateTo({
								url: '/pages/family/family'
							})
					}
				},fail=>{
					uni.showToast({
						title:fail.data.errMsg,
						duration:2000,
						icon:'error'
					})
				})

			},
			// 楼栋房号
			handleChangBuild(e) {
				this.fromdata.usernative = this.buildingList[e.target.value].building
			},
			// 性别
			handleChangBuildsge(e) {
				this.fromdata.sex = this.sgeList[e.target.value].id
				this.sgename = this.sgeList[e.target.value].name
			}
		},

	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="less">
	.repairs{
	width: 100%;
	height: auto;
	.title{
		font-size: 24rpx;
	}
	.repairsForm{
		width:94%;
		margin: 0 auto;
		height: auto;
		.item{
			width:100%;
			height: 105rpx;
			display: flex;
			font-size: 24rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #f0f0f0;
			&:last-child{
				border: none;
			}
			text{
				&:first-child{
					margin-left: 13rpx;
				}
			}
			input {
				font-size: 24rpx;
				
			}
			.type{
				margin-right: 21rpx;
				color: #ababab;
			}
			i{
				&::before{
					color: #898989;
					font-size: 28rpx;
				}
			}
			input {
				color: #ababab;
				text-align: end;
				margin-right: 40rpx;
			}
			.inp {
				text-align: end;
				margin-right: 40rpx;
			}
		}
	}
	.btn{
		width: 100%;
		height: 80rpx;
		margin-top: 40rpx;
		.submit{
			display: flex;
			width: 80%;
			margin: auto;
			height: 80rpx;
			background-color: #007AFF;
			border-radius: 40rpx;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
	}
	
}
.icon-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

	.title {
		width: 750rpx;
		height: 108rpx;
		background: #f0f0f0;
		font-size: 30rpx;
		color: #000000;
		line-height: 108rpx;

		text {
			margin-left: 30rpx;
		}
	}

	.uni-input-input {
		width: 200rpx !important;
	}

	.repairsForm {
		.view {
			display: flex;
		}
	}
</style>
