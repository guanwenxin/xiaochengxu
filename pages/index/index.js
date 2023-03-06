// index.js
// 获取应用实例
const app = getApp()
const {getImageBase64} = require('../../utils/util')

Page({
  data: {
    imgBase64: '',
    afterHandle: ''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async upload() {
    const getFile = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      sizeType: ['compressed'],
    })
    const result = getImageBase64(getFile.tempFiles[0].tempFilePath)
    console.log(result)
    this.setData({
      imgBase64: result
    })
    // TODO: 上传到腾讯云api
    wx.request({
      url: 'http://101.43.145.34:9000/ai',
      method: 'POST',
      data: {
        img: result
      },
      success: (res) => {
        console.log(res)
        this.setData({
          afterHandle: `data:image/jpg;base64,${res.data.Image}`
        })
      }
    })
    // TODO: 会先结果图片
    console.log(getFile)
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
