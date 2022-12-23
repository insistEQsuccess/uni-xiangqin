<template>
  <view class="groups-box">
    <view class="group-item" v-for="(it, ind) in groupList" :key="ind">
      <view class="group-top">
        <image mode="aspectFit" :src="it.icon" alt=""></image>
        <view class="group-msg">
          <view class="group-name">{{ it.name || '无' }}</view>
          <view class="group-saoma">请扫码进群</view>
        </view>
      </view>
      <view class="group-code-box">
        <image mode="aspectFit" class="code-pic" :src="it.qrCode" alt=""></image>
        <view class="group-code-modal" v-show="it.price > 0">
          <view class="code-msg">【收费群】解锁二维码</view>
          <button class="code-btn" @click="deblockingGroup(it)">解锁</button>
          <view class="code-cost">
            <image mode="aspectFit" src="../../static/image/clock.png" alt=""></image>
            收费{{it.price}}元
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { getGroupsList, deblocking } from '../../apis/url.js'

export default defineComponent({
  name: 'Groups',
  setup() {
    const param = reactive({
      pageSize: 10,
      pageNum: 1
    })
    const groupList = reactive([])
    async function getData () {
      const ret = await getGroupsList(param)
      if (ret.code === 100000) {
        groupList.length = 0
        groupList.push(...ret.data.list)
      }
    }
    getData()
    async function deblockingGroup (it) {
      const ret = await deblocking({ datingCircleWechatGroupId: it.datingCircleGroupId })
      if (ret.code === 100000) {

      } else {

      }
    }
    return {
      groupList,
      deblockingGroup
    }
  },
})
</script>

<style lang="scss" scoped>
.groups-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-weight: normal;
  position: relative;
  height: 100%;
  max-width: 750rpx;
  margin: 0 auto;
  padding: 24rpx;
  box-sizing: border-box;
  font-family: PingFang SC-中等, PingFang SC;
  background: #F5F6FA;
  overflow-x: hidden;
  overflow-y: auto;
  .group-item{
    flex-shrink: 0;
    width: 340rpx;
    height: 444rpx;
    padding: 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 24rpx;
    .group-top{
      overflow: hidden;
      image{
        width: 80rpx;
        height: 80rpx;
        margin: 0rpx 20rpx 0rpx 0rpx;
        float: left;
        border-radius: 4rpx;
      }
      .group-msg{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        // background: greenyellow;
        .group-name{
          font-size: 32rpx;
          margin: 0rpx 0rpx 8rpx 0rpx;
          font-family: PingFang SC-粗体, PingFang SC;
          font-weight: normal;
          color: #22263F;
        }
        .group-saoma{
          font-size: 24rpx;
          font-family: PingFang SC-中等, PingFang SC;
          font-weight: normal;
          color: #7A808C;
        }
      }
    }
    .group-code-box{
      position: relative;
      width: 292rpx;
      height: 292rpx;
      margin: 24rpx 0rpx 0rpx 0rpx;
      background: rgba(255,255,255,0.96);
      .code-pic{
        width: 292rpx;
        height: 292rpx;
      }
      .group-code-modal{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 292rpx;
        height: 292rpx;
        padding: 15rpx 0rpx;
        box-sizing: border-box;
        text-align: center;
        background: rgba(255,255,255,0.8);
        .code-msg{
          font-size: 24rpx;
          font-family: PingFang SC-中等, PingFang SC;
          font-weight: normal;
          color: #7A808C;
        }
        .code-btn{
          width: 200rpx;
          height: 88rpx;
          font-size: 32rpx;
          font-family: PingFang SC-中等, PingFang SC;
          font-weight: normal;
          color: #FFFFFF;
          background: linear-gradient(#FF7D00, #FFB151);
          outline: none;
          border: 0;
          border-radius: 44rpx;
        }
        .code-cost{
          font-size: 28rpx;
          font-family: PingFang SC-中等, PingFang SC;
          font-weight: normal;
          color: #7A808C;
          image{
            width: 48rpx;
            height: 48rpx;
            vertical-align: bottom;
          }
        }
      }
    }
  }
}
</style>
