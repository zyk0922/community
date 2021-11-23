<template>
	<view>
		<image src="../../static/images/chart-img.png" style="width: 100%;" mode="widthFix"></image>
		<input style="width: 85%;height: 90rpx;box-sizing: border-box; background-color: #f6f6f6;margin: 100rpx auto; padding: 0 50rpx;" type="text" v-model="carno" placeholder="请输入车牌号" value="" />
		<view class="btn" @click="add()">添加</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				carno:'',
			}
		},
		onLoad(){
			
		},
		methods:{
			add(){
				this.$http.post('/api/user/car/add',{carno:this.carno}).then(res=>{
					uni.redirectTo({
						url:'/pages/vehicle/vehicle'
					})
				},fail=>{
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
