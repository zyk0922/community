<template>
	<view class="content">
		<view class="topnull"></view>
		<view class="top-ba">
			<image class="ba-img" src="../../static/images/indexbg.png" mode="widthFix"></image>
			<view class="title">智慧社区</view>
			<view class="search">
				<view class="address">
					<i class="address-ico iconfont icon-dingwei"></i>首尔甜城
				</view>
				<view class="search-box">
					<i class="search-ico iconfont icon-sousuo"></i>
					<input class="search-inp" type="text" value="" placeholder-style="color:#000" placeholder="搜索关键字" />
				</view>
			</view>
			<view class="menu-box">
				<view class="menu" @click="pay()">
					<view class="menu-icobox1">
						<image src="../../static/images/menu1.png" mode=""></image>
					</view>
					<view class="menu-txt">生活缴费</view>
				</view>
				<view class="menu" @click="repair()">
					<view class="menu-icobox2">
						<image src="../../static/images/menu2.png" mode=""></image>
					</view>
					<view class="menu-txt">物业报修</view>
				</view>
				<view class="menu" @click="feedback()">
					<view class="menu-icobox3" >
						<image src="../../static/images/menu3.png" mode=""></image>
					</view>
					<view class="menu-txt">问题反馈</view>
				</view>
				<view class="menu" @click="help()">
					<view class="menu-icobox4">
						<image src="../../static/images/menu4.png" mode=""></image>
					</view>
					<view class="menu-txt">我要帮助</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="news">
				<view class="news-title">
					<image class="news-logo" src="../../static/images/news-logo.png" mode=""></image>
					<view class="txt"><wyb-noticeBar type='vert' :duration="300" :time="1500" :show-icon="false" :show-more="false" bgColor="#fff" color="#000" :text="wybNoticeBarlist" /></view>
					<view class="more" @click="newslist(1)">
						<view class="redspot"></view>
						<view class="text">更多</view>
						<i class="arrow iconfont icon-xiangyoujiantou"></i>
					</view>
				</view>
				<view class="chart">
					<swiper class="swiper" :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item,index) in background">
							<view class="swiper-item uni-bg-red"><image class="swiper-img"  :src="item" mode="widthFix"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="store">
				<view class="store-title">生活门店</view>
				<view class="store-img">
					<image class="img" src="../../static/images/store-img1.png" mode=""></image>
					<image class="img" src="../../static/images/store-img2.png" mode=""></image>
				</view>
			</view>
			<view class="information">
				<view class="information-title">
					<view class="txt">资讯</view><i class="iconfont icon-xiangyoujiantou" @click="newslist(2)"></i>
				</view>
				<view class="information-data" v-for="(item,index) in informationlist" :key="index" @click="details(item.id)">
					<view class="text">
						<view class="txt">{{item.title}}</view>
						<view class="time">{{item.addtime | formattime}}</view>
					</view>
					<image v-if="item.picture" class="img" :src="$config.imgUrl+item.picture" mode=""></image>
				</view>
			</view>
		
		</view>
		<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
		<loading :loading="loading"></loading>
	</view>
</template>

