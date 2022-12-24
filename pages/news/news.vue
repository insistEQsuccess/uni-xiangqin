<template>
	<view class="news-page-box">
		<view class="news-item" @click="goLetter">
			<image class="news-image" mode="aspectFit" src="../../static/image/letter.png"></image>
			<view class="news-msg-box">
				<view class="news-msg-top">
					<view class="news-title">来自开发者的一封信</view>
					<text class="news-date">12-12</text>
				</view>
				<view class="news-msg-bottom">亲爱的用户您好，我们是APP的开发团队，欢迎你呀，锄禾日当午啦啦啦啦啦啦</view>
			</view>
		</view>
		<view class="news-item">
			<image class="news-image" mode="aspectFit" src="../../static/image/bell.png"></image>
			<view class="news-msg-box">
				<view class="news-msg-top">
					<view class="news-title">系统消息</view>
					<text class="news-date">12-12</text>
				</view>
				<view class="news-msg-bottom">亲爱的用户您好，我们是APP的开发团队，欢迎你呀，锄禾日当午啦啦啦啦啦啦</view>
			</view>
		</view>
		<view class="news-item">
			<image class="news-image" mode="aspectFit" src="../../static/image/msg.png"></image>
			<view class="news-msg-box">
				<view class="news-msg-top">
					<view class="news-title">交换通知</view>
					<text class="news-date">12-12</text>
				</view>
				<view class="news-msg-bottom">亲爱的用户您好，我们是APP的开发团队，欢迎你呀，锄禾日当午啦啦啦啦啦啦</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { defineComponent } from 'vue'
	export default defineComponent({
		setup () {
			function goLetter () {
				uni.navigateTo({
					url: '/pages/letter/letter'
				})
			}
			return {
				goLetter
			}
		}
	})
</script>

<style lang="scss">
.news-page-box{
	max-width: 750rpx;
	height: 100%;
	margin: 0 auto;
	background: #F5F6FA;
	.news-item{
		padding: 30rpx 24rpx;
		background-color: #fff;
		.news-image{
			width: 80rpx;
			height: 80rpx;
			float: left;
			margin-right: 20rpx;
		}
		.news-msg-box{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.news-msg-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.news-title{
					font-size: 32rpx;
					font-family: PingFang SC-粗体, PingFang SC;
					font-weight: normal;
					color: #22263F;
				}
				.news-date{
					font-size: 24rpx;
					font-family: PingFang SC-中等, PingFang SC;
					font-weight: normal;
					color: #A2A2AD;
				}
			}
			.news-msg-bottom{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 28rpx;
				font-family: PingFang SC-中等, PingFang SC;
				font-weight: normal;
				color: #A2A2AD;
			}
		}
	}
}
</style>
