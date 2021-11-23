<template>
	<view class="record">
		<view class="search">
			<view class="left">全部</view>
			<picker @change="bindPickerChange" :value="index" range-key="name" :range="array">
				<view class="right">
					<view class="uni-input">{{index}}<i class="iconfont icon-xiajiantou"></i></view>
				</view>
			 </picker>
			
		</view>
		<view class="address-time">
			<view class="address">理想城1号楼1单元2230 <i class="iconfont icon-xiangxiajiantou-copy-copy"></i></view>
			<view class="time">2021-09 <i class="iconfont icon-xiajiantou"></i></view>
		</view>
		<view class="data" v-for="(item,index) in list">
			<view class="data-title">{{item.type}}</view>
			<view class="data-data"><view class="txt">房号</view><view class="data-id">{{item.houseno}}</view></view>
			<view class="data-data"><view class="txt">账单</view><view class="data-time">{{item.begindate}}</view></view>
			<view class="data-data"><view class="txt">账单金额</view><view class="data-price">￥360.00元</view></view>
			<view class="data-data"><view class="txt">缴费时间</view><view class="data-addtime">{{item.addtime | time}}</view></view>
			<view class="data-data"><view class="txt">付款方式</view><view class="data-addtime">微信支付</view></view>
		</view>
		<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
		<loading :loading="loading"></loading>
	</view>
</template>

<script>
	import loading from '../../components/loadding.vue'
	import moment from 'moment'
	export default {
		data(){
			return {
				isshow:false,
				list:[],
				page:1,
				psize:10,
				array:[],
				index:'类型',
				loading:false
			}
		},
		onLoad(){
			this.getlist();
			this.gettype();
		},
		components:{
			loading
		},
		filters:{
			time(val){
				return moment(val).format("YYYY-MM-DD")
			}
		},
		methods:{
			bindPickerChange(e){
				this.index = this.array[e.detail.value].name
				let id = this.array[e.detail.value].id
				this.getlist(id)
			},
			// 获取维修类型
			gettype(){
				this.$http.get('/api/user/feetype/list',{}).then(res=>{
					console.log(res)
					this.array = res.data.list
				},fail=>{
					console.log(fail)
				})
			},
			getlist(id){
				if(!this.isshow){
					this.loading = true
				}
				
				this.$http.get('/api/user/fee/list',{type:id,page:this.page,psize:this.psize}).then(res=>{
					let arr = this.list.concat(res.data.list)
					this.list = arr
					this.loading = false
					uni.stopPullDownRefresh()
					if(this.list.length==res.data.counts){
						this.isshow = true
					}
				},fail=>{
					console.log(fail)
				})
			}
		},
		onReachBottom(){
			this.page = this.page+1
			this.getlist()
		},
		onPullDownRefresh(){
			this.page=1
			this.isshow = false
			this.list = []
			this.getlist();
			
			
		}
	}
</script>

<style lang="less" scoped>
	.record {
		width: 100%;
		height: 93vh;
		background-color: #f6f6f6;
		.search {
			height: 88rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			display: flex;
			font-size: 24rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx;
			.left {
				color: #0080fe;
			}
			.right {
				.iconfont {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}
		}
		.address-time {
			width: 90%;
			height: 100rpx;
			font-size: 26rpx;
			display: flex;
			justify-content: space-between;
			margin: 0 auto;
			align-items: center;
			.iconfont {
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}
		.data {
			width: 95%;
			margin: 0 auto 20rpx auto;
			background-color: #fff;
			display: flex;
			padding-bottom: 35rpx;
			flex-direction: column;
			.data-title {
				width: 90%;
				height: 70rpx;
				margin: 0 auto;
				border-bottom: 1rpx solid #ededed;
				line-height: 70rpx;
				padding-top: 10rpx;
				font-size: 26rpx;
			}
			.data-data {
				width: 90%;
				margin: 35rpx auto 0 auto;
				display: flex;
				font-size: 24rpx;
				justify-content: space-between;
			}
		}
		
	}
</style>
