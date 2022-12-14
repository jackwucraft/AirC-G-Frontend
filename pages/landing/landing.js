// pages/landing/landing.js
import event from "@codesmiths/event";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  goToNextPage(e) {
    // console.log('what is this event?', e)
    
    // wx.switchTab({
    //   url: '/pages/stories/index',
    // })
    if (getApp().globalData.userId) {
      wx.switchTab({
        url: '/pages/games/index',
      })
    }
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
    // setTimeout( () => {
    //   if (condition) {
    //     wx.navigateTo({
    //       url: '/pages/games/index',
    //     })
    //   }
    // }, 4000)
    if (getApp().globalData.userId) {
      goToNextPage()
    } else {
      event.on('tokenReady', this, this.goToNextPage)
    }
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