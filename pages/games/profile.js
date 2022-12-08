// pages/games/profie.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'bookings'
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
    this.loadBookings();
    const app = getApp()
    wx.request({
      url: `http://localhost:3000/api/v1/users/${app.globalData.userId}/likes`,
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        page.setData({ likes: res.data.products })
        wx.hideLoading()
      }
    })
  },

  loadBookings() {
    const page = this;
    wx.request({
      url: 'http://localhost:3000/api/v1/products',
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        const games = res.data.products.filter(product => product.sort === "game")
        page.setData({ games: games })
        page.setData({ gamesStorage: games })
        wx.hideLoading()
        page.setData({activeTab: "bookings"})
      }
    })
  },

  loadFavorites (){
    console.log("loadFavorites:")
    const page = this;
    const userId = app.globalData.userId
    wx.request({
      url: `http://localhost:3000/api/v1/users/${userId}/likes`,
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        // console.log(res.data.products)
        console.log('response from GET favorites', res.data)
        const favorites = res.data.products
        page.setData({favorites})
        page.setData({activeTab: "favorites"})
        // page.setData({ gamesStorage: games })
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