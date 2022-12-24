<template>
	<view class="mine-box">
		<view class="mine-top">
			<image class="mine-avatar" src="../../static/image/msg.png"></image>
			<view class="mine-msg">
				<view class="mine-name">缘分天空</view>
				<view class="mine-detail">男·1998·未婚·天津</view>
			</view>
		</view>
		<view class="mine-block">
			<view class="mine-item">
				<image class="mine-icon" mode="aspectFit" src="../../static/image/problem.png"></image>
				<view class="mine-item-name">常见问题</view>
				<image class="mine-arrow" mode="aspectFit" src="../../static/image/arrow.png"></image>
			</view>
			<view class="mine-item">
				<image class="mine-icon" mode="aspectFit" src="../../static/image/opinion.png"></image>
				<view class="mine-item-name">意见反馈</view>
				<image class="mine-arrow" mode="aspectFit" src="../../static/image/arrow.png"></image>
			</view>
			<view class="mine-item">
				<image class="mine-icon" mode="aspectFit" src="../../static/image/setting.png"></image>
				<view class="mine-item-name">退出登录</view>
				<image class="mine-arrow" mode="aspectFit" src="../../static/image/arrow.png"></image>
			</view>
		</view>
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
	.mine-box{
		background: #F5F6FA;
		.mine-top{
			padding: 40rpx 40rpx 120rpx;
			background: url(../../static/image/mine-bg.png) no-repeat center center / 100% 100%;
			.mine-avatar{
				width: 140rpx;
				height: 140rpx;
				float: left;
				margin-right: 40rpx;
				border-radius: 50%;
			}
			.mine-msg{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 20rpx 0;
				.mine-name{
					font-size: 36rpx;
					font-family: PingFang SC-粗体, PingFang SC;
					font-weight: normal;
					color: #22263F;
				}
				.mine-detail{
					font-size: 28rpx;
					font-family: PingFang SC-中等, PingFang SC;
					font-weight: normal;
					color: #7A808C;
				}
			}
		}
		.mine-block{
			margin: 24rpx;
			overflow: hidden;
			border-radius: 10rpx;
			background-color: #fff;
			.mine-item{
				display: flex;
				align-items: center;
				padding: 30rpx 25rpx;
				.mine-icon{
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}
				.mine-item-name{
					flex: 1;
					font-size: 32rpx;
					font-family: PingFang SC-中等, PingFang SC;
					font-weight: normal;
					color: #22263F;
				}
				.mine-arrow{
					width: 32rpx;
					height: 60rpx;
				}
			}
		}
	}
</style>
