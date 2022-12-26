<template>
  <view className='detail-box'>
    <view class="detail-box1">
      <view class="detail-success" v-if="exchangeCardUserVo.exchangeCardStatus === 2">
        <view class="phone-number"><text>TA的联系方式：</text><text>{{exchangeCardUserVo.cellPhone}}</text></view>
        <image mode="aspectFill" src="../../static/image/copy-btn.png" alt="" @click="handleCopy"></image>
      </view>
      <view class="detail-fail" v-if="exchangeCardUserVo.exchangeCardStatus === 3">
        <text>对方拒绝与您交换联系方式，一周内不能重新发起</text>
        <image mode="aspectFit" src="../../static/image/detail-fail.png" alt=""></image>
      </view>
      <view class="detail-expire" v-if="exchangeCardUserVo.exchangeCardStatus === 4">
        <text>您发起的交换联系方式已过期，TA未能及时查看，您可以通过以下方式进行联系： 1.通过发送短信方式提醒TA，短信提醒2元一条； 2.通过官方客服联系TA，平台将收取25元服务费，联系失败将退还您的费用。</text>
        <image mode="aspectFit" src="../../static/image/detail-expire.png" alt=""></image>
      </view>
    </view>
    <view class="detail-box2">
      <view class="bg-box"></view>
      <view class="user-info">
        <view class="avatar-box">
          <image mode="aspectFit" :src="icon" alt=""></image>
        </view>
        <view class="info-box">
          <view class="info1-box">
            {{nickName}}
            <image mode="aspectFit" v-show="gender == 0" src="../../static/image/female.png" alt=""></image>
            <image mode="aspectFit" v-show="gender == 1" src="../../static/image/male.png" alt=""></image>
          </view>
          <view class="info2-box">
            {{gender == 0 ? '女' : '男'}}·{{birthday}}·{{marriageStatus}}·{{userLocation}}
          </view>
        </view>
      </view>
      <view class="image-box" v-show="lifePhoto.length">
        <view>
          <view v-for="(item, index) in lifePhoto" :key="index">
            <image mode="aspectFit" :src="item" alt=""></image>
          </view>
        </view>
        <view class="photo-list-number" @click="previewLifeImage">共{{lifePhoto.length}}张</view>
      </view>
      <view class="self-intro-box">
        <view class="intro-title">自我介绍</view>
        <view class="intro-list">
          <view class="intro-item" v-for="(item, index) in selfIntroduce" :key="index">
            <text>{{item.chName.slice(0,4)}}</text><text>{{item.value}}</text>
          </view>
        </view>
      </view>
      <view class="self-intro-box">
        <view class="intro-title">择偶要求</view>
        <view class="intro-list">
          <view class="intro-item" v-for="(item, index) in spouseDemand" :key="index">
            <text>{{item.chName.slice(0,4)}}</text><text>{{item.value}}</text>
          </view>
        </view>
      </view>
      <view class="self-intro-box">
        <view class="intro-title">补充说明</view>
        <view class="intro-list">
          <view class="intro-item">{{spouseRemark[0].value}}</view>
        </view>
      </view>
    </view>
    <view class="bottom-btn">
      <view class="exchange-btn" v-if="exchangeCardUserVo.exchangeCardStatus === ''">
		  <image mode="aspectFit" src="../../static/image/exchange.png" alt=""></image>
	  </view>
      <view class="two-btn" v-if="exchangeCardUserVo.exchangeCardStatus === 4">
        <image mode="aspectFit" src="../../static/image/btn-customer.png" alt=""></image>
        <image mode="aspectFit" src="../../static/image/btn-msg.png" alt=""></image>
      </view>
    </view>
  </view>
</template>
<script>
import { defineComponent, reactive, watch, ref } from 'vue'
import { getDetails } from '../../apis/url.js'
import { getRouteParam } from '../../utils/index.js'

