<template>
	<view>
		<image src="../../static/images/chart-img.png" style="width: 100%;" mode="widthFix"></image>
		<checkbox-group @change="checkboxChange">
			<view class="vehiclebox" v-for="(item,index) in list" :key="item.id">
				<view class="data"><i class="iconfont icon-qiche"></i>
					<view class="txt">{{item.carno}}</view>
					<label class="radio">
						<checkbox :value="item.id+''"/>
					</label>
				</view>
			</view>
		</checkbox-group>
		<view class="btn" @click="del()">删除</view>
		<modal v-model="show" title="确定要删除吗？" @confirm="confirm()"></modal>
	</view>
</template>

<script>
	import modal from '../../components/x-modal/x-modal.vue'
	export default {
		data() {
			return {
				checked: [],
				list: [],
				show:false,
			};
		},
		onLoad() {
			this.getlist();
		},
		components:{
			modal
		},
		methods: {
			// 获取我的车辆信息
			getlist() {
				this.$http.get('/api/user/car/list', {}).then(res => {
					this.list = res.data.list
				})
			},
			// 选择
			checkboxChange(e) {
				this.checked = e.detail.value
			},
			// 删除提示成功调用
			confirm(){
				this.$http.post('/api/user/car/deleteall',{ids:this.checked}).then(res=>{
					this.getlist()
				},fail=>{
					console.log(fail)
				})
			},
			// 删除
			del(){
				this.show = true
				
			},
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: '/pages/vehicle/add'
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
	.vehiclebox {
		.data {
			width: 90%;
			margin: 0 auto;
			height: 85rpx;
			padding-top: 30rpx;
			display: flex;
			align-items: center;
			font-size: 25rpx;
			border-bottom: 1rpx solid #f6f6f6;

			.iconfont {
				color: #61a0f0;
				font-size: 32rpx;
				margin-right: 20rpx;

			}

			.txt {
				flex: 1;
			}

			.radio {
				margin: 0 10rpx 0 30rpx;

				.radioed {
					width: 40rpx;
					height: 40rpx;
					background-color: #fff;
					border-radius: 40rpx;
					border: 1rpx solid #7f7f7f;
				}

				.on {
					.radioed;
					border: 1rpx solid #458df7;
					background-color: #458df7;
					position: relative;

					&::after {
						content: '✔';
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

		}
	}

	.btn {
		width: 640rpx;
		height: 95rpx;
		background-color: #1f8fff;
		text-align: center;
		line-height: 95rpx;
		font-size: 32rpx;
		margin: 100rpx auto;
		border-radius: 95rpx;
		color: #fff;

	}
</style>
