// pages/info/info.js
Page({
  data: {
    avatarUrl: ''
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: '',
    })
  },

  async login() {

    const { userInfo } = await wx.getUserProfile({
      desc: '信息仅用于APP注册',
    })
    const { avatarUrl, nickName } = userInfo

    wx.login({
      success: (res) => {
        // 微信login的code
        console.log(res.code)
        wx.request({
          url: 'http://101.43.145.34/auth',
          data: {
            code: res.code,
            avatarUrl,
            nickName
          },
          // 获取后端数据
          success: (res) => {
            wx.setStorageSync('token', res.token)
            // wx.getStorageSync('token')
          }
        })
      }
    })
  }
})