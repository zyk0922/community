<template>
	<view class="content">
		<scroll-view class="tab" id="tab" :show-scrollbar="false" :scroll-x="true" :scroll-into-view="tabScrollInto">
			<view class="tabContent" style="display: flex; flex-direction: column;">
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view class="tabItem" v-for="(tab,tabItemIndex) in tabList" :key="tab.id" :id="tab.id"
						:data-id="tabItemIndex" :data-current="tabItemIndex" @click="pressScrollViewItem">
						<text class="tabItemTitle" :class="tabIndex==tabItemIndex ? 'tabItemTitleActive' : ''"
							:style="{width:tabList[tabItemIndex].width + 'px'}">{{tab.title}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<swiper class="childPageView" :current="tabIndex" :duration="250" @change="swiperChange"
			@animationfinish="swiperChangeEnd" @onAnimationEnd="swiperChangeEnd" :style="{height: swiperHeight+'px'}">

			<swiper-item class="childPageViewItem" v-for="(page, childPageViewItemIndex) in tabList"
				:key="childPageViewItemIndex" >
				<scroll-view scroll-y="true" :style="{height: swiperHeight+'px'}">
					<view class="data" v-for="(item,index) in recordlist" :key="index" @click="details(item.id)">
						<view class="text">{{item.content}}</view>
						<view class="imgs">
							<image class="img" v-for="(item2,index) in item.images" :src="$config.imgUrl+item2.url"
								mode=""></image>
						</view>
						<view class="address">
							<view class="left">{{item.address}}</view>
							<view class="right">{{item.typename}}</view>
						</view>
						<view class="state">
							<view class="time">{{item.addtime | addtime}}</view>
							<view class="state1">{{item.statename}}</view>
							<view class="btn" @click.stop="del(item.id)">撤销</view>
						</view>
					</view>
					<view v-show="isshow" style="height: 100rpx; width: 100%;line-height: 100rpx; text-align: center;color: #5eadf0;">没有更多数据了!</view>
					<loading v-show="!isshow"></loading>
				</scroll-view>
			</swiper-item>
		</swiper>
		<modal v-model="show" title="确定要撤销吗？" @confirm="confirm()"></modal>
	</view>
</template>
<script>
	import moment from 'moment'
	import modal from '../../components/x-modal/x-modal.vue'
	import loading from '../../components/loding.vue'
	export default {
		data() {
			return {
				isshow:false,
				show:false,
				id:0,
				tabList: [{
					id: "tabItem0",
					title: '未处理',
					width: 70,
					value: 1,
				}, {
					id: "tabItem1",
					title: '已处理',
					width: 70,
					value: 3,
				}, {
					id: "tabItem2",
					title: '全部',
					width: 70,
					value: 0,
				}],
				tabIndex: 0,
				tabScrollInto: "",
				tabListSize: {},
				tabItemLineLeft: 0,
				tabItemLineWidth: 0,
				isPress: false,
				swiperHeight: 0,
				recordlist: [],
				page:1,
				psize:10,


			}
		},
		components:{
			modal,loading
		},
		filters: {
			addtime(val) {
				return moment(val).format("YYYY-MM-DD hh:mm")
			}
		},
		onLoad() {

			let system = uni.getSystemInfoSync();
			this.swiperHeight = system.windowHeight - 44;
		},
		onReady() {

			this.setTabItemDistance();
			this.setTabSelect(this.tabIndex);
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/repair/repair'
				})
			}
		},
		methods: {
			details(id){
				uni.navigateTo({
					url:'/pages/repair/details?id='+id
				})
			},
			confirm(){
				this.$http.get('/api/user/repairs/delete',{id:this.id}).then(res=>{
					console.log(res)
					this.recordlist = []
					this.record()
				},fail=>{
					console.log(fail)
				})
			},
			// 删除
			del(id){
				this.id = id
				this.show = true
				
			},
			// 获取报修数据
			record(state) {
				if(!this.isshow){
						uni.showLoading({
					title:'加载中...'
				})
				}
				uni.stopPullDownRefresh();
				this.$http.get('/api/user/repairs/list', {
					state: state,page:this.page,psize:this.psize
				}).then(res => {
					let arr = this.recordlist.concat(res.data.list)
					this.recordlist= arr
					if(this.recordlist.length==res.data.counts){
						this.isshow = true
					}
					uni.hideLoading();
				}, fail => {
					console.log(fail)
					uni.showToast({
						title:'请求失败'
					})
				})
			},
			pressScrollViewItem(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.isPress = true;
				this.setTabSelect(index);
			},
			swiperChange(e) {
				let index = e.target.current || e.detail.current;

				this.tabIndex = index;
				this.setTabSelect(this.tabIndex);
			},
			setTabItemDistance() {

				var queryTabSize = uni.createSelectorQuery().in(this);
				for (var i = 0; i < this.tabList.length; i++) {
					queryTabSize.select('#' + this.tabList[i].id).boundingClientRect();
				}
				queryTabSize.exec(rects => {
					rects.forEach((rect) => {
						this.tabListSize[rect.dataset.id] = rect;
					})
					this.setTabItemLinePosition(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
				});

			},
			setTabItemLinePosition(left, width) {
				this.tabItemLineLeft = left;
				this.tabItemLineWidth = width;
			},
			swiperChangeEnd(e) {

				this.setTabItemLinePosition(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);

			},
			setTabSelect(index) {
				this.recordlist = []
				this.tabIndex = index;
				this.tabScrollInto = this.tabList[index].id;
				this.record(this.tabList[index].value)
			},
		},
		// 触底事件
		onReachBottom(){
			this.page = this.page+1
			this.record();
		},
		// 下拉事件
		onPullDownRefresh(){
			this.recordlist=[]
			this.isshow = false,
			this.page=1,
			this.record();
			
		}
	}
