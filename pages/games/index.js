// pages/games/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all'
  },
  // goToIndex(e) {
  //   this.setData({games: this.data.gamesStorage})
  // },    
  
  goToShow(e) {
    console.log('goToShow e', e)
    const id = e.currentTarget.dataset.id
    console.log('id', id)
    wx.navigateTo({
      url: `/pages/games/show?id=${id}`
    })
  },

  // goToProfile() {
  //   wx.navigateTo({
  //     url: '/pages/games/profile',
  //   })
  // },

  showPS5() {
    if (this.data.activeTab === "ps5") {
      this.setData({games: this.data.gamesStorage})
      this.setData({activeTab: 'all'})
    } else {
      this.setData({games: this.data.gamesStorage.filter(game => game.platform === "ps5")})
      this.setData({activeTab: 'ps5'})
    }
  },

  showXbox() {
    if (this.data.activeTab === "xbox") {
      this.setData({games: this.data.gamesStorage})
      this.setData({activeTab: 'all'})
    } else {
      this.setData({games: this.data.gamesStorage.filter(game => game.platform === "xbox")})
      this.setData({activeTab: 'xbox'})
    }
  },

  showSwitch() {
    if (this.data.activeTab === "switch") {
      this.setData({games: this.data.gamesStorage})
      this.setData({activeTab: 'all'})
    } else {
      this.setData({games: this.data.gamesStorage.filter(game => game.platform === "switch")})
      this.setData({activeTab: 'switch'})
    }
  },

  /**
   * 生命周期函数-监听页面加载
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

    wx.request({
      url: 'http://localhost:3000/api/v1/products',
      method: "GET",
      header: getApp().globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        const games = res.data.products.filter(product => product.sort === "game")
        page.setData({games: games})
        page.setData({gamesStorage: games})
        // const first = games[1]
        // page.setData({first})
        const header = [] //[games[Math.floor(Math.random()*games.length)]
        for (var i = 0;i < 5; i++) {
          if (games.length > 0) {
            var randindex = Math.floor(Math.random()*games.length)
            header[i] = games[randindex]
            games.splice(randindex, 1)
          } else {
            break
          }
        page.setData({header})
        }
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