<template>
	<view className="list-box">
	    <view class="list-scroll">
	      <view class="list-item" v-for="(item, index) in list" :key="index" @click="goToDetail(item)">
	        <image mode="aspectFit" :src="item.icon" alt=""></image>
	        <view class="item-info">
	          <view class="user-info">{{item.title}}</view>
	          <view class="user-tag">
	            <view class="tag-item" v-for="(it, ind) in item.userTagList" :key="ind">{{it.tagName}}</view>
	          </view>
	        </view>
	      </view>
	    </view>
	</view>
</template>

<script>
	import { defineComponent, reactive } from 'vue'
	import { getList } from '@/apis/url'
	export default defineComponent({
	  setup() {
	    const list = reactive([])
	    async function getData () {
	      const ret = await getList({})
	      if (ret.code === 100000) {
	        list.length = 0;
	        list.push(...ret.data.visitingCardVos)
	      } else {
			uni.showToast({
				title: ret.message
			})
	      }
	    }
	    getData()
	    function goToDetail (it) {
			uni.navigateTo({ url: '/pages/detail/detail?userId=' + it.userId })
	   //      const perfect = uni.getStorageSync({ key: 'perfect' })
	   //      if (perfect == '0' || !perfect) {
				// uni.showToast({
				// 	title: '请您登陆'
				// })
				// uni.navigateTo({ url: '/login' })
	   //      return;
	   //      }
		  //   uni.navigateTo({ url: '/detail?userId=' + it.userId })
	    }
	    return {
	      list,
	      goToDetail, 
	      getData
	    }
	  },
	})
</script>

<style lang="scss">
.list-box{
  max-width: 750rpx;
  padding: 22rpx;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  background: #F5F6FA;
  font-family: PingFang SC-中等, PingFang SC;
  .list-scroll{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: auto;
    .list-item{
      flex-shrink: 0;
      position: relative;
      width: 340rpx;
      height: 532rpx;
      margin: 0rpx 0rpx 20rpx;
      border-radius: 24rpx;
      overflow: hidden;
      background: #FFFFFF;
      & > image{
        width: 100%;
      }
      .item-info{
        position: absolute;
        bottom: 0; left: 0; right: 0;
        padding: 0rpx 26rpx 0rpx;
        background: #fff;
        .user-info{
          margin: 24rpx 0rpx 24rpx;
          font-size: 32rpx;
          font-weight: normal;
          color: #22263F;
        }
        .user-tag{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .tag-item{
            flex-shrink: 0;
            width: 76rpx;
            height: 36rpx;
            margin: 0rpx 0rpx 24rpx;
            border-radius: 4rpx;
            font-size: 20rpx;
            line-height: 36rpx;
            font-weight: normal;
            color: #7A808C;
            text-align: center;
            background: #F2F3F5;
          }
        }
      }
    }
  }
}
</style>
