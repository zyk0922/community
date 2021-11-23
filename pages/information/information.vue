<template>
	<view class="mian">
			<view class="scrch">
				<input type="text" name="" id="" value="" v-model="key" placeholder="搜索关键字"/>
				<text class="iconfont icon-sousuo" @click="search()"></text>
			</view>
			<view class="information">
				<view class="information-data" v-for="(item,index) in informationlist" @click="details(item.id)" :key="index">
					<view class="text">
						<view class="txt">{{item.title}}</view>
						<view class="time">{{item.addtime | formattime}}</view>
					</view>
					<image v-if="item.picture" class="img" :src="$config.imgUrl+item.picture" mode=""></image>
				</view>
			</view> 
			<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
			<loading v-show="!isshow"></loading>		
	</view>
</template>

<script>
	import loading from '../../components/loding.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				isshow:false,
				informationlist:[],
				page:1,
				psize:10,
				key:'',
				type:2,
			};
		},
		components:{
			loading
		},
		filters:{
			formattime(val){
				return moment(val).format("YYYY-MM-DD")
			}
		},
		onLoad(option){
			this.type =option.type
			this.getinformationlist()
			if(option.type==1){
				uni.setNavigationBarTitle({
				    title: '公告'
				});
			}else{
				uni.setNavigationBarTitle({
				    title: '资讯'
				});
			}
		},
		methods:{
			// 跳转
			details(id){
				uni.navigateTo({
					url:'/pages/information/details?id='+id+'&type='+this.type
				})
			},
			// 搜索
			search(){
				console.log(111)
				this.informationlist=[]
				this.getinformationlist(this.key)
			},
			// 获取数据
			getinformationlist(key){
				if(!this.isshow){
					uni.showLoading({
					title:'加载中...'
				})
				}
				this.$http.get('/api/user/news/list',{key:key,page:this.page,psize:this.psize,type:this.type}).then(res=>{
					
					if(res.errCode==10000){
						let arr = this.informationlist.concat(res.data.list)
						this.informationlist= arr
						if(this.informationlist.length == res.data.counts){
						this.isshow = true
					}
					}
					uni.hideLoading()
					uni.stopPullDownRefresh()
				},fail=>{
					uni.hideLoading();
					uni.stopPullDownRefresh()
					uni.showToast({
						icon:'error',
						title:fail.data.errMsg,
						duration:2000,
					})
				})
			},
		},
		// 页面触底事件
		onReachBottom(){
			this.page = this.page+1
			this.getinformationlist(this.key);
		},
		// 下拉事件
		onPullDownRefresh() {
			this.informationlist = []
			this.page=1,
			this.isshow = false
			this.getinformationlist();
		}
	}
</script>
<style lang="less" scoped>
	.mian {
		height: 93vh;
	}
		.scrch{
			width: 90%;
			height: 82rpx;
			background-color: #f4f6f6;
			border-radius: 50rpx;
			margin: 30rpx auto 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-around;
			input{
				width: 70%;
				font-size: 24rpx;
				color: #455154;
			}
			.iconfont{
				width: 30rpx;
				height: 30rpx;
			}
		}
	.information {
		width: 90%;
		margin: 50rpx auto;
		display: flex;
		flex-direction: column;
		
		.information-data {
			display: flex;
			justify-content: space-between;
			margin-bottom: 50rpx;
			.text {
				flex: 1;
				padding-right: 20rpx;
				height: 160rpx;
				font-size: 26rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.txt {
					width: 100%;
					display:-webkit-box;
					overflow:hidden;
					text-overflow:ellipsis;
					word-break: break-all;
					-webkit-line-clamp:3;
					-webkit-box-orient:vertical;
				}
				.time {
					color: #afafaf;
				}
			}
			.img {
				width: 245rpx;
				height: 160rpx;
				border-radius: 15rpx;
			}
		}
	}
</style>

