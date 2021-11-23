<template>
	<view>
		<view class="tips">信息修改请与社区管理员联系</view>
		<view class="data-box" v-for="(item,index) in list" :key="index">
			<view class="address">{{item.address}}</view>
			<view class="info">
				<view class="name"><view class="label">姓名</view><view class="val">{{item.name}}</view></view>
				<view class="name"><view class="label">性别</view><view class="val">{{item.sex==1?'男':'女'}}</view></view>
				<view class="name"><view class="label">电话</view><view class="val">{{item.mobile}}</view></view>
				<view class="name"><view class="label">身份证号</view><view class="val">{{item.cardid}}</view></view>
				<view class="name"><view class="label">住户类型</view><view class="val">{{item.usertypeName}}</view></view>
			</view>
			<view class="state-time">
				<view class="time">2021-10-10 10:30</view>
				<view class="state" v-color>{{item.stateName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
				psize:20
			};
		},
		onLoad(){
			this.getdata();
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
			getdata(){
				this.$http.get('/api/user/userinfo/list',{page:this.page,psize:this.psize}).then(res=>{
					this.list = res.data.list
				},fail=>{
					console.log(fail)
				})
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/family/familyAdd'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #f6f6f6;
	}
	.tips {
		font-size: 24rpx;
		height: 80rpx;
		width: 90%;
		margin: 0 auto;
		line-height: 80rpx;
	}
	.data-box {
		width: 94%;
		background-color: #fff;
		border-radius: 20rpx;
		margin: 0 auto 30rpx auto;
		height: 500rpx;
		font-size: 24rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		.address {
			height: 80rpx;
			width: 90%;
			line-height: 80rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #eeeeee;
		}
		.info {
			width: 90%;
			flex: 1;
			
			margin: 0 auto;
			display: flex;
			padding: 10rpx 0;
			flex-direction: column;
			justify-content: space-around;
			.name {
				display: flex;
				justify-content: space-between;
			}
		}
		.state-time {
			height: 80rpx;
			line-height: 80rpx;
			border-top: 1rpx solid #eeeeee;
			display: flex;
			justify-content: space-between;
			width: 90%;
			margin: 0 auto;
			.state {
				color: #3ca7fa;
			}
		}
	}
</style>
