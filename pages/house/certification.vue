<template>
	<view class="head">
		<view class="header">
			<view class="data" v-for="(item,index) in list" :key="index">
				<view class="content">
					<view class="content1">
						<view class="content-left">{{item.building}}</view>
						<view class="content-right" v-color>{{item.stateName}}</view>
					</view>
					<view class="content2">
						<view class="content2-top">
							<view class="top-left">房号</view>
							<view class="top-right">{{item.houseno}}</view>
						</view>
						<view class="content2-top">
							<view class="top-left">姓名</view>
							<view class="top-right">{{item.name}}</view>
						</view>
						<view class="content2-top">
							<view class="top-left">电话</view>
							<view class="top-right">{{item.mobile}}</view>
						</view>
						<view class="content2-top">
							<view class="top-left">住户类型</view>
							<view class="top-right">{{item.usertypeName}}</view>
						</view>
					</view>
					<view class="content3">
						<view class="content3-left">2021-10-12 6:30</view>
						<view class="content3-right">
							<view class="del">删除</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
			}
		},
		onLoad(){
			this.getlist();
		},
		directives:{
		      color:{
		        inserted:(el)=>{
		          if(el.innerHTML =='已认证'){
		            el.style.color ='#0dcc3a'
		          }
		           if(el.innerHTML =='认证中'){
		            el.style.color ='#3ca7fa'
		          }
		           if(el.innerHTML =='未认证'){
		            el.style.color ='red'
		          }
		        }
		      }
		    },
		methods:{
			getlist(){
				uni.showLoading({
					title:'加载中...'
				})
				this.$http.get('/api/user/houses/check',{}).then(res=>{
					console.log(res)
					this.list = res.data.list
					uni.hideLoading()
				},fail=>{
					uni.hideLoading()
					uni.showToast({
						icon:'error',
						title:fail.data.errMsg,
						duration:2000
					})
				})
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/house/house'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #f6f6f6;
	}
	.head {
		width: 100%;
		background-color: #f6f6f6;
		overflow: hidden;
		.header {
			width: 100%;
			margin-top: 32rpx;
			height: auto;
               .data{
				   margin-bottom: 30rpx;
				   .content {
				   	width: 94%;
				   	margin: auto;
				   	height: 472rpx;
				   	border-radius: 15rpx;
				   	display: flex;
				   	flex-direction: column;
				   	background-color: #ffffff;
				   
				   	.content1 {
				   		flex: 1;
				   		padding: 0 30rpx;
				   		display: flex;
				   		align-items: center;
				   		font-size: 22rpx;
				   		border-bottom: 1rpx solid #f0f0f0;
				   		justify-content: space-between;
				   
				   		.content-left {
				   			color: #2ea8f6;
				   		}
				   
				   		.content-right {
				   			color: #e50808;
				   		}
						.on {
							color: #18B566;
						}
				   	}
				   
				   	.content2 {
				   		padding: 0 30rpx;
				   		font-size: 18rpx;
				   		flex: 4;
				   		display: flex;
				   		flex-direction: column;
				   
				   		.content2-top {
				   			display: flex;
				   			align-items: center;
				   			justify-content: space-between;
				   			flex: 1;
				   		}
				   	}
				   
				   	.content3 {
				   		flex: 1.5;
				   		padding: 0 15rpx;
				   		display: flex;
				   		align-items: center;
				   		font-size: 22rpx;
				   		border-top: 1rpx solid #f0f0f0;
				   		justify-content: space-between;
				   
				   		.content-left {
				   			color: #2ea8f6;
				   		}
				            .content3-left{
				   			 color:#666666;
				   		 }
				   		.content3-right {
				   			font-size: 20rpx;
				   			.del {
				   				width: 98rpx;
				   				height: 42rpx;
				   				display: flex;
				   				align-items: center;
				   				justify-content: center;
				   				background-color: #00a2f1;
				   				color: #ffffff;
				   				border-radius: 10rpx;
				   			}
				   		}
				   	}
				   }
				   		
			   }
			
		}
	}
</style>
