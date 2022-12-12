// pages/games/show.js
const app = getApp()
import event from '@codesmiths/event';
Page({

  /**
   * Page initial data
   */
  data: {
    startDate: '2022-12-01',
    endDate: '2022-12-02',
    dateBetween: 1
  },

  loginShow() {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/products/${page.data.id}`,
      method:"GET",
      header: getApp().globalData.header,
      success(res) {
        page.setData({game: res.data.product})
        console.log(page.data.game)
      }
    })
    wx.request({
      url: `${app.globalData.baseUrl}/users/${getApp().globalData.userId}/likes`,
      method:"GET",
      header: getApp().globalData.header,
      success(res) {
        // console.log(res.data.products.map(product => product.name))
        // console.log(page.data.game.name)
        if (res.data.products.map(product => product.id).includes(page.data.game.id)) {
          page.setData({favorite_text: "Saved to Favorites!"})
        } else {
          page.setData({favorite_text: "Favorite"})
        }
      }
    })
  },

  goToIndex(e) {
    // const id = e.currentTarget.dataset.id
    wx.navigateBack();
    // wx.navigateTo({
    //   url: `/pages/games/index?id=${id}`
    // })
  },

  goToBook(e) {
    wx.showModal({
      title: 'Booking Status',
      content: 'Your booking has been made succesfully!',
      cancelText:'Cancle',
      confirmText:'Confirm',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },

  // goToUpload(e) {
  //   console.log('goToUpload e', e)
  //   const id = this.data.game.id
  //   console.log('id', id)
  //   wx.navigateTo({
  //     url: `/pages/games/upload?id=${id}`
  //   })
  // },
  addlikes() {
    const page = this
    const data = { user_id: app.globalData.userId }
    const id = this.data.game.id
    wx.request({
      url: `${app.globalData.baseUrl}/products/${id}/likes`,
      method:"POST",
      header: getApp().globalData.header,
      data: data,
      success(res) {
        if (res.data.message === "create") {
          page.setData({favorite_text: "Saved to Favorites!"})
        } else {
          page.setData({favorite_text: "Favorite"})
        }
        // console.log(res.data)
      }
    })
  },
  startDateChange: function (e) {
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
  endDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
    this.setData({
      dateBetween: parseInt(this.data.endDate.slice(-2), 10) - parseInt(this.data.startDate.slice(-2), 10)
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({id: options.id})
    if (getApp().globalData.header) {
      this.loginShow();
    } else {
      event.on('tokenReady', this, this.loginShow)
    }
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
    return {
      title: this.data.game.name,
      path: `/games/show?id=${this.data.game.id}`,
      imageUrl: this.data.game.picture_url
    }
  }
})