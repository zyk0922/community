<template>
	<view class="content">
		<picker @change="bindPickerChange" range-key="building" :range="array">
			<view class="address">
				<view class="txt">{{index}}</view><i class="iconfont icon-xiangxiajiantou-copy-copy"></i>
			</view>
		</picker>
		<view class="pay-box">
			<view class="price">应缴费：{{total}}元</view>
			<view class="btn" @click="pay()">缴费</view>
		</view>
		<view class="bill" v-for="(item,index) in list">
			<view class="bill-title">{{item.type}}</view>
			<view class="bill-id"><view class="txt">房号</view><view class="data">{{item.houseno}}</view></view>
			<view class="bill-time"><view class="txt">账单</view><view class="data">{{item.begindate}}</view></view>
			<view class="bill-price"><view claas="txt">账单金额</view><view class="data">￥{{item.price}}元</view></view>
		</view>
		<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
		<loading :loading="loading"></loading>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import loading from '../../components/loadding.vue'
	export default {
		data() {
			return {
				isshow:false,
				list:[],
				total:0,
				page:1,
				psize:10,
				array:[],                                                                                
				index:'',
				loading:false
			}
		},
		onLoad(){
			this.getlist();
			this.getarray();
		},
		computed:{
			...mapState({arraylist:state=>state.building.buildings})
		},
		components:{
			loading
		},
		methods: {
			pay(){
				uni.navigateTo({
					url:'/pages/pay/Cashier?total='+this.total
				})
			},
			// 地址
			bindPickerChange(e){
				let id = this.array[e.detail.value].houseid;
				console.log(id)
				this.getlist(id)
			},
			getarray(){
				this.arraylist.forEach(item=>{
					this.array.push({building:item.building+item.houseno,houseid:item.houseid})
					this.index = this.array[0].building
				})
			},
			getlist(id){
				if(!this.isshow){
					this.loading = true
				}
				this.$http.get('/api/user/fee/list',{state:1,page:this.page,psize:this.psize,houseid:id}).then(res=>{
					let arr = this.list.concat(res.data.list)
					this.list= arr
					res.data.list.forEach((item)=>{
						this.total+=item.price
					})
					this.loading = false
					uni.stopPullDownRefresh()
					if(this.list.length==res.data.counts){
						this.isshow = true
					}	
				},fail=>{
					this.loading = false
					console.log(fail)
				})
			}
		},
		onReachBottom(){
			this.page = this.page+1
			this.getlist();
		},
		onPullDownRefresh(){
			this.total = 0
			this.page=1
			this.isshow = false
			this.list = []
			this.getlist();
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/pay/record'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f6f6f6;
		.top {
			width: 100%;
			box-sizing: border-box;
			height: 100rpx;
			background-color: #fff;
			line-height: 100rpx;
			position: relative;
			.back {
				position: absolute;
				top: 0;
				left: 0;
				.iconfont {
					margin:0 20rpx;
				}
			}
			.title {
				width: 100%;
				text-align: center;
			}
			.txt {
				position: absolute;
				top: 0;
				right: 20rpx;
				color: #0080fe;
			}
		}
		.address {
			box-sizing: border-box;
			width: 100%;
			height: 105rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			padding-left: 25rpx;
			.iconfont {
				margin-left: 20rpx;
				color: #333333;
			}
		}
		.pay-box {
			width: 93%;
			height: 327rpx;
			margin: 0 auto;
			background:linear-gradient(to right,#006dfe,#00a0fe,#01cafe);
			border-radius: 20rpx;
			.price {
				width: 100%;
				height: 205rpx;
				line-height: 205rpx;
				text-align: center;
				font-size: 40rpx;
				color: #fff;
			}
			.btn {
				color: #00a2f1;
				width: 285rpx;
				height: 85rpx;
				border-radius: 85rpx;
				background-color: #fff;
				text-align: center;
				line-height: 85rpx;
				margin: 0 auto;
				font-size: 32rpx;
			}
		}
		.bill {
			width: 93%;
			height: 330rpx;
			background-color: #fff;
			margin:20rpx auto 0 auto;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding:0 40rpx;
			.bill-title {
				width: 100%;
				margin-top: 10rpx;
				height: 65rpx;
				font-size: 24rpx;
				line-height: 65rpx;
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
			}
			.bill-id {
				font-size: 24rpx;
				margin-top:40rpx;
				display: flex;
				justify-content: space-between;
			}
			.bill-time {
				.bill-id;
			}
			.bill-price {
				.bill-id;
			}
		}
	}
</style>
