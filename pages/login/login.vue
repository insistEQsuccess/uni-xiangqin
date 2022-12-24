<template>
	<view class="login-box">
		<image class="logo" mode="aspectFit" src="../../static/image/logo.png"></image>
		<view class="input-box"></view>
		<view class="input-box"></view>
	</view>
</template>

<script>
	import { defineComponent } from 'vue'
	export default defineComponent({
		setup () {
			return {
			}
		}
	})
</script>

<style lang="scss">
	uni-page-body{
		height: 100%;
		background-color: #fff;
	}
	.login-box{
		overflow: auto;
		.logo{
			display: block;
			width: 180rpx;
			height: 180rpx;
			margin: 115rpx auto 60rpx;
		}
		.input-box{
			width: 606rpx;
			height: 108rpx;
			margin: 0 auto 45rpx;
			background: #F5F6FA;
			border-radius: 54rpx 54rpx 54rpx 54rpx;
		}
	}
</style>
