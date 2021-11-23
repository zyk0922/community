<template>
	<view>
		<view class="house-data">
			<view class="house-title">{{buildingName}}</view>
			<view class="house-inp">
				<view class="data" v-for="(item,index) in building" :key="index" @click="toBuilding(item.leaf,item.id,item.name)"><view class="label">{{item.name}}</view><i class="iconfont icon-xiangyoujiantou"></i></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				buildingName:'',
				building:[],
				delta:1,
			}
		},
		computed:{
			
		},
		onLoad(option){
			this.delta = parseInt(option.delta)+1
			this.buildingName = option.name
			this.getbuilding(option.id);
		},
		methods:{
			// ...mapAction({update:'building/update'}),
			toBuilding(leaf,id,name){
				if(leaf==1){
					uni.navigateTo({
						url:'/pages/house/houseed?id='+id+'&name='+this.buildingName+name+'&delta='+this.delta
					})
				}else{
					uni.navigateTo({
						url:'/pages/house/building?id='+id+'&name='+this.buildingName+name+'&delta='+this.delta
					})
				}
			},
			getbuilding(id){
				this.$http.get('/api/user/building/list',{pid:id}).then(res=>{
					this.building = res.data.list
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
		}
	
	}
	
</style>
