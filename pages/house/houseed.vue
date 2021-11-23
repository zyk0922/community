<template>
	<view>
		<view class="house-data">
			<view class="house-title">{{houseName}}</view>
			<view class="house-inp">
				<view class="data" v-for="(item,index) in houselist" :key="index" @click="tohouse(item.id,item.houseno)"><view class="label">{{item.houseno}}</view><i class="iconfont icon-xiangyoujiantou"></i></view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapActions } from 'vuex'
	export default {
		data(){
			return{
				houselist:[],
				houseName:'',
				delta:1,
			}
		},
		onLoad(option){
			this.delta = option.delta
			this.houseName = option.name
			this.gethouse(option.id);
		},
		methods:{
			...mapActions({modelupdate:'building/update'}),
			tohouse(id,houseno){
				uni.navigateBack({
					delta:parseInt(this.delta)
				})
				const model = {id:id,name:this.houseName+houseno};
				this.modelupdate(model);
				
			},
			gethouse(id){
				this.$http.get('/api/user/houses/list',{buildingid:id}).then(res=>{
					console.log(res)
					this.houselist = res.data.list
				},fail=>{
					console.log(fail)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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
				&:nth-last-child(1){
				border: 0;
				}
				.iconfont {
					font-size: 24rpx;
				}
			}
			.data-data {
				.data;
				border: 0;
			}
		}
	
	}
	
</style>