<script>
	import wybNoticeBar from '@/components/wyb-noticeBar/wyb-noticeBar.vue'
	import loading from '../../components/loadding.vue'
	import moment from 'moment';
	export default {
		data() {
			return {
				background: ['../../static/images/chart-img.png', '../../static/images/chart-img.png', '../../static/images/chart-img.png'],
			    indicatorDots: false,
		        autoplay: true,
				circular:true,
	            interval: 2000,
	            duration: 500,
				page:1,
				psize:10,
				isshow:false,
				wybNoticeBarlist:[],
				informationlist:[],
				loading:false
			}
		},
		components:{
			loading,wybNoticeBar
		},
		filters:{
			formattime(val){
				return moment(val).format("YYYY-MM-DD")
			},
		},
		onLoad() {
			this.news();
			this.getinformationlist();
		},
		methods: {
			// 我要帮助
			help(){
				uni.navigateTo({
					url:'/pages/help/help'
				})
			},
			// 问题反馈
			feedback(){
				uni.navigateTo({
					url:'/pages/feedback/record'
				})
			},
			// 跳转报修
			repair(){
				uni.navigateTo({
					url:'/pages/repair/record'
				})
			},
			// 资讯详情
			details(id){
				uni.navigateTo({
					url:'../information/details?id='+id
				})
			},
			// 头条更多
			newslist(type){
				uni.navigateTo({
					url:'../information/information?type='+type
				})
			},
			// 获取头条数据
			news(){
				this.$http.get('/api/user/news/list',{type:1}).then(res=>{
					if(res.errCode==10000){
						let arr = res.data.list.filter(item=>item.title!=='')
						arr.forEach(item=>{
							this.wybNoticeBarlist.push(item.title)
						})
					}
				},fail=>{
					console.log(fail)
				})
			},
			// 获取资讯数据
			getinformationlist(){
				if(!this.isshow){
						this.loading = true
				}
				this.$http.get('/api/user/news/list',{type:2,page:this.page,psize:this.psize}).then(res=>{
					if(res.errCode==10000){
						let arr = this.informationlist.concat(res.data.list)
						this.informationlist= arr
						if(this.informationlist.length==res.data.counts){
							this.isshow = true
						}
					}
					this.loading = false
					uni.stopPullDownRefresh()
				},fail=>{
					this.loading = false
					uni.stopPullDownRefresh()
					uni.showToast({
						icon:'error',
						title:fail.data.errMsg,
						duration:2000,
					})
				})
			},
			// 跳转缴费
			pay(){
				uni.navigateTo({
					url:'../pay/pay'
				})
			}
		},
		// 触底事件
		onReachBottom(){
			this.page = this.page+1
			this.getinformationlist();
		},
		// 下拉事件
		onPullDownRefresh(){
			this.isshow = false
			this.informationlist = []
			this.wybNoticeBarlist = []
				this.page = 1,
			this.news();
			this.getinformationlist();
		}
		
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f6f6f6;
		.topnull {
			width: 100%;
			height: 50rpx;
			background-color: #56a6fc;
		}
		.top-ba {
			height: 375rpx;
			position: relative;
			.ba-img {
				width: 100%;
			}

			.title {
				width: 100%;
				height: 90rpx;
				text-align: center;
				color: #fff;
				position: absolute;
				top: 0;
				left: 0;
				line-height: 90rpx;
				font-size: 32rpx;
			}

			.search {
				width: 90%;
				height: 70rpx;
				position: absolute;
				top: 90rpx;
				left: 50%;
				margin-left: -45%;
				display: flex;
				justify-content: space-between;

				.address {
					font-size: 26rpx;
					color: #fff;

					.address-ico {
						font-size: 26rpx;
						margin: 0 5rpx 0 0;
					}
				}

				.search-box {
					width: 240rpx;
					height: 40rpx;
					background-color: #fff;
					border-radius: 40rpx;
					display: flex;
					align-items: center;

					.search-ico {
						font-size: 19rpx;
						margin: 0 10rpx 0 15rpx;
						color: #9d9d9d;
					}

					.search-inp {
						width: 170rpx;
						height: 40rpx;
						font-size: 16rpx;
					}
				}

			}

			.menu-box {
				width: 90%;
				height: 195rpx;
				background-color: #fff;
				position: absolute;
				top: 160rpx;
				left: 50%;
				margin-left: -45%;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-around;
				box-sizing: border-box;
				padding: 0 25rpx;

				.menu {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text-align: center;
					width: 110rpx;
					font-size: 23rpx;

					.menu-icobox1 {
						width: 78rpx;
						height: 78rpx;
						background-color: #4f86ed;
						margin-bottom: 10rpx;
						border-radius: 15rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 53rpx;
							height: 53rpx;
						}
					}

					.menu-icobox2 {
						.menu-icobox1;
						background-color: #71b78b;
					}

					.menu-icobox3 {
						.menu-icobox1;
						background-color: #e39e5e;
					}

					.menu-icobox4 {
						.menu-icobox1;
						background-color: #479cf7;
					}
				}
			}

		}

		.box {
			width: 100%;
			background-color: #fff;

			.news {
				width: 90%;
				margin: 0 auto;

				.news-title {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;

					.news-logo {
						width: 84rpx;
						height: 35rpx;
					}

					.txt {
						flex: 1;
						padding-right: 20rpx;
						margin: 0 0 0 20rpx;
						font-size: 26rpx;
						overflow: hidden;
						box-sizing: border-box;
					}

					.more {
						width: 180rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						position: relative;
						font-size: 26rpx;

						&::after {
							content: '';
							width: 19rpx;
							height: 19rpx;
							background-color: #ff0015;
							position: absolute;
							top: 50%;
							left: 50rpx;
							margin-top: -9.5rpx;
							border-radius: 19rpx;
						}

						.arrow {
							margin: 0 5rpx 0 10rpx;
							font-size: 30rpx;
						}
					}
				}

				.chart {
					width: 100%;
					.swiper {
						height: 255rpx;
						.swiper-img {
							width: 100%;
							height: 255rpx;
						}
					}
				}
			}
			.store {
				width: 90%;
				margin: 0 auto;
				.store-title {
					width: 100%;
					height: 130rpx;
					line-height: 130rpx;
					font-size: 32rpx;
					box-sizing: border-box;
					padding-left: 10rpx;
				}
				.store-img {
					display: flex;
					justify-content: space-between;
					.img {
						width: 327rpx;
						height: 203rpx;
						border-radius: 10rpx;
					}
				}
			}
			.information {
				width: 90%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				.information-title {
					width: 100%;
					height: 130rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					.txt {
						margin-left: 10rpx;
					}
					.iconfont {
						margin-right: 5rpx;
					}
				}
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
		}
	}
</style>
