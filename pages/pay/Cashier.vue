<template>
	<view>
		<view class="price"><iPrice decimal="small" symbolSize="30" countSize="50" :value="total" />
		</view>
		<view class="paymentmode">全部付款方式</view>
		<view class="payment">
			<view class="wx" @click="getwxpay()"><i class="iconfont icon-weixinzhifu2"></i>
				<view class="txt">微信支付</view> <label class="radio" >
					<view :class="checked?'on':'radioed'"></view>
				</label>
			</view>
			<view class="zfb" @click="zfbpay()"><i class="iconfont icon-zhifubaozhifu"></i>
				<view class="txt">支付宝支付</view> <label class="radio" >
					<view :class="!checked?'on':'radioed'"></view>
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import iPrice from '../../components/i-price/i-price.vue'
	export default {
		data() {
			return {
				checked: true,
				total:0,
				houseno:'',
				details:[],
			}
		},
		onLoad(option) {
			this.houseno = option.houseno
			this.details = option.details
			this.total = option.total
		},
		components:{
			iPrice
		},
		methods: {
			// 支付宝支付
			zfbpay(){
				this.checked = false
			},
			// 微信支付
			getwxpay(){
					this.checked = true
				 let data={
					"building": this.houseno,
					    "details":JSON.parse(this.details)
				};
				this.$http.post('/api/user/weixin/wxPay',data).then(res=>{
					uni.requestPayment({
					    "provider": "wxpay", 
					    "orderInfo": {
					        "appid": res.data.appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
					        "noncestr": res.data.nonceStr, // 随机字符串
					        "package": res.data.package,        // 固定值
					        "partnerid": res.data.mch_id,      // 微信支付商户号
					        "prepayid": res.data.prepay_id, // 统一下单订单号 
					        "timestamp": parseInt(res.data.timeStamp),        // 时间戳（单位：秒）
					        "sign": res.data.paySign // 签名，这里用的 MD5 签名
					    },
					    success(res) {
							uni.showToast({
								icon:'none',
								title:'支付成功',
								duration:2000
							})
						},
					    fail(e) {
							uni.showToast({
								icon:'none',
								title:'支付失败',
								duration:2000
							})
						}
					})
				},fail=>{
					console.log(fail)
				})
			},
			radio(e){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f5f5f5;
	}

	.price {
		display: flex;
		width: 100%;
		height: 200rpx;
		box-sizing: border-box;
		padding-top: 30rpx;
		font-size: 46rpx;
		line-height: 65rpx;
		justify-content: center;
		color: #fa1f18;
	}

	.paymentmode {
		width: 100%;
		height: 115rpx;
		background-color: #fff;
		line-height: 115rpx;
		font-size: 25rpx;
		box-sizing: border-box;
		padding-left: 40rpx;

	}

	.payment {
		width: 100%;
		background-color: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;

		.wx {
			width: 90%;
			margin: 0 auto;
			height: 110rpx;
			display: flex;
			display: flex;
			align-items: center;

			.iconfont {
				color: #14bb0c;
				font-size: 45rpx;
				padding-right: 40rpx;
			}

			.txt {
				flex: 1;
				font-size: 24rpx;
			}

			.radio {
				margin: 0 10rpx 0 30rpx;

				.radioed {
					width: 40rpx;
					height: 40rpx;
					background-color: #fff;
					border-radius: 40rpx;
					border: 1rpx solid #eeeeee;
				}

				.on {
					.radioed;
					border: 1rpx solid #fb381d;
					background-color: #fb381d;
					position: relative;

					&::after {
						content: '✓';
						position: absolute;
						top: 50%;
						left: 50%;
						margin: -45% 0 0 -30%;
						color: #fff;
						font-size: 14px;
						font-weight: bold;
					}
				}
			}

		}
		.zfb {
			.wx;
			.iconfont {
				color: #01a9f2;
			}
		}
	}
</style>
