// pages/games/index.js
const app = getApp()
import event from '@codesmiths/event';
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
    if (getApp().globalData.header) {
      this.loginLoad();
    } else {
      event.on('tokenReady', this, this.loginLoad)
    }
  },

  loginLoad() {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/products`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        console.log('response from GET stories', res.data)
        const games = res.data.products.filter(product => product.sort === "game")
        // console.log(games)
        page.setData({games: games})
        page.setData({gamesStorage: games})
        // console.log(res.data.products.filter(product => product.sort === "game"))
        // const first = games[1]
        // page.setData({first})
        const swiper_data = [] //[games[Math.floor(Math.random()*games.length)]
        const games2 = res.data.products.filter(product => product.sort === "game")
        for (var i = 0;i < 5; i++) {
          if (games2.length > 0) {
            var randindex = Math.floor(Math.random()*games2.length)
            swiper_data[i] = games2[randindex]
            games2.splice(randindex, 1)
          } else {
            break
          }
        page.setData({swiper_data})
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