</script>

<style lang="less" scoped>
	.content {
		/* flex: 1; */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #f6f6f6;

		.data {
			width: 96%;
			background-color: #fff;
			margin: 20rpx auto;
			border-radius: 20rpx;
			overflow: hidden;

			.text {
				width: 90%;
				margin: 60rpx auto 30rpx auto;
			}

			.imgs {
				width: 90%;
				margin: 0 auto;
				display: flex;
				flex-wrap: wrap;

				.img {
					width: 185rpx;
					height: 150rpx;
					margin-bottom: 30rpx;
					margin-right: 15rpx;

				}
			}

			.address {
				width: 90%;
				height: 75rpx;
				margin: 0 auto;
				display: flex;
				line-height: 75rpx;
				font-size: 22rpx;
				border-bottom: 1rpx solid #eeeeee;

				.left {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.right {
					flex: 1;
					text-align: end;
				}
			}

			.state {
				width: 90%;
				height: 90rpx;
				margin: 0 auto;
				display: flex;
				align-items: center;
				font-size: 22rpx;

				.time {
					flex: 1;
				}

				.state1 {
					width: 130rpx;
					height: 50rpx;
					border: 1rpx solid #a8aaad;
					line-height: 50rpx;
					text-align: center;
					border-radius: 10rpx;
				}

				.btn {
					width: 130rpx;
					height: 50rpx;
					background-color: #00a2f1;
					border-radius: 10rpx;
					line-height: 50rpx;
					text-align: center;
					margin-left: 30rpx;
					color: #fff;
				}
			}
		}
	}

	.tab {
		width: 100%;
		height: 44px;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		background-color: #fff;
	}

	/* 隐藏滚动条 */

	.tab ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.tabLineActive {
		transition-duration: 0.3s;
		transition-property: left;
	}

	.childPageView {
		display: flex;
		flex-direction: column;
	}

	.tabItem {
		display: flex;
	}

	.tabItemTitle {
		width: 100%;
		color: #333333;
		font-size: 15px;
		height: 42px;
		line-height: 40px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;

	}

	.tabItemTitleActive {
		color: #0080fe;
	}

	.childPageViewItem {
		flex: 1;
		flex-direction: column;
	}
	// .modal{
	// 	position: fixed;
	// 	top: 50%;
	// 	left: 50%;
	// }
</style>
