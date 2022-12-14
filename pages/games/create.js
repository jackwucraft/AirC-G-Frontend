// pages/games/create.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: "",
    productDescription: "",
    uploadUrl: 'https://airgandc.oss-cn-shanghai.aliyuncs.com/images/game-4.jpg',
    showArray: ['PlayStation5', 'Xbox', 'Switch'],
    array: ['ps5', 'xbox', 'switch'],
    index: 0,
    shadowClass: "blue-shadow"
  },

  setShadowClass(index) {
    let shadowClass = "blue-shadow"
    if (index === '1') {
      shadowClass = "green-shadow"
    } if (index === '2') {
      shadowClass = "red-shadow" 
    }
    this.setData({shadowClass})
  },

  handleImageUpload() {
    const page = this
    wx.showModal({
      editable: true,
      placeholderText: 'Please put an url here',
      showCancel: true,
      title: 'Upload your Picture',
      complete: (res) => {
        if (res.cancel) {
          console.log("ERROR")
        }
        if (res.confirm) {
          console.log("confirm", res.content)
          page.setData({uploadUrl: res.content})
        }
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     page.setData({ tempFilePaths: res.tempFilePaths})
    //   }
    // })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    this.setShadowClass(index)
    this.setData({index})
  },

  Upload(e) {
    const data = { name: e.detail.value.name, description: e.detail.value.description, platform: this.data.array[e.detail.value.console], user_id: app.globalData.userId, picture_url: this.data.uploadUrl}
    console.log(data)
    // const page = this
    if (wx.getStorageSync('id')) {
      wx.request({
        url: `${app.globalData.baseUrl}/products/${wx.getStorageSync('id')}`,
        method:"PUT",
        header: getApp().globalData.header,
        data: data,
        success(res) {
          console.log("success edit", res)
          wx.switchTab({
            url: '/pages/games/index',
          })
        }
      })
    } else {
      wx.request({
        url: `${app.globalData.baseUrl}/products`,
        method:"POST",
        header: getApp().globalData.header,
        data: data,
        success(res) {
          console.log("success", res)
          wx.switchTab({
            url: '/pages/games/index',
          })
        }
      })
    }
  },

  destroy() {
    if (wx.getStorageSync('id')) {
      wx.request({
        url: `${app.globalData.baseUrl}/products/${wx.getStorageSync('id')}`,
        method: "DELETE",
        header: getApp().globalData.header,
        success(res) {
          console.log(res)
          wx.switchTab({
            url: '/pages/games/index',
          })
        }
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
    const page = this
    if (wx.getStorageSync('id')) {
      this.setData({Storage: true})
      // console.log("onShow")
      wx.request({
        url: `${app.globalData.baseUrl}/products/${wx.getStorageSync('id')}`,
        method:"GET",
        header: getApp().globalData.header,
        success(res) {
          console.log(res.data.product)
          const index = page.data.array.findIndex((element => element === res.data.product.platform))
          page.setData({uploadUrl: res.data.product.picture_url, index, productName: res.data.product.name, productDescription: res.data.product.description})
          page.setShadowClass(index.toString())
        }
      })
    } else {
      this.setData({Storage: false})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    if (wx.getStorageSync('id')) {
      wx.removeStorageSync('id')
      // this.setData({Storage: false})
    }
    this.setData({uploadUrl: 'https://airgandc.oss-cn-shanghai.aliyuncs.com/images/game-4.jpg', index: 0, productName: '', productDescription: ''}) 
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