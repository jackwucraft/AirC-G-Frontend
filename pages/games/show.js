// pages/games/show.js
const app = getApp
Page({

  /**
   * Page initial data
   */
  data: {

  },
  goToIndex(e) {
    console.log('goToShow e', e)
    const id = e.currentTarget.dataset.id
    console.log('id', id)
    wx.navigateTo({
      url: `/pages/games/index?id=${id}`
    })
  },

  goToBooking(e) {
    console.log('goToBooking e', e)
    const id = e.currentTarget.dataset.id
    console.log('id', id)
    wx.navigateTo({
      url: `/pages/games/form?id=${id}`
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