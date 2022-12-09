// pages/games/show.js
const app = getApp()
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
    // const id = e.currentTarget.dataset.id
    wx.navigateBack();
    // wx.navigateTo({
    //   url: `/pages/games/index?id=${id}`
    // })
  },

  goToBook(e) {
    wx.showModal({
      title: '提示',
      content: 'Book!',
      success (res) {
        if (res.confirm) {
          console.log('confirm')
        } else if (res.cancel) {
          console.log('cancel')
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
      url: `http://localhost:3000/api/v1/products/${id}/likes`,
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
    const page = this
    const id = options.id
    wx.request({
      url: `http://localhost:3000/api/v1/products/${id}`,
      method:"GET",
      header: getApp().globalData.header,
      success(res) {
        page.setData({game: res.data.product})
        console.log(page.data.game)
      }
    })
    wx.request({
      url: `http://localhost:3000/api/v1/users/${getApp().globalData.userId}/likes`,
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