<template>
	<view>
		<view class="spinner">
		    <view class="bounce1"></view>
		    <view class="bounce2"></view>
		    <view class="bounce3"></view>
		 </view>
	</view>
</template>

<script>
	export default {
		name:"loding",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.spinner {
	      width: 100%;
		  height: 100rpx;
		  display: flex;
		  justify-content: center;
		  align-items: center;
	    }
	     
	    .spinner > view {
	      width: 30rpx;
	      height: 30rpx;
	      background-color: #5eadf0;
	      border-radius: 100%;
	      display: inline-block;
	      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
	      animation: bouncedelay 1.4s infinite ease-in-out;
	      /* Prevent first frame from flickering when animation starts */
	      -webkit-animation-fill-mode: both;
	      animation-fill-mode: both;
	    }
	     
	    .spinner .bounce1 {
	      -webkit-animation-delay: -0.32s;
	      animation-delay: -0.32s;
	    }
	     
	    .spinner .bounce2 {
	      -webkit-animation-delay: -0.16s;
	      animation-delay: -0.16s;
	    }
	     
	    @-webkit-keyframes bouncedelay {
	      0%, 80%, 100% { -webkit-transform: scale(0.0) }
	      40% { -webkit-transform: scale(1.0) }
	    }
	     
	    @keyframes bouncedelay {
	      0%, 80%, 100% {
	        transform: scale(0.0);
	        -webkit-transform: scale(0.0);
	      } 40% {
	        transform: scale(1.0);
	        -webkit-transform: scale(1.0);
	      }
	    }
</style>
