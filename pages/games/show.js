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
    dateBetween: 1,
    favorite_text: "Favorite",
    day: "day",
  },

  loginShow() {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/products/${page.data.id}`,
      method:"GET",
      header: getApp().globalData.header,
      success(res) {
        // if (res.data.user.name === '') {
        //   res.data.user.name = 'user'
        // }
        // if (res.data.user.avatar_url === '') {
        //   res.data.user.avatar_url = 'https://airgandc.oss-cn-shanghai.aliyuncs.com/WechatIMG170%E7%9A%84%E5%89%AF%E6%9C%AC.png'
        // }
        page.setData({game: res.data.product, user: res.data.user})
        // console.log(res)
        const platform = {ps5: "PlayStation 5", xbox: "Xbox", switch: "Switch"}
        page.setData({platform: platform[res.data.product.platform]})
        const logo = {ps5: "/images/playstation.svg", xbox: "/images/xbox.svg", switch: "/images/switch.svg"}
        page.setData({logo: logo[res.data.product.platform]})

        // console.log(page.data.user)
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
          page.setData({favorite_text: "Favorited!"})
        } else {
          page.setData({favorite_text: "Favorite"})
        }
      }
    })
    page.setData({userId: app.globalData.userId})
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
      cancelText:'Cancel',
      confirmText:'Confirm',
      success: (res) => {
        if (res.confirm) {
          console.log('user confirm')
          this.createBook()
          wx.navigateBack()
        } else if (res.cancel) {
          console.log('user cancel')
        }
      }
    })
  },

  createBook() {
    // const page = this
    const data = { date: { time_from: this.data.startDate, time_to: this.data.endDate } }
    const id = this.data.game.id
    wx.request({
      url: `${app.globalData.baseUrl}/products/${id}/${app.globalData.userId}/bookings`,
      method:"POST",
      header: app.globalData.header,
      data: data,
      success(res) {
        console.log(res)
      }
      })
  },
  
  goToEdit(e) {
    const id = this.data.game.id
    wx.setStorageSync("id", id)
    wx.switchTab({
      url: '/pages/games/create',
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
          page.setData({favorite_text: "Favorited!"})
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
    if (this.data.dateBetween > 1){
      this.setData({
        day: "days"
      })
    }else{
      this.setData({
        day: "day"
      })
    }
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
