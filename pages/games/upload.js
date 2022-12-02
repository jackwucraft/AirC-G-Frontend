// pages/games/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    startDate: '2022-12-01',
    endDate: '2022-12-02',
    dateBetween: 1
  },

  goToIndex(e) {
    // wx.navigateTo({
    //   url: `/pages/games/index`
    // })
    wx.navigateBack()
    wx.navigateBack()
  },

  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
    this.setData({
      endDate: e.detail.value
    })
    this.setData({
      dateBetween: 0
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
    this.setData({
      dateBetween: parseInt(this.data.endDate.slice(-2), 10) - parseInt(this.data.startDate.slice(-2), 10)
    })
  },

  goToShow(e) {
    wx.navigateTo({
      url: `/pages/games/show?id=${this.data.game.id}`
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    const id = options.id
    wx.request({
      url: `http://localhost:3000/api/v1/games/${id}`,
      method:"GET",
      success(res) {
        page.setData({game: res.data.game})
        console.log(page.data.game)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})