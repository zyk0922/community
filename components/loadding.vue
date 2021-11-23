<template>
  <view class="dengLoadingVue" v-show="loading">
    <view class="maskVueHiddenShow">
      <view class="maskVueHiddenShowWrapper">
        <div class="loader">
          <div class="loaderRotate"></div>
        </div>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
       
    };
  },
  props:["loading"]
};
</script>
<style lang="scss">
.dengLoadingVue {
  .maskVueHiddenShow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999999;
    display: block;
    box-sizing: border-box;
    //  background: rgba(0, 0, 0, 0.5);
    // opacity: 0.8;
    //
    display: flex;
    align-items: center;
    justify-content: center;

    .maskVueHiddenShowWrapper {
      width: 100%;
      // background-color: red;
      display: flex;
      align-itrpxs: center;
      justify-content: center;
      .loader {
        font-size: 4px;
        background-color: #ffffff;
        position: fixed;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        margin-left: -50rpx;
        margin-top: -50rpx;
      }
      .loaderRotate,
      .loaderRotate:before,
      .loaderRotate:after {
        border-radius: 50%;
      }

      .loaderRotate:before,
      .loaderRotate:after {
        position: absolute;
        top: -2rpx;
        content: "";
        width: 52rpx;
        height: 105rpx;
        background: #ffffff;
      }

      .loaderRotate {
        text-indent: -99999rpx;
        margin: 0% auto;
        position: relative;
        width: 100rpx;
        height: 100rpx;
        box-shadow: inset 0 0 0 10rpx #3b87f6;
      }

      .loaderRotate:before {
        border-radius: 102rpx 0 0 102rpx;
        left: -2rpx;
        /* 设置旋转元素的基点位置 */
        transform-origin: 52rpx 52rpx;
        /*
        * load2：执行的动画名
        * 2s：执行2秒
        * infinite：执行无限次 
        * 1.5s：延时1.5秒
        */
        animation: load2 1s infinite 1.3s;
      }

      .loaderRotate:after {
        border-radius: 0 102rpx 102rpx 0;
        left: 52rpx;
        transform-origin: 0px 52rpx;
        animation: load2 1s infinite;
      }

      @keyframes load2 {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>