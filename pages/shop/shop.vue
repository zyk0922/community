<template>
	<view class="main">
		<view class="top1">
			<view class="top">
				<view class="left">
					<input type="text" value="" placeholder="搜索关键字" v-model="key" placeholder-style="font-size:30rpx"/>
					<view class="da1" @click="search()">
						<text class="iconfont icon-sousuo"></text>
					</view>
				</view>
				<view class="right">
					<picker @change="bindPickerChange" class="text" :value="services" :range="serviceslist">
					    <view>{{services}}</view>
					</picker>
					<view class="dou">
						<text class="iconfont icon-guolv"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="item" v-for="(item,index) in shoplist">
			<view class="item1">
				<view class="left">
					<image :src="$config.imgUrl+item.logo" mode=""></image>
				</view>
				<view class="right">
					<text class="name">{{item.name}}</text>
					<text class="services">{{item.services}}</text>
					<view class="btn" @click="details(item.id)">查看详情</view>
				</view>
			</view>
		</view>
		<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
		<loading v-show="!isshow"></loading>
	</view>
</template>

<script>
	import loading from '../../components/loding.vue'
	export default {
		data(){
			return{
				isshow:false,
				page:1,
				psize:10,
				shoplist:[],
				serviceslist:[],
				services:'筛选',
				key:'',
			}
		},
		onLoad(){
			this.getshoplist();
			this.getserviceslist();
			
		},
		components:{
			loading
		},
		methods:{
			bindPickerChange(e){
				console.log(e.detail.value)
				this.services =this.serviceslist[e.detail.value]
				this.search()
			},
			// 跳转详情页
			details(id){
				uni.navigateTo({
					url:'/pages/shop/details?id='+id
				})
			},
			// 获取筛选数据
			getserviceslist(){
				this.$http.get('/api/user/storeservices/list',{}).then(res=>{
					if(res.errCode==10000){
						res.data.list.forEach(item=>{
							this.serviceslist.push(item.name)
						})
					}
				},fail=>{
					console.log(fail)
				})
			},
			// 搜索
			search(){
				this.shoplist=[],
				this.getshoplist(this.key,this.services)
			},
			// 获取数据
			getshoplist(key,services){
				if(!this.isshow){
						uni.showLoading({
					title:'加载中...',
				})
				}
				this.$http.get('/api/user/stores/list',{key:key,services:services,page:this.page,psize:this.psize}).then(res=>{
					if(res.errCode==10000){
						let arr = this.shoplist.concat(res.data.list)
						this.shoplist = arr
						if(this.shoplist.length == res.data.counts){
							this.isshow = true
						}
					}
					uni.hideLoading()
					uni.stopPullDownRefresh()
				},fail=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					console.log(fail)
					uni.showToast({
						icon:'error',
						title:fail.data.errMsg,
						duration:2000,
					})
				})
			}
		},
		// 页面触底事件
		onReachBottom(){
			this.page = this.page+1
			this.getshoplist(this.key);
		},
		// 下拉事件
		onPullDownRefresh(){
			this.services='筛选',
			this.key = '',
			this.isshow = false,
			this.shoplist = []
			this.page = 1,
			this.getshoplist()
		}
	}
</script>

<style lang='less' scoped>
.main{
	width:100%;
	background-color: #f1f5f8;
}	
.top1{
	width:100%;
	background-color: #FFFFFF;
	.top{
		display: flex;
		justify-content: space-between;
		width:691rpx;
		height:110rpx;
		margin:auto;
		background-color: #FFFFFF;
		padding:20rpx 0rpx;
		box-sizing: border-box;
		.left{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width:435rpx;
			height:100%;
			background-color: #f4f6f6;
			border-radius: 50rpx;
			input{
				width:350rpx;
				height:100%;
				padding-left:50rpx;
			}
			.da1{
				width:36rpx;
				height:36rpx;
				margin-right:30rpx;
				.iconfont{
					width:100%;
					height:100%;
				}
			}
		}
		.right{
			display: flex;
			width:230rpx;
			box-sizing: border-box;
			justify-content: space-between;
			background-color: #f4f6f6;
			border-radius: 50rpx;
			.text{
				flex: 1;
				justify-content: center;
				line-height: 75rpx;
				color: #455154;
				font-size: 30rpx;
				text-align: center;
			}
			.dou{
				width:33rpx;
				height:35rpx;
				line-height: 75rpx;
				margin-right: 30rpx;
				.iconfont{
					width:100%;
					height:100%;
				}
			}
		}
	}
}
.item{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width:730rpx;
	height:232rpx;
	margin:auto;
	background-color: #FFFFFF;
	margin-top:30rpx;
	.item1{
		display: flex;
		justify-content: space-between;
		width:689rpx;
		height:188rpx;
		margin:auto;
		.left{
			width:186rpx;
			height:188rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			width:69%;
			.name {
				font-size: 32rpx;
			}
			.services {
				color: #828282;
				font-size: 25rpx;
			}
			.btn {
				width: 122rpx;
				height: 40rpx;
				background-color: #5eadf0;
				font-size: 18rpx;
				color: #fff;
				line-height: 40rpx;
				text-align: center;
				border-radius: 5rpx;
			}
		}
	}
}
</style>
