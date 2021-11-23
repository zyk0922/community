<template>
	<view class="dynamic">
		<view class="top">
			<view class="text">{{data.title}}</view>
			<view class="text1">
				<view class="name">发布时间</view>
				<view class="date">{{data.addtime | addtimeformat}}</view>
			</view>
			<view class="texts">
				 <rich-text :nodes="content"></rich-text>
			</view>
		</view>

		<view class="readr">
			<view class="read">
				<view class="read-top">阅读{{data.hits}}</view>
				<view class="read-button">
					<view class="read-button-left">
						<i class="iconfont icon-dianzan"></i> 10
					</view>
					<view class="read-button-right">
						<i class="iconfont icon-fenxiang"></i>
						<view>发送给朋友</view>
					</view>
					<view class="read-button-right">
						<i class="iconfont icon-pengyouquan"></i>
						<view>转到朋友圈</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {

			return {
				data:{},
				content:'',
			}
		},
		onLoad(options) {
			if(options.type==1){
				uni.setNavigationBarTitle({
				    title: '公告详情'
				});
			}else{
				uni.setNavigationBarTitle({
				    title: '资讯详情'
				});
			}
			this.getdata(options.id)
		},
		filters:{
			addtimeformat(val) {
				return moment(val).format("M月D日")
			}
		},
		computed: {

		},
		methods: {
			getdata(id){
				this.$http.get('/api/user/news/get',{id:id}).then(res=>{
					if(res.errCode==10000){
						this.content = res.data.content.replace(/\<img/gi, '<img style="display:-webkit-box;width:100% !important;margin:10px auto !important;" ');
						this.data = res.data
					}
				},fail=>{
					console.log(fail)
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f2f2f2;
	}

	.dynamic {
		width: 100%;
		margin: auto;
		height: auto;

		.top {
			background-color: #fff;

			.text {
				width: 90%;
				margin-left: 30rpx;
				letter-spacing: 5rpx;
				word-break: break-all;
				font-size: 38rpx;
				font-weight: bold;
			}

			.text1 {
				width: 90%;
				margin: 0 auto;
				height: 100rpx;
				display: flex;
				font-size: 28rpx;
				color: #aaaaaa;
				line-height: 100rpx;

				.name {
					margin-right: 25rpx;
					color: #3f4f80;
				}
			}

			.texts {
				width: 90%;
				overflow: hidden;
				padding-bottom: 5rpx;
				margin: 0 auto;
				color: #767676;
				margin-bottom: 22rpx;
			}
		}

		.readr {
			height: 180rpx;
			width: 100%;
			margin: 10rpx auto;
			background-color: #fff;

			.read {
				width: 90%;
				margin: auto;
				height: 100%;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				color: #bbbbbb;

				.read-top {
					flex: 1;
					line-height: 60rpx;
				}

				.read-button {
					flex: 2;
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					color: #666666;
					padding-bottom: 20rpx;
					font-size: 25rpx;

					.read-button-left {
						margin-right: 45rpx;
						display: flex;
						align-items: center;

						.iconfont {
							color: #3d4e7e;
							font-size: 30rpx;
							margin-right: 10rpx;
						}
					}

					.read-button-right {
						margin-right: 45rpx;
						display: flex;
						align-items: center;

						.iconfont {
							color: #3d4e7e;
							font-size: 30rpx;
							margin-right: 10rpx;
						}
					}
				}
			}

		}

	}
</style>
