// pages/games/create.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userDescription: "",
    showArray: ['PlayStation5', 'Xbox', 'Switch'],
    array: ['ps5', 'xbox', 'switch'],
    index: 0,
    uploadUrl: 'https://airgandc.oss-cn-shanghai.aliyuncs.com/images/game-4.jpg'
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
    this.setData({
      index: e.detail.value
    })
  },

  Upload(e) {
    const data = { name: e.detail.value.name, description: e.detail.value.description, platform: this.data.array[e.detail.value.console], user_id: app.globalData.userId, picture_url: this.data.uploadUrl}
    console.log(data)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    if (wx.getStorageSync('id')) {wx.removeStorageSync('id')}
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