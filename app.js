// app.js
// import event from "@codesmiths/event"

App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    const _this = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('res', res);
        wx.request({
          url: 'http://localhost:3000/api/v1/login',
          method: 'POST',
          data: { code: res.code },
          success(loginRes) {
            console.log('login res', loginRes);
            _this.globalData.user = loginRes.data.user;
            _this.globalData.header = { Authorization: loginRes.header['Authorization'] }
            // event.emit('tokenReady')
            _this.globalData.userId = _this.globalData.user.id
            wx.switchTab({
              url: '/pages/games/index',
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    // userId: 6
  }
})
