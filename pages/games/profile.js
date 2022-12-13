// pages/games/profie.js
const app = getApp()
import event from '@codesmiths/event';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'bookings',
    avatarUrl: "/images/avatar-default.png",
    nickName: "Enter your name here"
  },

  goToShow(e) {
    console.log('goToShow e', e)
    const id = e.currentTarget.dataset.id
    console.log('id', id)
    wx.navigateTo({
      url: `/pages/games/show?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData({id: options.id})
    // if (getApp().globalData.header) {
    //   this.loginLoad();
    // } else {
    //   event.on('tokenReady', this, this.loginLoad)
    // }
  },

  loginLoad() {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/users/${app.globalData.userId}/likes`,
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        page.setData({ favorites: res.data.products })
        wx.hideLoading()
      }
    })
    wx.request({
      url: `${app.globalData.baseUrl}/products`,
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        const games = res.data.products.filter(product => product.sort === "game")
        page.setData({ games: games })
        wx.hideLoading()
        page.setData({activeTab: "bookings"})
      }
    })
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
    // this.loadBookings();
    if (getApp().globalData.header) {
      this.loginLoad();
    } else {
      event.on('tokenReady', this, this.loginLoad)
    }
  },

  // loadBookings() {
  //   const page = this;
  //   wx.request({
  //     url: 'http://localhost:3000/api/v1/products',
  //     method: "GET",
  //     header: getApp().globalData.header,
  //     success(res) {
  //       console.log('response from GET stories', res.data)
  //       const games = res.data.products.filter(product => product.sort === "game")
  //       page.setData({ games: games })
  //       page.setData({ gamesStorage: games })
  //       wx.hideLoading()
  //       page.setData({activeTab: "bookings"})
  //     }
  //   })
  // },

  loadBookings() {
    this.setData({activeTab: "bookings"})
  },

  // loadFavorites (){
  //   console.log("loadFavorites:")
  //   const page = this;
  //   const userId = app.globalData.userId
  //   wx.request({
  //     url: `http://localhost:3000/api/v1/users/${userId}/likes`,
  //     method: "GET",
  //     header: getApp().globalData.header,
  //     success(res) {
  //       // console.log(res.data.products)
  //       console.log('response from GET favorites', res.data)
  //       const favorites = res.data.products
  //       page.setData({favorites})
  //       page.setData({activeTab: "favorites"})
  //       // page.setData({ gamesStorage: games })
  //       wx.hideLoading()
  //     }
  //   })
  // },

  loadUploads() {
    this.setData({activeTab: "uploads"})
  },

  loadFavorites () {
    this.setData({activeTab: "favorites"})
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

  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
    this.updateUserInfo()
  },

  inputNickname(e) {
    const nickName = e.detail.value
    console.log("inputNickname: nickname", nickName)
    this.setData({ nickName })
    this.updateUserInfo()


    // wx.request to update the user in the backend

    // update the globaldata.user
  },

  updateUserInfo(e) {
    const avatarUrl = this.data.avatarUrl
    const nickName = this.data.nickName
    const data = {
      nickname: nickName, 
      avartar_url: avatarUrl
    }
    wx.request({
      url: `${app.globalData.baseUrl}/users/${this.data.userId}`,
      method: "PUT",
      data: data,
      header: getApp().globalData.header,
      success(res) {
        console.log("user info update successfully!")
        app.globalData.user.avartar_url = avatarUrl
        // console.log('response from PUT user', res.data)
        // const games = res.data.products.filter(product => product.sort === "game")
        // page.setData({ games: games })
        // wx.hideLoading()
        // page.setData({activeTab: "bookings"})
      }
    })
  } 

})