<template>
	<view class='main'>
		
		<view class="top">
			<view class="logo"><image class="logo-img" :src="$config.imgUrl+detaildata.logo" mode=""></image></view>
			<!-- 标牌 -->
			<view class="pai">
				<view class="pai1">
					<image :src="$config.imgUrl+detaildata.logo" mode=""></image>
				</view>
				<view class="pai2">
					<text class='text1'>{{detaildata.name}}</text>
					<text class='text2'>{{detaildata.services}}</text>
				</view>
			</view>
			<!-- 标牌 -->
			</view>
			<!-- 时间 -->
			<view class="time">
				<view class="top1">
						<view class='text1'><text class="iconfont icon-shijian"></text></view>
						<text class='text2'>营业时间：{{detaildata.startTime}} - {{detaildata.endTime}}</text>
				</view>
				<view class="bottom1">
					<view class='text1'><text class="iconfont icon-weizhi"></text></view>
					<text class='text2'>商家地址：{{detaildata.address}}</text>
				</view>
			</view>
			<!-- 时间 -->
			<!-- 商家介绍 -->
			<view class="js">
				商家介绍
			</view>
			<!-- 商家介绍 -->
		<!-- 文本 -->
		<view class="fle">
			<rich-text :nodes="intro"></rich-text>
		</view>
		<!-- 文本 -->
		<!-- 联系电话 -->
		<view class="tel">
			<view class="left">
				<text class="iconfont icon-dianhua"></text>
			</view>
			<view class="right">
				联系电话：{{detaildata.tel}}
			</view>
		</view>
		<!-- 联系电话 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detaildata:{},
				intro:'',
			}
		},
		onLoad(option){
			this.getdetail(option.id);
		},
		methods: {
			getdetail(id){
				uni.showLoading({
					title:'加载中...'
				})
				this.$http.get('/api/user/stores/get',{id:id}).then(res=>{
					console.log(res)
					if(res.errCode==10000){
						this.detaildata = res.data
						this.intro = res.data.intro.replace(/\<img/gi, '<img style="display:-webkit-box;width:100% !important;margin:10px auto !important;" ');
					}
					uni.hideLoading()
				},fail=>{
					uni.hideLoading()
					console.log(fail)
				})
			}
		}
	}
</script>

<style lang='less' scoped>
.main{
	width:100%;
	background-color: #ffffff;
}
.top{
	position: relative;
	width:100%;
	.logo {
		width: 100%;
		height: 555rpx;
		margin: 0 auto;
		.logo-img {
			width: 100%;
			height: 100%;
		}
	}
	.pai{
		display: flex;
		align-items: center;
		position: absolute;
		width:700rpx;
		top: 500rpx;
		height:178rpx;
		margin-left:25rpx;
		border-radius: 15rpx;
		background-color: #ffffff;
		box-shadow:10rpx 10rpx 10rpx #f1f1f1;
		.pai1{
			width:100rpx;
			height:100rpx;
			margin-left:32rpx;
			image{
				width:100%;
				height:100%;
				border-radius: 100rpx;
			}
		}
		.pai2{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height:98rpx;
			margin-left:37rpx;
			.text1{
				font-size: 30rpx;
			}
			.text2{
				font-size: 24rpx;
				color:#666666;
			}
		}
	}
}
.time{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width:670rpx;
	height:123rpx;
	margin-left:41rpx;
	margin-top: 200rpx;
	.top1{
		display: flex;
		.text1{
			width:40rpx;
			height:40rpx;
			.iconfont{
				width:100%;
				height:100%;
				font-size: 36rpx;
				color: #ff7d00;
			}
		}
		.text2{
			padding-left:20rpx;
			font-size: 28rpx;
		}
	}
	.bottom1{
		display: flex;
		.text1{
			width:40rpx;
			height:40rpx;
			.iconfont{
				width:100%;
				height:100%;
				color: #ff7d00;
				font-size: 36rpx;
			}
		}
		.text2{
			padding-left:20rpx;
			font-size: 28rpx;
			
		}
	}
}
.js{
	margin-top:102rpx;
	padding-left:40rpx;
	font-size: 30rpx;
	color: #ff7d00;
}
.fle{
	width:650rpx;
	margin: auto;
	padding:30rpx 10rpx;
	text{
		font-size: 26rpx;
	}
}
.tel{
	display: flex;
	align-items: center;
	width:630rpx;
	height:135rpx;
	background-color: #f6f5fa;
	margin:auto;
	margin-top:150rpx;
	margin-bottom:50rpx;
	border-radius: 20rpx;
	.left{
		line-height: 135rpx;
		color: #ff7d00;
		.iconfont {
			font-size: 60rpx;
			margin-left: 30rpx;
		}
	}
	.right{
		margin-left:40rpx;
		font-size: 30rpx;
	}
}
</style>
