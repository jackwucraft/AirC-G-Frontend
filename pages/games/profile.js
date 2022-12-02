// pages/games/profie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showbookings(e) {
    this.setData({games: this.data.gamesStorage})
  },
  showlikes() {
    this.setData({games: this.data.likes})
  },

  goToIndex() {
    wx.navigateTo({
      url: '/pages/games/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const page = this;

    wx.request({
      url: 'http://localhost:3000/api/v1/games',
      method: "GET",
      success(res) {
        console.log('response from GET stories', res.data)
        page.setData({games: res.data.games})
        page.setData({gamesStorage: res.data.games})
        wx.hideLoading()
      }
    })
    const app = getApp()
    wx.request({
      url: `http://localhost:3000/api/v1/users/${app.globalData.userId}/likes`,
      method: "GET",
      success(res) {
        console.log('response from GET stories', res.data)
        page.setData({likes: res.data.games})
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})