export default defineComponent({
  name: 'Detail',
  setup() {
	const param = getRouteParam()
    const userId = param.userId
    const icon = ref('')
    const lifePhoto = reactive([])
    const selfIntroduce = reactive([])
    const spouseDemand = reactive([])
    const spouseRemark = reactive([])
    const nickName = ref('')
    const gender = ref(0) // 0 女 1 男
    const birthday = ref('')
    const userLocation = ref('') // 所在地
    const marriageStatus = ref('') // 婚姻状态
    const exchangeCardUserVo = reactive({
      exchangeCardId: "", // 交换信息id
      exchangeCardStatus: "", // #交换状态 1:交换中 2:已交换 3:拒绝 4:交换过期
      exchangeCardButtonValue: "交换", // 当前交换信息按钮展示
      exchangeCardClickEnable: true, // 当前交换信息按钮是否可点击
      cellPhone: "" // 对方交换信息电话
    })
    async function getData () {
      const ret = await getDetails({ userId })
      if (ret.code === 100000) {
        icon.value = ret.data.icon
        lifePhoto.length = 0;
        lifePhoto.push(...(ret.data.lifePhoto ? ret.data.lifePhoto : []))
        selfIntroduce.length = 0
        selfIntroduce.push(...ret.data.selfIntroduce)
        nickName.value = selfIntroduce.splice(0, 1)[0].value;
        gender.value = selfIntroduce.splice(0, 1)[0].value === '女' ? 0 : 1;
        birthday.value = selfIntroduce.splice(0, 1)[0].value.replace(/^(\d{4})(.*)?(\d{2})(.*)?(\d{2})(.*)?$/, '$1-$3-$5');
        userLocation.value = selfIntroduce.splice(0, 1)[0].value;
        marriageStatus.value = selfIntroduce.splice(0, 1)[0].value;

        spouseDemand.length = 0
        spouseDemand.push(...ret.data.spouseDemand)
        spouseDemand[spouseDemand.length - 1].chName = '求偶重点'
        spouseRemark.length = 0
        spouseRemark.push(...ret.data.spouseRemark)
        for (const k in ret.data.exchangeCardUserVo) {
          exchangeCardUserVo[k] = ret.data.exchangeCardUserVo[k]
        }
      } else {
        uni.showToast({title: ret.message})
      }
    }
    getData()
    function previewLifeImage () {
      ImagePreview(['https://unpkg.com/@vant/static/apple-1.jpeg']);
    }
    function handleCopy () {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', exchangeCardUserVo.cellPhone);
      document.body.appendChild(input);
      input.setSelectionRange(0, 9999);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      ret.message({title: '复制成功'})
    }
    return {
      icon,
      lifePhoto,
      selfIntroduce,
      nickName,
      gender,
      birthday,
      userLocation,
      marriageStatus,
      spouseDemand,
      spouseRemark,
      exchangeCardUserVo,
      previewLifeImage,
      handleCopy
    }
  },
})
</script>
<style lang="scss" scoped>
.detail-box{
  position: relative;
  height: 100%;
  max-width: 750rpx;
  margin: 0 auto;
  font-family: PingFang SC-中等, PingFang SC;
  background: #F5F6FA;
  overflow-x: hidden;
  overflow-y: auto;
  .detail-box1{
    .detail-success{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
      margin: 24rpx;
      padding: 0rpx 24rpx;
      box-sizing: border-box;
      background: #E8FFEA;
      border-radius: 24rpx;
      overflow: auto;
      .phone-number text{
        font-size: 28rpx;
        font-weight: normal;
        color: #00B42A;
      }
      image{
        width: 110rpx;
        height: 48rpx;
      }
    }
    .detail-fail{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
      margin: 24rpx;
      padding: 0rpx 24rpx;
      font-size: 28rpx;
      color: #F53F3F;
      box-sizing: border-box;
      background: #FFECE8;
      border-radius: 24rpx;
      overflow: auto;
      image{
        width: 32rpx;
        height: 32rpx;
      }
    }
    .detail-expire{
      display: flex;
      // align-items: center;
      justify-content: space-between;
      // height(80rpx);
      margin: 24rpx;
      padding: 24rpx;
      font-size: 28rpx;
      color: #FFFFFF;
      box-sizing: border-box;
      background: #C9CDD4;
      border-radius: 24rpx;
      overflow: auto;
      image{
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .detail-box2{
    position: relative;
    padding: 0rpx 0rpx 180rpx 0rpx;
    overflow: auto;
    .bg-box{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 271rpx;
      background: linear-gradient(315deg, #E7F5FE 0%, #FFEAEF 271rpx);
    }
    .user-info{
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      height: 140rpx;
      padding: 24rpx 0rpx 0rpx 48rpx;
      .avatar-box{
        width: 140rpx;
        height: 140rpx;
        margin: 0rpx 20rpx 0rpx 0rpx;
        border-radius: 50%;
        overflow: hidden;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .info-box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 104rpx;
        // padding(18rpx,0rpx,0rpx,0rpx);
        .info1-box{
          display: flex;
          align-items: center;
          font-size: 28rpx;
          font-weight: normal;
          color: #7A808C;
        }
        image{
          width: 28rpx;
          height: 28rpx;
          margin: 0rpx 0rpx 0rpx 12rpx;
        }
        .info2-box{
          font-size: 32rpx;
          font-weight: normal;
          color: #22263F;
        }
      }
    }
    .image-box{
      position: relative;
      z-index: 2;
      // top(-74rpx);
      width: 702rpx;
      height: 350rpx;
      padding: 110rpx 24rpx 40rpx 24rpx;
      margin: -74rpx auto 0rpx;
      // margin: 0 auto;
      box-sizing: border-box;
      background: #FFFFFF;
      border-radius: 24rpx 24rpx 24rpx 24rpx;
      overflow: hidden;
      .photo-list-number{
        position: absolute;
        right: 24rpx;
        bottom: 40rpx;
        width: 200rpx;
        height: 200rpx;
        font-size: 28rpx;
        line-height: 200rpx;
        text-align: center;
        font-weight: normal;
        color: #FFFFFF;
        background: rgba(34,38,63,0.8);
        border-radius: 24rpx;
      }
      view{
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        list-style: none;
        view{
          flex-shrink: 0;
          width: 200rpx;
          height: 200rpx;
          margin: 0rpx 28rpx 0rpx 0rpx;
          border-radius: 24rpx;
          overflow: hidden;
          image{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .self-intro-box{
      position: relative;
      z-index: 1;
      width: 702rpx;
      padding: 40rpx 24rpx;
      margin: 24rpx auto 0rpx;
      border-radius: 24rpx;
      box-sizing: border-box;
      background: #FFFFFF;
      &:last-child{
        margin: 24rpx auto 38rpx;
      }
      .intro-title{
        display: flex;
        align-items: center;
        margin: 0rpx 0rpx 28rpx 0rpx;
        font-size: 28rpx;
        font-weight: normal;
        color: #7A808C;
        &::before{
          content: '';
          display: inline-block;
          width: 16rpx;
          height: 30rpx;
          margin: 0rpx 12rpx 0rpx 0rpx;
          border-radius: 8rpx;
          background: #FF7D00;
        }
      }
      .intro-list{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        view{
          display: flex;
          width: 50%;
          box-sizing: border-box;
          margin: 0rpx 0rpx 24rpx 0rpx;
          font-size: 28rpx;
          font-weight: normal;
          color: #22263F;
          &:nth-child(odd){
            padding: 0rpx 20rpx 0rpx 0rpx;
          }
          &:last-child{
            width: 100%;
            padding: 0;
          }
          text:first-child{
            flex-shrink: 0;
            width: 130rpx;
            font-size: 28rpx;
            font-weight: normal;
            color: #7A808C;
            white-space: nowrap;
            overflow: hidden;
          }
          text:last-child{
            font-size: 28rpx;
            font-weight: normal;
            color: #22263F;
          }
        }
      }
    }
  }
  .bottom-btn{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 6;
    overflow: auto;
    // background: #fff;
    .exchange-btn{
      width: 702rpx;
      margin: 40rpx auto 40rpx;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .two-btn{
      display: flex;
      justify-content: space-between;
      width: 560rpx;
      margin: 40rpx auto 40rpx;
      image{
        width: 260rpx;
        height: 100rpx;
      }
    }
  }
}
</style>
