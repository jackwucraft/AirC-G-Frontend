// pages/games/create.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userDescription: "",
    array: ['ps5', 'xbox', 'switch'],
    objectArray: [
      {
        id: 0,
        name: 'ps5'
      },
      {
        id: 1,
        name: 'xbox'
      },
      {
        id: 2,
        name: 'switch'
      }
    ],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  Upload(e) {
    const data = { name: e.detail.value.name, description: e.detail.value.description, platform: this.data.array[e.detail.value.console], user_id: app.globalData.userId}
    console.log(data)
    wx.request({
      url: `${app.globalData.baseUrl}/products`,
      method:"POST",
      header: getApp().globalData.header,
      data: data,
      success(res) {
        console.log("success", res)
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