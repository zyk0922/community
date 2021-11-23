<script>
	import { mapActions} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let token = uni.getStorageSync('token')
			if(!token){
				uni.showToast({
					title:'请先登录！',
					icon:'error',
					duration:2000,
				})
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				uni.getStorage({
					key:'buildings',
					success:(res)=> {
						this.update(res.data)
					}
					})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapActions({update:'building/updatebuildings'})
		}
	}
</script>

<style>
	
	@import url("/iconfont/iconfont.css");
	page{
		background-color: #f6f6f6;
	}
	uni-checkbox .uni-checkbox-input {
			border-radius: 50% !important;
			color: #ffffff !important;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
			color: #fff;
			background: #2B85E4
		}
	
	/*每个页面公共css */
</style>
